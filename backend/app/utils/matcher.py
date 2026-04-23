from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")


def compute_similarity(resume_text: str, job_texts: list[str]) -> list[float]:
    texts = [resume_text] + job_texts
    embeddings = model.encode(texts)

    resume_embedding = embeddings[0].reshape(1, -1)
    job_embeddings = embeddings[1:]

    scores = cosine_similarity(resume_embedding, job_embeddings)[0]
    return [float(round(score * 100, 2)) for score in scores]