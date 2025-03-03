"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import IconCloud from "@/components/magicui/icon-cloud";
import { Code2, Database, Layout } from "lucide-react";

const slugs = [
  "typescript",
  "nextdotjs",
  "react",
  "firebase",
  "tailwindcss",
  "framer",
  "vercel",
  "git",
  "github",
  "visualstudiocode",
  "figma",
];

const features = [
  {
    icon: Code2,
    title: "Modern Stack",
    description: "Built with Next.js 15 App Router, TypeScript, and TailwindCSS for a modern, responsive UI"
  },
  {
    icon: Database,
    title: "Secure Backend",
    description: "Firebase powers our authentication, database, and storage needs with real-time capabilities"
  },
  {
    icon: Layout,
    title: "Beautiful UI",
    description: "Carefully crafted interface with Framer Motion animations and shadcn/ui components"
  }
];

export const TechOverview = () => {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[800px] h-[800px] -left-40 bottom-0 opacity-[0.15] blur-[100px]">
          <svg viewBox="0 0 800 800">
            <path
              d="M400,200 Q550,150 600,300 T800,400 T600,500 T400,600 T200,500 T0,400 T200,300 T400,200"
              fill="url(#tech-gradient)"
            />
            <defs>
              <linearGradient id="tech-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FCD34D' }} />
                <stop offset="100%" style={{ stopColor: '#FBBF24' }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors mb-4">
            Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Built with Modern Tech
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform leverages cutting-edge technologies to ensure security, scalability, and an exceptional user experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-white/60 dark:bg-black/20 backdrop-blur-[2px] border border-border hover:border-emerald-600/50 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600">
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px]"
          >
            <IconCloud iconSlugs={slugs} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 