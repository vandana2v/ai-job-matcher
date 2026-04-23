from pymongo import MongoClient
from .config import settings

client = MongoClient(settings.MONGO_URL)
db = client[settings.DB_NAME]

users_collection = db["users"]
jobs_collection = db["jobs"]
analysis_collection = db["analysis"]