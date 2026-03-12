import { orders, type OrderStatus } from "@/data/orders";

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    pending: "bg-amber-400/10 text-amber-400",
    confirmed: "bg-blue-400/10 text-blue-400",
    shipped: "bg-violet-400/10 text-violet-400",
    delivered: "bg-emerald-400/10 text-emerald-400",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function OrdersPage() {
  const total = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">
            Orders{" "}
            <span className="text-base font-normal text-zinc-500">
              — Kreova
            </span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {orders.length} orders &mdash; total{" "}
            <span className="text-zinc-300">${total.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Order #
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Customer
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                Total
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Status
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4 font-mono text-xs font-medium text-teal-400">
                  {order.orderNumber}
                </td>
                <td className="px-5 py-4 font-medium text-zinc-200">
                  {order.customer}
                </td>
                <td className="px-5 py-4 text-right tabular-nums font-medium text-zinc-200">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4 text-zinc-500 tabular-nums">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/[0.06]">
              <td
                colSpan={2}
                className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                Total revenue
              </td>
              <td className="px-5 py-3.5 text-right tabular-nums font-semibold text-zinc-200">
                ${total.toFixed(2)}
              </td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
