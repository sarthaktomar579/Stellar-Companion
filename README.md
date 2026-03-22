# Stellar Companion

A **niche-topic chatbot** for amateur astronomy and night-sky observing—built as a small “observatory deck” experience instead of a generic chat UI. This project was created for the Thinkly Labs frontend take-home: emphasis on presentation, loading/error/empty states, and responsive layout.

## Why this topic

Stargazing is inherently visual and atmospheric, which gave room to design a **purpose-built** interface (night-sky palette, observatory framing, starfield backdrop) while keeping the assistant focused on constellations, Moon phases, planets, and practical gear advice. The topic is narrow enough that off-topic questions can be gently redirected—matching how a real guide would behave.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/) (`streamText`, `useChat`)
  - **OpenAI:** `OPENAI_API_KEY` starting with `sk-` → `gpt-4o-mini`
  - **Google Gemini:** `GOOGLE_GENERATIVE_AI_API_KEY` (or an `AIza…` key in `OPENAI_API_KEY`) → `gemini-flash-latest`
- **Demo mode:** if no usable key is set, the API streams keyword-based astronomy answers so the UI stays testable

## Local development

```bash
npm install
cp .env.example .env.local
# Add OPENAI_API_KEY (sk-…) and/or GOOGLE_GENERATIVE_AI_API_KEY (AIza… from Google AI Studio)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/), import the repository.
3. Add **Environment variables** `OPENAI_API_KEY` and/or `GOOGLE_GENERATIVE_AI_API_KEY` (same as local).
4. Deploy. The build command is `npm run build` by default.

## GitHub

Initialize is already done by `create-next-app`. To push to a new repository:

```bash
git remote add origin https://github.com/<your-username>/stellar-companion.git
git branch -M main
git push -u origin main
```

Replace the URL with your repo.

## License

Private / assessment use—adjust as needed.
