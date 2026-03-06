# AI Chat

A clean, minimal AI chat interface powered by OpenAI's API. Built with React, TypeScript, and Tailwind CSS.

## Features

- 💬 **Real-time chat** with OpenAI models (defaults to `gpt-4o`)
- 🎨 **Customizable background** — set any image URL with adjustable opacity and blur
- ✨ **Smooth animations** via Framer Motion
- 📝 **Markdown rendering** for AI responses (code blocks, lists, bold, etc.)
- ⌨️ **Auto-expanding textarea** — `Enter` to send, `Shift+Enter` for new lines
- 🌙 **Dark-first design** with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Setup

```sh
# 1. Clone the repo
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Then edit .env and add your OpenAI API key

# 4. Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-4o   # optional, defaults to gpt-4o
```

> ⚠️ **Note:** The API key is used directly in the browser (`dangerouslyAllowBrowser: true`). This is fine for local development or personal use, but for production deployments consider proxying requests through a backend.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests with Vitest |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Build tool | [Vite](https://vitejs.dev) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Animations | [Framer Motion](https://www.framer.com/motion) |
| AI | [OpenAI Node SDK](https://github.com/openai/openai-node) |
| Routing | [React Router v6](https://reactrouter.com) |
| Data fetching | [TanStack Query](https://tanstack.com/query) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |

## Project Structure

```
src/
├── components/
│   ├── BackgroundSettings.tsx  # Background image/opacity/blur controls
│   ├── ChatInput.tsx           # Auto-expanding message input
│   ├── ChatMessage.tsx         # Message bubble + typing indicator
│   └── ui/                     # shadcn/ui primitives
├── hooks/                      # Custom React hooks
├── lib/                        # Shared utilities
├── pages/
│   ├── Index.tsx               # Main chat page
│   └── NotFound.tsx            # 404 page
└── main.tsx
```

## License

MIT
