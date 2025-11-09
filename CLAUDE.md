# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Clue is a modern full-stack application built with Next.js 16, React 19, MongoDB, and TypeScript. It demonstrates a complete CRUD API implementation with server-side rendering and is optimized for Vercel deployment.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Setup

Required environment variables in `.env.local`:
- `MONGODB_URI` - MongoDB connection string (local: `mongodb://localhost:27017/clue` or MongoDB Atlas connection string)

## Architecture

### Database Layer (lib/mongodb.ts)

The application uses a **cached connection pattern** to prevent connection exhaustion in serverless environments:
- Global caching prevents connections from growing exponentially during hot reloads in development
- Connection is reused across API route invocations
- Critical for Vercel's serverless function architecture where each API route can trigger new connections

### Data Models (models/)

Mongoose models use a **model recompilation prevention pattern**:
```typescript
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```
This prevents Next.js hot reload errors where models get redefined multiple times during development.

**User model** (models/User.ts):
- Fields: name (max 60 chars), email (unique, validated)
- Auto-generates createdAt/updatedAt via `timestamps: true`

### API Routes (app/api/)

All API routes follow Next.js 16 App Router conventions with **async params**:
```typescript
{ params }: { params: Promise<{ id: string }> }
const { id } = await params;
```

**Response format** (all endpoints):
```json
{
  "success": true|false,
  "data": {...} | [],
  "error": "message"  // only on failure
}
```

**Available endpoints**:
- `GET /api/users` - List all users
- `POST /api/users` - Create user (body: `{name, email}`)
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user by ID
- `DELETE /api/users/[id]` - Delete user by ID

### Frontend (app/)

- Uses Next.js App Router with React Server Components by default
- Styling: Tailwind CSS v4 with custom config via `@tailwindcss/postcss`
- Fonts: Geist Sans and Geist Mono via next/font/google
- Path alias: `@/*` maps to project root

## Key Patterns

1. **Database Connection**: Always use `await connectDB()` before any database operation
2. **Model Imports**: Import User model via `import User from '@/models/User'`
3. **Error Handling**: API routes return consistent error objects with success flags
4. **TypeScript**: Strict mode enabled; use proper typing for Mongoose documents via interfaces
5. **Next.js 16**: Params in dynamic routes are now async and must be awaited

## Deployment

Configured for Vercel via `vercel.json`:
- Framework auto-detected as Next.js
- Environment variable `MONGODB_URI` must be set in Vercel dashboard
- Build/dev/install commands pre-configured

When adding new environment variables, update both `.env.local` (local) and Vercel dashboard (production).
