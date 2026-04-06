 
import { Zap, Radar, Search, Brain, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Zap,
    title: "Paste URL",
    description: "Share any URL, IP, or domain in the extension",
    color: "text-blue-400",
  },
  {
    icon: Radar,
    title: "Tools Run",
    description: "Nmap, Nikto, SQLMap, and custom checks execute",
    color: "text-purple-400",
  },
  {
    icon: Search,
    title: "Findings Detected",
    description: "All vulnerabilities are discovered and classified",
    color: "text-orange-400",
  },
  {
    icon: Brain,
    title: "AI Correlates",
    description: "AI synthesizes findings and generates context",
    color: "text-pink-400",
  },
  {
    icon: FileText,
    title: "Fix Code Generated",
    description: "Developer-ready code solutions are created",
    color: "text-cyan-400",
  },
  {
    icon: CheckCircle,
    title: "PDF Report",
    description: "Complete report with evidence and fixes",
    color: "text-green-400",
  },
];

export default function WorkflowTimeline() {
  return (
    <section className="py-20 px-4" style={{ backgroundImage: 'linear-gradient(to bottom, rgb(3,7,18) 0%, rgb(15,23,42) 50%, rgb(3,7,18) 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The VulnScope Pipeline
          </h2>
          <p className="text-lg text-dimtext max-w-2xl mx-auto">
            From URL to production-ready security fixes in under 5 minutes
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-900/80 transition-all cursor-pointer"
              >
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  {idx + 1}
                </div>

                {/* Icon */}
                <div className={`mb-4 inline-block p-3 rounded-lg bg-slate-800 ${step.color}`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-dimtext">{step.description}</p>

                {/* Arrow to next */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-dimtext mb-4">All powered by AI correlation and automated scanning</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-white font-medium">Pipeline available 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
