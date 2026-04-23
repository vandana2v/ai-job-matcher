from fastapi import APIRouter, HTTPException
from ..schemas import RegisterRequest, LoginRequest, TokenResponse
from ..db import users_collection
from ..auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse)
def register(payload: RegisterRequest):
    existing_user = users_collection.find_one({"email": payload.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_doc = {
        "name": payload.name,
        "email": payload.email,
        "password": hash_password(payload.password),
    }

    users_collection.insert_one(user_doc)

    token = create_access_token({
        "sub": payload.email,
        "name": payload.name
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    user = users_collection.find_one({"email": payload.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "sub": user["email"],
        "name": user["name"]
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }