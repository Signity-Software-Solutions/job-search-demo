# Job Search API
This is a FastAPI-based application that provides an API for job search functionality. It uses MongoDB as the database to store user and job data.


## Prerequisites
Before running the application, make sure you have the following installed:
- Python 3.7 or later
- MongoDB
- users an jobs Collections should be present or you can change from database.py 

## Installation
1. Clone the repository:
```bash

git clone  https://github.com/Signity-Software-Solutions/job-search-demo.git
cd JOB_SEARCH_DEMO


## Create a virtual environment and activate it:
python -m venv env
source env/bin/activate

## RUN 
1. cd backend
2. pip install -r requirements.txt


## CREATE .env FILE EXAMPLE:
   SECRET_KEY="YOUR_SECRET KEY"
   MONGODB_URL="YOUR_MONGO_DB_URL"

4. uvicorn main:app --reload
The API will be available at http://localhost:8000/docs.



