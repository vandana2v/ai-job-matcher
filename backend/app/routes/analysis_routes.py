from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from bson import ObjectId

from ..auth import get_current_user
from ..db import jobs_collection, analysis_collection
from ..utils.resume_parser import extract_text_from_pdf
from ..utils.skill_extractor import extract_skills
from ..utils.matcher import compute_similarity
from ..utils.llm_service import get_resume_suggestions

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.post("/resume")
def analyze_resume(file: UploadFile = File(...), user=Depends(get_current_user)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload PDF resume")

    resume_text = extract_text_from_pdf(file)
    resume_skills = extract_skills(resume_text)

    jobs = list(jobs_collection.find().limit(30))
    if not jobs:
        raise HTTPException(status_code=404, detail="No jobs available")

    job_texts = [job.get("description", "") for job in jobs]
    scores = compute_similarity(resume_text, job_texts)

    results = []

    for job, score in zip(jobs, scores):
        job_skills = job.get("skills", [])
        missing_skills = [
            skill for skill in job_skills
            if skill.lower() not in [s.lower() for s in resume_skills]
        ]

        suggestions = get_resume_suggestions(
            resume_text,
            job.get("description", ""),
            missing_skills,
            score
        )

        results.append({
            "job_id": str(job["_id"]),
            "title": job.get("title", ""),
            "company": job.get("company", ""),
            "location": job.get("location", ""),
            "match_score": score,
            "missing_skills": missing_skills,
            "suggestions": suggestions,
            "apply_url": job.get("apply_url", "")
        })

    top_matches = sorted(results, key=lambda x: x["match_score"], reverse=True)[:5]

    analysis_collection.insert_one({
        "user_email": user["sub"],
        "resume_filename": file.filename,
        "resume_skills": resume_skills,
        "top_matches": top_matches
    })

    return {
        "resume_skills": resume_skills,
        "top_matches": top_matches
    }


@router.post("/job-match/{job_id}")
def analyze_resume_for_job(
    job_id: str,
    file: UploadFile = File(...),
    user=Depends(get_current_user)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload PDF resume")

    job = jobs_collection.find_one({"_id": ObjectId(job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    resume_text = extract_text_from_pdf(file)
    resume_skills = extract_skills(resume_text)

    score = compute_similarity(resume_text, [job.get("description", "")])[0]

    job_skills = job.get("skills", [])
    missing_skills = [
        skill for skill in job_skills
        if skill.lower() not in [s.lower() for s in resume_skills]
    ]

    suggestions = get_resume_suggestions(
        resume_text,
        job.get("description", ""),
        missing_skills,
        score
    )

    return {
        "job_id": str(job["_id"]),
        "title": job.get("title", ""),
        "company": job.get("company", ""),
        "location": job.get("location", ""),
        "resume_skills": resume_skills,
        "match_score": score,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
        "apply_url": job.get("apply_url", "")
    }