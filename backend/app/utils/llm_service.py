from ..config import settings
import requests


def get_resume_suggestions(resume_text: str, job_description: str, missing_skills: list[str], match_score: float):
    if not settings.GROQ_API_KEY:
        return [
            "Add the missing technical skills in your skills section.",
            "Improve your project descriptions with measurable impact.",
            "Tailor your summary according to the selected role.",
            "Mention tools and technologies related to this job."
        ]

    prompt = f"""
You are a resume expert.

Resume:
{resume_text[:3000]}

Job Description:
{job_description[:2000]}

Match Score: {match_score}
Missing Skills: {", ".join(missing_skills) if missing_skills else "None"}

Give 4 short bullet points:
1. What skills are missing
2. What to add in resume
3. How to improve project descriptions
4. How to improve summary for this job
"""

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.3
        },
        timeout=30
    )

    response.raise_for_status()
    content = response.json()["choices"][0]["message"]["content"]
    lines = [line.strip("-• ").strip() for line in content.splitlines() if line.strip()]
    return lines[:4]