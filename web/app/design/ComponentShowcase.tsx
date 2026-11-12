"use client";

import Link from "next/link";
import { useState } from "react";
import { FilterButton } from "../components/FilterButton";
import { MenuCard } from "../components/MenuCard";
import { PrimaryButton } from "../components/PrimaryButton";
import type { MenuItem } from "../menu";

export function ComponentShowcase({ menu, categories }: { menu: MenuItem[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const visibleMenu = menu.filter((item) => category === "All" || item.category === category);

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-[18px] border border-line bg-surface-container-low p-5 sm:p-6">
          <p className="section-kicker">BUTTONS / ปุ่ม</p>
          <h3 className="text-headline-sm font-bold text-primary">ชัดเจน และชวนให้กด</h3>
          <p className="mt-2 text-body-md text-muted">ปุ่มหลักใช้สีคั่วเข้ม ส่วนปุ่มรองใช้พื้นกระดาษและเส้นขอบโทนอุ่น</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PrimaryButton className="max-w-[190px]" type="button">ยืนยันออเดอร์ <span aria-hidden="true">↗</span></PrimaryButton>
            <Link className="header-action inline-flex min-h-11 items-center rounded-full border border-primary/15 bg-paper px-5 text-label-md font-semibold text-primary no-underline" href="/#menu">ดูเมนูทั้งหมด</Link>
          </div>
        </div>
        <div className="rounded-[18px] border border-line bg-surface-container-low p-5 sm:p-6">
          <p className="section-kicker">FILTER PILLS / หมวดหมู่</p>
          <h3 className="text-headline-sm font-bold text-primary">เลือกสิ่งที่อยากดื่ม</h3>
          <p className="mt-2 text-body-md text-muted">ปุ่มตัวกรองชุดเดียวกับหน้าเมนู ลองเลือกเพื่อดูรายการจริง</p>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="ตัวอย่างตัวกรองหมวดเครื่องดื่ม">
            {["All", ...categories].map((item) => (
              <FilterButton key={item} category={item} selected={category === item} onSelect={() => setCategory(item)} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-[18px] border border-line bg-surface-container-low p-5 sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">MENU CARDS / รายการเครื่องดื่ม</p>
              <h3 className="text-headline-sm font-bold text-primary">หน้าตาจริงจากหน้าเมนู</h3>
            </div>
            <span className="shrink-0 text-label-sm text-muted">{visibleMenu.length} เมนู</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-live="polite" data-testid="design-menu-grid">
            {visibleMenu.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
          <p className="mt-4 text-body-sm text-muted">Mocha แสดงป้าย &ldquo;หมด&rdquo; และเลือกสั่งซื้อไม่ได้ในหน้าแรก</p>
        </div>

        <div className="rounded-[18px] border border-line bg-surface-container-low p-5 sm:p-6">
          <p className="section-kicker">FORM FIELDS / ช่องกรอก</p>
          <h3 className="text-headline-sm font-bold text-primary">พื้นที่สำหรับคำสั่งซื้อ</h3>
          <p className="mt-2 text-body-md text-muted">ตัวอย่างช่องกรอกแบบเดียวกับฟอร์มสั่งซื้อจริง แต่ไม่ส่งออเดอร์</p>
          <div className="mt-6 grid gap-5">
            <div className="grid gap-2">
              <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="design-name">ชื่อผู้สั่ง</label>
              <input className="field-control" id="design-name" type="text" placeholder="เช่น มินตรา" />
            </div>
            <div className="grid gap-2">
              <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="design-drink">เมนูที่เลือก</label>
              <select className="field-control" id="design-drink" defaultValue="">
                <option value="">เลือกเครื่องดื่ม</option>
                {menu.map((item) => <option key={item.id} value={item.id} disabled={!item.available}>{item.name} — {item.price} บาท{item.available ? "" : " · หมด"}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="design-note">หมายเหตุ <span className="font-normal text-muted">(ไม่บังคับ)</span></label>
              <textarea className="field-control min-h-[92px] resize-y" id="design-note" placeholder="เช่น หวานน้อย ไม่ใส่น้ำแข็ง" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
