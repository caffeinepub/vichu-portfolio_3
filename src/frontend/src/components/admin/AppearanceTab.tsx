import { Button } from "@/components/ui/button";
import { Check, Palette, Type } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const THEMES = [
  {
    id: "default",
    name: "Default",
    swatches: [
      "oklch(0.44 0.065 237)",
      "oklch(0.97 0.008 242)",
      "oklch(0.13 0.012 262)",
    ],
  },
  {
    id: "midnight",
    name: "Midnight",
    swatches: [
      "oklch(0.55 0.12 225)",
      "oklch(0.12 0.02 255)",
      "oklch(0.93 0.01 250)",
    ],
  },
  {
    id: "rose",
    name: "Rose",
    swatches: [
      "oklch(0.55 0.2 10)",
      "oklch(0.97 0.008 10)",
      "oklch(0.15 0.02 20)",
    ],
  },
  {
    id: "forest",
    name: "Forest",
    swatches: [
      "oklch(0.4 0.1 145)",
      "oklch(0.97 0.008 145)",
      "oklch(0.15 0.03 145)",
    ],
  },
  {
    id: "sunset",
    name: "Sunset",
    swatches: [
      "oklch(0.6 0.18 40)",
      "oklch(0.97 0.01 50)",
      "oklch(0.15 0.03 40)",
    ],
  },
  {
    id: "ocean",
    name: "Ocean",
    swatches: [
      "oklch(0.48 0.12 196)",
      "oklch(0.97 0.01 196)",
      "oklch(0.13 0.02 196)",
    ],
  },
  {
    id: "lavender",
    name: "Lavender",
    swatches: [
      "oklch(0.5 0.12 290)",
      "oklch(0.97 0.008 290)",
      "oklch(0.15 0.03 290)",
    ],
  },
  {
    id: "crimson",
    name: "Crimson",
    swatches: [
      "oklch(0.5 0.22 25)",
      "oklch(0.97 0.008 25)",
      "oklch(0.13 0.03 25)",
    ],
  },
  {
    id: "amber",
    name: "Amber",
    swatches: [
      "oklch(0.65 0.2 80)",
      "oklch(0.97 0.01 80)",
      "oklch(0.15 0.04 80)",
    ],
  },
  {
    id: "monochrome",
    name: "Mono",
    swatches: ["oklch(0.3 0 0)", "oklch(0.97 0 0)", "oklch(0.13 0 0)"],
  },
  {
    id: "coral",
    name: "Coral",
    swatches: [
      "oklch(0.6 0.16 22)",
      "oklch(0.97 0.01 22)",
      "oklch(0.15 0.03 22)",
    ],
  },
  {
    id: "emerald",
    name: "Emerald",
    swatches: [
      "oklch(0.5 0.14 165)",
      "oklch(0.97 0.01 165)",
      "oklch(0.13 0.03 165)",
    ],
  },
];

const FONTS = [
  {
    name: "Plus Jakarta Sans",
    stack: '"Plus Jakarta Sans", system-ui, sans-serif',
    googleFamily: "Plus+Jakarta+Sans:wght@400;600;700",
  },
  {
    name: "Inter",
    stack: '"Inter", system-ui, sans-serif',
    googleFamily: "Inter:wght@400;600;700",
  },
  {
    name: "Poppins",
    stack: '"Poppins", system-ui, sans-serif',
    googleFamily: "Poppins:wght@400;600;700",
  },
  {
    name: "Raleway",
    stack: '"Raleway", system-ui, sans-serif',
    googleFamily: "Raleway:wght@400;600;700",
  },
  {
    name: "Nunito",
    stack: '"Nunito", system-ui, sans-serif',
    googleFamily: "Nunito:wght@400;600;700",
  },
  {
    name: "Lato",
    stack: '"Lato", system-ui, sans-serif',
    googleFamily: "Lato:wght@400;700",
  },
  {
    name: "Roboto",
    stack: '"Roboto", system-ui, sans-serif',
    googleFamily: "Roboto:wght@400;500;700",
  },
  {
    name: "Merriweather",
    stack: '"Merriweather", Georgia, serif',
    googleFamily: "Merriweather:wght@400;700",
  },
  {
    name: "Playfair Display",
    stack: '"Playfair Display", Georgia, serif',
    googleFamily: "Playfair+Display:wght@400;600;700",
  },
  {
    name: "Space Grotesk",
    stack: '"Space Grotesk", system-ui, sans-serif',
    googleFamily: "Space+Grotesk:wght@400;500;700",
  },
  {
    name: "DM Sans",
    stack: '"DM Sans", system-ui, sans-serif',
    googleFamily: "DM+Sans:wght@400;500;700",
  },
  {
    name: "Outfit",
    stack: '"Outfit", system-ui, sans-serif',
    googleFamily: "Outfit:wght@400;500;700",
  },
];

function loadGoogleFont(googleFamily: string) {
  const id = `gf-${googleFamily.replace(/[+:]/g, "-")}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${googleFamily}&display=swap`;
    document.head.appendChild(link);
  }
}

export default function AppearanceTab() {
  const [activeTheme, setActiveTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "default",
  );
  const [activeFont, setActiveFont] = useState(
    () => localStorage.getItem("portfolio-font-name") || "Plus Jakarta Sans",
  );

  function applyTheme(id: string) {
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem("portfolio-theme", id);
    setActiveTheme(id);
    toast.success(`Theme changed to ${THEMES.find((t) => t.id === id)?.name}`);
  }

  function applyFont(font: (typeof FONTS)[0]) {
    loadGoogleFont(font.googleFamily);
    document.documentElement.style.setProperty("--font-body", font.stack);
    localStorage.setItem("portfolio-font", font.stack);
    localStorage.setItem("portfolio-font-name", font.name);
    setActiveFont(font.name);
    toast.success(`Font changed to ${font.name}`);
  }

  return (
    <div className="space-y-7">
      {/* Theme Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Color Theme</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map((theme, i) => (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => applyTheme(theme.id)}
              data-ocid="appearance.theme.button"
              className={`relative rounded-lg border-2 p-2 text-left transition-all hover:scale-105 cursor-pointer ${
                activeTheme === theme.id
                  ? "border-primary shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex gap-1 mb-1.5">
                {theme.swatches.map((color) => (
                  <div
                    key={color}
                    className="h-4 flex-1 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-foreground/80">
                {theme.name}
              </span>
              {activeTheme === theme.id && (
                <div className="absolute top-1 right-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Font Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Typography</h3>
        </div>
        <div className="space-y-1.5">
          {FONTS.map((font, i) => (
            <motion.button
              key={font.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => applyFont(font)}
              data-ocid="appearance.font.button"
              className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-all hover:border-primary/60 cursor-pointer ${
                activeFont === font.name
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <span
                style={{ fontFamily: font.stack, fontSize: "15px" }}
                className="text-foreground"
              >
                {font.name}
              </span>
              {activeFont === font.name && (
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={() => {
          applyTheme("default");
          applyFont(FONTS[0]);
        }}
        data-ocid="appearance.reset.button"
      >
        Reset to Defaults
      </Button>
    </div>
  );
}
