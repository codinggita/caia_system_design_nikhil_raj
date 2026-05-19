# AntiGravity Backend Setup Guide

This is the Node.js/Express backend for the AntiGravity system design knowledge platform.

## 📁 Folder Structure

```text
antigravity-backend/
├── config/         → DB connection config (db.js)
├── controllers/    → Request/response handlers (auth, concepts)
├── middlewares/    → Express middlewares (auth, logging, error handling, rate limiting)
├── models/         → Mongoose DB schemas (Concept, User, Note)
├── routes/         → API route definitions (auth, concepts)
├── utils/          → Helper functions (response formatters, DB seeder)
├── .env            → Environment variables
├── package.json    → Dependencies & scripts
└── server.js       → Main application entry point
```

## ⚙️ Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally on port `27017`

## 🚀 Setup Steps

### 1. Install Dependencies
If you haven't already, navigate into the backend folder and install the required npm packages:
```bash
cd antigravity-backend
npm install
```

### 2. Configure Environment Variables
Ensure your `.env` file in the root of the `antigravity-backend` folder has the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/antigravity
JWT_SECRET=supersecretjwtkey_for_antigravity
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 3. Seed the Database
We have a local JSON dataset (`dataset.json`) located in the parent directory. To populate your local MongoDB with this initial data, run the seeder script:
```bash
cd utils
node seeder.js
cd ..
```
*Note: The seeder script connects to MongoDB, reads the dataset, clears any old concepts, and inserts the fresh data.*

### 4. Start the Server
To start the backend in development mode (with hot-reloading via Nodemon), run:
```bash
npx nodemon server.js
```

The server will start running on `http://localhost:5000`.

## 📡 Available API Endpoints (So Far)

**Authentication (`/api/v1/auth`)**
- `POST /register` - Register a new user
- `POST /login` - Login to receive a JWT token

**Concepts (`/api/v1/`)**
- `GET /concepts` - Get paginated concepts. Supports query parameters: `?search=`, `?category=`, `?difficulty=`
- `GET /analytics` - Get platform analytics (Protected, Admin Only)
