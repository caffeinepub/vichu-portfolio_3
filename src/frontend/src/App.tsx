import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AboutSection from "./components/AboutSection";
import AdminPanel from "./components/AdminPanel";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import CustomSections from "./components/CustomSections";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import { useActor } from "./hooks/useActor";
import { initBlobService } from "./services/blobService";

const DEFAULT_PROFILE = {
  name: "Vichu",
  title: "Mechanical Engineering Student | Product Builder",
  bio: "Focused on building meaningful and user-centric digital experiences",
  profileImageId: undefined as string | undefined,
};
const DEFAULT_CONTACT = {
  linkedin: "https://www.linkedin.com/in/dinesh-karthik-1353173b8",
  email: "dineshkarthik.dev26@gmail.com",
  instagram: "@blackberryhub.in",
  telegram: "@classicberrymoon",
};
const DEFAULT_PROJECTS = [
  {
    id: "default-1",
    title: "TwoVerse",
    description:
      "Private couple space for chat, memories, and relationship features",
    purpose: "Social",
    year: BigInt(2024),
    created: BigInt(Date.now()),
    updated: BigInt(Date.now()),
    link: undefined as string | undefined,
    imageId: undefined as string | undefined,
  },
  {
    id: "default-2",
    title: "Dreams of Book",
    description: "Memory journaling app with book-style experience",
    purpose: "Journaling",
    year: BigInt(2024),
    created: BigInt(Date.now()),
    updated: BigInt(Date.now()),
    link: undefined as string | undefined,
    imageId: undefined as string | undefined,
  },
  {
    id: "default-3",
    title: "ChatBox",
    description: "Minimal real-time messaging interface",
    purpose: "Communication",
    year: BigInt(2024),
    created: BigInt(Date.now()),
    updated: BigInt(Date.now()),
    link: undefined as string | undefined,
    imageId: undefined as string | undefined,
  },
];
const DEFAULT_SKILLS = [
  {
    id: "sk-1",
    name: "HTML",
    created: BigInt(Date.now()),
    updated: BigInt(Date.now()),
    imageId: undefined as string | undefined,
    level: undefined as string | undefined,
  },
  {
    id: "sk-2",
    name: "CSS",
    created: BigInt(Date.now()),
    updated: BigInt(Date.now()),
    imageId: undefined as string | undefined,
    level: undefined as string | undefined,
  },
  {
    id: "sk-3",
    name: "JavaScript",
    created: BigInt(Date.now()),
    updated: BigInt(Date.now()),
    imageId: undefined as string | undefined,
    level: undefined as string | undefined,
  },
  {
    id: "sk-4",
    name: "UI/UX Design",
    created: BigInt(Date.now()),
    updated: BigInt(Date.now()),
    imageId: undefined as string | undefined,
    level: undefined as string | undefined,
  },
];

function useSeedData() {
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();
  const seeded = useRef(false);
  useEffect(() => {
    if (!actor || isFetching || seeded.current) return;
    if (localStorage.getItem("portfolio_seeded")) {
      seeded.current = true;
      return;
    }
    const seed = async () => {
      try {
        const [profile, projects, skills, contact] = await Promise.all([
          actor.getProfile(),
          actor.getProjects(),
          actor.getSkills(),
          actor.getContact(),
        ]);
        const tasks: Promise<void>[] = [];
        if (!profile.name) tasks.push(actor.updateProfile(DEFAULT_PROFILE));
        if (projects.length === 0) {
          for (const p of DEFAULT_PROJECTS) tasks.push(actor.addProject(p));
        }
        if (skills.length === 0) {
          for (const s of DEFAULT_SKILLS) tasks.push(actor.addSkill(s));
        }
        if (!contact.email) tasks.push(actor.updateContact(DEFAULT_CONTACT));
        if (tasks.length > 0) {
          await Promise.all(tasks);
          qc.invalidateQueries();
        }
        localStorage.setItem("portfolio_seeded", "true");
        seeded.current = true;
      } catch (e) {
        console.error("Seeding failed:", e);
      }
    };
    seed();
  }, [actor, isFetching, qc]);
}

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );
  const keyTimestamps = useRef<number[]>([]);
  useSeedData();

  // Init blob service
  useEffect(() => {
    initBlobService();
  }, []);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // Apply saved theme and font on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    const savedFont = localStorage.getItem("portfolio-font");
    if (savedFont) {
      document.documentElement.style.setProperty("--font-body", savedFont);
    }
  }, []);

  // Keyboard shortcut: press A x3
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      if (e.key.toLowerCase() !== "a" || e.ctrlKey || e.metaKey || e.altKey)
        return;
      const now = Date.now();
      keyTimestamps.current = [...keyTimestamps.current, now].filter(
        (t) => now - t < 1500,
      );
      if (keyTimestamps.current.length >= 3) {
        keyTimestamps.current = [];
        setAdminOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <CustomSections />
        <ContactSection />
      </main>
      <Footer />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
      <Toaster richColors position="top-right" />

      {/* Hidden corner settings button — mobile friendly */}
      <button
        type="button"
        onClick={() => setAdminOpen(true)}
        aria-label="Open settings"
        data-ocid="admin.open_modal_button"
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-40 hover:opacity-100 focus:opacity-100"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
}
