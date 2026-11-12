"use server";

import { revalidatePath } from "next/cache";
import { getOrders, insertOrder } from "./db";
import type { Order } from "./menu";

type OrderResult = { orders?: Order[]; error?: "name" | "quantity" | "drink" | "server"; message?: string };

export async function placeOrder(input: { name: string; drink: string; quantity: string; note: string }): Promise<OrderResult> {
  const name = input.name.trim();
  const quantity = Number(input.quantity);
  const menuItemId = Number(input.drink);
  if (!name || name.length > 80) return { error: "name" as const, message: "กรุณากรอกชื่อผู้สั่ง" };
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 5) {
    return { error: "quantity" as const, message: "จำนวนต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 5 แก้ว" };
  }
  if (!Number.isSafeInteger(menuItemId) || menuItemId < 1) {
    return { error: "drink" as const, message: "กรุณาเลือกเมนู" };
  }
  if (input.note.length > 200) return { error: "server" as const, message: "หมายเหตุต้องไม่เกิน 200 ตัวอักษร" };
  try {
    if (!await insertOrder(name, menuItemId, quantity, input.note.trim())) {
      return { error: "drink" as const, message: "เมนูนี้หมดแล้วหรือไม่พบ กรุณาเลือกเมนูอื่น" };
    }
    revalidatePath("/");
    revalidatePath("/orders");
    return { orders: await getOrders() };
  } catch {
    return { error: "server" as const, message: "บันทึกออเดอร์ไม่สำเร็จ กรุณาลองอีกครั้ง" };
  }
}
