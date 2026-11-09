import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Solar Equipment Order | Pet-Feb Solar",
  description:
    "Track the live delivery and dispatch status of your Pet-Feb solar equipment, hardware, and installation packages across Nigeria.",
};

export default function TrackOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

