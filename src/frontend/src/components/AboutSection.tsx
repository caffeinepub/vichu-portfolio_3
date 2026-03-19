import { motion } from "motion/react";
import { useProfile } from "../hooks/useQueries";
import BlobImage from "./BlobImage";

export default function AboutSection() {
  const { data: profile } = useProfile();
  const name = profile?.name || "Vichu";
  const bio =
    profile?.bio ||
    "Focused on building meaningful and user-centric digital experiences";
  const title =
    profile?.title || "Mechanical Engineering Student | Product Builder";
  const initials =
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "V";

  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">
              About
            </p>
            <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              About Me
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hi, I&apos;m <strong className="text-foreground">{name}</strong>{" "}
              &mdash; a {title.split("|")[0]?.trim() || "builder"} passionate
              about creating digital products that make a real difference.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {bio} I blend engineering thinking with product sensibility to
              design and build apps that are not just functional, but genuinely
              enjoyable to use.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-56 h-64 rounded-2xl overflow-hidden shadow-card ring-2 ring-border">
              {profile?.profileImageId ? (
                <BlobImage
                  imageId={profile.profileImageId}
                  alt={name}
                  className="w-full h-full object-cover"
                  fallback={
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">
                        {initials}
                      </span>
                    </div>
                  }
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {initials}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
