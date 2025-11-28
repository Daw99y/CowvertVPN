import HomeSection from "@/app/components/sections/HomeSection";
import PricingSection from "@/app/pricing/PricingSection";
import LearnSection from "@/app/learn/LearnSection";

export default function Page() {
  return (
    <main className="flex flex-col">
      <section id="home">
        <HomeSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="learn">
        <LearnSection />
      </section>
    </main>
  );
}
