const encoder = new TextEncoder();

/**
 * Gizli anahtarı CryptoKey nesnesine dönüştürür.
 */
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyBuffer = encoder.encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * 7 günlük süre sınırı olan ve HMAC SHA-256 ile imzalanmış session token'ı üretir.
 */
export async function signSession(secret: string, expiryMs: number = 7 * 24 * 60 * 60 * 1000): Promise<string> {
  const expires = Date.now() + expiryMs;
  const payload = expires.toString();
  const key = await getCryptoKey(secret);
  
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
  return `${payload}.${signatureHex}`;
}

/**
 * Session token'ının imzasını ve süresini doğrular.
 */
export async function verifySession(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    
    const [payload, signatureHex] = parts;
    if (!payload || !signatureHex) return false;

    const expires = parseInt(payload, 10);
    if (isNaN(expires) || Date.now() > expires) return false;

    const key = await getCryptoKey(secret);
    const expectedBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const expectedArray = Array.from(new Uint8Array(expectedBuffer));
    const expectedHex = expectedArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return signatureHex === expectedHex;
  } catch {
    return false;
  }
}
