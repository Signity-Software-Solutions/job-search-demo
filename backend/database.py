# database.py

from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_DETAILS = os.getenv("MONGODB_URL")
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.users
user_collection = database.get_collection("users")
job_collection=database.get_collection("jobs")