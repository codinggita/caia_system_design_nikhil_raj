# System Design Knowledge Base - Frontend

A modern, responsive dashboard for exploring system design architecture concepts.

## Features
- **Responsive Dashboard**: Built with Material UI and Tailwind CSS.
- **Admin Panel**: User management and advanced analytics charts.
- **Real-time Updates**: State management with Redux Toolkit.
- **Markdown Support**: Concepts rendered beautifully using `react-markdown`.
- **Protected Routes**: Secure navigation based on auth state and roles.

## Tech Stack
- React & Vite
- Redux Toolkit
- Material UI & Tailwind CSS
- Recharts (Analytics)
- React Router v6

## Local Development Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file (use `.env.example` as a template)
4. Start the development server: `npm run dev`

## Environment Variables
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL (without trailing slash) | `/api/v1` | No |

## Production Deployment

### Option 1: Deploy to Vercel (Recommended)
1. Push your code to GitHub/GitLab
2. Sign up for Vercel (https://vercel.com/)
3. Import your repository
4. Configure:
   - **Project Name**: system-design-knowledge-base
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Environment Variables**: Add `VITE_API_URL=https://caia-system-design-nikhil-raj.onrender.com/api/v1`
5. Click "Deploy"!

### Option 2: Deploy to Netlify
1. Push to GitHub/GitLab
2. Sign up for Netlify (https://www.netlify.com/)
3. Add your repo
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variables in Netlify settings
6. Click "Deploy site"

### Option 3: Deploy to Render
1. Push to GitHub/GitLab
2. Sign up for Render (https://render.com/)
3. Create a new **Static Site**
4. Connect your repo
5. Configure:
   - **Root directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
   - **Environment Variables**: Add `VITE_API_URL`
6. Deploy!

## Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

