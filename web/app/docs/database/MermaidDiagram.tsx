"use client";

import { useEffect, useId, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const id = `database-er-${useId().replace(/:/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "neutral" });
      const result = await mermaid.render(id, chart);
      if (active) setSvg(result.svg);
    }).catch(() => {
      if (active) setError(true);
    });
    return () => { active = false; };
  }, [chart, id]);

  if (error) return <pre className="overflow-x-auto"><code>{chart}</code></pre>;
  return (
    <div className="database-diagram overflow-x-auto" role="img" aria-label="ER diagram แสดงความสัมพันธ์ของ categories, menu_items และ orders">
      {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p>กำลังวาดแผนผังฐานข้อมูล…</p>}
    </div>
  );
}
