import { Instagram, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useContact } from "../hooks/useQueries";

function ContactCard({
  href,
  Icon,
  label,
  value,
  idx,
}: {
  href: string;
  Icon: React.ElementType;
  label: string;
  value: string;
  idx: number;
}) {
  if (!value) return null;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      whileHover={{ y: -3 }}
      className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 group"
      data-ocid="contact.link"
    >
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground truncate max-w-48">
          {value}
        </p>
      </div>
    </motion.a>
  );
}

export default function ContactSection() {
  const { data: contact } = useContact();
  const linkedin = contact?.linkedin || "";
  const email = contact?.email || "";
  const instagram = contact?.instagram || "";
  const telegram = contact?.telegram || "";
  return (
    <section id="contact" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">
            Connect
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Contact
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Have a project in mind or just want to connect? Feel free to reach
            out through any of these channels.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {linkedin && (
            <ContactCard
              href={linkedin}
              Icon={Linkedin}
              label="LinkedIn"
              value={linkedin
                .replace("https://www.linkedin.com/in/", "")
                .replace("/", "")}
              idx={0}
            />
          )}
          {email && (
            <ContactCard
              href={`mailto:${email}`}
              Icon={Mail}
              label="Email"
              value={email}
              idx={1}
            />
          )}
          {instagram && (
            <ContactCard
              href={`https://instagram.com/${instagram.replace("@", "")}`}
              Icon={Instagram}
              label="Instagram"
              value={instagram}
              idx={2}
            />
          )}
          {telegram && (
            <ContactCard
              href={`https://t.me/${telegram.replace("@", "")}`}
              Icon={Send}
              label="Telegram"
              value={telegram}
              idx={3}
            />
          )}
        </div>
      </div>
    </section>
  );
}
