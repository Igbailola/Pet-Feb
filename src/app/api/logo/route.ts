import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

/**
 * Serves the authentic Petfeb logo directly from designinspiration/Logo.jpg
 * without modifying, moving, renaming, or copying the source asset.
 */
export async function GET() {
  const filePath = path.join(process.cwd(), "designinspiration", "Logo.jpg");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Logo not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
