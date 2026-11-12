import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteHeader } from "../../components/SiteHeader";
import { MermaidDiagram } from "./MermaidDiagram";
import "./database.css";

export const metadata: Metadata = {
  title: "Database Doc — Coffee Corner",
  description: "แผนผัง ER และคำอธิบายโครงสร้างฐานข้อมูล Coffee Corner",
};

export default async function DatabasePage() {
  "use cache";
  const markdown = await readFile(path.join(process.cwd(), "docs", "database.md"), "utf8");

  return (
    <>
      <SiteHeader currentPage="database" />
      <main className="page-shell pb-20 pt-5 sm:pt-8">
        <article className="paper-panel database-doc rounded-[22px] p-5 sm:p-9">
          <p className="section-kicker">COFFEE CORNER / DATA REFERENCE</p>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children }) => <div className="database-code">{children}</div>,
              code: ({ className, children }) =>
                className === "language-mermaid"
                  ? <MermaidDiagram chart={String(children).trim()} />
                  : <code className={className}>{children}</code>,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </main>
    </>
  );
}
