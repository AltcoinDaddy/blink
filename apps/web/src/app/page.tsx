import Navigation from "@/components/Navigation";
import HeroLavender from "@/components/HeroLavender";
import FeatureGrid from "@/components/FeatureGrid";
import KeyFeatures from "@/components/KeyFeatures";
import AudienceGrid from "@/components/AudienceGrid";
import BottomCTALavender from "@/components/BottomCTALavender";
import FooterBold from "@/components/FooterBold";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navigation />

      <main>
        <HeroLavender />
        <FeatureGrid />
        <KeyFeatures />
        <AudienceGrid />
        <BottomCTALavender />
      </main>

      <FooterBold />
    </div>
  );
}
