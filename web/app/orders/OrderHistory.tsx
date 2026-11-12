import Link from "next/link";
import { formatBaht, type MenuItem, type Order } from "../menu";

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="paper-panel min-w-0 rounded-[18px] p-5 sm:p-6">
      <p className="text-label-md font-semibold text-muted">{label}</p>
      <p className="mt-3 break-words text-headline-lg font-bold text-primary">{value}</p>
      <p className="mt-3 border-t border-line pt-3 text-label-sm text-secondary">{detail}</p>
    </article>
  );
}

export function OrderHistory({ orders, menu }: { orders: Order[]; menu: MenuItem[] }) {
  const cupCount = orders.reduce((total, order) => total + order.quantity, 0);
  const totalBaht = orders.reduce((total, order) => total + order.total, 0);
  const cupsByDrink = new Map<number, number>();
  for (const order of orders) {
    cupsByDrink.set(order.drinkId, (cupsByDrink.get(order.drinkId) ?? 0) + order.quantity);
  }
  const bestseller = menu.reduce<MenuItem | null>((best, item) => {
    return !best || (cupsByDrink.get(item.id) ?? 0) > (cupsByDrink.get(best.id) ?? 0) ? item : best;
  }, null);
  const bestCups = bestseller ? cupsByDrink.get(bestseller.id) ?? 0 : 0;
  const stats = [
    { label: "จำนวนออเดอร์", value: orders.length.toLocaleString("th-TH"), detail: "รายการที่บันทึกไว้" },
    { label: "จำนวนแก้ว", value: cupCount.toLocaleString("th-TH"), detail: "แก้วทั้งหมด" },
    { label: "ยอดรวม (บาท)", value: formatBaht(totalBaht), detail: "รวมทุกออเดอร์" },
    { label: "เมนูขายดี", value: bestseller && bestCups ? bestseller.name : "—", detail: bestCups ? `${bestCups.toLocaleString("th-TH")} แก้ว · นับตามจำนวนแก้ว` : "ยังไม่มีข้อมูล" },
  ];

  return (
    <>
      <section className="mt-6" aria-labelledby="summary-title">
        <div className="mb-4">
          <p className="section-kicker">01 / AT A GLANCE</p>
          <h2 className="text-headline-lg font-bold text-primary" id="summary-title">ภาพรวมการสั่งซื้อ</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>
      </section>

      <section className="paper-panel mt-6 rounded-[22px] p-5 sm:p-8" aria-labelledby="history-title">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="section-kicker">02 / EVERY CUP</p>
            <h2 className="text-headline-lg font-bold text-primary" id="history-title">ออเดอร์ทั้งหมด</h2>
          </div>
          <span className="rounded-full bg-surface-container px-3 py-1.5 text-label-sm font-semibold text-primary">{orders.length} รายการ</span>
        </div>
        <div className="overflow-x-auto rounded-[12px] border border-line" role="region" aria-label="ตารางออเดอร์ทั้งหมด" tabIndex={0}>
          <table className="w-full min-w-[680px] border-collapse text-left text-body-md">
            <thead className="bg-surface-container-low text-label-md font-semibold text-on-surface-variant">
              <tr>
                <th className="px-4 py-4 font-semibold" scope="col">ผู้สั่ง</th>
                <th className="px-4 py-4 font-semibold" scope="col">เมนู</th>
                <th className="px-4 py-4 text-center font-semibold" scope="col">จำนวน</th>
                <th className="px-4 py-4 font-semibold" scope="col">หมายเหตุ</th>
                <th className="px-4 py-4 text-right font-semibold" scope="col">ราคารวม</th>
              </tr>
            </thead>
            <tbody className="bg-paper text-on-surface-variant">
              {orders.length === 0 ? (
                <tr>
                  <td className="px-5 py-10 text-center text-muted" colSpan={5}>
                    ยังไม่มีออเดอร์ <Link className="font-semibold text-primary underline decoration-secondary-container underline-offset-4" href="/#order-form">สั่งแก้วแรกได้เลย ↗</Link>
                  </td>
                </tr>
              ) : orders.map((order) => {
                return (
                  <tr className="border-t border-line" key={order.id}>
                    <th className="px-4 py-4 align-top font-semibold text-primary" scope="row">
                      {order.name}
                      <time className="mt-1 block text-label-sm font-normal text-muted" dateTime={order.createdAt}>
                        {new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.createdAt))}
                      </time>
                    </th>
                    <td className="px-4 py-4 align-top">{order.drinkName}</td>
                    <td className="px-4 py-4 text-center align-top">{order.quantity} แก้ว</td>
                    <td className="max-w-[240px] break-words px-4 py-4 align-top text-muted">{order.note || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-right align-top font-bold text-primary">{formatBaht(order.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-label-sm text-muted">ข้อมูลอ่านจากฐานข้อมูลของร้าน ไม่เชื่อมบัญชีผู้ใช้หรือระบบชำระเงิน</p>
      </section>
    </>
  );
}
