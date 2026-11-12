import { connection } from "next/server";
import { getCategories, getMenu, getOrders } from "./db";
import { HomeClient } from "./HomeClient";

export const instant = false;

export default async function Home() {
  await connection();
  const [menu, categories, orders] = await Promise.all([getMenu(), getCategories(), getOrders()]);
  return <HomeClient menu={menu} categories={categories} initialOrders={orders} />;
}
