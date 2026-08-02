import sharp from 'sharp';

const images = [
  // EEE page 1 (HOD + Maria Joseph)
  { path: 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\2038f207-4d61-48b6-9ec2-f4313cde12c5\\.user_uploaded\\media__1785692182416.png', pieces: 2 },
  // EEE page 2 (Mayamol S, Nimmy Berchmans, Shahana P Saith)
  { path: 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\2038f207-4d61-48b6-9ec2-f4313cde12c5\\.user_uploaded\\media__1785692182417.png', pieces: 3 },
  // EEE page 3 (Sreekala CS, Thanooja, Bibn Kumar no-photo)
  { path: 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\2038f207-4d61-48b6-9ec2-f4313cde12c5\\.user_uploaded\\media__1785692182430.png', pieces: 3 },
];

async function run() {
  for (let i = 0; i < images.length; i++) {
    const { path, pieces } = images[i];
    const metadata = await sharp(path).metadata();
    console.log(`Image ${i+1}: ${metadata.width}x${metadata.height}, pieces: ${pieces}`);
    
    const sliceHeight = Math.floor(metadata.height! / pieces);
    const faceWidth = Math.floor(metadata.width! * 0.23); // left ~23% has the photo
    
    for (let p = 0; p < pieces; p++) {
      await sharp(path)
        .extract({ left: 0, top: p * sliceHeight, width: faceWidth, height: sliceHeight })
        .toFile(`scratch/eee_slice_${i+1}_${p+1}.png`);
      console.log(`Saved eee_slice_${i+1}_${p+1}.png`);
    }
  }
}

run().catch(console.error);
