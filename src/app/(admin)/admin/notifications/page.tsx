import { requireStaff } from "@/lib/session";
import { getAttentionQueue } from "@/lib/attention-queue";
import { NotificationsList } from "@/components/admin/notifications-list";
import { Bell } from "lucide-react";

export const metadata = {
  title: "Notifications - Petfeb Solar Operations",
};

export default async function AdminNotificationsPage() {
  const user = await requireStaff();
  const tasks = await getAttentionQueue(user);

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1
              className="text-2xl sm:text-3xl font-bold text-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Notifications
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3DA] text-[#2F5212] border border-[#C3E49E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042] animate-pulse" />
              Live Queue
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Operational attention items requiring staff action across your assigned sections.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] shadow-2xs">
            <Bell size={14} className="text-[#7BB042]" />
            <span>
              {tasks.length} {tasks.length === 1 ? "item requires" : "items require"} attention
            </span>
          </div>
        </div>
      </div>

      {/* ── Notifications Content with filters & grouped list ── */}
      <NotificationsList user={user} tasks={tasks} />
    </div>
  );
}
