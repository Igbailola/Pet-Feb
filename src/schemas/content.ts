import { z } from "zod";

export const publishStatus = z.enum(["draft", "published"]);
export const testimonialStatus = z.enum(["published", "hidden"]);
export const verificationStatus = z.enum(["not_started", "pending", "verified", "rejected"]);
export const verificationDecision = z.enum(["pending", "approved", "rejected"]);

export const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  category: z.string().min(1),
  status: publishStatus.default("draft"),
  in_stock: z.boolean().default(true),
  specs: z.record(z.string(), z.unknown()).default({}),
});

export const productImageSchema = z.object({
  product_id: z.string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, "Invalid UUID format"),
  url: z.string().min(1),
  alt_text: z.string().optional(),
  sort_order: z.number().int().default(0),
  is_main: z.boolean().default(false),
});

export const accessorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  image_url: z.string().optional(),
  status: publishStatus.default("draft"),
});

export const testimonialSchema = z.object({
  author_name: z.string().min(1),
  author_role: z.string().optional(),
  message: z.string().min(1),
  photo_url: z.string().optional(),
  status: testimonialStatus.default("hidden"),
});

export const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  cover_image: z.string().optional(),
  body: z.string().default(""),
  category: z.string().optional(),
  status: publishStatus.default("draft"),
  published_at: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || !val.trim()) return undefined;
      const d = new Date(val);
      return !isNaN(d.getTime()) ? d.toISOString() : undefined;
    }),
});

// Reviewer decision: stores the decision and reason only. No eligibility rules.
export const verificationDecisionSchema = z
  .object({
    decision: z.enum(["approved", "rejected"]),
    rejection_reason: z.string().min(1).optional(),
  })
  .refine((v) => v.decision !== "rejected" || !!v.rejection_reason, {
    message: "A rejection reason is required",
    path: ["rejection_reason"],
  });
