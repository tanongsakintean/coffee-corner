import { createClient } from "@supabase/supabase-js";
import type { MenuItem, Order } from "./menu";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("Supabase URL and publishable key are required");

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type OrderRow = {
  id: number; customer_name: string; menu_item_id: number; quantity: number;
  note: string | null; created_at: string; menu_items: { name: string; price: number };
};

function iconFor(category: string) {
  return category === "Coffee" ? "☕" : category === "Tea" ? "🍵" : "🥤";
}

export async function getMenu(): Promise<MenuItem[]> {
  const { data, error } = await supabase.from("menu_items")
    .select("id,name,category,price,is_available").order("id");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id, name: row.name, category: row.category, price: row.price,
    available: row.is_available === 1, icon: iconFor(row.category),
  }));
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase.from("categories")
    .select("name").order("sort_order").order("id");
  if (error) throw error;
  return data.map((row) => row.name);
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase.from("orders")
    .select("id,customer_name,menu_item_id,quantity,note,created_at,menu_items!orders_menu_item_id_fkey(name,price)")
    .order("created_at", { ascending: false }).order("id", { ascending: false })
    .overrideTypes<OrderRow[]>();
  if (error) throw error;
  return data.map((row) => ({
    id: row.id, name: row.customer_name, drinkId: row.menu_item_id,
    drinkName: row.menu_items.name, quantity: row.quantity, note: row.note ?? "",
    total: row.menu_items.price * row.quantity, createdAt: row.created_at,
  }));
}

export async function insertOrder(name: string, menuItemId: number, quantity: number, note: string) {
  const { data: item, error: itemError } = await supabase.from("menu_items")
    .select("is_available").eq("id", menuItemId).maybeSingle();
  if (itemError) throw itemError;
  if (!item || item.is_available !== 1) return false;
  const { error } = await supabase.from("orders").insert({
    customer_name: name, menu_item_id: menuItemId, quantity, note: note || null,
  });
  if (error) throw error;
  return true;
}
