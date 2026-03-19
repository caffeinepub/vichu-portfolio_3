import { Heart } from "lucide-react";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-8 px-6"
      style={{ backgroundColor: "var(--nav-bg)", color: "var(--nav-fg)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-80">
          &copy; {year} Vichu. All rights reserved.
        </p>
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1.5"
        >
          Built with <Heart className="w-3.5 h-3.5 fill-current" /> using
          caffeine.ai
        </a>
      </div>
    </footer>
  );
}
