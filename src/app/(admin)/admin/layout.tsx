import { requireStaff } from "@/lib/session";
import { AdminShell } from "@/components/admin/admin-shell";
import { ToastProvider } from "@/components/admin/toast";
import { getAttentionQueue } from "@/lib/attention-queue";

export const metadata = {
  title: "Petfeb Solar - Admin Operations Portal",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireStaff();
  const attentionTasks = await getAttentionQueue(user);

  return (
    <ToastProvider>
      <AdminShell
        user={user}
        attentionCount={attentionTasks.length}
        attentionTasks={attentionTasks}
      >
        {children}
      </AdminShell>
    </ToastProvider>
  );
}
