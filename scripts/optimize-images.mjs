import sharp from "sharp";
import fs from "fs";
import path from "path";

const ASSETS_DIR = "./assets";
const OUTPUT_DIR = "./public/images";

// ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImages() {
  console.log("Starting image optimization...");

  try {
    // 1. Optimize About section image
    const aboutInput = path.join(ASSETS_DIR, "pomelli_photoshoot_image_9_16_0520.png");
    const aboutOutput = path.join(OUTPUT_DIR, "about.webp");
    
    if (fs.existsSync(aboutInput)) {
      console.log(`Processing About Image: ${aboutInput} -> ${aboutOutput}`);
      await sharp(aboutInput)
        .rotate()
        .resize(800) // width: 800px, auto height
        .webp({ quality: 80 })
        .toFile(aboutOutput);
      console.log("About image optimized successfully.");
    } else {
      console.warn(`About image not found: ${aboutInput}`);
    }

    // 2. Optimize 8 Gallery images (resized and cropped to 600x600 px)
    const galleryFiles = [
      "IMG_7358.JPG",
      "IMG_7466.JPG",
      "IMG_7483.JPG",
      "IMG_7999.JPG",
      "IMG_8639.JPG",
      "IMG_8643.JPG",
      "IMG_8715.JPG",
      "IMG_8725.JPG"
    ];

    for (let i = 0; i < galleryFiles.length; i++) {
      const fileName = galleryFiles[i];
      const inputPath = path.join(ASSETS_DIR, fileName);
      const outputPath = path.join(OUTPUT_DIR, `gallery-${i + 1}.webp`);

      if (fs.existsSync(inputPath)) {
        console.log(`Processing Gallery Image ${i + 1}: ${inputPath} -> ${outputPath}`);
        await sharp(inputPath)
          .rotate()
          .resize(600, 600, {
            fit: "cover",
            position: "center"
          })
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Gallery image ${i + 1} optimized successfully.`);
      } else {
        console.warn(`Gallery file not found: ${inputPath}`);
      }
    }

    console.log("All image optimizations complete!");
  } catch (error) {
    console.error("Error during image optimization:", error);
    process.exit(1);
  }
}

optimizeImages();
