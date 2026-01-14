import { Globe } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 text-white">
        <h1 className="text-xl font-semibold">Association</h1>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="/">Accueil</a>
          <a href="/events">Événements</a>
          <a href="/blog">Blog</a>
          <a href="/forum">Forum</a>
          <a href="/donations">Dons</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm">
            <Globe size={16} /> Français
          </button>
          <button className="text-sm">Sign in</button>
          <button className="rounded-xl bg-sky-500 px-5 py-2 text-sm font-semibold hover:bg-sky-600">
            Buy airtime
          </button>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex h-full items-center px-8">
        <div className="max-w-2xl text-white">
          <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Buy data, airtime for all <br />
            networks without charges
          </h2>

          <p className="mb-8 text-sm text-gray-200 md:text-base">
            You can buy data, airtime for all networks (CAMTEL, neXttel, MTN,
            Orange, Yoomee) with your preferred payment method (Mobile Money,
            Orange Money) with <strong>no extra charge</strong>.
          </p>

          <div className="flex items-center gap-6">
            <button className="rounded-xl bg-sky-500 px-6 py-3 font-semibold hover:bg-sky-600">
              Buy airtime
            </button>
            <button className="text-sm underline underline-offset-4">
              Bundles
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white text-sm opacity-80">
        Scroll
      </div>
    </section>
  );
}
