// Мост «игра ↔ приложение» с теми же именами, что в Android-приложении (GramApp.api2).
const { ipcRenderer } = require('electron');
window.GramApp = {
  cfg(api, pin) { ipcRenderer.send('cfg', api, pin); },
  api2(id, path, body, hdrs) {
    ipcRenderer.invoke('api', path, body, hdrs).then((r) => { window.__gr && window.__gr(id, r[0], r[1]); });
  },
};
