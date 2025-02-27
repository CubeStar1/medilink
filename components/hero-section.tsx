'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Thermometer, BarChart3 } from 'lucide-react'

export default function HeroSection() {
    const stats = [
        { value: '$13B', label: 'Worth of Medicine Wasted Annually' },
        { value: '2B+', label: 'People Lack Access to Essential Medicine' },
        { value: '100%', label: 'Transparent Supply Chain' }
    ];

    return (
        <>
            <main>
                <div aria-hidden className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>

                <section className="overflow-hidden bg-white dark:bg-transparent">
                    <div className="relative mx-auto max-w-5xl px-6 py-24 lg:py-32">
                        <div className="relative z-10 mx-auto max-w-3xl text-center">
                            <motion.span 
                                className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Revolutionizing Medical Donations
                            </motion.span>

                            <motion.h1 
                                className="text-balance text-4xl font-bold md:text-5xl lg:text-6xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Connecting Surplus Medicine with Those in Need
                            </motion.h1>

                            <motion.p 
                                className="mx-auto my-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Our blockchain-powered platform creates a transparent, efficient pipeline connecting pharmaceutical surpluses to underserved communities through verified NGOs.
                            </motion.p>

                            <motion.div 
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    <Link href="/donor">
                                        Start Donating
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/ngo">
                                        NGO Dashboard
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div 
                                className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {stats.map((stat, index) => (
                                    <div key={index} className="rounded-lg border bg-white/50 p-6 dark:bg-white/5">
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="mx-auto -mt-8 max-w-7xl">
                        <div className="perspective-distant -mr-16 pl-16 lg:-mr-56 lg:pl-56">
                            <div className="[transform:rotateX(20deg);]">
                                <div className="lg:h-176 relative skew-x-[.36rad]">
                                    <div aria-hidden className="bg-linear-to-b from-background to-background z-1 absolute -inset-16 via-transparent opacity-70 sm:-inset-32" />
                                    <div aria-hidden className="bg-linear-to-r from-background to-background z-1 absolute -inset-16 bg-white/60 via-transparent sm:-inset-32 dark:bg-transparent" />
                                    <div aria-hidden className="absolute -inset-16 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [--color-border:var(--color-zinc-400)] sm:-inset-32 dark:[--color-border:color-mix(in_oklab,var(--color-white)_20%,transparent)] opacity-40" />
                                    
                                    <div aria-hidden className="from-background z-11 absolute inset-0 bg-gradient-to-l opacity-30" />
                                    <div aria-hidden className="z-2 absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,var(--color-background)_100%)] opacity-60" />
                                    <div aria-hidden className="z-2 absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_0%,transparent_45%,var(--color-background)_100%)] opacity-50" />

                                    <div className="relative z-1">
                                        <Image 
                                            className="rounded-(--radius) relative border dark:hidden opacity-80 brightness-95 contrast-95" 
                                            src="/medilink-donor-dashboard.jpg" 
                                            alt="MediLink Donor Dashboard" 
                                            width={2880} 
                                            height={2074}
                                            priority
                                        />
                                        <Image 
                                            className="rounded-(--radius) relative hidden border dark:block opacity-80 brightness-90 contrast-90" 
                                            src="/dark-card.webp" 
                                            alt="MediLink Donor Dashboard Dark Mode" 
                                            width={2880} 
                                            height={2074}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Features Section */}
                    <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div 
                                className="text-center p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                                    <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Secure Marketplace</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Smart contracts ensure regulatory compliance and secure transactions between donors and NGOs.
                                </p>
                            </motion.div>

                            <motion.div 
                                className="text-center p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                                    <Thermometer className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Medicine Passport</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Complete chain of custody with temperature monitoring and QR verification at each transfer point.
                                </p>
                            </motion.div>

                            <motion.div 
                                className="text-center p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Impact Dashboard</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Real-time tracking of donations and their impact on communities with data-driven insights.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
