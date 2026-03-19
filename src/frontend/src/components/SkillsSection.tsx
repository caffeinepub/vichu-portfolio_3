import { motion } from "motion/react";
import { useSkills } from "../hooks/useQueries";
import BlobImage from "./BlobImage";

export default function SkillsSection() {
  const { data: skills = [] } = useSkills();
  return (
    <section id="skills" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">
            Expertise
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Skills
          </h2>
        </motion.div>
        {skills.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground rounded-2xl border border-dashed border-border"
            data-ocid="skills.empty_state"
          >
            <p className="text-lg font-medium">No skills added yet</p>
          </div>
        ) : (
          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3 },
                  },
                }}
                className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-full shadow-xs border border-border"
                data-ocid={`skills.item.${i + 1}`}
              >
                {skill.imageId && (
                  <BlobImage
                    imageId={skill.imageId}
                    alt={skill.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-semibold">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
