"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useMemo, useRef, useEffect } from "react";

const STARTERS = [
  "How do I find Orion tonight?",
  "Moon phases for beginners",
  "Binoculars vs a small telescope",
];

function textFromMessage(message: UIMessage): string {
  return message.parts
    .filter(
      (p): p is { type: "text"; text: string } =>
        p.type === "text" && typeof (p as { text?: string }).text === "string"
    )
    .map((p) => p.text)
    .join("");
}

export function StellarChat() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status, error, clearError, stop } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fd = new FormData(form);
      const text = (fd.get("message") as string)?.trim();
      if (!text || busy) return;
      form.reset();
      await sendMessage({ text });
    },
    [busy, sendMessage]
  );

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col">
      <header className="shrink-0 border-b border-white/10 px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-300/90">
              Session
            </p>
            <h2 className="font-display text-lg font-semibold tracking-tight text-white">
              Night sky
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                busy ? "animate-pulse bg-amber-400" : "bg-emerald-400"
              }`}
            />
            {busy ? "Observing" : "Ready"}
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 sm:px-6"
      >
        {messages.length === 0 && (
          <div className="mx-auto flex max-w-lg flex-col gap-6 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-md">
              <p className="font-display text-xl font-medium text-white sm:text-2xl">
                Ask the sky
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Constellations, Moon and planets, gear, and dark-sky tips—
                tuned for stargazers, not generic chat.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {STARTERS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    disabled={busy}
                    onClick={() => sendMessage({ text: t })}
                    className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-100 transition hover:border-sky-400/50 hover:bg-sky-500/20 disabled:opacity-40"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          const body = textFromMessage(m);
          if (!body && m.role === "assistant") return null;
          return (
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[min(100%,28rem)] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                  isUser
                    ? "bg-sky-600/90 text-white"
                    : "border border-white/10 bg-white/[0.06] text-zinc-100"
                }`}
              >
                {!isUser && (
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-sky-300/90">
                    Stellar Companion
                  </p>
                )}
                <p className="whitespace-pre-wrap">{body}</p>
              </div>
            </div>
          );
        })}

        {status === "submitted" && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="inline-flex gap-0.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400" />
                </span>
                Aligning coordinates…
              </div>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/40 bg-red-950/50 px-4 py-3 text-sm text-red-100"
          >
            <p className="font-medium">Something went wrong</p>
            <p className="mt-1 text-red-200/80">{error.message}</p>
            <button
              type="button"
              onClick={() => clearError()}
              className="mt-3 text-xs font-medium text-red-200 underline-offset-2 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      <footer className="shrink-0 border-t border-white/10 p-4 sm:p-6">
        <form onSubmit={onSubmit} className="mx-auto flex max-w-2xl gap-2">
          <label htmlFor="msg" className="sr-only">
            Message
          </label>
          <input
            id="msg"
            name="message"
            autoComplete="off"
            placeholder="Ask about constellations, Moon phases, planets…"
            disabled={busy}
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50"
          />
          {busy ? (
            <button
              type="button"
              onClick={() => void stop()}
              className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/15"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-40"
            >
              Send
            </button>
          )}
        </form>
      </footer>
    </div>
  );
}
