"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Heart } from "lucide-react";
import Image from "next/image";

const mainLinks = [
  {
    title: "Platform",
    links: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Donor Portal", href: "/donor" },
      { name: "NGO Portal", href: "/ngo" },
      { name: "Add Medication", href: "/donations/add" },
      { name: "Available Medications", href: "/medications" },
    ],
  },
  {
    title: "Features",
    links: [
      { name: "Medicine Collection", href: "/donor" },
      { name: "Quality Verification", href: "/tracking" },
      { name: "NGO Partnership", href: "/ngo" },
      { name: "Impact Tracking", href: "/tracking" },
      { name: "Real-time Monitoring", href: "/tracking/scan" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api-docs" },
      { name: "User Guides", href: "/guides" },
      { name: "Support", href: "/support" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-xs"
          >
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Image 
                src="/medilink-logo.webp" 
                alt="MediLink" 
                width={40} 
                height={40}
              />
              <h3 className="text-lg font-semibold">MediLink</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting surplus medicine from pharmaceutical companies to underserved communities through verified NGOs.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link
                href="https://github.com/CubeStar1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </motion.div>

          {mainLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4 w-full max-w-xs"
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground"
        >
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 hover:animate-pulse" /> by{" "}
            <Link 
              href="https://github.com/CubeStar1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors"
            >
              CubeStar1
            </Link>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} MediLink. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}; 