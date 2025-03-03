"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Medicine Collection",
    description: "We facilitate the collection of surplus medications from pharmaceutical companies and healthcare facilities, ensuring proper handling and documentation."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Quality Verification",
    description: "Our digital passport system ensures medication quality and authenticity through rigorous verification processes and temperature monitoring."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "NGO Partnership",
    description: "We connect verified NGOs with available medical supplies, ensuring transparent and efficient distribution to communities in need."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Impact Tracking",
    description: "Real-time analytics and reporting tools help track the journey of donations and measure their impact on community health outcomes."
  }
];

export const ServicesSection = () => {
  return (
    <section className="w-full py-24 relative overflow-x-hidden">
      {/* Subtle Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[800px] h-[600px] -right-40 top-0 opacity-[0.25] blur-[80px]">
          <svg viewBox="0 0 800 600">
            <path
              d="M400,200 Q550,150 600,300 T800,400 T600,500 T400,600 T200,500 T0,400 T200,300 T400,200"
              fill="url(#gradient1)"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#059669' }} />
                <stop offset="100%" style={{ stopColor: '#10B981' }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="absolute w-[400px] h-[500px] -left-20 bottom-0 opacity-[0.18] blur-[100px]">
          <svg viewBox="0 0 600 500">
            <path
              d="M300,150 Q450,100 500,250 T600,350 T450,450 T300,500 T150,450 T0,350 T150,250 T300,150"
              fill="url(#gradient2)"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FCD34D' }} />
                <stop offset="100%" style={{ stopColor: '#FBBF24' }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground">
              We provide end-to-end solutions for managing medical donations, from collection to impact measurement. Our platform ensures that surplus medicine reaches those who need it most.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/60 dark:bg-black/20 backdrop-blur-[2px] rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-emerald-50/80 dark:bg-emerald-950/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 