"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ImpactSection = () => {
  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative aspect-square">
              {/* Circular Background */}
              <div className="absolute inset-0 rounded-full bg-yellow-300">
                <div className="absolute -top-8 -right-8">
                  <div className="bg-emerald-600 rounded-full p-6 text-white">
                    <div className="text-center">
                      <div className="text-2xl font-bold">280K</div>
                      <div className="text-sm">Lives Impacted</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Image */}
              <div className="relative z-10">
                <Image
                  src="/volunteer-2.jpg"
                  alt="Volunteer with donation box"
                  height={500}
                  width={500}
                  className=""
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-emerald-600 rounded-full" />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-emerald-600 font-medium uppercase tracking-wide">
                WELCOME TO MEDILINK CHARITY
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Helping Each Other
                <br />
                Can Make World Better
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We help connect surplus medicine from pharmaceutical companies to underserved communities through verified NGOs. Our impact is about more than moving medicine to where it&apos;s needed most - it&apos;s about helping communities thrive through better healthcare access.
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Transparent donation tracking and impact measurement</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Verified NGO partnerships worldwide</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Real-time medicine tracking and verification</span>
              </li>
            </ul>

            <Button 
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Discover More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 