import Link from "next/link";

export function SiteHeader({ currentPage = "home" }: { currentPage?: "home" | "design" | "orders" | "database" }) {
  return (
    <header className="relative z-10 border-b border-outline-variant/45 bg-surface/90">
      <div className="mx-auto flex min-h-[82px] max-w-[1216px] flex-wrap items-center justify-between gap-x-3 px-5 sm:px-8 md:flex-nowrap md:gap-x-5 xl:px-10">
        <Link className="inline-flex shrink-0 items-center gap-3 text-primary no-underline" href="/" aria-label="Coffee Corner หน้าแรก">
          <span className="brand-seal" aria-hidden="true">☕</span>
          <span className="flex flex-col leading-none">
            <span className="text-headline-sm font-bold tracking-[-.04em]">coffee corner</span>
            <span className="mt-1.5 text-[9px] font-bold tracking-[.24em] text-secondary">YOUR DAILY CUP</span>
          </span>
        </Link>
        <nav className="order-3 flex w-full items-center justify-center gap-3 border-t border-line py-3 text-label-md font-semibold text-on-surface-variant sm:gap-5 md:order-none md:w-auto md:border-0 md:py-0" aria-label="เมนูหลัก">
          <Link className="nav-link hidden lg:inline" href="/#menu">เมนูเครื่องดื่ม</Link>
          <Link className="nav-link hidden lg:inline" href="/#orders">ออเดอร์ล่าสุด</Link>
          <Link className={`nav-link ${currentPage === "orders" ? "text-secondary" : ""}`} href="/orders" aria-current={currentPage === "orders" ? "page" : undefined}>ประวัติออเดอร์</Link>
          <Link className={`nav-link ${currentPage === "design" ? "text-secondary" : ""}`} href="/design" aria-current={currentPage === "design" ? "page" : undefined}>Design System</Link>
          <Link className={`nav-link ${currentPage === "database" ? "text-secondary" : ""}`} href="/docs/database" aria-current={currentPage === "database" ? "page" : undefined}>Database Doc</Link>
        </nav>
        <Link className="header-action inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/15 bg-paper px-3 text-label-md font-semibold text-primary no-underline sm:px-5" href="/#order-form">
          สั่งล่วงหน้า <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
