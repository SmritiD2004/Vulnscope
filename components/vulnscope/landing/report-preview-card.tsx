import { FileText, Download,Eye } from "lucide-react";
export default function ReportPreviewCard() {
  return (
    <section className="py-20 px-4" style={{ backgroundImage: 'linear-gradient(to bottom, rgb(3,7,18) 0%, rgb(15,23,42) 100%)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Security Reports
          </h2>
          <p className="text-lg text-dimtext max-w-2xl mx-auto">
            Beautiful, comprehensive PDF reports with AI-powered insights
          </p>
        </div>

        {/* Report card preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Report content preview */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 overflow-hidden shadow-2xl">
              {/* Report header */}
              <div className="p-8 border-b border-slate-700" style={{ backgroundImage: 'linear-gradient(to right, rgb(30,41,59) 0%, rgb(15,23,42) 100%)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-600/20">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Security Audit Report</h3>
                    <p className="text-sm text-dimtext">Target: https://example.com</p>
                  </div>
                </div>
                <p className="text-dimtext text-sm">Generated on January 20, 2025 • Duration: 4m 32s</p>
              </div>

              {/* Report body */}
              <div className="p-8 space-y-6">
                {/* Summary */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Executive Summary</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Critical", value: "2", color: "text-red-400" },
                      { label: "High", value: "3", color: "text-orange-400" },
                      { label: "Medium", value: "5", color: "text-yellow-400" },
                      { label: "Low", value: "4", color: "text-blue-400" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded bg-slate-800/50 border border-slate-700">
                        <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                        <p className="text-xs text-dimtext mt-1">{item.label} Issues</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finding sample */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Sample Finding</h4>
                  <div className="p-4 rounded border border-red-500/30 bg-red-900/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">SQL Injection in Login Form</p>
                      <span className="px-2.5 py-1 text-xs rounded bg-red-900/50 text-red-400 border border-red-500/30 font-semibold">
                        Critical
                      </span>
                    </div>
                    <p className="text-sm text-dimtext">Database queries compromised through user input on /login endpoint</p>
                    <div className="pt-2 border-t border-red-500/20">
                      <p className="text-xs text-dimtext mb-2 font-semibold">AI-Generated Fix:</p>
                      <pre className="bg-slate-950/50 p-2 rounded text-xs text-green-400/70 overflow-x-auto">
{`$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $_GET['email']);`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Features & CTA */}
          <div className="flex flex-col gap-6">
            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Report Includes</h3>
              <div className="space-y-3">
                {[
                  { icon: "📊", text: "Executive summary" },
                  { icon: "🔍", text: "Detailed findings" },
                  { icon: "🛠️", text: "AI fix recommendations" },
                  { icon: "📋", text: "OWASP mapping" },
                  { icon: "🔗", text: "References & links" },
                  { icon: "📸", text: "Evidence & screenshots" },
                  { icon: "📈", text: "Risk assessment" },
                  { icon: "✅", text: "Remediation guide" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-dimtext">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                Download Sample PDF
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors">
                <Eye className="h-4 w-4" />
                View Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
