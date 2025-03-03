"use client";

import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Truck, 
  ClipboardCheck, 
  ShieldCheck,
  PlusIcon,
  CreditCard,
  HelpCircle
} from "lucide-react";

const items = [
  {
    id: "1",
    icon: Building2,
    title: "How can organizations register as donors?",
    content:
      "Organizations can register through our platform by providing necessary documentation including licenses and certifications. Our verification team reviews applications within 48-72 hours to ensure compliance with medical donation regulations.",
  },
  {
    id: "2",
    icon: ClipboardCheck,
    title: "What types of medications can be donated?",
    content:
      "We accept unexpired, unopened medications in their original packaging. All donations must meet our quality standards and comply with local regulations. Temperature-sensitive medications must include proper storage history.",
  },
  {
    id: "3",
    icon: Truck,
    title: "How is medication transportation handled?",
    content:
      "We partner with certified medical logistics providers who maintain proper temperature control and handling procedures. Each shipment is tracked in real-time with our QR-based system to ensure integrity throughout transit.",
  },
  {
    id: "4",
    icon: ShieldCheck,
    title: "How do you verify NGO authenticity?",
    content:
      "NGOs undergo a thorough verification process including document validation, site visits, and reference checks. We maintain ongoing monitoring to ensure compliance with our platform's standards and regulations.",
  },
  {
    id: "5",
    icon: CreditCard,
    title: "Are there any fees for using the platform?",
    content:
      "The platform is free for verified NGOs. Donors may opt to cover transportation costs. We maintain full transparency about any operational fees, which are used to ensure medication quality and proper handling.",
  },
  {
    id: "6",
    icon: HelpCircle,
    title: "What support do you provide to users?",
    content:
      "We offer 24/7 technical support, dedicated account managers for organizations, and comprehensive training on using our platform. Our team assists with documentation, logistics coordination, and issue resolution.",
  },
];

export const FaqSection = () => {
  return (
    <section className="w-full py-20 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[600px] h-[600px] -left-40 top-0 opacity-[0.15] blur-[100px]">
          <svg viewBox="0 0 600 600">
            <path
              d="M300,150 Q450,100 500,250 T600,350 T450,450 T300,500 T150,450 T0,350 T150,250 T300,150"
              fill="url(#faq-gradient)"
            />
            <defs>
              <linearGradient id="faq-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#059669' }} />
                <stop offset="100%" style={{ stopColor: '#10B981' }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          className="flex flex-col gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4 flex-col items-center text-center max-w-3xl mx-auto">
            <div>
              <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors">
                FAQ
              </Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter font-regular">
                Frequently Asked Questions
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground">
                Get answers to common questions about our medical donation platform
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <Accordion type="single" collapsible className="w-full" defaultValue="1">
              {items.map((item) => (
                <AccordionItem 
                  value={item.id} 
                  key={item.id} 
                  className="py-2 border-b border-muted last:border-0"
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50">
                      <span className="flex items-center gap-3">
                        <item.icon size={16} className="shrink-0 text-emerald-600" aria-hidden="true" />
                        <span>{item.title}</span>
                      </span>
                      <PlusIcon
                        size={16}
                        className="pointer-events-none shrink-0 text-emerald-600 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-muted-foreground ps-7 pb-2">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 