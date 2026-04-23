from ..config import settings
from ..utils.skill_extractor import extract_skills
import requests


def fetch_indian_jobs(keyword="developer"):
    url = "https://api.adzuna.com/v1/api/jobs/in/search/1"

    params = {
        "app_id": settings.ADZUNA_APP_ID,
        "app_key": settings.ADZUNA_APP_KEY,
        "results_per_page": 20,
        "what": keyword,
    }

    response = requests.get(url, params=params, timeout=30)
    response.raise_for_status()
    data = response.json()

    jobs = []

    for job in data.get("results", []):
        description = job.get("description", "")
        skills = extract_skills(description)

        jobs.append({
            "title": job.get("title", ""),
            "company": (job.get("company") or {}).get("display_name", ""),
            "location": (job.get("location") or {}).get("display_name", ""),
            "description": description,
            "apply_url": job.get("redirect_url", ""),
            "skills": skills
        })

    return jobs