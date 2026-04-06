"use client";

import { motion } from "framer-motion";

export default function About() {
  const painCards = [
    {
      icon: "⚠",
      title: "Fragmented Outputs",
      text: "Nmap gives XML. Nikto gives text logs. Burp Suite stays inside its own UI. None of these outputs talk to each other.",
    },
    {
      icon: "⏱",
      title: "Manual Reporting",
      text: "Converting findings into a professional report with CVSS scores and remediation is done entirely by hand — slow, inconsistent, and error-prone.",
    },
    {
      icon: "🔗",
      title: "No Pipeline Visibility",
      text: "Students learn tools in isolation. The full recon → scan → exploit → report chain is never visible as one connected system.",
    },
    {
      icon: "✓",
      title: "VulnScope Fixes This",
      text: "One Python command chains all tools, parses all outputs, and generates a structured PDF report automatically.",
      isGreen: true,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  return (
    <section
      id="about"
      className="bg-bg-secondary py-24 px-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="font-mono text-xs text-amber uppercase tracking-widest mb-3">
          PROBLEM STATEMENT
        </p>
        <h2
          id="about-heading"
          className="font-display text-5xl lg:text-6xl text-primary tracking-widest mb-14"
        >
          The Gap in Security Testing
        </h2>

        {/* Content Grid */}
        <div className="lg:grid lg:grid-cols-2 gap-14 items-start">
          {/* Left Column - Text */}
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted font-body text-base leading-relaxed"
            >
              Web application vulnerabilities are responsible for a significant proportion of
              security breaches worldwide. The OWASP Top 10 (2021) identifies injection flaws,
              broken access control, and security misconfiguration as the most critical threats —
              yet SQLi and XSS continue to appear in production systems despite being documented
              for over two decades.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted font-body text-base leading-relaxed"
            >
              The problem is not a shortage of tools. <span className="text-amber font-semibold">Nmap</span>,{" "}
              <span className="text-amber font-semibold">Nikto</span>,{" "}
              <span className="text-amber font-semibold">Burp Suite</span>,{" "}
              <span className="text-amber font-semibold">Metasploit</span>, and{" "}
              <span className="text-amber font-semibold">SQLMap</span> are all freely available. The problem is that no lightweight,
              student-buildable framework ties them into a single pipeline that also produces a
              formatted, readable report automatically.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-muted font-body text-base leading-relaxed"
            >
              <span className="text-amber font-semibold">VulnScope</span> runs entirely inside a VirtualBox virtual lab with{" "}
              <span className="text-amber font-semibold">Kali Linux</span> as the attacker and{" "}
              <span className="text-amber font-semibold">DVWA</span> + <span className="text-amber font-semibold">Metasploitable 2</span> as
              targets. All testing is safe, legal, and fully reproducible.
            </motion.p>
          </motion.div>

          {/* Right Column - Pain Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 lg:pt-0"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {painCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded p-5 ${
                  card.isGreen
                    ? "bg-amber/5 border border-amber-dim"
                    : "bg-surface border border-slate-600 hover:border-border-accent"
                } transition`}
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3
                  className={`font-mono text-sm font-semibold ${
                    card.isGreen ? "text-amber" : "text-primary"
                  } uppercase tracking-wide mb-2`}
                >
                  {card.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
