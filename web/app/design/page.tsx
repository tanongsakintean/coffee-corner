import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { SiteHeader } from "../components/SiteHeader";
import { getCategories, getMenu } from "../db";
import { ComponentShowcase } from "./ComponentShowcase";
import { loadDesignTokens } from "./tokens";
import "./design.css";

export const instant = false;

export const metadata: Metadata = {
  title: "Design System — Coffee Corner",
  description: "Artisanal Thai Roast: สี ตัวอักษร ระยะห่าง มุมโค้ง และคอมโพเนนต์ของ Coffee Corner",
};

const specimenClasses: Record<string, string> = {
  "display-hero": "text-display-hero",
  "display-hero-mobile": "text-display-hero-mobile",
  "headline-lg": "text-headline-lg",
  "headline-sm": "text-headline-sm",
  "body-lg": "text-body-lg",
  "body-md": "text-body-md",
  "body-sm": "text-body-sm",
  "label-lg": "text-label-lg",
  "label-md": "text-label-md",
  "label-sm": "text-label-sm",
  "label-micro": "text-label-micro",
};

function SectionHeading({ number, title, description, id }: {
  number: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-line pb-6">
      <div>
        <p className="section-kicker">{number} / DESIGN TOKENS</p>
        <h2 className="text-[28px] font-bold leading-[1.3] tracking-[-.03em] text-primary sm:text-[34px]" id={id}>{title}</h2>
        <p className="mt-2 max-w-2xl text-body-md text-muted">{description}</p>
      </div>
      <span className="text-[12px] font-semibold tracking-[.12em] text-secondary">COFFEE CORNER ✳</span>
    </div>
  );
}

export default async function DesignPage() {
  await connection();
  const [menu, categories] = await Promise.all([getMenu(), getCategories()]);
  const { name, colors, typography, spacing, rounded } = loadDesignTokens();
  const botanicals = colors.filter(({ name }) => /tertiary|sage|error|danger/.test(name));
  const surfaces = colors.filter(({ name }) =>
    /surface|background|outline|ink|muted|paper|line/.test(name) && !botanicals.some((token) => token.name === name),
  );
  const roast = colors.filter(({ name }) => !surfaces.some((token) => token.name === name) && !botanicals.some((token) => token.name === name));
  const groups = [
    { title: "01 — Canvas & surfaces", subtitle: "พื้นผิว หมึก และเส้นขอบ", tokens: surfaces },
    { title: "02 — Roast & caramel", subtitle: "น้ำหนักของกาแฟและความอบอุ่นของคาราเมล", tokens: roast },
    { title: "03 — Botanical & feedback", subtitle: "สีสมุนไพร สถานะสำเร็จ และข้อผิดพลาด", tokens: botanicals },
  ];

  return (
    <>
      <SiteHeader currentPage="design" />
      <main className="page-shell pb-20 pt-5 sm:pt-8">
        <section className="design-cover relative overflow-hidden rounded-[22px] px-7 py-10 text-surface sm:px-12 sm:py-14">
          <div className="relative z-[1] max-w-[690px]">
            <p className="mb-6 text-label-sm font-bold tracking-[.18em] text-secondary-container">COFFEE CORNER / DESIGN LANGUAGE 01</p>
            <h1 className="font-display text-display-hero-mobile font-bold sm:text-display-hero">
              {name.split(" ")[0]}{" "}<br />
              <span className="text-secondary-container">{name.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="mt-5 max-w-[570px] text-body-lg text-primary-fixed">
              ระบบภาพลักษณ์ที่ถ่ายทอดความหอมอุ่นของกาแฟไทยผ่านสีคั่วเข้ม พื้นกระดาษนุ่ม และตัวอักษรที่อ่านง่ายทั้งไทยและอังกฤษ
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-surface/25 pt-5 text-label-sm font-semibold text-primary-fixed">
              <span>{colors.length} COLOR TOKENS</span>
              <span>{typography.length} TYPE STYLES</span>
              <span>ONE DAILY RITUAL ✳</span>
            </div>
          </div>
          <div className="design-cover-art" aria-hidden="true">☕</div>
        </section>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="สารบัญ Design System">
          {[
            ["#palette", "01 / สี"],
            ["#typography", "02 / ตัวอักษร"],
            ["#geometry", "03 / ระยะและมุม"],
            ["#components", "04 / คอมโพเนนต์"],
          ].map(([href, label]) => (
            <a key={href} className="header-action inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 text-label-md font-semibold text-primary no-underline" href={href}>{label}</a>
          ))}
        </nav>

        <section className="paper-panel mt-9 scroll-mt-6 rounded-[22px] p-5 sm:p-8" id="palette" aria-labelledby="palette-title">
          <SectionHeading number="01" title="Color palette / ชุดสี" id="palette-title" description="สีทั้งหมดอ่านจาก DESIGN.md โดยตรง ชื่อ token ใช้ร่วมกับ Tailwind theme ในหน้าเว็บจริง" />
          <div className="grid gap-10">
            {groups.map((group) => (
              <div key={group.title}>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-headline-sm font-bold text-primary">{group.title}</h3>
                  <span className="text-body-sm text-muted">{group.subtitle} · {group.tokens.length} สี</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {group.tokens.map((color) => (
                    <figure className="min-w-0 overflow-hidden rounded-[14px] border border-line bg-paper" key={color.name}>
                      <div className="design-swatch h-[86px]" style={{ backgroundColor: color.value }} aria-label={`สี ${color.value}`} role="img" />
                      <figcaption className="min-w-0 px-3 pb-3 pt-2.5">
                        <span className="block break-all font-mono text-[10px] font-semibold leading-[1.35] text-primary">--color-{color.name}</span>
                        <span className="mt-1 block font-mono text-[11px] uppercase text-muted">{color.value}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="paper-panel mt-6 scroll-mt-6 rounded-[22px] p-5 sm:p-8" id="typography" aria-labelledby="typography-title">
          <SectionHeading number="02" title="Typography / ตัวอักษร" id="typography-title" description="IBM Plex Sans สำหรับ Latin ผสาน IBM Plex Sans Thai เพื่อให้อ่านภาษาไทยได้ชัดเจน ตัวอย่างด้านล่างแสดงครบทุกระดับ" />
          <div className="grid gap-3">
            {typography.map((token) => (
              <div className="rounded-[16px] border border-line bg-surface/55 p-4 sm:p-5" key={token.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-mono text-[12px] font-semibold text-primary">text-{token.name}</h3>
                  <span className="font-mono text-[11px] text-muted">{token.fontSize} · {token.fontWeight} · lh {token.lineHeight} · ls {token.letterSpacing}</span>
                </div>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <div className="min-w-0">
                    <span className="mb-2 block text-label-micro font-bold tracking-[.14em] text-secondary">TH / ภาษาไทย</span>
                    <p className={`font-display break-words text-primary ${specimenClasses[token.name] ?? ""}`} style={{ fontSize: token.fontSize, fontWeight: Number(token.fontWeight), lineHeight: token.lineHeight, letterSpacing: token.letterSpacing }}>พักสักนิด แล้วเติมแก้วโปรด</p>
                  </div>
                  <div className="min-w-0">
                    <span className="mb-2 block text-label-micro font-bold tracking-[.14em] text-secondary">EN / ENGLISH</span>
                    <p className={`font-display break-words text-primary ${specimenClasses[token.name] ?? ""}`} style={{ fontSize: token.fontSize, fontWeight: Number(token.fontWeight), lineHeight: token.lineHeight, letterSpacing: token.letterSpacing }}>Good coffee, better days.</p>
                  </div>
                </div>
                <p className="mt-4 border-t border-line pt-3 text-label-sm text-muted">{token.fontFamily} + IBM Plex Sans Thai</p>
              </div>
            ))}
          </div>
        </section>

        <section className="paper-panel mt-6 scroll-mt-6 rounded-[22px] p-5 sm:p-8" id="geometry" aria-labelledby="geometry-title">
          <SectionHeading number="03" title="Spacing & shape / ระยะและมุม" id="geometry-title" description="สเกลระยะห่างและมุมโค้งจาก DESIGN.md เพื่อรักษาจังหวะและความนุ่มของทุกพื้นผิว" />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h3 className="mb-4 text-headline-sm font-bold text-primary">Spacing scale</h3>
              <div className="grid gap-2">
                {spacing.map((token) => (
                  <div className="flex min-h-14 items-center gap-3 rounded-[12px] border border-line bg-surface/55 px-4 py-2" key={token.name}>
                    <span className="w-27 shrink-0 font-mono text-[11px] text-on-surface-variant sm:w-36">{token.name}</span>
                    <span className="h-3 shrink-0 rounded-full bg-secondary-container" style={{ width: token.value }} aria-hidden="true" />
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-muted">{token.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-headline-sm font-bold text-primary">Corner radius</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                {rounded.map((token) => (
                  <div className="grid min-h-[135px] place-items-center gap-2 rounded-[14px] border border-line bg-surface/55 px-3 py-4 text-center" key={token.name}>
                    <span className="block h-14 w-14 border border-primary/15 bg-surface-container-high shadow-[0_8px_16px_rgb(57_42_29_/_8%)]" style={{ borderRadius: token.value }} aria-hidden="true" />
                    <span className="font-mono text-[11px] text-primary">{token.name} <span className="text-muted">/ {token.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="paper-panel mt-6 scroll-mt-6 rounded-[22px] p-5 sm:p-8" id="components" aria-labelledby="components-title">
          <SectionHeading number="04" title="Components / คอมโพเนนต์" id="components-title" description="ตัวอย่างใช้งานจากคอมโพเนนต์และสไตล์เดียวกับหน้าแรก — ลองกดตัวกรองหรือทดลองพิมพ์ในช่องกรอกได้" />
          <ComponentShowcase menu={menu} categories={categories} />
        </section>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/70 pt-6 text-body-sm text-muted">
          <span>{name} · Design reference: DESIGN.md</span>
          <Link href="/" className="font-semibold text-primary underline decoration-secondary-container underline-offset-4">กลับไปหน้าเมนู ↗</Link>
        </div>
      </main>
    </>
  );
}
