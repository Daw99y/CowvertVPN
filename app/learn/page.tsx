import Image from "next/image";
import SectionOnboarding from "./components/SectionOnboarding";
import SectionLogin from "./components/SectionLogin";
import SectionInfo from "./components/SectionInfo";
import SectionServers from "./components/SectionServers";
import SectionConnected from "./components/SectionConnected";
import SectionCTA from "./components/SectionCTA";
import MotionSection from "../components/ui/MotionSection";

export default function LearnPage() {
  return (
    <>
      {/* Top-level <main> wraps all Learn content so it's easy to reason about layout */}
      <main className="relative min-h-screen bg-linear-to-b from-white to-zinc-50">
        <MotionSection animateOnLoad>
          <SectionOnboarding />
        </MotionSection>
        <MotionSection>
          <SectionLogin />
        </MotionSection>
        <MotionSection>
          <SectionInfo />
        </MotionSection>
        <MotionSection>
          <SectionServers />
        </MotionSection>
        <MotionSection>
          <SectionConnected />
        </MotionSection>
        <SectionCTA />
      </main>

      {/* Grass image at bottom of Learn page only */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0">
        <Image
          src="/images/grass.svg"
          alt=""
          width={1920}
          height={200}
          className="w-full h-auto"
          priority
        />
      </div>
    </>
  );
}
