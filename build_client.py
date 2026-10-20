#!/usr/bin/env python3
"""Собирает server/game/gram.html из part1.html + part2.js. Использование: build_client.py [API_URL] [путь к иконке png]"""
import base64, os, sys
d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "server", "game")
api = sys.argv[1] if len(sys.argv) > 1 else ""
icon = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "brand", "icon-96.png")
uri = "data:image/png;base64," + base64.b64encode(open(icon, "rb").read()).decode() if os.path.exists(icon) else ""
hero = open(os.path.join(d, "assets", "hero.b64")).read()
css = open(os.path.join(d, "assets", "old.css"), encoding="utf-8").read().replace("__HERO__", hero)
h = open(os.path.join(d, "part1.html"), encoding="utf-8").read().replace("/*@OLD_CSS@*/", css).replace("__ICON__", uri).replace("__API__", api)
j = open(os.path.join(d, "part2.js"), encoding="utf-8").read()
open(os.path.join(d, "gram.html"), "w", encoding="utf-8").write(h + j + "\n</script></body></html>\n")
print("gram.html", os.path.getsize(os.path.join(d, "gram.html")) // 1024, "KB")
