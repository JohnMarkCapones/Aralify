"use client";

interface CodeSnippetProps {
  code: string;
}

export function CodeSnippet({ code }: CodeSnippetProps) {
  const lines = code.split("\n");

  return (
    <div className="rounded-xl border border-border/30 overflow-hidden bg-zinc-950 dark:bg-zinc-950">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900/80 border-b border-zinc-800/50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-6 shrink-0 text-right text-zinc-600 text-xs mr-3 select-none">
                {i + 1}
              </span>
              <span className="text-emerald-400">
                {line || "\u00A0"}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
