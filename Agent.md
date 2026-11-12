# Coffee Corner - สรุปงาน

## ภาพรวม

- โปรเจกต์เดิมเป็นหน้าเดียวใน `index.html` ซึ่งยังเก็บไว้เป็นต้นฉบับและใช้เทียบพฤติกรรมได้
- สร้างแอปใน `web/` ด้วย Next.js 16 (App Router), React 19, TypeScript และ Tailwind CSS 4; ปัจจุบันอ่าน/เขียน SQLite ผ่าน Server Components และ Server Action
- คัดลอก `DESIGN.md` ไปที่ `web/DESIGN.md` และใช้เป็นแหล่งอ้างอิงของสี ตัวอักษร ระยะห่าง และมุมโค้ง
- SQLite ใช้ `node:sqlite` ที่มากับ Node.js 22 ไม่ได้เพิ่ม SQLite package; อัปเดต `@types/node` ให้ตรงกับ runtime

## หน้าและฟีเจอร์

| เส้นทาง | ไฟล์หลัก | สิ่งที่ทำ |
| --- | --- | --- |
| `/` | `web/app/page.tsx`, `web/app/HomeClient.tsx` | ย้ายหน้าเดิมมาเป็น React; อ่านเมนูทั้งหมดจาก `menu_items` กรองหมวด แสดงป้ายหมด บันทึกฟอร์มลง SQLite และแสดงออเดอร์ล่าสุด |
| `/design` | `web/app/design/page.tsx` | แสดง Artisanal Thai Roast, palette ทุก token พร้อมรหัสสี, typography ไทย/อังกฤษทุกระดับ, spacing, radius และตัวอย่าง component ที่ใช้งานจริง |
| `/orders` | `web/app/orders/page.tsx`, `web/app/orders/OrderHistory.tsx` | อ่านออเดอร์จากฐานข้อมูล พร้อม stat-card 4 ใบและตารางผู้สั่ง เมนู จำนวน หมายเหตุ และราคารวม |

- ฟอร์มหน้าแรกตรวจชื่อ เมนูที่ยังขาย และจำนวนเต็ม 1-5 แก้วทั้งฝั่งหน้าเว็บและ server; ราคารวมคำนวณจากราคาเมนูคูณจำนวน ออเดอร์ใหม่แสดงก่อน
- `web/app/db.ts` อ่าน `../data/coffee.db` ฝั่ง server; `web/app/actions.ts` ตรวจข้อมูลแล้วบันทึกออเดอร์ด้วยคำสั่ง SQL แบบ parameterized ไม่ใช้ `localStorage` อีกต่อไป
- หน้า `/orders` สรุปจำนวนออเดอร์ จำนวนแก้ว ยอดรวม และเมนูขายดีโดยนับตามจำนวนแก้ว; ตารางเลื่อนแนวนอนได้บนจอแคบ
- `SiteHeader` มีลิงก์ไปหน้าเมนู ประวัติออเดอร์ และ Design System; หน้าแรกยังมีส่วนออเดอร์ล่าสุดแยกจากหน้าประวัติ

## โครงสร้าง Design System

- `web/app/globals.css` ตั้งค่า Tailwind theme จาก `DESIGN.md` รวม palette, IBM Plex Sans / IBM Plex Sans Thai, ขนาดตัวอักษร, spacing และ radius
- `web/app/design/tokens.ts` อ่าน token จาก `web/DESIGN.md` เพื่อแสดงใน `/design` (ขณะสร้างหน้า); ตัวอย่างที่แสดงมี 56 สี, 11 ระดับตัวอักษร, 10 ระยะห่าง และ 6 มุมโค้ง
- Component ที่ใช้ร่วมกันอยู่ใน `web/app/components/`: `SiteHeader`, `MenuCard`, `FilterButton`, `PrimaryButton` และ `OrderCard`; หน้า Design System นำ component จริงมาแสดง
- หน้าตาของ `/orders` ใช้ theme, `paper-panel` และองค์ประกอบตาม Design System เดิม ไม่มี stylesheet ใหม่เฉพาะหน้านี้

## ฐานข้อมูลและตัวอย่างข้อมูล

- `data/schema.sql` กำหนดตาราง `categories` (3 แถว), `menu_items` (10 แถว) และ `orders` (6 แถวใน snapshot นี้); `data/seed.sql` เก็บข้อมูลต้นทางจาก Google Sheet ก่อนออเดอร์ทดสอบ
- `menu_items.category` อ้างอิง `categories.name` และ `orders.menu_item_id` อ้างอิง `menu_items.id`; ชื่อเมนูต้องไม่ซ้ำ ราคา > 0 และจำนวน 1-5 แก้ว
- ตารางต่อไปนี้เป็นผล query `data/coffee.db` ณ เวลาบันทึกเอกสาร โดย JOIN กับ `menu_items` เพื่อแสดงชื่อเมนูแทน `menu_item_id`; `—` หมายถึงไม่มีหมายเหตุ

| id | ชื่อผู้สั่ง | เมนู | จำนวน | หมายเหตุ | เวลาที่สั่ง |
| ---: | --- | --- | ---: | --- | --- |
| 1 | Ploy | Latte | 2 | หวานน้อย | 2026-10-01 09:15 |
| 2 | Bank | Americano | 1 | — | 2026-10-01 09:40 |
| 3 | Mint | Thai Tea | 3 | แยกน้ำแข็ง | 2026-10-01 10:05 |
| 4 | Ploy | Matcha Latte | 1 | — | 2026-10-02 08:55 |
| 5 | Ton | Cocoa | 2 | ไม่ใส่วิปครีม | 2026-10-02 13:20 |
| 6 | ทดสอบ DB จากฟอร์ม | Latte | 2 | ทดสอบบันทึกผ่านเว็บ | 2026-11-12T07:36:44.815Z |

## รันและตรวจสอบ

```bash
cd web
npm install
npm run dev
```

เปิด `http://localhost:3000`, `http://localhost:3000/design` หรือ `http://localhost:3000/orders` ตามต้องการ

- `npm run lint`: ผ่าน
- `npm run build`: ผ่านหลัง dependencies ของหน้าเอกสารที่เพิ่มมาระหว่างงานพร้อมใช้งาน; `/`, `/design` และ `/orders` เป็น dynamic routes ที่อ่านข้อมูลจากฐานข้อมูลตาม request
- ตรวจใน browser: เมนู 10 รายการ ป้ายหมด 2 รายการ ปฏิเสธจำนวน 6 แก้ว บันทึกออเดอร์ Latte 2 แก้วจากฟอร์มจริง และพบข้อมูลใหม่ใน `orders` และหน้า `/orders`: ผ่าน
- ข้อจำกัด: ไม่มีบัญชีผู้ใช้หรือระบบชำระเงิน; `node:sqlite` ต้องใช้ Node.js 22 และยังเป็น API แบบ experimental; ยังไม่ได้เทียบภาพกับ Stitch แบบ pixel-by-pixel เพราะไม่พบไฟล์แนบ Stitch ใน workspace
