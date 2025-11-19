import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const vulnerabilityName = formData.get("vulnerabilityName")?.toString() || "";
    const language = formData.get("language")?.toString() || "";
    const platform = formData.get("platform")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const file: File | null = formData.get("file") as File | null;

    // Convert file to text if uploaded
    let fileContent = "";
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      fileContent = buffer.toString("utf-8");
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
Generate a security patch.

Vulnerability: ${vulnerabilityName}
Language: ${language}
Platform: ${platform}

=== User Description ===
${description}

=== Uploaded PoC / Code (if any) ===
${fileContent || "No file provided"}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const patch = completion.choices[0].message?.content || "No output returned.";

    return NextResponse.json({ success: true, patch });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
