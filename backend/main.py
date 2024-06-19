# main.py
from fastapi import FastAPI, Depends, HTTPException, status,Query
from fastapi.security import OAuth2PasswordRequestForm
from pymongo.errors import DuplicateKeyError
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import EmailStr
from datetime import timedelta
from models import User, UserInDB,Job,LoginRequest
from utils import hash_password, verify_password, create_access_token
from database import user_collection , job_collection
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import List, Optional
from fuzzywuzzy import fuzz
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    user_collection.create_index("email", unique=True)

@app.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: User):
    user_in_db = await user_collection.find_one({"email": user.email})
    if user_in_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = user.dict()
    user_dict["hashed_password"] = hash_password(user.password)
    user_dict.pop("password")
    try:
        await user_collection.insert_one(user_dict)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Email already registered")
    return {"msg": "User created successfully"}

@app.post("/login")
async def login(login_request: LoginRequest):
    user = await user_collection.find_one({"email": login_request.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    if not verify_password(login_request.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/search", response_model=List[Job])
async def search_jobs(job_name: str):
    # Fetch all jobs from the database
    cursor = job_collection.find({})
    jobs = await cursor.to_list(length=100)  # Adjust length as needed

    # Perform fuzzy matching on the job_name field
    matching_jobs = []
    for job in jobs:
        job_name_score = fuzz.ratio(job_name.lower(), job['job_name'].lower())
        
        if job_name_score > 30:  # Adjust threshold as needed
            matching_jobs.append({
                   "job_name": job.get("job_name", ""),
                "company_name": job.get("company_name", ""),
                "job_full_text": job.get("job_full_text", ""),
                "post_url": job.get("post_url", ""),
                "post_apply_url": job.get("post_apply_url", ""),
                "company_url": job.get("company_url", ""),
                "company_industry": job.get("company_industry", ""),
                "minimum_compensation": float(job.get("minimum_compensation", 0)),
                "maximum_compensation": float(job.get("maximum_compensation", 0)),
                "compensation_type": job.get("compensation_type", ""),
                "job_hours": job.get("job_hours", ""),
                "role_seniority": job.get("role_seniority", ""),
                "minimum_education": job.get("minimum_education", ""),
                "office_location": job.get("office_location", ""),
                "city": job.get("city", ""),
                "region": job.get("region", ""),
                "country": job.get("country", ""),
                "job_published_at": job.get("job_published_at", ""),
                "last_indexed": job.get("last_indexed", "")
            })
    return matching_jobs