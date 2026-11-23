#!/usr/bin/env python3
"""Build the offline HTML from the shared application, using only Python stdlib."""
from pathlib import Path
import base64
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
OUT = ROOT / "standalone" / "NCR_GO_1A_2A.html"


def build() -> Path:
    html = (DIST / "index.html").read_text(encoding="utf-8")
    css = (DIST / "assets/styles.css").read_text(encoding="utf-8")
    assets = {}
    for name, mime in [
        ("assets/ncr-logo.png", "image/png"),
        ("assets/scenes/stock.svg", "image/svg+xml"),
        ("assets/scenes/budget.svg", "image/svg+xml"),
    ]:
        assets[name] = "data:" + mime + ";base64," + base64.b64encode((DIST / name).read_bytes()).decode("ascii")
    scripts = [
        "window.NCR_SINGLE_FILE = true;",
        "window.NCR_EMBEDDED_ASSETS = " + json.dumps(assets, ensure_ascii=False) + ";",
    ]
    for name in ["core.js", "data/go1.js", "data/go2.js", "app.js"]:
        scripts.append((DIST / "assets" / name).read_text(encoding="utf-8"))
    js = "\n;\n".join(scripts).replace("</script", "<\\/script")
    html = html.replace('<link rel="stylesheet" href="assets/styles.css">', "<style>\n" + css + "\n</style>")
    html = re.sub(r'<script src="assets/[^\"]+" defer></script>\n?', "", html)
    html = html.replace("script-src 'self'", "script-src 'unsafe-inline'")
    html = html.replace("</body>", "<script>\n" + js + "\n</script>\n</body>")
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"HTML autonome créé : {OUT.name} ({OUT.stat().st_size:,} octets)")
    return OUT


if __name__ == "__main__":
    build()
