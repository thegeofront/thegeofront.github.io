#! /usr/bin/env python3
# to use: python3 generate.py in the news/ folder. this will generate the html files for the news entries.

import json
import markdown
from jinja2 import Template


def generate_news_entry(folder, title, title_ned, subtitle, date, lang="en"):
    dir_path = folder.rstrip("/")
    
    with open(f"{dir_path}/index.md") as f:
        md_content = f.read()
    html_body_eng = markdown.markdown(md_content)
    with open(f"{dir_path}/index-nl.md") as f:
        md_content = f.read()
    html_body_ned = markdown.markdown(md_content)

    with open("./templates/template.html") as f:
        template = Template(f.read())

    rendered = template.render(title_eng=title, body_eng=html_body_eng, title_ned=title_ned, body_ned=html_body_ned, date=date)

    with open(f"{dir_path}/index.html", "w") as f:
        f.write(rendered)


def main():
    with open("entries.json") as f:
        data = json.load(f)
    for entry in data["entries"]:
        generate_news_entry(
            folder=entry["folder"],
            title=entry["title"],
            title_ned=entry["title_ned"],
            subtitle=entry.get("subtitle", ""),
            date=entry.get("date", ""),
        )

if __name__ == "__main__":
    main()