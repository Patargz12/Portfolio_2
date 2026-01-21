"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { certificationsData, Certification } from "@/constants/certifications-section";

export type { Certification };

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

const CertificationCard = ({ certification, index }: CertificationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={certification.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="block cursor-pointer"
    >
      <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-500 h-full">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 -z-10 blur-xl"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ x: Math.random() * 100, y: 100, opacity: 0 }}
              animate={
                isHovered
                  ? {
                      x: Math.random() * 100,
                      y: -20,
                      opacity: [0, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 relative">
          {/* External link icon */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8 
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-primary/20 backdrop-blur-sm rounded-lg">
              <ExternalLink className="w-4 h-4 text-primary" />
            </div>
          </motion.div>

          <div className="space-y-3">
            <motion.h3
              className="text-xl font-bold text-foreground pr-10 leading-tight"
              animate={{
                color: isHovered
                  ? "hsl(var(--primary))"
                  : "hsl(var(--foreground))",
              }}
              transition={{ duration: 0.3 }}
            >
              {certification.title}
            </motion.h3>

            <p className="text-sm text-muted-foreground">
              {certification.organization}
            </p>
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.a>
  );
};

interface CertificationsSectionProps {
  certifications?: Certification[];
}

export const CertificationsSection = ({
  certifications = certificationsData.certifications,
}: CertificationsSectionProps) => {
  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {certificationsData.header.title}{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {certificationsData.header.highlightedWord}
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {certificationsData.header.subtitle}
          </motion.p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="text-center mt-12 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Total Certifications: {certifications.length}
        </motion.div>
      </div>
    </section>
  );
};


