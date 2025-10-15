import os
from datetime import datetime

BASE_URL = "https://coach-emocional.github.io/laurejong-coaching-emocional/"

# Encuentra todos los archivos .html en el directorio raíz
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

sitemap_entries = []
for html_file in html_files:
    loc = BASE_URL if html_file == "index.html" else BASE_URL + html_file
    lastmod = datetime.now().strftime("%Y-%m-%d")
    sitemap_entries.append(f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <priority>1.0</priority>\n  </url>")

sitemap_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(sitemap_entries)}
</urlset>
'''

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_content)

print("sitemap.xml generado correctamente.")
