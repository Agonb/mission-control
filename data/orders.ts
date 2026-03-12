export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: OrderStatus;
  date: string;
}

export const orders: Order[] = [
  {
    id: "1",
    orderNumber: "KR-0041",
    customer: "Amira Hassan",
    total: 89.99,
    status: "delivered",
    date: "2026-03-05",
  },
  {
    id: "2",
    orderNumber: "KR-0042",
    customer: "James Okafor",
    total: 134.5,
    status: "shipped",
    date: "2026-03-08",
  },
  {
    id: "3",
    orderNumber: "KR-0043",
    customer: "Sofia Reyes",
    total: 56.0,
    status: "confirmed",
    date: "2026-03-10",
  },
  {
    id: "4",
    orderNumber: "KR-0044",
    customer: "Liam Novak",
    total: 210.75,
    status: "pending",
    date: "2026-03-11",
  },
  {
    id: "5",
    orderNumber: "KR-0045",
    customer: "Yuki Tanaka",
    total: 47.2,
    status: "confirmed",
    date: "2026-03-12",
  },
];
