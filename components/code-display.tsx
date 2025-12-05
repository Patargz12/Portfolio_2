"use client";

export function CodeDisplay() {
  return (
    <div className="rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm overflow-hidden max-w-md shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/20">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-muted-foreground ml-auto">app.jsx</span>
      </div>

      <div className="p-4 font-mono text-xs sm:text-sm overflow-x-auto">
        <div className="text-muted-foreground">
          <div className="text-accent">
            {"const"} <span className="text-primary">App</span> = () {"=>"}{" "}
            {"{"}‌
          </div>
          <div className="ml-4">
            <span className="text-secondary">return</span> {`(`}
          </div>
          <div className="ml-8 text-primary">
            {`<div>`}
            <span className="text-white">Software Engineer</span>
            {`</div>`}
          </div>
          <div className="ml-4">{`)`}</div>
          <div>{"}"}</div>
        </div>
      </div>
    </div>
  );
}
