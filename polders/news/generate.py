import json
import markdown
from jinja2 import Template


def generate_news_entry(folder, title, subtitle, date):
    dir_path = folder.rstrip("/")
    with open(f"{dir_path}/index.md") as f:
        md_content = f.read()
    html_body = markdown.markdown(md_content)

    with open("./templates/template.html") as f:
        template = Template(f.read())

    rendered = template.render(title=title, subtitle=subtitle, body=html_body, date=date)

    with open(f"{dir_path}/index.html", "w") as f:
        f.write(rendered)


def main():
    with open("entries.json") as f:
        data = json.load(f)
    for entry in data["entries"]:
        generate_news_entry(
            folder=entry["folder"],
            title=entry["title"],
            subtitle=entry.get("subtitle", ""),
            date=entry.get("date", "")
        )

if __name__ == "__main__":
    main()