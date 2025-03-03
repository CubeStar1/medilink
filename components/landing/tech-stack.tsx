"use client";

import { Code2, Brain, Database, Server, Cpu, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import IconCloud from "../magicui/icon-cloud";

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

const technologies = [
  {
    icon: Code2,
    title: "Next.js 15",
    description: "Built with Next.js 15 App Router, TypeScript, and TailwindCSS for a modern, responsive UI"
  },
  {
    icon: Database,
    title: "Firebase",
    description: "Secure data storage with Firebase for real-time updates and authentication"
  },
  {
    icon: Server,
    title: "API Routes",
    description: "Next.js API Routes for seamless backend integration and serverless functions"
  },
  {
    icon: Brain,
    title: "Multi-Role System",
    description: "Sophisticated role-based access control for Donors, NGOs, and Administrators"
  },
  {
    icon: Cpu,
    title: "Real-time Tracking",
    description: "Live medication tracking with temperature monitoring and QR verification"
  },
  {
    icon: Gauge,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics and reporting for donation impact measurement"
  }
];

export const TechStack = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <motion.div 
        className="flex flex-col gap-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors">
              Tech Stack
            </Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Built with Modern Tech
            </h2>
            <p className="text-lg lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
              Our platform leverages the latest technologies to ensure secure, scalable, and efficient medication donation management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="flex gap-4 flex-col justify-between p-6 border rounded-xl hover:border-emerald-600/50 transition-colors bg-white/60 dark:bg-black/20 backdrop-blur-[2px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <tech.icon className="w-8 h-8 text-emerald-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <IconCloud iconSlugs={slugs} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
); 