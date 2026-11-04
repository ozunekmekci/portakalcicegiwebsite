import { readFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Canva SVG çıktısındaki renk görsellerini kendi alfa maskeleriyle birleştirir.
// Kaynak afişlere dokunmaz; yalnızca web için şeffaf katmanlar üretir.
const source = path.resolve("assets/Black Minimal Motivational Quote Instagram Post");
const destination = path.resolve("public/images/set-layers");

for (const [file, theme] of [["1.svg", "pembe"], ["2.svg", "mavi"]]) {
  const svg = await readFile(path.join(source, file), "utf8");
  const images = [...svg.matchAll(/<image\b[^>]*>/g)].map(([tag]) => {
    const data = tag.match(/(?:xlink:)?href="data:image\/png;base64,([^"]+)"/);
    if (!data) throw new Error(`${file}: Gömülü PNG bulunamadı.`);
    return Buffer.from(data[1], "base64");
  });
  if (images.length !== 14) throw new Error(`${file}: Beklenmeyen katman sayısı.`);
  const target = path.join(destination, theme);
  await mkdir(target, { recursive: true });

  const usedLayers = theme === "pembe" ? [1, 2, 3, 4] : [2, 3, 4, 5];
  for (const index of usedLayers) {
    const { width, height, channels } = await sharp(images[index]).metadata();
    const colorMetadata = await sharp(images[index + 7]).metadata();
    if (channels !== 1 || colorMetadata.width !== width || colorMetadata.height !== height) {
      throw new Error(`${file}: Maske ve renk katmanı eşleşmiyor.`);
    }
    const alpha = await sharp(images[index]).extractChannel(0).raw().toBuffer();
    const rgba = await sharp(images[index + 7])
      .joinChannel(alpha, { raw: { width, height, channels: 1 } })
      .png().toBuffer();
    const output = path.join(target, `layer-${index}.webp`);
    await sharp(rgba).trim({ threshold: 12 })
      .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 88, alphaQuality: 100 }).toFile(output);
    console.log(`${theme}/layer-${index}.webp: ${Math.round((await stat(output)).size / 1024)} KB`);
  }

  // Kullanım sahnesindeki tekil örnekler, ilk sıradaki gerçek ürün görselleridir.
  for (const [name, layer, columns, rows] of [
    ["single-cupcake", theme === "pembe" ? 3 : 2, 5, 2],
    ["single-straw", theme === "pembe" ? 4 : 5, 10, 1],
  ]) {
    const input = path.join(target, `layer-${layer}.webp`);
    const { width, height } = await sharp(input).metadata();
    const cropped = await sharp(input).extract({
      left: 0, top: 0, width: Math.floor(width / columns),
      height: Math.floor(height * (rows === 2 ? 0.41 : 1)),
    }).png().toBuffer();
    await sharp(cropped).trim({ threshold: 12 }).resize({ height: 600, withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(target, `${name}.webp`));
  }

  // Sahnedeki farklı şapkalar, mevcut Canva katmanının yüzleri değiştirilmeden kesilir.
  const picksLayer = theme === "pembe" ? 1 : 3;
  const picksInput = path.join(target, `layer-${picksLayer}.webp`);
  const picksMetadata = await sharp(picksInput).metadata();
  const expectedSize = theme === "pembe" ? [763, 1000] : [1000, 999];
  if (picksMetadata.width !== expectedSize[0] || picksMetadata.height !== expectedSize[1]) {
    throw new Error(`${theme}: Şapkalı süs yerleşimi değişmiş; kesim bölgelerini kontrol edin.`);
  }
  const headCrops = theme === "pembe" ? [
    [0, 23, 116, 246], [165, 15, 117, 247], [312, 6, 134, 264],
    [476, 1, 115, 257], [70, 301, 124, 254], [233, 305, 128, 249], [402, 310, 118, 242],
  ] : [
    [1, 52, 197, 219], [216, 38, 176, 289], [418, 28, 172, 309],
    [621, 47, 176, 286], [822, 0, 178, 323], [318, 389, 162, 296], [518, 424, 167, 244],
  ];
  for (const [index, [left, top, width, height]] of headCrops.entries()) {
    await sharp(picksInput).extract({ left, top, width, height })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(path.join(target, `pick-head-${index + 1}.webp`));
  }
}
