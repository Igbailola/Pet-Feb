import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout & Delivery Details | Pet-Feb Solar",
  description:
    "Complete your solar order with transparent delivery fees, installation options, and secure verified direct payment instructions from Pet-Feb Solar.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

