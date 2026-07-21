import Navigation from "@/components/Navigation";
import BottomCTALavender from "@/components/BottomCTALavender";
import FooterBold from "@/components/FooterBold";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navigation />

      <main className="pt-32 flex-1">
        <div className="max-w-4xl mx-auto px-6 text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text)] mb-6">
            How <span className="text-[var(--accent)]">Blink</span> works
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)]">
            A seamless three-step process to generate highly targeted outreach that actually converts.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 space-y-12 mb-24">
          
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 text-2xl font-bold font-mono">
              1
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">Provide the Target</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Simply drop in a LinkedIn profile URL, a company website, or a short description of the person you want to contact. 
                Our backend instantly scrapes and parses their latest activity, work history, and corporate goals to build a robust context profile.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 text-2xl font-bold font-mono">
              2
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">Select Your Agent</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Choose the AI persona that fits your goal. Use the <strong>Strategist</strong> to find a unique angle, 
                the <strong>Designer</strong> to structure a creative pitch, or the <strong>Writer</strong> for the final polish. 
                The agents have persistent memory and collaborate seamlessly.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 text-2xl font-bold font-mono">
              3
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">Review & Send</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The AI generates a highly personalized, contextual email draft. You can iterate by chatting directly with the AI, 
                and once you're happy, just hit the send button to instantly load it into your email client ready to go.
              </p>
            </div>
          </div>

        </div>

        <BottomCTALavender />
      </main>

      <FooterBold />
    </div>
  );
}
