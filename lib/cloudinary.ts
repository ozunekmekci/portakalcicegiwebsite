/**
 * Cloudinary URL'lerini optimize etmek ve dinamik transformasyonlar uygulamak için yardımcı sınıf.
 */

interface OptimizeOptions {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  format?: string;
}

/**
 * Cloudinary URL'ini verilen parametrelere göre optimize eder.
 * Cloudinary dışındaki URL'leri (Google Drive, yerel dosyalar) bozmadan olduğu gibi döner.
 * 
 * @param urlOrPublicId Giriş URL'i veya Cloudinary Public ID'si
 * @param options Transformasyon seçenekleri
 * @returns Optimize edilmiş URL
 */
export function getOptimizedUrl(
  urlOrPublicId: string,
  options: OptimizeOptions = {}
): string {
  if (!urlOrPublicId) return "";

  // Cloudinary dışındaki URL'leri veya yerel yolları bozmadan geri döndür
  if (!urlOrPublicId.includes("res.cloudinary.com")) {
    return urlOrPublicId;
  }

  // Varsayılan transformasyonlar
  const width = options.width ?? 800;
  const quality = options.quality ?? "auto";
  const format = options.format ?? "auto";
  const crop = options.crop ?? "fill";

  let transformationStr = `w_${width},q_${quality},f_${format},c_${crop}`;
  if (options.height) {
    transformationStr += `,h_${options.height}`;
  }

  const uploadSegment = "/image/upload/";
  const uploadIndex = urlOrPublicId.indexOf(uploadSegment);

  if (uploadIndex !== -1) {
    const prefix = urlOrPublicId.substring(0, uploadIndex + uploadSegment.length);
    let rest = urlOrPublicId.substring(uploadIndex + uploadSegment.length);

    // Eğer zaten bir transformasyon parametresi varsa (örn: w_300,q_auto gibi _ karakteri içeren segment)
    // ve bu bir versiyon numarası (v123456) değilse, eski segmenti atla
    const firstSegment = rest.split("/")[0];
    if (firstSegment && firstSegment.includes("_") && !/^v\d+$/.test(firstSegment)) {
      rest = rest.substring(firstSegment.length + 1); // segment ve / karakterini atla
    }

    return `${prefix}${transformationStr}/${rest}`;
  }

  return urlOrPublicId;
}
