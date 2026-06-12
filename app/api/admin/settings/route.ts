import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json(
      { error: "Ayarlar yüklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const success = await saveSettings(body);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("POST settings error:", error);
    return NextResponse.json(
      { error: "Ayarlar kaydedilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
