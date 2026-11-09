import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const FRIENDLY_MAP: Record<string, string> = {
  hero: "hero.jpg",
  mission: "mission.jpg",
  vision: "vission.jpg",
  vission: "vission.jpg",
  training: "training.jpg",
  commercial: "30kva inverter  60kwh battery backup  27kw pv arrays.jpg",
  battery: "30kva inverter  60kwh battery backup  27kw pv arrays.jpg",
  installer: "training.jpg",
  installation: "30kva inverter  60kwh battery backup  27kw pv arrays.jpg",
  blog: "hero.jpg",
  panels: "30kva inverter  60kwh battery backup  27kw pv arrays.jpg",
  residential: "30kva inverter  60kwh battery backup  27kw pv arrays.jpg",
  community: "hero.jpg",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const decoded = decodeURIComponent(name).trim();
  const baseKey = decoded.replace(/\.[^/.]+$/, "").toLowerCase();

  // Look up friendly alias or exact filename
  const targetFile = FRIENDLY_MAP[baseKey] || decoded;
  const cleanFilename = path.basename(targetFile);
  const filePath = path.join(process.cwd(), "websitepics", cleanFilename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
