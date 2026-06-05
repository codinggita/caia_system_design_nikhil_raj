# System Design & Architecture Knowledge Base - Backend

This is the Node.js + Express.js + MongoDB backend for the "System Design & Architecture Knowledge Base" platform. It serves as a comprehensive API to manage, search, filter, and interact with system design concepts.

Link - https://caia-system-design-nikhil-raj.onrender.com/

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Security:** Helmet, express-rate-limit, cors
- **Logging:** Morgan

## Folder Structure
```text
backend/
├── .env.example
├── .env.development
├── package.json
├── server.js                  ← Entry point, starts the server
└── src/
    ├── app.js                 ← Express setup, middlewares, mounts routes
    ├── config/
    │   └── db.js              ← MongoDB connection configuration
    ├── models/                ← Mongoose schemas (Concept, User, Bookmark, Note, Vote)
    ├── controllers/           ← Request/response handlers
    ├── services/              ← Business logic and DB queries
    ├── routes/                ← Express API routes definitions
    ├── middlewares/           ← Auth, role, error handler, rate limiter
    ├── utils/                 ← Helpers (paginate, buildFilter, asyncWrapper, apiResponse)
    └── scripts/
        └── seed.js            ← Database seed script for JSON dataset
```

## Environment Setup
1. Copy the `.env.example` file and rename it to `.env` or `.env.development`.
2. Update the environment variables as needed:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/system_design_kb
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_REFRESH_EXPIRE=7d
```

## How to Run Locally
1. Ensure you have Node.js and MongoDB installed and running.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   - **Development mode** (with nodemon):
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

## How to Seed Database
You can seed the database with the provided `dataset.json` file. Ensure the `dataset.json` file is located one directory above the `backend` folder (or adjust the path in `src/scripts/seed.js`).

To import data:
```bash
node src/scripts/seed.js
```

To destroy existing data:
```bash
node src/scripts/seed.js -d
```

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Concept CRUD
- `GET    /api/v1/concepts` - All concepts (supports `?page=1&limit=10&sort=-createdAt`)
- `GET    /api/v1/concepts/:id` - Single concept
- `POST   /api/v1/concepts` - Create concept (Admin)
- `PUT    /api/v1/concepts/:id` - Replace concept (Admin)
- `PATCH  /api/v1/concepts/:id` - Partial update (Admin)
- `DELETE /api/v1/concepts/:id` - Soft delete concept (Admin)
- `GET    /api/v1/concepts/random` - Random concept
- `GET    /api/v1/concepts/latest` - Newest 10 concepts
- `GET    /api/v1/concepts/trending` - Sorted by views descending
- `GET    /api/v1/concepts/popular` - Sorted by bookmarks descending
- `GET    /api/v1/concepts/:id/summary` - Title, category, tags only
- `GET    /api/v1/concepts/:id/related` - Concepts in the same category
- `PATCH  /api/v1/concepts/:id/archive` - Set isArchived: true (Admin)
- `PATCH  /api/v1/concepts/:id/restore` - Set isArchived: false (Admin)

### Category & Taxonomy
- `GET    /api/v1/categories`
- `GET    /api/v1/categories/:category`
- `GET    /api/v1/categories/:category/concepts`
- `GET    /api/v1/subcategories`
- `GET    /api/v1/tags`
- `GET    /api/v1/tags/:tag`
- `GET    /api/v1/patterns`
- `GET    /api/v1/patterns/:patternName`
- `GET    /api/v1/languages`
- `GET    /api/v1/languages/:language`
- `GET    /api/v1/difficulty`
- `GET    /api/v1/difficulty/:level`
- `GET    /api/v1/question-types`
- `GET    /api/v1/question-types/:type`
- `GET    /api/v1/architectures/microservices`

### Search (via Query Params)
- `GET    /api/v1/search?q=scaling` - Global keyword search
- `GET    /api/v1/search/title?q=redis`
- `GET    /api/v1/search/content?q=database`
- `GET    /api/v1/search/tags?q=caching`
- `GET    /api/v1/search/patterns?q=CQRS`
- `GET    /api/v1/search/language?q=python`
- `GET    /api/v1/search/category?q=distributed`
- `GET    /api/v1/search/difficulty?q=advanced`
- `GET    /api/v1/search/fuzzy?q=kafaka`
- `GET    /api/v1/search/autocomplete?q=event`
- `GET    /api/v1/search/exact?q=event+sourcing`
- `GET    /api/v1/search/regex?pattern=cache`

### Filtering
- `GET    /api/v1/filter/category?name=Microservices`
- `GET    /api/v1/filter/difficulty?level=beginner`
- `GET    /api/v1/filter/pattern?name=Saga`
- `GET    /api/v1/filter/language?name=Go`
- `GET    /api/v1/filter/date?after=2025-01-01`
- `GET    /api/v1/filter/tags?list=redis,kafka`
- `GET    /api/v1/filter/trending`
- `GET    /api/v1/filter/popular`
- `GET    /api/v1/filter/expert-only`
- `GET    /api/v1/filter/frontend`
- `GET    /api/v1/filter/backend`
- `GET    /api/v1/filter/devops`
- `GET    /api/v1/filter/cloud`

### Analytics (Aggregation Pipeline)
- `GET    /api/v1/analytics/total-concepts`
- `GET    /api/v1/analytics/category-distribution`
- `GET    /api/v1/analytics/difficulty-stats`
- `GET    /api/v1/analytics/patterns/top`
- `GET    /api/v1/analytics/languages/top`
- `GET    /api/v1/analytics/views/top`
- `GET    /api/v1/analytics/bookmarks/top`
- `GET    /api/v1/analytics/trending`

### Authentication (JWT)
- `POST   /api/v1/auth/register`
- `POST   /api/v1/auth/login`
- `POST   /api/v1/auth/logout`
- `POST   /api/v1/auth/refresh-token`
- `GET    /api/v1/auth/profile` (Protected)
- `PATCH  /api/v1/auth/profile` (Protected)
- `DELETE /api/v1/auth/profile` (Protected)

### Bookmarks, Notes & Votes
- `GET    /api/v1/bookmarks` (Protected - User's bookmarks)
- `POST   /api/v1/bookmarks/:conceptId` (Protected)
- `DELETE /api/v1/bookmarks/:conceptId` (Protected)
- `GET    /api/v1/notes/:conceptId` (Protected)
- `POST   /api/v1/notes/:conceptId` (Protected)
- `PATCH  /api/v1/notes/:noteId` (Protected)
- `DELETE /api/v1/notes/:noteId` (Protected)
- `POST   /api/v1/votes/:conceptId` (Protected)
- `GET    /api/v1/votes/top`

### Bulk Operations (Admin Only)
- `POST   /api/v1/concepts/bulk/create`
- `PATCH  /api/v1/concepts/bulk/update`
- `DELETE /api/v1/concepts/bulk/delete`

### Admin (Role: Admin required)
- `GET    /api/v1/admin/users`
- `GET    /api/v1/admin/users/:id`
- `PATCH  /api/v1/admin/users/:id/role`
- `PATCH  /api/v1/admin/users/:id/ban`
- `PATCH  /api/v1/admin/users/:id/unban`

### System & Health
- `GET    /api/v1/health`
- `GET    /api/v1/system/status`
- `GET    /api/v1/system/version`
- `GET    /api/v1/system/uptime`
