"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import Link from "next/link";
import { ArrowRight, Building2, Users2 } from "lucide-react";

const volunteers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    designation: "Medical Director",
    image: "/images/volunteer-1.png",
  },
  {
    id: 2,
    name: "Dr. Michael Patel",
    designation: "Healthcare Advisor",
    image: "/images/volunteer-2.jpg",
  },
  
];

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-emerald-600 font-medium uppercase tracking-wide">
                TRANSFORMING MEDICAL DONATIONS
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Reducing Waste,
                <br />
                Saving Lives
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Every year, $5B worth of medicine is wasted while 2B people lack access. We&apos;re creating a transparent pipeline connecting surplus medications to those in need through verified NGOs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/ngo" className="inline-flex">
                <Button 
                  size="lg" 
                  className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Users2 className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  NGO Registration
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link href="/donor" className="inline-flex">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 h-12 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Building2 className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  Start Donating
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                </Button>
              </Link>
            </div>

            {/* Volunteer Avatars */}
            <div className="pt-8">
              <p className="text-sm font-medium mb-3">Join Our Volunteer Team</p>
              <div className="flex items-center gap-4">
                <AnimatedTooltip items={volunteers} />
                <div className="bg-yellow-300/90 px-3 py-1 text-sm font-medium rounded-full">
                  +5k members
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            <div className="relative h-[600px]">
              {/* Glow Effects */}
              <div className="absolute right-0 top-0 h-full w-[95%]">
                {/* Main yellow background with glow */}
                <div className="absolute inset-0 bg-yellow-300/90 rounded-l-full backdrop-blur-sm" />
                
                {/* Additional glow layers */}
                <div className="absolute -inset-4 bg-yellow-300/40 rounded-l-full blur-2xl" />
                <div className="absolute -top-8 -right-8 w-64 h-64 bg-emerald-400/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl" />
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -right-4 top-4 z-30 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="text-emerald-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Total Donation</span>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-12 bg-emerald-100 rounded-full">
                        <div className="h-full w-8 bg-emerald-600 rounded-full"></div>
                      </div>
                      <span className="text-xs text-emerald-600">65%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bubbles */}
              <div className="absolute -left-4 top-8 z-30 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-4 flex items-center gap-3">
                <div className="bg-emerald-50 p-2 rounded-full">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Medicine Wasted</p>
                  <p className="text-emerald-600 font-bold text-lg">$5B / Year</p>
                </div>
              </div>

              <div className="absolute -left-4 top-32 z-30 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-4 flex items-center gap-3">
                <div className="bg-emerald-50 p-2 rounded-full">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">People Affected</p>
                  <p className="text-emerald-600 font-bold text-lg">2B+ People</p>
                </div>
              </div>

              <div className="absolute -left-4 top-56 z-30 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-4 flex items-center gap-3">
                <div className="bg-emerald-50 p-2 rounded-full">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Verified NGOs</p>
                  <p className="text-emerald-600 font-bold text-lg">100+ Partners</p>
                </div>
              </div>

              {/* Main Image */}
              <div className="absolute inset-y-0 right-0 w-[85%] z-20">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/volunteer-1.png"
                    alt="Volunteers with donation boxes"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "AI-Powered Matching",
              description: "Smart algorithms connect surplus medicine with communities that need them most"
            },
            {
              title: "Digital Passport",
              description: "Complete chain of custody with QR verification and temperature monitoring"
            },
            {
              title: "Real-Time Analytics",
              description: "Track your donation's journey and measure community health impact"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {index === 0 ? (
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : index === 1 ? (
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
