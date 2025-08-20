# Smart Notes - AI-Powered Note-Taking App

A modern, intelligent note-taking application built with Next.js, Convex, and AI integration. Smart Notes allows users to create, organize, and search through their notes using natural language queries powered by OpenAI's GPT-4.

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend & Database

- **Convex** - Backend-as-a-Service with real-time database
- **Convex Auth** - Authentication system
- **Vector Search** - Semantic search using embeddings

### AI & Integrations

- **Vercel AI SDK** - AI integration framework
- **OpenAI GPT-4** - Large language model
- **Embeddings API** - Text vectorization for semantic search

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 🏗️ Architecture Overview

### Application Flow

1. **Authentication Flow**

   - Users sign in through Convex Auth
   - JWT tokens are managed automatically
   - Protected routes ensure user data isolation

2. **Note Management**

   - Users create notes with title and body
   - Notes are automatically processed for embeddings
   - Vector search enables semantic content discovery

3. **AI Chat Integration**

   - Chat interface connects to OpenAI via Convex HTTP endpoints
   - AI assistant can search through user's notes using semantic similarity
   - Tool-based approach for retrieving relevant note content

4. **Real-time Updates**
   - Convex provides live queries and mutations
   - UI automatically updates when data changes
   - Optimistic updates for better user experience

### Convex Backend Structure

```
convex/
├── schema.ts          # Database schema with tables and indexes
├── notes.ts           # Note CRUD operations and queries
├── notesActions.ts    # AI-powered note actions and vector search
├── http.ts            # HTTP endpoints for AI chat integration
├── auth.ts            # Authentication configuration
└── _generated/        # Auto-generated TypeScript types
```

**Key Tables:**

- `users` - User authentication data
- `notes` - User notes with title, body, and user ID
- `noteEmbeddings` - Vector embeddings for semantic search

**Vector Search:**

- 1536-dimensional embeddings using OpenAI's text-embedding-ada-002
- Filtered by user ID for data isolation
- Similarity threshold of 0.3 for relevant results

### Frontend Structure

```
app/
├── (auth)/            # Authentication routes
├── (main)/            # Main application routes
│   ├── notes/         # Notes management
│   └── navbar.tsx     # Navigation component
├── components/         # Reusable UI components
├── convex-client-provider.tsx  # Convex client setup
└── globals.css        # Global styles and CSS variables
```

## 🎯 Features

### Core Functionality

- **User Authentication** - Secure sign-in/sign-out
- **Note Creation** - Rich text notes with automatic saving
- **Note Organization** - Grid layout with responsive design
- **Real-time Updates** - Live data synchronization
- **Responsive Design** - Mobile-first approach

### AI-Powered Features

- **Semantic Search** - Find notes using natural language
- **AI Chat Assistant** - Ask questions about your notes
- **Intelligent Retrieval** - Context-aware note suggestions
- **Markdown Support** - Rich text formatting in AI responses

### User Experience

- **Dark/Light Theme** - System preference detection
- **Loading States** - Skeleton loaders and progress indicators
- **Error Handling** - Graceful error messages and recovery
- **Accessibility** - WCAG compliant components

## 🚀 Deployment on Vercel

### Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Convex Project** - Set up at [convex.dev](https://convex.dev)
3. **OpenAI API Key** - Get from [platform.openai.com](https://platform.openai.com)

### Step 1: Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
OPENAI_API_KEY=your_openai_api_key
```

### Step 2: Deploy to Vercel

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login
   ```

2. **Deploy Application**

   ```bash
   # Deploy from project directory
   vercel --prod
   ```

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Environment Configuration

In Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add the same environment variables from `.env.local`
3. Redeploy to apply changes

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## 🔧 Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Start Convex dev server (in separate terminal)
npx convex dev
```

### Convex Development

```bash
# Install Convex CLI
npm install -g convex

# Login to Convex
npx convex login

# Start development server
npx convex dev

# Deploy to production
npx convex deploy --prod
```

## 📱 API Endpoints

### Convex Functions

- `notes.getUserNotes` - Retrieve user's notes
- `notesActions.createNote` - Create new note with embeddings
- `notesActions.findRelevantNotes` - Semantic search through notes
- `notes.deleteNote` - Delete note and associated embeddings

### HTTP Routes

- `POST /api/chat` - AI chat endpoint with tool integration
- `OPTIONS /api/chat` - CORS preflight handling

## 🔒 Security Features

- **User Isolation** - Notes are filtered by user ID
- **Authentication Required** - All operations require valid JWT
- **CORS Protection** - Proper cross-origin request handling
- **Input Validation** - Zod schema validation for all inputs

## 🎨 Styling & Theming

- **CSS Variables** - Consistent design tokens
- **Tailwind CSS** - Utility-first styling approach
- **Dark Mode** - Automatic theme switching
- **Responsive Design** - Mobile-first responsive layout

## 🚀 Performance Optimizations

- **Vector Search** - Efficient semantic similarity search
- **Real-time Updates** - Live data without polling
- **Optimistic Updates** - Immediate UI feedback
- **Code Splitting** - Next.js automatic code optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:

- Check the [Convex documentation](https://docs.convex.dev)
- Review [Next.js documentation](https://nextjs.org/docs)
- Open an issue in this repository

---

Built with ❤️ using Next.js, AI-sdk, Convex, and OpenAI
