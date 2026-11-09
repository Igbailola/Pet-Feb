import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Solar Cart | Pet-Feb Solar",
  description:
    "Review your chosen solar kits, inverters, batteries, and accessories before proceeding to secure order checkout with Pet-Feb Solar.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

