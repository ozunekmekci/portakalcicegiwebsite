import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { public_id } = body;

    if (!public_id) {
      return NextResponse.json(
        { error: "public_id parametresi zorunludur." },
        { status: 400 }
      );
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!apiSecret || !apiKey) {
      return NextResponse.json(
        { error: "Cloudinary API anahtarları sunucuda yapılandırılmamış." },
        { status: 500 }
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Cloudinary imza kuralları: Parametreler alfabetik sırada birleştirilir ve sonuna API Secret eklenir.
    const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}`;
    
    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      api_key: apiKey,
    });
  } catch (error) {
    console.error("Signature generation error:", error);
    return NextResponse.json(
      { error: "İmza oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
