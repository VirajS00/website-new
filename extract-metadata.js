import fs from 'fs/promises';
import path from 'path';
import exifr from 'exifr';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photosDir = path.join(__dirname, 'public', 'photos');
const outputFile = path.join(photosDir, 'metadata.json');

async function extractMetadata() {
  const metadataList = [];
  
  // Read existing metadata to preserve manual fields (like software, title, etc.)
  let existingData = [];
  try {
    const fileContent = await fs.readFile(outputFile, 'utf-8');
    existingData = JSON.parse(fileContent);
  } catch (e) {
    // File doesn't exist or is invalid, start fresh
  }
  const existingMap = new Map(existingData.map(item => [item.id, item]));

  const items = await fs.readdir(photosDir, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory() && /^\d{4}$/.test(item.name)) {
      const year = item.name;
      const yearDir = path.join(photosDir, year);
      const files = await fs.readdir(yearDir);

      for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png|webp|avif)$/i)) continue;

        const filePath = path.join(yearDir, file);
        const webPath = `/photos/${year}/${file}`;
        const id = `${year}-${file}`;
        
        try {
          const exifData = await exifr.parse(filePath) || {};
          const existing = existingMap.get(id) || {};
          
          const autoData = {
            id: id,
            file: file,
            year: parseInt(year, 10),
            path: webPath,
            width: exifData.ExifImageWidth || exifData.ImageWidth || null,
            height: exifData.ExifImageHeight || exifData.ImageHeight || null,
            make: exifData.Make || null,
            model: exifData.Model || null,
            date: exifData.DateTimeOriginal || exifData.CreateDate || null,
            iso: exifData.ISO || null,
            fNumber: exifData.FNumber || null,
            exposureTime: exifData.ExposureTime || null,
            focalLength: exifData.FocalLength || null,
            lensModel: exifData.LensModel || null,
            flash: exifData.Flash || null
          };

          const merged = { ...autoData };
          // Preserve manual edits from existing JSON.
          // We override the autoData with existing data, as long as the existing data isn't null.
          // This ensures your manual fixes (like lensModel) are kept!
          for (const [key, value] of Object.entries(existing)) {
            if (value !== null && value !== undefined) {
              merged[key] = value;
            }
          }
          
          metadataList.push(merged);
          console.log(`Extracted metadata for ${year}/${file}`);
        } catch (err) {
          console.error(`Error reading ${year}/${file}:`, err.message);
        }
      }
    }
  }

  await fs.writeFile(outputFile, JSON.stringify(metadataList, null, 2), 'utf-8');
  console.log(`\nExtracted metadata for ${metadataList.length} photos.`);
  console.log(`Saved to ${outputFile}`);
}

extractMetadata().catch(console.error);
