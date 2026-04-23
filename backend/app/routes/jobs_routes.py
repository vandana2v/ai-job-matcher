from fastapi import APIRouter, HTTPException
from ..db import jobs_collection
from ..utils.adzuna_service import fetch_indian_jobs

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/fetch")
def fetch_jobs(keyword: str = "developer"):
    try:
        jobs = fetch_indian_jobs(keyword)

        for job in jobs:
            jobs_collection.update_one(
                {"title": job["title"], "company": job["company"]},
                {"$set": job},
                upsert=True
            )

        return {"message": "Jobs fetched successfully", "count": len(jobs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("")
def get_jobs(location: str | None = None, keyword: str | None = None):
    query = {}

    if location:
        query["location"] = {"$regex": location, "$options": "i"}

    if keyword:
        query["$or"] = [
            {"title": {"$regex": keyword, "$options": "i"}},
            {"description": {"$regex": keyword, "$options": "i"}},
            {"company": {"$regex": keyword, "$options": "i"}}
        ]

    jobs = []

    for job in jobs_collection.find(query).limit(50):
        jobs.append({
            "id": str(job.get("_id")),
            "title": job.get("title", ""),
            "company": job.get("company", ""),
            "location": job.get("location", ""),
            "description": job.get("description", ""),
            "skills": job.get("skills", []),
            "apply_url": job.get("apply_url", "")
        })

    return jobs