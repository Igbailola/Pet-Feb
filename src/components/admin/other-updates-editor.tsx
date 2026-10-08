"use client";

import { useState, useRef, useTransition } from "react";
import {
  FolderKanban,
  GraduationCap,
  CheckCircle2,
  FileText,
  Sparkles,
  ExternalLink,
  MapPin,
  Zap,
  Calendar,
  Upload,
  ImageIcon,
  X,
} from "lucide-react";
import { publishProjectAction, publishTrainingAction } from "@/app/actions/other-updates";
import { useToast } from "./toast";

export type PublishedItem = {
  key: string;
  value: Record<string, unknown>;
};

interface OtherUpdatesEditorProps {
  existingItems: PublishedItem[];
}

export function OtherUpdatesEditor({ existingItems }: OtherUpdatesEditorProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"projects" | "training">("projects");
  const [isPending, startTransition] = useTransition();

  // Project state
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("Commercial Solar");
  const [projCapacity, setProjCapacity] = useState("");
  const [projLocation, setProjLocation] = useState("");
  const [projSummary, setProjSummary] = useState("");
  const [projImpact, setProjImpact] = useState("");
  const [projImageUrl, setProjImageUrl] = useState("");
  const [projImageFile, setProjImageFile] = useState<File | null>(null);
  const [projImagePreview, setProjImagePreview] = useState<string | null>(null);
  const projFileRef = useRef<HTMLInputElement>(null);

  // Training state
  const [trainCohort, setTrainCohort] = useState("");
  const [trainDuration, setTrainDuration] = useState("4 Weeks Hands-on");
  const [trainFee, setTrainFee] = useState("₦150,000 (Includes Tooling Kit)");
  const [trainLocation, setTrainLocation] = useState("Petfeb Technical Academy, Nigeria");
  const [trainSchedule, setTrainSchedule] = useState("Weekend & Weekday Options Available");
  const [trainCurriculum, setTrainCurriculum] = useState("");
  const [trainImageUrl, setTrainImageUrl] = useState("");
  const [trainImageFile, setTrainImageFile] = useState<File | null>(null);
  const [trainImagePreview, setTrainImagePreview] = useState<string | null>(null);
  const trainFileRef = useRef<HTMLInputElement>(null);

  const handleProjFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProjImageFile(file);
      setProjImagePreview(URL.createObjectURL(file));
    }
  };

  const clearProjFile = () => {
    setProjImageFile(null);
    setProjImagePreview(null);
    if (projFileRef.current) projFileRef.current.value = "";
  };

  const handleTrainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setTrainImageFile(file);
      setTrainImagePreview(URL.createObjectURL(file));
    }
  };

  const clearTrainFile = () => {
    setTrainImageFile(null);
    setTrainImagePreview(null);
    if (trainFileRef.current) trainFileRef.current.value = "";
  };

  const handlePublishProject = (status: "published" | "draft") => {
    if (!projTitle.trim() || !projCapacity.trim() || !projLocation.trim()) {
      showToast("Please provide the project title, capacity, and location.", "error");
      return;
    }

    startTransition(async () => {
      const fd = new FormData();
      fd.append("title", projTitle);
      fd.append("category", projCategory);
      fd.append("capacity", projCapacity);
      fd.append("location", projLocation);
      fd.append("summary", projSummary);
      fd.append("impact", projImpact);
      fd.append("imageUrl", projImageUrl);
      if (projImageFile) {
        fd.append("image_file", projImageFile);
      }
      fd.append("status", status);

      const res = await publishProjectAction(fd);
      if (res.error) {
        showToast(res.error, "error");
      } else {
        showToast(
          status === "published"
            ? "Project successfully published to the website!"
            : "Project draft saved.",
          "success"
        );
        setProjTitle("");
        setProjCapacity("");
        setProjLocation("");
        setProjSummary("");
        setProjImpact("");
        setProjImageUrl("");
        clearProjFile();
      }
    });
  };

  const handlePublishTraining = (status: "published" | "draft") => {
    if (!trainCohort.trim()) {
      showToast("Please provide the training cohort title.", "error");
      return;
    }

    startTransition(async () => {
      const fd = new FormData();
      fd.append("cohortName", trainCohort);
      fd.append("duration", trainDuration);
      fd.append("fee", trainFee);
      fd.append("location", trainLocation);
      fd.append("schedule", trainSchedule);
      fd.append("curriculum", trainCurriculum);
      fd.append("imageUrl", trainImageUrl);
      if (trainImageFile) {
        fd.append("image_file", trainImageFile);
      }
      fd.append("status", status);

      const res = await publishTrainingAction(fd);
      if (res.error) {
        showToast(res.error, "error");
      } else {
        showToast(
          status === "published"
            ? "Training details successfully published to website!"
            : "Training draft saved.",
          "success"
        );
        setTrainCohort("");
        setTrainCurriculum("");
        setTrainImageUrl("");
        clearTrainFile();
      }
    });
  };

  const projectItems = existingItems.filter((i) => i.key.startsWith("project."));
  const trainingItems = existingItems.filter((i) => i.key.startsWith("training."));

  return (
    <div className="space-y-6">
      {/* ── Tabs Navigation ──────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === "projects"
              ? "bg-[#3F6B1A] text-white shadow-xs"
              : "bg-white text-[#5C5C5C] hover:bg-[#F3F4F6] border border-[#E5E7EB]"
          }`}
        >
          <FolderKanban size={16} />
          <span>Publish Projects</span>
          <span className="text-[11px] opacity-80">({projectItems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("training")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === "training"
              ? "bg-[#3F6B1A] text-white shadow-xs"
              : "bg-white text-[#5C5C5C] hover:bg-[#F3F4F6] border border-[#E5E7EB]"
          }`}
        >
          <GraduationCap size={16} />
          <span>Publish Training Details</span>
          <span className="text-[11px] opacity-80">({trainingItems.length})</span>
        </button>
      </div>

      {/* ── Projects Publisher ───────────────────────────────── */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#D9D9D9] shadow-xs space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-[#111]">
                Publish Solar Installation Project
              </h3>
              <p className="text-xs text-[#5C5C5C] mt-0.5">
                Upload showcase installations and community impact projects directly to the public website.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#333] mb-1">Project Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 50kVA Hybrid Solar Mini-Grid for Agro Factory"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#333] mb-1">Category</label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white"
                  >
                    <option value="Commercial Solar">Commercial Solar</option>
                    <option value="Residential Solar">Residential Solar</option>
                    <option value="Industrial Microgrid">Industrial Microgrid</option>
                    <option value="Community Impact">Community Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#333] mb-1">System Capacity *</label>
                  <input
                    type="text"
                    placeholder="e.g. 20kVA Inverter / 40kWh Lithium"
                    value={projCapacity}
                    onChange={(e) => setProjCapacity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#333] mb-1">Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Ikeja, Lagos State"
                  value={projLocation}
                  onChange={(e) => setProjLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              {/* Project Image Upload Field */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2.5">
                <label className="block font-semibold text-[#333]">
                  Project Showcase Image
                </label>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-white border border-[#D9D9D9] flex items-center justify-center overflow-hidden shrink-0">
                    {projImagePreview ? (
                      <img src={projImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : projImageUrl ? (
                      <img src={projImageUrl} alt="URL preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={22} className="text-[#9CA3AF]" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center gap-2">
                      <input
                        ref={projFileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProjFileChange}
                        className="block w-full text-xs text-[#333] file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:border file:border-[#D9D9D9] file:text-[#333] hover:file:bg-[#F2F2F2] file:cursor-pointer"
                      />
                      {(projImagePreview || projImageFile) && (
                        <button
                          type="button"
                          onClick={clearProjFile}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Remove uploaded image"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-[#767676]">
                      Upload JPG, PNG or WebP installation photo (up to 5MB)
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB]">
                  <label className="block text-[11px] font-medium text-[#767676] mb-1">
                    Or enter external Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or /api/websitepic/community"
                    value={projImageUrl}
                    onChange={(e) => setProjImageUrl(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#D9D9D9] bg-white text-xs focus:outline-none focus:ring-1 focus:ring-[#7BB042]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#333] mb-1">Project Summary</label>
                <textarea
                  rows={2}
                  placeholder="Overview of the client's energy demand and the engineered solar array solution..."
                  value={projSummary}
                  onChange={(e) => setProjSummary(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#333] mb-1">Measurable Impact / Savings</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Slashed diesel expenditure by 85% and guaranteed 24/7 uptime for cold storage..."
                  value={projImpact}
                  onChange={(e) => setProjImpact(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>
            </div>

            {/* Submit Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F2F2F2]">
              <button
                type="button"
                disabled={isPending}
                onClick={() => handlePublishProject("published")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                <span>Publish Project to Website</span>
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => handlePublishProject("draft")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-[#D9D9D9] text-[#333] hover:bg-[#F2F2F2] transition cursor-pointer disabled:opacity-50"
              >
                <span>Save as Draft</span>
              </button>
            </div>
          </div>

          {/* Published Projects List */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C5C5C]">
              Recent Project Updates ({projectItems.length})
            </h4>
            {projectItems.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] text-center text-xs text-[#767676]">
                No custom project overrides published yet. Projects rendered from default catalog.
              </div>
            ) : (
              projectItems.map((item) => {
                const val = item.value as Record<string, string>;
                return (
                  <div
                    key={item.key}
                    className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex items-start gap-3"
                  >
                    {val.imageUrl && (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                        <img src={val.imageUrl} alt={val.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#111] line-clamp-1">{val.title}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-[#3F6B1A]">
                          {val.status || "published"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#5C5C5C]">
                        <span className="font-semibold text-[#3F6B1A]">{val.capacity}</span>
                        <span>•</span>
                        <span>{val.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── Training Details Publisher ───────────────────────── */}
      {activeTab === "training" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#D9D9D9] shadow-xs space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-[#111]">
                Publish Technical Training Program
              </h3>
              <p className="text-xs text-[#5C5C5C] mt-0.5">
                Update solar installation cohorts, technician masterclasses, and hands-on academy schedules.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#333] mb-1">Cohort / Course Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Certified Solar PV & Lithium Storage Installation Masterclass"
                  value={trainCohort}
                  onChange={(e) => setTrainCohort(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#333] mb-1">Course Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Weeks (Hands-on practicals)"
                    value={trainDuration}
                    onChange={(e) => setTrainDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#333] mb-1">Tuition / Registration Fee</label>
                  <input
                    type="text"
                    placeholder="e.g. ₦150,000"
                    value={trainFee}
                    onChange={(e) => setTrainFee(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#333] mb-1">Venue / Facility Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Petfeb Technical Academy, Lagos, Nigeria"
                    value={trainLocation}
                    onChange={(e) => setTrainLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#333] mb-1">Schedule & Cycles</label>
                  <input
                    type="text"
                    placeholder="e.g. Next Cohort: November 2026 (Saturdays & Sundays)"
                    value={trainSchedule}
                    onChange={(e) => setTrainSchedule(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>
              </div>

              {/* Training Image Upload Field */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2.5">
                <label className="block font-semibold text-[#333]">
                  Training / Academy Feature Image
                </label>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-white border border-[#D9D9D9] flex items-center justify-center overflow-hidden shrink-0">
                    {trainImagePreview ? (
                      <img src={trainImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : trainImageUrl ? (
                      <img src={trainImageUrl} alt="URL preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={22} className="text-[#9CA3AF]" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center gap-2">
                      <input
                        ref={trainFileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleTrainFileChange}
                        className="block w-full text-xs text-[#333] file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:border file:border-[#D9D9D9] file:text-[#333] hover:file:bg-[#F2F2F2] file:cursor-pointer"
                      />
                      {(trainImagePreview || trainImageFile) && (
                        <button
                          type="button"
                          onClick={clearTrainFile}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Remove uploaded image"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-[#767676]">
                      Upload workshop, cohort, or lab practical image (up to 5MB)
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB]">
                  <label className="block text-[11px] font-medium text-[#767676] mb-1">
                    Or enter external Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or /api/websitepic/training"
                    value={trainImageUrl}
                    onChange={(e) => setTrainImageUrl(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#D9D9D9] bg-white text-xs focus:outline-none focus:ring-1 focus:ring-[#7BB042]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#333] mb-1">Practical Curriculum Focus</label>
                <textarea
                  rows={3}
                  placeholder="Inverter sizing, MPPT charge controllers, lithium iron phosphate battery banks, earthing rods, and high-voltage DC protection..."
                  value={trainCurriculum}
                  onChange={(e) => setTrainCurriculum(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F2F2F2]">
              <button
                type="button"
                disabled={isPending}
                onClick={() => handlePublishTraining("published")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-black hover:bg-[#6A9E36] transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                <span>Publish Training Details to Website</span>
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => handlePublishTraining("draft")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-[#D9D9D9] text-[#333] hover:bg-[#F2F2F2] transition cursor-pointer disabled:opacity-50"
              >
                <span>Save as Draft</span>
              </button>
            </div>
          </div>

          {/* Published Training List */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C5C5C]">
              Active Training Programs ({trainingItems.length})
            </h4>
            {trainingItems.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] text-center text-xs text-[#767676]">
                No custom training overrides published yet. Website displaying standard curriculum.
              </div>
            ) : (
              trainingItems.map((item) => {
                const val = item.value as Record<string, string>;
                return (
                  <div
                    key={item.key}
                    className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex items-start gap-3"
                  >
                    {val.imageUrl && (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                        <img src={val.imageUrl} alt={val.cohortName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#111] line-clamp-1">{val.cohortName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-[#3F6B1A]">
                          {val.status || "published"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#5C5C5C]">
                        <span className="font-semibold text-[#3F6B1A]">{val.duration}</span>
                        <span>•</span>
                        <span>{val.fee}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
