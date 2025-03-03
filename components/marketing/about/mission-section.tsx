"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heart, PlusCircle, Pill } from "lucide-react";

export const MissionSection = () => {
  return (
    <section className="w-full py-20">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors mb-4">
            Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Bridging the Gap in
            <span className="text-emerald-600"> Medical Access</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Developed for the Google Solutions Challenge 2025, MediLink aims to address the critical issue of medical waste and accessibility. Every year, $5B worth of medicine goes to waste while 2B people lack access to essential medications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Pill,
              title: "Reducing Waste",
              description: "Connecting surplus medications from pharmaceutical companies to those in need"
            },
            {
              icon: PlusCircle,
              title: "Ensuring Quality",
              description: "Digital passport system for medication verification and temperature monitoring"
            },
            {
              icon: Heart,
              title: "Creating Impact",
              description: "Real-time tracking and measurement of community health outcomes"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-white/60 dark:bg-black/20 backdrop-blur-[2px] border border-border hover:border-emerald-600/50 transition-all"
            >
              <div className="inline-flex p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 