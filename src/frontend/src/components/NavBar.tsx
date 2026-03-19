import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

interface NavBarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function NavBar({ darkMode, onToggleDarkMode }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 shadow-sm"
      style={{ backgroundColor: "var(--nav-bg)", color: "var(--nav-fg)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2.5 bg-transparent border-0 cursor-pointer"
          data-ocid="nav.link"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{
              backgroundColor: "oklch(0.55 0.07 237 / 0.5)",
              color: "var(--nav-fg)",
            }}
          >
            V
          </div>
          <span
            className="font-semibold text-sm tracking-wide"
            style={{ color: "var(--nav-fg)" }}
          >
            MechE &amp; Builder
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10"
              style={{ color: "var(--nav-fg)" }}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="rounded-full hover:bg-white/10"
            style={{ color: "var(--nav-fg)" }}
            aria-label="Toggle dark mode"
            data-ocid="nav.toggle"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/10"
            style={{ color: "var(--nav-fg)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 overflow-hidden"
            style={{ backgroundColor: "var(--nav-bg)" }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                  style={{ color: "var(--nav-fg)" }}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
