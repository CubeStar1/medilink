"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Code2, Database, Layout, Shield, Users2, Workflow } from "lucide-react";

const timelineItems = [
  {
    id: 1,
    date: "January 2025",
    title: "Project Inception",
    description: "Started development for Google Solutions Challenge 2025, focusing on medical waste reduction and accessibility.",
    icon: Workflow,
  },
  {
    id: 2,
    date: "February 2025",
    title: "Core Development",
    description: "Implemented authentication, role-based access, and organization verification systems.",
    icon: Shield,
  },
  {
    id: 3,
    date: "February 2025",
    title: "Dashboard Development",
    description: "Created role-specific dashboards for donors, NGOs, and administrators with real-time analytics.",
    icon: Layout,
  },
  {
    id: 4,
    date: "March 2025",
    title: "Database Integration",
    description: "Integrated Firebase for secure data storage, user management, and real-time updates.",
    icon: Database,
  },
  {
    id: 5,
    date: "March 2025",
    title: "Feature Implementation",
    description: "Added medication management, request system, and tracking functionality with QR verification.",
    icon: Code2,
  },
  {
    id: 6,
    title: "Platform Launch",
    description: "Launching the platform to connect pharmaceutical companies with NGOs, making healthcare more accessible.",
    icon: Users2,
  },
];

export const DevelopmentTimeline = () => {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[800px] h-[800px] -right-40 top-0 opacity-[0.15] blur-[100px]">
          <svg viewBox="0 0 800 800">
            <path
              d="M400,200 Q550,150 600,300 T800,400 T600,500 T400,600 T200,500 T0,400 T200,300 T400,200"
              fill="url(#timeline-gradient)"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#059669' }} />
                <stop offset="100%" style={{ stopColor: '#10B981' }} />
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
            Development Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            From Concept to Reality
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow our journey in developing MediLink for the Google Solutions Challenge 2025, addressing global healthcare accessibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Timeline defaultValue={timelineItems.length}>
            {timelineItems.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="group-data-[orientation=vertical]/timeline:ms-10"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                  <TimelineTitle className="mt-0.5">{item.title}</TimelineTitle>
                  <TimelineIndicator className="bg-emerald-500/10 text-emerald-600 group-data-completed/timeline-item:bg-emerald-600 group-data-completed/timeline-item:text-white flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                    <item.icon size={14} />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent>
                  {item.description}
                  {item.date && <TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </div>
    </section>
  );
}; 