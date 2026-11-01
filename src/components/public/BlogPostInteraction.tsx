"use client";

import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ArrowRight,
  Check,
  Send,
} from "lucide-react";

interface CommentItem {
  id: string;
  authorInitials: string;
  authorName: string;
  text: string;
  likes: number;
  timeAgo: string;
}

interface BlogPostInteractionProps {
  postTitle: string;
  postSlug: string;
}

export function BlogPostInteraction({ postTitle, postSlug }: BlogPostInteractionProps) {
  // Like / Dislike interaction
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [hasDisliked, setHasDisliked] = useState(false);

  // Sharing toast
  const [copiedLink, setCopiedLink] = useState(false);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: "comment-1",
      authorInitials: "MJ",
      authorName: "Engr. Michael Jude",
      text: "Pet-Feb's expansion to Port Harcourt is a timely development. Clean energy infrastructure is urgently needed across the Niger Delta region. 👍🏻👍🏻",
      likes: 12,
      timeAgo: "2 days ago",
    },
  ]);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  // Newsletter state
  const [emailInput, setEmailInput] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes((prev) => Math.max(0, prev - 1));
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setDislikes((prev) => Math.max(0, prev - 1));
      setHasDisliked(false);
    } else {
      setDislikes((prev) => prev + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes((prev) => Math.max(0, prev - 1));
        setHasLiked(false);
      }
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://petfeb.com/blog/${postSlug}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      authorInitials: (commentAuthor || "Guest").slice(0, 2).toUpperCase(),
      authorName: commentAuthor.trim() || "Guest Reader",
      text: newCommentText.trim(),
      likes: 0,
      timeAgo: "Just now",
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText("");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes("@")) return;
    setNewsletterSubscribed(true);
    setEmailInput("");
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  return (
    <div className="flex flex-col gap-[32px] w-full">
      {/* ── Author Row + Action Buttons matching Figma node 6147:9108 ─────────────── */}
      <div className="flex flex-col gap-[20px] w-full pt-4">
        {/* Author Avatar & Name */}
        <div className="flex items-center gap-[16px]">
          <div className="w-[32px] h-[32px] rounded-full bg-[#7BB042] flex items-center justify-center text-white font-heading font-bold text-xs shrink-0 overflow-hidden shadow-xs">
            PF
          </div>
          <span className="font-heading font-medium text-[18px] text-black">
            Pet-Feb Admin
          </span>
        </div>

        {/* Action Buttons Row matching Figma node 6147:9116 */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Like / Dislike Segmented Pill */}
          <div className="flex items-center bg-[#EBEBEB]/50 rounded-[24px] border border-[#EBEBEB]">
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-[10px] px-[16px] py-[10px] rounded-l-[24px] transition cursor-pointer text-sm font-medium ${
                hasLiked ? "text-[#3F6B1A] bg-[#E8F3DA]" : "text-black hover:bg-gray-200/60"
              }`}
              title="Like this post"
            >
              <ThumbsUp className="w-[18px] h-[18px]" />
              <span>{likes}</span>
            </button>

            <div className="w-[1px] h-[24px] bg-[#D9D9D9]" />

            <button
              type="button"
              onClick={handleDislike}
              className={`flex items-center gap-[10px] px-[16px] py-[10px] rounded-r-[24px] transition cursor-pointer text-sm font-medium ${
                hasDisliked ? "text-red-700 bg-red-50" : "text-black hover:bg-gray-200/60"
              }`}
              title="Dislike this post"
            >
              <ThumbsUp className="w-[18px] h-[18px] rotate-180" />
              <span>{dislikes}</span>
            </button>
          </div>

          {/* Comment Counter Pill */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("comment-input-box");
              el?.focus();
            }}
            className="flex items-center gap-[10px] bg-[#EBEBEB]/50 hover:bg-[#EBEBEB] border border-[#EBEBEB] px-[16px] py-[10px] rounded-[24px] text-sm text-[#767676] font-medium transition cursor-pointer"
            title="View comments"
          >
            <MessageCircle className="w-[18px] h-[18px]" />
            <span>{45 + comments.length - 1}</span>
          </button>

          {/* Share Pill */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-[10px] bg-[#EBEBEB]/50 hover:bg-[#EBEBEB] border border-[#EBEBEB] px-[16px] py-[10px] rounded-[24px] text-sm text-[#767676] font-medium transition cursor-pointer relative"
            title="Share article"
          >
            <Share2 className="w-[18px] h-[18px]" />
            <span>{copiedLink ? "Copied!" : "12"}</span>
          </button>

          {/* Ellipsis / Options Button */}
          <div className="bg-[#EBEBEB]/50 hover:bg-[#EBEBEB] border border-[#EBEBEB] p-[10px] rounded-[24px] text-gray-700 flex items-center justify-center cursor-pointer transition">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </div>
        </div>
      </div>

      {/* ── Comments Section matching Figma node 6147:9133 ────────────────────────── */}
      <div className="flex flex-col gap-[14px] w-full pt-[10px]">
        {/* Comment Heading */}
        <div className="flex items-center gap-[10px]">
          <span className="font-heading font-medium text-[20px] text-black">
            {45 + comments.length - 1}
          </span>
          <span className="font-heading font-medium text-[20px] text-black">
            Comments
          </span>
        </div>

        {/* Comment Cards List */}
        <div className="flex flex-col gap-[12px] w-full">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-[#EBEBEB]/40 border border-[#EBEBEB] rounded-[16px] p-[20px] flex flex-col gap-3"
            >
              <div className="flex items-start gap-[14px]">
                <div className="w-[38px] h-[38px] rounded-full bg-[#D6E7C4] text-[#3F6B1A] font-heading font-bold text-xs flex items-center justify-center shrink-0">
                  {c.authorInitials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-[14px] text-black">
                      {c.authorName}
                    </span>
                    <span className="text-[12px] text-gray-400">{c.timeAgo}</span>
                  </div>
                  <p className="font-sans font-normal text-[14px] text-black leading-[1.6] mt-1">
                    {c.text}
                  </p>
                </div>
              </div>

              {/* Comment Like Counter */}
              <div className="flex items-center gap-3 pt-1 pl-[52px]">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{c.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Comment Box matching Figma node 6147:9152 */}
        <form
          onSubmit={handleAddComment}
          className="bg-[#EBEBEB]/40 border border-[#EBEBEB] rounded-[24px] p-[20px] flex flex-col gap-3 w-full"
        >
          <span className="font-heading font-medium text-[16px] text-black">
            Leave Comment:
          </span>
          <input
            type="text"
            placeholder="Your name or designation"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            className="w-full bg-white border border-[#D9D9D9] rounded-[8px] px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#7BB042]"
          />
          <textarea
            id="comment-input-box"
            rows={3}
            placeholder="Write your observation or feedback..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full bg-white border border-[#D9D9D9] rounded-[10px] p-3 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#7BB042] resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-black text-white hover:bg-gray-800 disabled:opacity-40 transition text-xs font-bold font-heading cursor-pointer"
            >
              <span>Post Comment</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* ── Newsletter Subscribe Box matching Figma node 6147:9155 ───────────────── */}
      <div className="bg-[#F5B82E] rounded-[12px] p-[26px] w-full shadow-xs">
        <div className="flex flex-col gap-[20px]">
          <h4 className="font-heading font-medium text-[20px] text-black tracking-[-0.1px] leading-[1.3] max-w-[320px]">
            Stay Up To Date on Our Latest projects and Posts
          </h4>

          {newsletterSubscribed ? (
            <div className="bg-white rounded-[8px] p-4 text-xs font-bold text-[#3F6B1A] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#7BB042]" />
              <span>Thank you for subscribing to Petfeb Dispatches!</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="bg-white rounded-[8px] h-[58px] flex items-center justify-between pl-[12px] pr-[8px] py-[8px] w-full"
            >
              <input
                type="email"
                required
                placeholder="Email Address:"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-transparent border-none text-[14px] text-[#333] placeholder-[#767676] focus:outline-none flex-1 pr-2 font-sans"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-black hover:bg-gray-900 text-white rounded-[8px] px-[16px] py-[10px] flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

