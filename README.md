# 🚀 AI Job Matcher

AI Job Matcher is a full-stack AI-powered web application that helps users analyze resumes and find relevant jobs using NLP, semantic similarity, and LLM-assisted suggestions.
--
## 🔥 Features

- 🔐 User Authentication (JWT-based Login/Register)
- 📄 Resume Upload & PDF Parsing
- 🤖 AI-based Resume Skill Extraction
- 🔍 Job Matching using Semantic Similarity
- 💡 Resume Improvement Suggestions using LLM
- 🌐 Real-time Job Fetching from External APIs
- 📊 Dashboard with match score and insights
---
## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios

### Backend
- FastAPI (Python)
- JWT Authentication

### Database
- MongoDB Atlas

### AI / ML
- Sentence Transformers (Embeddings)
- Cosine Similarity Matching
- Groq API (LLM-based suggestions)

## 🔗 APIs Used

- Adzuna API → Fetch real-time job listings  
- Groq API → Generate intelligent resume suggestions  
---
## ⚙️ How It Works

1. User registers and logs in securely  
2. User uploads resume (PDF)  
3. Resume text is extracted and processed  
4. Skills and keywords are identified  
5. Embeddings are generated using Sentence Transformers  
6. Jobs are fetched using Adzuna API  
7. Cosine similarity is used to find best matches  
8. LLM generates resume improvement suggestions
