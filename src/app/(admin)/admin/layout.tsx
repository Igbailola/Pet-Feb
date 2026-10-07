import { requireStaff } from "@/lib/session";
import { AdminShell } from "@/components/admin/admin-shell";
import { ToastProvider } from "@/components/admin/toast";

export const metadata = {
  title: "Petfeb Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireStaff();

  return (
    <ToastProvider>
      <AdminShell user={user}>{children}</AdminShell>
    </ToastProvider>
  );
}
