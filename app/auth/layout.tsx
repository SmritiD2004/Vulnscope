import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: 'linear-gradient(to bottom right, rgb(3,7,18) 0%, rgb(15,23,42) 50%, rgb(3,7,18) 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 px-4 text-center text-sm text-dimtext relative z-10">
        <p>&copy; 2025 VulnScope. All rights reserved.</p>
      </footer>
    </div>
  );
}
