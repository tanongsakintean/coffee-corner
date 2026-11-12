import { expect, test, type Page } from "@playwright/test";

const menu = (page: Page) => page.getByRole("region", { name: "เลือกแก้วที่ใช่" });
const latest = (page: Page) => page.getByRole("region", { name: "ออเดอร์ล่าสุด" });
const card = (page: Page, name: string) =>
  menu(page).getByRole("article").filter({ has: page.getByRole("heading", { name: new RegExp(`^${name}`) }) });

async function orderCount(page: Page) {
  await page.goto("/orders");
  return (await page.getByRole("table").getByRole("row").count()) - 1;
}

async function fillOrder(page: Page, name: string, drink: string, quantity: string) {
  await page.getByRole("textbox", { name: "ชื่อผู้สั่ง" }).fill(name);
  await page.getByRole("combobox", { name: "เมนูที่เลือก" }).selectOption({ label: drink });
  await page.getByRole("spinbutton", { name: /จำนวน/ }).fill(quantity);
}

test("TC-01 แสดงเมนูทั้งหมด", async ({ page }) => {
  await page.goto("/");
  await expect(menu(page).getByText("10 เมนู")).toBeVisible();
  await expect(menu(page).getByRole("article")).toHaveCount(10);
  await expect(card(page, "Americano")).toContainText("COFFEE");
  await expect(card(page, "Americano")).toContainText("60 บาท");
  await expect(card(page, "Latte")).toContainText("70 บาท");
  await expect(card(page, "Mocha")).toContainText("75 บาท");
  await expect(card(page, "Mocha").getByText("หมด", { exact: true }).first()).toBeVisible();
});

test("TC-02 กรองเมนูตามหมวด", async ({ page }) => {
  await page.goto("/");
  await menu(page).getByRole("button", { name: "Coffee" }).click();
  await expect(menu(page).getByRole("article")).toHaveCount(5);
  await expect(card(page, "Mocha")).toBeVisible();
  await menu(page).getByRole("button", { name: "Tea" }).click();
  await expect(menu(page).getByRole("article")).toHaveCount(3);
  await expect(card(page, "Matcha Latte")).toBeVisible();
  await menu(page).getByRole("button", { name: "Other" }).click();
  await expect(menu(page).getByRole("article")).toHaveCount(2);
  await expect(card(page, "Cocoa")).toBeVisible();
  await menu(page).getByRole("button", { name: "ทั้งหมด" }).click();
  await expect(menu(page).getByRole("article")).toHaveCount(10);
});

test("TC-03 บันทึกออเดอร์สำเร็จ", async ({ page }) => {
  const before = await orderCount(page);
  await page.goto("/");
  await fillOrder(page, "ทดสอบ TC-03", "Latte — 70 บาท", "2");
  await page.getByRole("button", { name: "ยืนยันออเดอร์" }).click();
  await expect(page.getByText(/รับออเดอร์แล้ว · รวม 140 บาท/)).toBeVisible();
  await expect(latest(page).getByRole("article")).toHaveCount(before + 1);
  const first = latest(page).getByRole("article").first();
  await expect(first).toContainText("ทดสอบ TC-03");
  await expect(first).toContainText("Latte · 2 แก้ว");
  await expect(first).toContainText("140 บาท");
  await expect(await orderCount(page)).toBe(before + 1);
  const row = page.getByRole("table").getByRole("row").nth(1);
  await expect(row).toContainText("ทดสอบ TC-03");
  await expect(row).toContainText("Latte");
  await expect(row).toContainText("2 แก้ว");
  await expect(row).toContainText("140 บาท");
});

test("TC-04 ไม่กรอกชื่อผู้สั่ง", async ({ page }) => {
  const before = await orderCount(page);
  await page.goto("/");
  await page.getByRole("combobox", { name: "เมนูที่เลือก" }).selectOption({ label: "Americano — 60 บาท" });
  await page.getByRole("button", { name: "ยืนยันออเดอร์" }).click();
  await expect(page.getByText("กรุณากรอกชื่อผู้สั่ง", { exact: true })).toBeVisible();
  await expect(page.getByText("ตรวจสอบข้อมูลที่ระบุแล้วลองอีกครั้ง")).toBeVisible();
  await expect(await orderCount(page)).toBe(before);
});

test("TC-05 ไม่เลือกเครื่องดื่ม", async ({ page }) => {
  const before = await orderCount(page);
  await page.goto("/");
  await page.getByRole("textbox", { name: "ชื่อผู้สั่ง" }).fill("ทดสอบ TC-05");
  await page.getByRole("button", { name: "ยืนยันออเดอร์" }).click();
  await expect(page.getByText("กรุณาเลือกเมนู", { exact: true })).toBeVisible();
  await expect(page.getByText("ตรวจสอบข้อมูลที่ระบุแล้วลองอีกครั้ง")).toBeVisible();
  await expect(await orderCount(page)).toBe(before);
});

test("TC-06 เมนูที่หมดสั่งไม่ได้", async ({ page }) => {
  const before = await orderCount(page);
  await page.goto("/");
  await expect(card(page, "Mocha").getByText("หมด", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("option", { name: "Mocha — 75 บาท · หมด" })).toBeDisabled();
  await page.getByRole("textbox", { name: "ชื่อผู้สั่ง" }).fill("ทดสอบ TC-06");
  await page.getByRole("button", { name: "ยืนยันออเดอร์" }).click();
  await expect(page.getByText("กรุณาเลือกเมนู", { exact: true })).toBeVisible();
  await expect(await orderCount(page)).toBe(before);
});

test("TC-07 จำนวนเกินช่วงที่กำหนด", async ({ page }) => {
  const before = await orderCount(page);
  await page.goto("/");
  await fillOrder(page, "ทดสอบ TC-07", "Espresso — 50 บาท", "6");
  await page.getByRole("button", { name: "ยืนยันออเดอร์" }).click();
  await expect(page.getByText("จำนวนต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 5 แก้ว")).toBeVisible();
  await expect(await orderCount(page)).toBe(before);
});

test("TC-08 ตรวจประวัติออเดอร์หลังรีเฟรช", async ({ page }) => {
  const before = await orderCount(page);
  await page.goto("/");
  await fillOrder(page, "ทดสอบ TC-03", "Latte — 70 บาท", "2");
  await page.getByRole("button", { name: "ยืนยันออเดอร์" }).click();
  await expect(page.getByText(/รับออเดอร์แล้ว · รวม 140 บาท/)).toBeVisible();
  await page.goto("/orders");
  await page.reload();
  await expect(await orderCount(page)).toBe(before + 1);
  const row = page.getByRole("table").getByRole("row").nth(1);
  await expect(row).toContainText("ทดสอบ TC-03");
  await expect(row).toContainText("Latte");
  await expect(row).toContainText("2 แก้ว");
  await expect(row).toContainText("140 บาท");
});
