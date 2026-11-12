import { formatBaht, type Order } from "../menu";

export function OrderCard({ order, number, drinkName }: { order: Order; number: number; drinkName: string }) {
  return (
    <article className="order-card min-w-0 rounded-[16px] border border-line bg-paper p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-label-micro font-bold uppercase tracking-[.16em] text-secondary">ORDER / {String(number).padStart(2, "0")}</p>
          <h3 className="mt-2 truncate text-headline-sm font-bold text-primary">{order.name}</h3>
        </div>
        <p className="shrink-0 text-headline-sm font-bold text-primary">{formatBaht(order.total)}</p>
      </div>
      <p className="mt-3 text-body-sm text-on-surface-variant">{drinkName} · {order.quantity} แก้ว</p>
      {order.note && <p className="mt-1.5 break-words text-body-sm text-muted">หมายเหตุ: {order.note}</p>}
      <time className="mt-4 block border-t border-dashed border-outline-variant pt-3 text-label-sm text-muted">
        ออเดอร์ #{number} · {new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.createdAt))}
      </time>
    </article>
  );
}
