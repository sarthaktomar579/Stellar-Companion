import { StellarChat } from "@/components/stellar-chat";
import { Starfield } from "@/components/starfield";

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-col text-zinc-100">
      <Starfield />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-6 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto w-full max-w-5xl flex-1">
          <section className="mb-8 text-center sm:mb-10">
            <p className="font-display text-xs font-medium uppercase tracking-[0.35em] text-sky-300/90">
              Thinkly Labs · take-home
            </p>
            <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Stellar Companion
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
              Your small observatory on the web—ask about the night sky like you
              are stepping onto the observation deck, not another bland chat box.
            </p>
          </section>

          <div className="mx-auto flex h-[min(70dvh,640px)] max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0c1222]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <StellarChat />
          </div>

          <p className="mt-8 text-center text-xs text-zinc-500">
            Deploy on Vercel with{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-400">
              OPENAI_API_KEY
            </code>{" "}
            for full model replies; without it, demo mode still answers common
            astronomy questions.
          </p>
        </div>
      </div>
    </div>
  );
}
