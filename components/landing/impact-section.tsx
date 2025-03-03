"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export const ImpactSection = () => {
  return (
    <section className="w-full py-32 ">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Main Image Container */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl h-full">
                <Image
                  src="/images/volunteer-2.jpg"
                  alt="Healthcare volunteer smiling"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Stats Badge */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-6 -right-6 z-20"
              >
                <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg backdrop-blur-sm bg-opacity-95">
                  <div className="text-center">
                    <div className="text-3xl font-bold">280K</div>
                    <div className="text-sm font-medium">Lives Impacted</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-yellow-300 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-emerald-200 rounded-full opacity-50 blur-2xl" />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">
                WELCOME TO MEDILINK CHARITY
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Helping Each Other
                <br />
                <span className="text-emerald-600">Can Make World Better</span>
              </h2>
              <p className="text-lg leading-relaxed">
                We help connect surplus medicine from pharmaceutical companies to underserved communities through verified NGOs. Our impact is about more than moving medicine to where it&apos;s needed most - it&apos;s about helping communities thrive through better healthcare access.
              </p>
            </div>

            <ul className="space-y-6">
              {[
                "Transparent donation tracking and impact measurement",
                "Verified NGO partnerships worldwide",
                "Real-time medicine tracking and verification"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button 
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl transition-all duration-200 hover:shadow-lg"
              >
                Discover More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 