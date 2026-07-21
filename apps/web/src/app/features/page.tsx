import Navigation from "@/components/Navigation";
import FeatureGrid from "@/components/FeatureGrid";
import KeyFeatures from "@/components/KeyFeatures";
import BottomCTALavender from "@/components/BottomCTALavender";
import FooterBold from "@/components/FooterBold";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navigation />

      <main className="pt-32">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text)] mb-6">
            Everything you need to <span className="text-[var(--accent)]">scale outreach</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)]">
            Blink comes packed with expert-level AI models configured perfectly for high-converting sales and networking.
          </p>
        </div>

        <KeyFeatures />
        
        <div className="py-12" />
        
        <FeatureGrid />
        
        <BottomCTALavender />
      </main>

      <FooterBold />
    </div>
  );
}
