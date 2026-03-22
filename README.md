# Stellar Companion

A **niche-topic chatbot** for amateur astronomy and night-sky observing—built as a small “observatory deck” experience instead of a generic chat UI. This project was created for the Thinkly Labs frontend take-home: emphasis on presentation, loading/error/empty states, and responsive layout.

## Why this topic

Stargazing is inherently visual and atmospheric, which gave room to design a **purpose-built** interface (night-sky palette, observatory framing, starfield backdrop) while keeping the assistant focused on constellations, Moon phases, planets, and practical gear advice. The topic is narrow enough that off-topic questions can be gently redirected—matching how a real guide would behave.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/) (`streamText`, `useChat`) with OpenAI `gpt-4o-mini` when `OPENAI_API_KEY` is set
- **Demo mode:** if the key is missing (e.g. local dev), the API returns streamed keyword-based astronomy answers so the UI stays fully testable

## Local development

```bash
npm install
cp .env.example .env.local
# Add OPENAI_API_KEY to .env.local for live model responses (optional)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/), import the repository.
3. Add **Environment variable** `OPENAI_API_KEY` (Production / Preview as needed).
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
