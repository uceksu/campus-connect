import sharp from 'sharp';

const images = [
  { path: 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\2038f207-4d61-48b6-9ec2-f4313cde12c5\\.user_uploaded\\media__1785690229135.png', pieces: 1 },
  { path: 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\2038f207-4d61-48b6-9ec2-f4313cde12c5\\.user_uploaded\\media__1785690229150.png', pieces: 3 },
  { path: 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\2038f207-4d61-48b6-9ec2-f4313cde12c5\\.user_uploaded\\media__1785690229156.png', pieces: 2 }
];

async function run() {
  for (let i = 0; i < images.length; i++) {
    const { path, pieces } = images[i];
    const metadata = await sharp(path).metadata();
    console.log(`Image ${i+1}: ${metadata.width}x${metadata.height}, pieces: ${pieces}`);
    
    const sliceHeight = Math.floor(metadata.height! / pieces);
    
    for (let p = 0; p < pieces; p++) {
      await sharp(path)
        .extract({ left: 0, top: p * sliceHeight, width: Math.floor(metadata.width! / 2), height: sliceHeight })
        .toFile(`scratch/slice_${i+1}_${p+1}.png`);
      console.log(`Saved slice_${i+1}_${p+1}.png`);
    }
  }
}

run().catch(console.error);
