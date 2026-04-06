 
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-block">
          <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">
            🔒 Security Scanning Reimagined
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Paste URL
            <br />
            <span style={{ backgroundImage: 'linear-gradient(to right, rgb(96,165,250), rgb(192,132,250))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Get AI Fixes
            </span>
            <br />
            in Seconds
          </h1>
          <p className="text-xl text-dimtext max-w-2xl mx-auto leading-relaxed">
            VulnScope automatically scans your application, identifies vulnerabilities, and generates developer-ready fixes with AI-powered remediation across the entire pipeline.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/download-extension"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            Install Extension
          </Link>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors">
            Try Demo Scan
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="pt-12 inline-flex flex-col items-center gap-2 text-dimtext animate-bounce">
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
