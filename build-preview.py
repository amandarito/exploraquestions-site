#!/usr/bin/env python3
"""Bundle the site into one self-contained preview.html.

Inlines fonts.css, styles.css, main.js and the woff2 files as data: URLs so the
page works with no network and no sibling files. The multi-file version in this
folder stays the source of truth — this is only for previewing/sharing.
"""
import base64, pathlib, re

here = pathlib.Path(__file__).parent
html = (here / 'index.html').read_text()
fonts = (here / 'assets' / 'fonts.css').read_text()
styles = (here / 'styles.css').read_text()
js = (here / 'main.js').read_text()

def data_url(rel):
    b = (here / 'assets' / rel).read_bytes()
    return 'data:font/woff2;base64,' + base64.b64encode(b).decode()

fonts = re.sub(r'url\((fonts/[^)]+)\)', lambda m: 'url(%s)' % data_url(m.group(1)), fonts)

html = re.sub(r'\n<!-- Fonts are self-hosted.*?<link rel="stylesheet" href="styles\.css">',
              '\n<style>\n%s\n%s\n</style>' % (fonts, styles), html, flags=re.S)
html = html.replace('<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">', '')
html = html.replace('<meta property="og:image" content="assets/og-image.png">', '')
html = html.replace('<script src="main.js"></script>', '<script>\n%s\n</script>' % js)

out = here / 'preview.html'
out.write_text(html)
print('wrote %s (%.0f KB)' % (out.name, out.stat().st_size / 1024))
