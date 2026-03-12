import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-60">
        <div className="min-h-screen p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
