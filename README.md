# Stellar Companion

A small chat app for people who like looking up at night. It is meant to feel like stepping onto an observatory deck—dark sky, a bit of atmosphere—rather than another blank chat window. You can ask about constellations, the Moon, planets, binoculars or telescopes, and light pollution; the assistant stays in that lane.

## Why build this around the sky

Night sky stuff has a strong visual identity, so the UI could go beyond a default template: colors, framing, empty and loading states that match the theme. The answers are scoped on purpose so the bot feels like a guide, not a general-purpose assistant.

## What it runs on

Next.js, TypeScript, Tailwind. Chat streaming goes through the Vercel AI SDK. You can plug in OpenAI (`OPENAI_API_KEY` with an `sk-` key) or Gemini via `GOOGLE_GENERATIVE_AI_API_KEY` from Google AI Studio. If neither is set, there is a simple offline-style fallback so you can still click around and test the interface.

## Run it locally

```bash
npm install
cp .env.example .env.local
```

Put your keys in `.env.local`, then:

```bash
npm run dev
```

Open `http://localhost:3000`. For a live deploy, hook the repo to Vercel and add the same env vars there.
