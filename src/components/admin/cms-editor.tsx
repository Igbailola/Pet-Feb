"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateSiteContent, createSiteContent, deleteSiteContent, type ActionResult } from "@/app/actions/cms";
import { PageHeader, SubmitButton, FormField, DeleteButton, EmptyState, useUnsavedChanges } from "./ui";
import { useToast } from "./toast";
import { Plus, Save, X } from "lucide-react";

type Entry = { key: string; value: unknown; status: string; updated_at: string };

function EditRow({ entry }: { entry: Entry }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateSiteContent, {});
  const router = useRouter();
  const { showToast } = useToast();
  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  useEffect(() => {
    if (state.success) {
      showToast(`Updated "${entry.key}" successfully`, "success");
      setIsDirty(false);
      router.refresh();
    } else if (state.error) {
      showToast(state.error, "error");
    }
  }, [state, entry.key, router, showToast]);

  return (
    <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 shadow-xs">
      <form
        action={formAction}
        onChange={() => setIsDirty(true)}
        className="space-y-3"
      >
        <input type="hidden" name="key" value={entry.key} />
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-black font-mono">{entry.key}</p>
          <DeleteButton
            itemName={`Content block "${entry.key}"`}
            onDelete={async () => {
              await deleteSiteContent(entry.key);
              router.refresh();
            }}
          />
        </div>
        <textarea
          name="value"
          defaultValue={JSON.stringify(entry.value, null, 2)}
          rows={3}
          className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-xs sm:text-sm font-mono text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
        />
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-[#767676]">
            Updated: {new Date(entry.updated_at).toLocaleString()}
          </p>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-1.5 bg-[#7BB042] text-black font-semibold rounded-lg px-3 py-1.5 text-xs hover:bg-[#6A9E36] disabled:opacity-50 transition shadow-xs cursor-pointer"
          >
            <Save size={13} /> {pending ? "Publishing…" : "Publish changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function NewEntryForm({ onDone }: { onDone: () => void }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    async (prev, fd) => {
      const result = await createSiteContent(prev, fd);
      if (result.success) {
        showToast("New content entry created", "success");
        router.refresh();
        onDone();
      } else if (result.error) {
        showToast(result.error, "error");
      }
      return result;
    },
    {},
  );

  return (
    <div className="bg-[#F4F9EC] rounded-xl border border-[#D2E8B5] p-5 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#2F5212]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          New Content Block
        </h3>
        <button
          onClick={onDone}
          className="p-1 rounded text-[#767676] hover:text-black transition"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <form action={formAction} className="space-y-3">
        <FormField label="Identifier Key" name="key" required placeholder="e.g. home.hero.headline" />
        <div>
          <label htmlFor="value" className="block text-xs font-semibold text-[#333] mb-1.5">
            Value (JSON format)
          </label>
          <textarea
            id="value"
            name="value"
            required
            rows={3}
            placeholder={'"Your text here" or {"heading": "Title"}'}
            className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-xs sm:text-sm font-mono text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-white"
          />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <SubmitButton pending={pending} label="Publish new content block" />
          <button
            type="button"
            onClick={onDone}
            className="px-3 py-2 text-xs font-semibold text-[#5C5C5C] hover:bg-[#E8F3DA] rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export function CmsEditor({ entries }: { entries: Entry[] }) {
  const [showNew, setShowNew] = useState(false);

  return (
    <div>
      <PageHeader
        title="CMS & Site Content"
        description={`${entries.length} content block${entries.length !== 1 ? "s" : ""} configured`}
        breadcrumbs={[{ label: "CMS & site content" }]}
        action={
          <button
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 bg-[#7BB042] text-black font-semibold rounded-lg px-4 py-2.5 text-xs sm:text-sm hover:bg-[#6A9E36] transition shadow-sm"
          >
            <Plus size={16} /> New entry
          </button>
        }
      />

      {showNew && <NewEntryForm onDone={() => setShowNew(false)} />}

      {entries.length === 0 ? (
        <EmptyState
          message="No site content entries configured yet."
          action={
            <button
              onClick={() => setShowNew(true)}
              className="text-xs font-semibold text-[#3F6B1A] hover:underline"
            >
              Add first content block →
            </button>
          }
        />
      ) : (
        <div className="space-y-4">
          {entries.map((e) => (
            <EditRow key={e.key} entry={e} />
          ))}
        </div>
      )}
    </div>
  );
}
