export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="stars-sm absolute inset-0 opacity-70" />
      <div className="stars-md absolute inset-0 opacity-50" />
      <div className="stars-lg absolute inset-0 opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,179,237,0.12),transparent_55%)]" />
    </div>
  );
}
