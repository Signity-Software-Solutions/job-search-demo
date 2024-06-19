## Getting Started with Project

## To set up your project correctly:
Verify Node.js and NPM Versions:
if not install first install node in system environment
Here the latest version of node and nvm for our project 

## Node version
v20.14.0

## NPM version
10.7.0

## Installation
Clone the repository and install dependencies:

git clone [<repository-url>](https://github.com/Signity-Software-Solutions/job-search-demo.git)
cd <project-folder> JOB_SEARCH_DEMO

## install dependencies using this
npm install
# or
yarn install
# or
pnpm install
# depending on your package manager


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Descripion
## This application consists of three main pages accessible via local development URLs:

1. Login Page (http://localhost:3000): Users initially land on the login page. If they already have an account, they can enter their email and password to log in. If not, they can navigate to the signup page to create a new account.

2. Signup Page (http://localhost:3000/signUp): This page allows users to create a new account by providing their email and choosing a   password.

3. Dashboard (http://localhost:3000/dashboard): After successfully logging in or signing up, users are directed to the dashboard. Here, they can use a search bar to input job titles they are interested in. Upon submitting the search, the frontend sends a request to the backend.



