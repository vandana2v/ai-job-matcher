SKILL_KEYWORDS = [
    "python", "java", "javascript", "react", "html", "css", "tailwind",
    "mongodb", "sql", "mysql", "aws", "docker", "git", "fastapi", "flask",
    "rest api", "machine learning", "ai", "data structures", "algorithms",
    "node.js", "express", "bootstrap", "c++", "c", "spring boot"
]

def extract_skills(text: str) -> list[str]:
    lower_text = text.lower()
    found = []

    for skill in SKILL_KEYWORDS:
        if skill in lower_text:
            found.append(skill)

    return sorted(set(found))