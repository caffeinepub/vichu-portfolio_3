import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CustomSection {
  id: string;
  title: string;
  body: string;
}

function loadSections(): CustomSection[] {
  try {
    return JSON.parse(
      localStorage.getItem("portfolio-custom-sections") || "[]",
    );
  } catch {
    return [];
  }
}

export default function CustomSections() {
  const [sections, setSections] = useState<CustomSection[]>(loadSections);

  useEffect(() => {
    const handler = () => setSections(loadSections());
    window.addEventListener("custom-sections-updated", handler);
    return () => window.removeEventListener("custom-sections-updated", handler);
  }, []);

  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, i) => (
        <section
          key={section.id}
          id={`custom-${section.id}`}
          className="py-16 px-4"
          style={{
            background:
              i % 2 === 0 ? "var(--color-background)" : "var(--color-muted)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {section.title}
              </h2>
              {section.body && (
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                  {section.body}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
