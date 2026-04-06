"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TOOLS, TOOL_CATEGORIES, type ToolCategory } from "@/lib/tools-data";

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("ALL");

  const filteredTools =
    activeCategory === "ALL" ? TOOLS : TOOLS.filter((t) => t.category === activeCategory);

  return (
    <section
      id="tools"
      className="bg-bg-secondary py-24 px-6"
      aria-labelledby="tools-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="font-mono text-xs text-amber uppercase tracking-widest mb-3">
          TOOLS & TECHNOLOGIES
        </p>
        <h2 id="tools-heading" className="font-display text-5xl lg:text-6xl text-primary tracking-widest mb-4">
          Every Tool, A Reason
        </h2>
        <p className="text-muted text-base max-w-xl mb-10">
          Nothing was included just because it's popular. Each tool was selected for a specific
          role in the pipeline.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`font-mono text-xs uppercase tracking-widest px-4 py-2 rounded transition ${
                activeCategory === cat
                  ? "bg-amber text-bg-primary border-amber font-semibold"
                  : "border border-slate-600 text-muted hover:border-border-accent hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className={`relative rounded p-5 hover:-translate-y-0.5 hover:shadow-[0_6px_30px_rgba(0,0,0,0.4)] transition-all ${
                  tool.highlight
                    ? "border-amber/30 bg-amber/3"
                    : tool.id === "python"
                      ? "border-amber-dim bg-amber/6 hover:border-amber hover:shadow-[0_0_24px_rgba(232,124,30,0.2)]"
                      : "bg-surface border border-slate-600"
                } border`}
                aria-label={`${tool.name} — ${tool.category}`}
              >
                {/* Category Tag */}
                <div className="absolute top-3.5 right-3.5 font-mono text-[0.6rem] tracking-widest text-dimtext bg-bg-primary border border-slate-600 px-2 py-0.5 rounded">
                  {tool.category}
                </div>

                {/* Tool Name */}
                <h3 className="font-mono text-base font-semibold text-primary mb-3 pr-16">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-4">{tool.description}</p>

                {/* Version */}
                <p className="mt-auto font-mono text-xs text-dimtext border-t border-slate-600 pt-3">
                  {tool.version}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
