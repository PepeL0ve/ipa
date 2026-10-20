// Gram Gifts для Windows. Окно показывает локальную игру; в сеть к серверу ходит этот процесс (HTTPS + закреплённый сертификат).
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const https = require('https');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));   // {"api":"https://...","pin":"base64|''"}
const OV = () => path.join(app.getPath('userData'), 'override.json');      // адрес/PIN, введённые в самом приложении (экран «Нет связи»)
try { Object.assign(cfg, JSON.parse(fs.readFileSync(OV(), 'utf8'))); } catch (e) {}
let API = null;
const setApi = () => { try { const u = new URL(String(cfg.api || '').trim()); API = u.protocol === 'https:' ? u : null; } catch (e) { API = null; } };
setApi();
ipcMain.on('cfg', (ev, api, pin) => {
  if (!/^https:\/\/[^\s/]+(:\d+)?$/.test(String(api))) return;
  cfg.api = String(api); cfg.pin = String(pin || '').trim(); setApi();
  try { fs.writeFileSync(OV(), JSON.stringify({ api: cfg.api, pin: cfg.pin })); } catch (e) {}
});

function pinOk(cert) {
  if (!cfg.pin) return true;
  try {
    const x = new crypto.X509Certificate(cert.raw);
    const h = crypto.createHash('sha256').update(x.publicKey.export({ type: 'spki', format: 'der' })).digest('base64');
    return h === cfg.pin;
  } catch (e) { return false; }
}

ipcMain.handle('api', (ev, p, body, hdrs) => new Promise((resolve) => {
  try {
    if (!API) return resolve([0, 'не задан https-адрес сервера']);
    if (typeof p !== 'string' || !/^\/api\/v1\/m\/[a-z]{1,12}$/.test(p)) return resolve([0, 'bad path']);
    const h = { 'Content-Type': 'application/json' };
    let hj = {}; try { hj = JSON.parse(hdrs || '{}'); } catch (e) {}
    for (const k of ['X-Sid', 'X-Ts', 'X-Nonce', 'X-Sign']) if (typeof hj[k] === 'string' && /^[0-9a-f]{1,80}$/.test(hj[k])) h[k] = hj[k];
    const data = Buffer.from(String(body || ''), 'utf8');
    h['Content-Length'] = data.length;
    const req = https.request({
      host: API.hostname, port: API.port || 443, path: p, method: 'POST', headers: h, timeout: 15000,
      rejectUnauthorized: !cfg.pin,          // с PIN доверяем только нашему сертификату (проверка ниже, сразу после рукопожатия)
    }, (res) => {
      const ch = []; let n = 0;
      res.on('data', (d) => { n += d.length; if (n < 2e6) ch.push(d); });
      res.on('end', () => resolve([res.statusCode, Buffer.concat(ch).toString('utf8')]));
    });
    req.on('timeout', () => req.destroy());
    req.on('error', (e) => resolve([0, String((e && (e.code || e.message)) || 'error')]));
    // Тело и заголовки уходят ТОЛЬКО после того, как отпечаток сертификата сервера совпал с PIN.
    // (checkServerIdentity для самоподписанных сертификатов Node не вызывает, поэтому проверяем здесь.)
    req.on('socket', (sock) => {
      const go = () => {
        let ok = true;
        if (cfg.pin) { try { ok = pinOk(sock.getPeerCertificate(true)); } catch (e) { ok = false; } }
        if (!ok) { req.destroy(); resolve([0, 'pin: сертификат сервера не совпал']); return; }
        req.end(data);
      };
      if (sock.connecting || !sock.getProtocol || !sock.getProtocol()) sock.once('secureConnect', go); else go();
    });
  } catch (e) { resolve([0, String((e && e.message) || 'error')]); }
}));

function create() {
  Menu.setApplicationMenu(null);
  const w = new BrowserWindow({
    width: 440, height: 880, minWidth: 360, minHeight: 600, backgroundColor: '#0b0f17', autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.png'), title: 'Gram Gifts',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: false, nodeIntegration: false, sandbox: false, devTools: false },
  });
  w.loadFile(path.join(__dirname, 'gram.html'));
  w.webContents.on('will-navigate', (e) => e.preventDefault());
  w.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
}
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
