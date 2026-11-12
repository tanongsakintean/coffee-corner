import type { MenuItem } from "../menu";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className={`menu-card group min-w-0 overflow-hidden rounded-[18px] border border-line bg-paper${item.available ? "" : " is-sold-out"}`} data-menu-id={item.id}>
      <div className={`menu-art menu-art--${item.category.toLowerCase()} relative grid h-36 place-items-center overflow-hidden sm:h-40`} aria-hidden="true">
        <span className="drink-orbit" />
        <span className="drink-illustration">{item.icon}</span>
        {!item.available && <span className="sold-out-badge absolute right-3 top-3 rounded-full bg-danger-surface px-3 py-1 text-label-sm font-semibold text-danger">หมด</span>}
        <span className="absolute bottom-3 left-3 rounded-full border border-primary/10 bg-paper/80 px-2.5 py-1 text-[10px] font-bold tracking-[.12em] text-primary">{item.category.toUpperCase()}</span>
      </div>
      <div className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <h3 className="truncate text-headline-sm font-bold text-primary">{item.name}{!item.available && <span className="sr-only"> หมด</span>}</h3>
        <div className="mt-3 flex items-end justify-between gap-2 border-t border-line pt-3">
          <p className="text-label-sm text-muted">ต่อแก้ว</p>
          <p className="text-headline-sm font-bold text-primary">{item.price} <span className="text-label-md font-medium">บาท</span></p>
        </div>
      </div>
    </article>
  );
}
