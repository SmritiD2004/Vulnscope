import { CheckCircle, Circle, Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: number;
  logs: string[];
}

interface ScanProgressPageProps {
  params: {
    scanId: string;
  };
}

// Generate static params for export
// In a real app, this would fetch scan IDs from your database
export function generateStaticParams() {
  return [
    { scanId: "scan-1" },
    { scanId: "scan-2" },
    { scanId: "scan-3" },
  ];
}

const INITIAL_STAGES: PipelineStage[] = [
  {
    id: "accept",
    name: "Target Accepted",
    description: "Validating target URL and preparing scan",
    status: "completed",
    duration: 2,
    logs: ["✓ Target validated: https://example.com", "✓ Permissions verified"],
  },
  {
    id: "nmap",
    name: "Nmap Running",
    description: "Network mapping and port discovery",
    status: "running",
    logs: [
      "[*] Starting Nmap scan...",
      "[*] Scanning ports 1-65535",
      "[+] Port 80 (http) - OPEN",
      "[+] Port 443 (https) - OPEN",
    ],
  },
  {
    id: "nikto",
    name: "Nikto Running",
    description: "Web server vulnerability scanning",
    status: "pending",
    logs: [],
  },
  {
    id: "sqlmap",
    name: "SQLMap Running",
    description: "SQL injection detection",
    status: "pending",
    logs: [],
  },
  {
    id: "requests",
    name: "Python Requests Checks",
    description: "Custom security validation",
    status: "pending",
    logs: [],
  },
  {
    id: "ai",
    name: "AI Summarization",
    description: "Correlating findings and generating fixes",
    status: "pending",
    logs: [],
  },
  {
    id: "pdf",
    name: "PDF Generation",
    description: "Creating comprehensive report",
    status: "pending",
    logs: [],
  },
  {
    id: "complete",
    name: "Completed",
    description: "Scan finished and report ready",
    status: "pending",
    logs: [],
  },
];

export default function ScanProgressPage({ params }: ScanProgressPageProps) {
  const [stages, setStages] = useState<PipelineStage[]>(INITIAL_STAGES);
  const [expandedStage, setExpandedStage] = useState<string>("nmap");
  const totalProgress = Math.round(
    (stages.filter((s) => s.status === "completed").length / stages.length) * 100
  );

  // Auto-advance stages for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setStages((prev) => {
        const newStages = [...prev];
        const runningIndex = newStages.findIndex((s) => s.status === "running");

        if (runningIndex === -1) return newStages;

        if (Math.random() > 0.3) {
          // Mark current as complete and move to next
          newStages[runningIndex].status = "completed";
          newStages[runningIndex].duration = Math.floor(Math.random() * 20) + 5;

          if (runningIndex + 1 < newStages.length) {
            newStages[runningIndex + 1].status = "running";
            setExpandedStage(newStages[runningIndex + 1].id);
          }
        } else {
          // Add log
          const logs = [
            "[*] Processing...",
            "[+] Found vulnerability",
            "[*] Running additional checks",
          ];
          const randomLog = logs[Math.floor(Math.random() * logs.length)];
          newStages[runningIndex].logs = [
            ...newStages[runningIndex].logs,
            randomLog,
          ].slice(-4);
        }

        return newStages;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getStageIcon = (status: PipelineStage["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      case "running":
        return <Loader className="h-6 w-6 text-blue-400 animate-spin" />;
      case "failed":
        return <Circle className="h-6 w-6 text-red-400" />;
      default:
        return <Circle className="h-6 w-6 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Scan in Progress</h1>
        <p className="text-sm text-dimtext mt-2">Scan ID: {params.scanId}</p>
      </div>

      {/* Progress info */}
      <Card className="p-6 border-slate-700" style={{ backgroundImage: 'linear-gradient(to right, rgba(30,58,138,0.2) 0%, rgba(88,28,135,0.2) 100%)' }}>
        <div className="space-y-4">
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-white">Overall Progress</p>
              <p className="text-2xl font-bold text-blue-400">{totalProgress}%</p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{ width: `${totalProgress}%`, backgroundImage: 'linear-gradient(to right, rgb(59,130,246) 0%, rgb(168,85,247) 100%)' }}
              />
            </div>
          </div>

          {/* Stage counts */}
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-dimtext">Completed</p>
              <p className="text-xl font-bold text-green-400">
                {stages.filter((s) => s.status === "completed").length}
              </p>
            </div>
            <div>
              <p className="text-dimtext">Running</p>
              <p className="text-xl font-bold text-blue-400">
                {stages.filter((s) => s.status === "running").length}
              </p>
            </div>
            <div>
              <p className="text-dimtext">Pending</p>
              <p className="text-xl font-bold text-slate-400">
                {stages.filter((s) => s.status === "pending").length}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Pipeline stages */}
      <div className="space-y-3">
        {stages.map((stage, idx) => (
          <div key={stage.id}>
            {/* Stage card */}
            <button
              onClick={() => setExpandedStage(expandedStage === stage.id ? "" : stage.id)}
              className="w-full"
            >
              <Card className="p-4 border-slate-700 hover:border-slate-600 transition-all text-left group">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="shrink-0 mt-1">
                    {getStageIcon(stage.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {idx + 1}. {stage.name}
                    </h3>
                    <p className="text-sm text-dimtext">{stage.description}</p>
                    {stage.duration && (
                      <p className="text-xs text-slate-400 mt-1">
                        Completed in {stage.duration}s
                      </p>
                    )}
                  </div>

                  {/* Status badge */}
                  <div className="shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        stage.status === "completed"
                          ? "bg-green-900/50 text-green-400"
                          : stage.status === "running"
                            ? "bg-blue-900/50 text-blue-400"
                            : "bg-slate-800 text-dimtext"
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>
                </div>
              </Card>
            </button>

            {/* Expanded logs */}
            {expandedStage === stage.id && stage.logs.length > 0 && (
              <Card className="border-slate-700 border-t-0 rounded-t-none p-4 bg-slate-950/50 max-h-48 overflow-y-auto">
                <div className="space-y-1 font-mono text-xs">
                  {stage.logs.map((log, logIdx) => (
                    <p key={logIdx} className="text-dimtext">
                      <span className="text-slate-600">$</span> {log}
                    </p>
                  ))}
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-6">
        <Button variant="outline">Cancel Scan</Button>
        {totalProgress === 100 && (
          <Button
            onClick={() => (window.location.href = `/report/${params.scanId}`)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            View Full Report
          </Button>
        )}
      </div>
    </div>
  );
}
