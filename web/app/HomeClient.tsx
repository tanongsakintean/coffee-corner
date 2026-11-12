"use client";

import { useRef, useState, type FormEvent } from "react";
import { placeOrder } from "./actions";
import { FilterButton } from "./components/FilterButton";
import { MenuCard } from "./components/MenuCard";
import { OrderCard } from "./components/OrderCard";
import { PrimaryButton } from "./components/PrimaryButton";
import { SiteHeader } from "./components/SiteHeader";
import { formatBaht, type MenuItem, type Order } from "./menu";

type Field = "name" | "drink" | "quantity";
type Message = { text: string; kind: "error" | "success" | "notice" | "" };

export function HomeClient({ menu, categories, initialOrders }: { menu: MenuItem[]; categories: string[]; initialOrders: Order[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orders, setOrders] = useState(initialOrders);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<Message>({ text: "", kind: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [name, setName] = useState("");
  const [drink, setDrink] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const drinkRef = useRef<HTMLSelectElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const visibleMenu = menu.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory,
  );

  function clearError(field: Field) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setMessage({ text: "", kind: "" });

    const trimmedName = name.trim();
    const item = menu.find((entry) => entry.id === Number(drink));
    const amount = Number(quantity);
    if (!trimmedName) {
      setErrors({ name: "กรุณากรอกชื่อผู้สั่ง" });
      setMessage({ text: "ตรวจสอบข้อมูลที่ระบุแล้วลองอีกครั้ง", kind: "error" });
      nameRef.current?.focus();
      return;
    }
    if (!item || !item.available) {
      setErrors({ drink: item ? "เมนูนี้หมดแล้ว กรุณาเลือกเมนูอื่น" : "กรุณาเลือกเมนู" });
      setMessage({ text: "ตรวจสอบข้อมูลที่ระบุแล้วลองอีกครั้ง", kind: "error" });
      drinkRef.current?.focus();
      return;
    }
    if (!Number.isInteger(amount) || amount < 1 || amount > 5) {
      setErrors({ quantity: "จำนวนต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 5 แก้ว" });
      setMessage({ text: "ตรวจสอบข้อมูลที่ระบุแล้วลองอีกครั้ง", kind: "error" });
      quantityRef.current?.focus();
      return;
    }

    setPending(true);
    let result: Awaited<ReturnType<typeof placeOrder>>;
    try {
      result = await placeOrder({ name: trimmedName, drink, quantity, note });
    } catch {
      setMessage({ text: "บันทึกออเดอร์ไม่สำเร็จ กรุณาลองอีกครั้ง", kind: "error" });
      setPending(false);
      return;
    }
    setPending(false);
    if (!result.orders) {
      if (result.error && result.error !== "server") setErrors({ [result.error]: result.message });
      setMessage({ text: result.message ?? "บันทึกออเดอร์ไม่สำเร็จ", kind: "error" });
      return;
    }
    setOrders(result.orders);
    setName("");
    setDrink("");
    setQuantity("1");
    setNote("");
    setMessage({
      text: `รับออเดอร์แล้ว · รวม ${formatBaht(item.price * amount)} และบันทึกลงฐานข้อมูลแล้ว`,
      kind: "success",
    });
  }

  return (
    <>
      <SiteHeader />

      <main className="page-shell pb-16 pt-5 sm:pt-8">
        <section className="hero-card relative grid min-h-[388px] overflow-hidden rounded-[22px] lg:grid-cols-[minmax(0,1.13fr)_minmax(270px,.87fr)]" aria-labelledby="hero-title">
          <div className="hero-copy relative z-[1] flex flex-col items-start justify-center px-7 py-12 sm:px-12 lg:py-16">
            <p className="mb-6 inline-flex items-center gap-2.5 text-label-sm font-bold tracking-[.18em] text-secondary-container">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" aria-hidden="true" />
              YOUR DAILY COFFEE BREAK
            </p>
            <h1 id="hero-title" className="max-w-[600px] text-display-hero-mobile font-bold tracking-[-.04em] text-surface sm:text-display-hero">
              พักสักนิด<br />แล้วเติม<span className="text-secondary-container">แก้วโปรด</span>
            </h1>
            <p className="mt-5 max-w-[440px] text-body-lg text-primary-fixed">
              เลือกเครื่องดื่มที่ชอบ สั่งไว้ก่อนได้เลย แล้วค่อยแวะมารับตอนพร้อม
            </p>
            <a href="#menu" className="hero-link mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border border-surface/35 px-5 text-label-lg font-semibold text-surface no-underline">
              ดูเมนูทั้งหมด <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-rings">
              <div className="coffee-saucer"><div className="coffee-cup"><div className="coffee-crema" /></div></div>
            </div>
            <span className="hero-stamp">GOOD COFFEE<br /><strong>GOOD DAY</strong><small>✳</small></span>
            <span className="hero-bean hero-bean--one" />
            <span className="hero-bean hero-bean--two" />
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/70 pb-6 text-label-sm text-muted">
          <span>สดใหม่ทุกแก้ว · สั่งง่ายในวันทำงาน</span>
          <span className="font-semibold tracking-[.08em] text-secondary">CRAFTED FOR YOUR BREAK <span aria-hidden="true">✳</span></span>
        </div>

        <div className="mt-9 grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,.75fr)]">
          <section className="paper-panel scroll-mt-6 rounded-[22px] p-5 sm:p-7" id="menu" aria-labelledby="menu-title">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">01 / THE MENU</p>
                <h2 id="menu-title" className="text-headline-lg font-bold text-primary">เลือกแก้วที่ใช่</h2>
                <p className="mt-2 text-body-md text-muted">ชงสดทุกแก้ว เติมพลังระหว่างวัน</p>
              </div>
              <span className="shrink-0 rounded-full bg-surface-container px-3 py-1.5 text-label-sm font-semibold text-primary" id="menu-count">{visibleMenu.length} เมนู</span>
            </div>

            <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="กรองเมนูตามหมวด">
              {["All", ...categories].map((category) => (
                <FilterButton category={category} selected={selectedCategory === category} onSelect={() => setSelectedCategory(category)} key={category} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 xl:grid-cols-3" id="menu-grid" aria-live="polite">
              {visibleMenu.map((item) => (
                <MenuCard item={item} key={item.id} />
              ))}
            </div>
          </section>

          <section className="paper-panel rounded-[22px] p-5 sm:p-7 lg:sticky lg:top-6" aria-labelledby="order-title">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">02 / PLACE AN ORDER</p>
                <h2 id="order-title" className="text-headline-lg font-bold text-primary">สั่งเครื่องดื่ม</h2>
                <p className="mt-2 text-body-md text-muted">หนึ่งออเดอร์เลือกได้หนึ่งเมนู</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-light text-[20px] text-tertiary" aria-hidden="true">✳</span>
            </div>

            <form id="order-form" className="grid scroll-mt-6 gap-5" noValidate onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="customer-name">ชื่อผู้สั่ง</label>
                <input className="field-control" id="customer-name" ref={nameRef} name="customerName" type="text" autoComplete="name" maxLength={80} placeholder="เช่น มินตรา" required aria-describedby="name-error" aria-invalid={errors.name ? true : undefined} value={name} onChange={(event) => { setName(event.target.value); clearError("name"); }} />
                <p className="field-error" id="name-error" hidden={!errors.name}>{errors.name}</p>
              </div>

              <div className="grid gap-2">
                <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="drink">เมนูที่เลือก</label>
                <select className="field-control" id="drink" ref={drinkRef} name="drink" required aria-describedby="drink-error" aria-invalid={errors.drink ? true : undefined} value={drink} onChange={(event) => { setDrink(event.target.value); clearError("drink"); }}>
                  <option value="">เลือกเครื่องดื่ม</option>
                  {menu.map((item) => (
                    <option key={item.id} value={item.id} disabled={!item.available}>
                      {item.name} — {item.price} บาท{item.available ? "" : " · หมด"}
                    </option>
                  ))}
                </select>
                <p className="field-error" id="drink-error" hidden={!errors.drink}>{errors.drink}</p>
              </div>

              <div className="grid gap-2">
                <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="quantity">จำนวน <span className="font-normal text-muted">(1–5 แก้ว)</span></label>
                <input className="field-control" id="quantity" ref={quantityRef} name="quantity" type="number" min="1" max="5" step="1" value={quantity} inputMode="numeric" required aria-describedby="quantity-error" aria-invalid={errors.quantity ? true : undefined} onChange={(event) => { setQuantity(event.target.value); clearError("quantity"); }} />
                <p className="field-error" id="quantity-error" hidden={!errors.quantity}>{errors.quantity}</p>
              </div>

              <div className="grid gap-2">
                <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="note">หมายเหตุ <span className="font-normal text-muted">(ไม่บังคับ)</span></label>
                <textarea className="field-control min-h-[92px] resize-y" id="note" name="note" maxLength={200} placeholder="เช่น หวานน้อย ไม่ใส่น้ำแข็ง" value={note} onChange={(event) => setNote(event.target.value)} />
              </div>

              <p className={`form-message${message.kind ? ` form-message--${message.kind}` : ""}`} id="form-message" role="status" aria-live="polite">{message.text}</p>
              <PrimaryButton type="submit" disabled={pending}><span aria-hidden="true">＋</span> {pending ? "กำลังบันทึก..." : "ยืนยันออเดอร์"} <span aria-hidden="true">↗</span></PrimaryButton>
            </form>
            <p className="mt-5 border-t border-line pt-4 text-center text-label-sm leading-relaxed text-muted">ออเดอร์บันทึกลงฐานข้อมูลของร้าน<br />ไม่เชื่อมบัญชีผู้ใช้หรือระบบชำระเงิน</p>
          </section>
        </div>

        <section className="paper-panel mt-6 scroll-mt-6 rounded-[22px] p-5 sm:p-7" id="orders" aria-labelledby="orders-title">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">03 / FRESHLY PLACED</p>
              <h2 id="orders-title" className="text-headline-lg font-bold text-primary">ออเดอร์ล่าสุด</h2>
            </div>
            <span className="shrink-0 text-label-md font-semibold text-muted" id="orders-count">{orders.length} รายการ</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2" id="orders-list" aria-live="polite">
            {orders.length === 0 ? (
              <div className="empty-orders col-span-full rounded-[16px] border border-dashed border-outline-variant bg-surface/50 px-5 py-10 text-center text-body-md text-muted">
                <span className="mb-3 block text-2xl" aria-hidden="true">✳</span>
                ยังไม่มีออเดอร์ ลองสั่งแก้วโปรดเป็นรายการแรกได้เลย
              </div>
            ) : orders.map((order, index) => {
              return <OrderCard key={order.id} order={order} number={orders.length - index} drinkName={order.drinkName} />;
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant/60 bg-surface-container-low py-8">
        <div className="page-shell flex flex-wrap items-center justify-between gap-3 text-label-sm text-muted">
          <span className="font-bold text-primary">coffee corner <span className="font-normal text-muted">· สั่งง่าย จิบสบาย ในวันทำงาน</span></span>
          <span>MADE FOR THE LITTLE BREAKS <span aria-hidden="true">✳</span></span>
        </div>
      </footer>
    </>
  );
}
