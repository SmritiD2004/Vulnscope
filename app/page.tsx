import HeroBanner from "@/components/vulnscope/landing/hero-banner";
import WorkflowTimeline from "@/components/vulnscope/landing/workflow-timeline";
import VulnerabilityGrid from "@/components/vulnscope/landing/vulnerability-grid";
import FixSnippetShowcase from "@/components/vulnscope/landing/fix-snippet-showcase";
import ReportPreviewCard from "@/components/vulnscope/landing/report-preview-card";
import CTASection from "@/components/vulnscope/landing/cta-section";

export const metadata = {
  title: "VulnScope - AI-Powered Security Scanning",
  description: "Paste URL, get AI fixes. Automatic vulnerability scanning with developer-ready remediation.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen" style={{ backgroundImage: 'linear-gradient(to bottom right, rgb(3,7,18) 0%, rgb(15,23,42) 50%, rgb(3,7,18) 100%)' }}>
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(55, 65, 81, 0.05) 25%, rgba(55, 65, 81, 0.05) 26%, transparent 27%, transparent 74%, rgba(55, 65, 81, 0.05) 75%, rgba(55, 65, 81, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(55, 65, 81, 0.05) 25%, rgba(55, 65, 81, 0.05) 26%, transparent 27%, transparent 74%, rgba(55, 65, 81, 0.05) 75%, rgba(55, 65, 81, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroBanner />
        <WorkflowTimeline />
        <VulnerabilityGrid />
        <FixSnippetShowcase />
        <ReportPreviewCard />
        <CTASection />
      </div>
    </main>
  );
}
