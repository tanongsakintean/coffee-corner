import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { SiteHeader } from "../components/SiteHeader";
import { getMenu, getOrders } from "../db";
import { OrderHistory } from "./OrderHistory";

export const instant = false;

export const metadata: Metadata = {
  title: "ประวัติออเดอร์ — Coffee Corner",
  description: "ดูสรุปและประวัติออเดอร์เครื่องดื่มที่บันทึกไว้ในฐานข้อมูล",
};

export default async function OrdersPage() {
  await connection();
  const [orders, menu] = await Promise.all([getOrders(), getMenu()]);
  return (
    <>
      <SiteHeader currentPage="orders" />
      <main className="page-shell pb-20 pt-5 sm:pt-8">
        <section className="paper-panel rounded-[22px] p-6 sm:p-9" aria-labelledby="orders-page-title">
          <p className="section-kicker">COFFEE CORNER / ORDER ARCHIVE</p>
          <h1 className="text-display-hero-mobile font-bold text-primary sm:text-display-hero" id="orders-page-title">ประวัติออเดอร์</h1>
          <p className="mt-3 max-w-2xl text-body-lg text-muted">
            ทุกแก้วที่สั่งไว้ในฐานข้อมูลของร้าน สรุปยอดและดูรายละเอียดได้ในที่เดียว
          </p>
          <Link className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line bg-surface-container-low px-5 text-label-md font-semibold text-primary no-underline" href="/#order-form">
            สั่งเครื่องดื่มเพิ่ม <span className="ml-2" aria-hidden="true">↗</span>
          </Link>
        </section>
        <OrderHistory orders={orders} menu={menu} />
      </main>
    </>
  );
}
