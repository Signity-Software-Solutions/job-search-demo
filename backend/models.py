# models.py
from pydantic import BaseModel, EmailStr
from typing import Optional
class User(BaseModel):
    email: EmailStr
    password: str

class UserInDB(User):
    hashed_password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Job(BaseModel):
    job_name: str
    company_name: str
    job_full_text: str
    post_url: str
    post_apply_url: str
    company_url: str
    company_industry: str
    minimum_compensation: float
    maximum_compensation: float
    compensation_type: str
    job_hours: str
    role_seniority: str
    minimum_education: str
    office_location: str
    city: str
    region: str
    country: str
    job_published_at: str
    last_indexed: str