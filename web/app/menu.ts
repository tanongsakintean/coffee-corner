export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  icon: string;
};

export type Order = {
  id: number;
  name: string;
  drinkId: number;
  drinkName: string;
  quantity: number;
  note: string;
  total: number;
  createdAt: string;
};

export function formatBaht(amount: number) {
  return `${amount.toLocaleString("th-TH")} บาท`;
}
