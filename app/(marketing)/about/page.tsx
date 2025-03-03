import { MissionSection } from "@/components/marketing/about/mission-section";
import { DevelopmentTimeline } from "@/components/marketing/about/development-timeline";
import { TechOverview } from "@/components/marketing/about/tech-overview";

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen pt-16">
      <div className="flex-1 space-y-8">
        <MissionSection />
        <DevelopmentTimeline />
        <TechOverview />
      </div>
    </main>
  );
} 