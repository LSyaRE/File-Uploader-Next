import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", file.name);
    writeFile(filePath, buffer);

    return new Response(
      JSON.stringify({
        message: "Uploaded File",
        data: file.name,
      })
    );
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({
        message: "File not found",
      }),
      {
        status: 400,
      }
    );
  }
}
