import { Award } from "lucide-react";
import { motion } from "motion/react";
import { useCertificates } from "../hooks/useQueries";
import BlobImage from "./BlobImage";

export default function CertificationsSection() {
  const { data: certs = [] } = useCertificates();
  return (
    <section id="certifications" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">
            Achievements
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Certifications
          </h2>
        </motion.div>
        {certs.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground rounded-2xl border border-dashed border-border"
            data-ocid="certifications.empty_state"
          >
            <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No certifications yet</p>
            <p className="text-sm mt-1">
              Open the admin panel to add your certifications.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-2xl shadow-card border border-border overflow-hidden group hover:shadow-card-hover transition-all duration-300"
                data-ocid={`certifications.item.${i + 1}`}
              >
                <div className="relative aspect-video bg-secondary overflow-hidden">
                  {cert.imageId ? (
                    <BlobImage
                      imageId={cert.imageId}
                      alt={cert.title || "Certificate"}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallback={
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                          <Award className="w-10 h-10 text-muted-foreground/40" />
                        </div>
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <Award className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-base">
                    {cert.title || "Certificate"}
                  </h3>
                  {cert.year && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {String(cert.year)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
