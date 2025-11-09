# Clue

A modern full-stack application built with Next.js 16, React 19, MongoDB, and TypeScript, ready for deployment on Vercel.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19
- **Database:** MongoDB with Mongoose ODM
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

## Features

- Server-side rendering with Next.js App Router
- RESTful API routes with MongoDB integration
- TypeScript for type safety
- Mongoose ODM for MongoDB data modeling
- Responsive design with Tailwind CSS
- Ready for production deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your MongoDB connection string to `MONGODB_URI`

For local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/clue
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clue?retryWrites=true&w=majority
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

The application includes a complete CRUD API for users:

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/[id]` - Get a specific user
- `PUT /api/users/[id]` - Update a user
- `DELETE /api/users/[id]` - Delete a user

### Example API Usage

Create a user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Get all users:
```bash
curl http://localhost:3000/api/users
```

## Project Structure

```
clue/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.ts          # GET, POST users
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE user by ID
│   ├── page.tsx                  # Home page
│   └── layout.tsx                # Root layout
├── lib/
│   └── mongodb.ts                # Database connection
├── models/
│   └── User.ts                   # User model
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Environment variables template
└── vercel.json                   # Vercel configuration
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add your environment variables in the Vercel dashboard:
   - `MONGODB_URI` - Your MongoDB connection string
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables:
```bash
vercel env add MONGODB_URI
```

5. Deploy to production:
```bash
vercel --prod
```

## Environment Variables

Required environment variables:

- `MONGODB_URI` - MongoDB connection string

## Database Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/clue`

### MongoDB Atlas (Recommended for Production)

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or 0.0.0.0/0 for Vercel)
5. Get your connection string and add it to `.env.local`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Vercel Documentation](https://vercel.com/docs)

## License

MIT
