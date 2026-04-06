import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 border-t border-slate-800" style={{ backgroundImage: 'linear-gradient(to bottom, rgb(3,7,18) 0%, rgb(15,23,42) 100%)' }}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Secure Your Application?
          </h2>
          <p className="text-lg text-dimtext max-w-2xl mx-auto">
            Get started in seconds. No credit card required. Free trial available.
          </p>
        </div>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/download-extension"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/25"
          >
            <Download className="h-5 w-5" />
            Install Extension Now
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors"
          >
            Read Documentation
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Features highlight */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "2 Minutes Setup",
              description: "Install and start scanning immediately",
            },
            {
              title: "Free to Use",
              description: "Basic scans available with our free tier",
            },
            {
              title: "Enterprise Support",
              description: "Premium features for development teams",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-slate-700 bg-slate-900/30">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-dimtext">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <div className="pt-8 text-center text-sm text-dimtext border-t border-slate-800">
          <p>
            By installing VulnScope, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
