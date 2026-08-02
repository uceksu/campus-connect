import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = [
  { file: 'scratch/slice_1_1.png', name: "RAHUMATH BEEVI A" },
  { file: 'scratch/slice_2_1.png', name: "Bichu Vijayan" },
  { file: 'scratch/slice_2_2.png', name: "JINCY ANNIE V V" },
  { file: 'scratch/slice_2_3.png', name: "LINI ABRAHAM" },
  { file: 'scratch/slice_3_1.png', name: "REGHUNATH E V" },
  { file: 'scratch/slice_3_2.png', name: "Divya V V" },
];

async function run() {
  for (const { file, name } of uploads) {
    console.log(`Uploading ${name}...`);
    const res = await cloudinary.uploader.upload(file, {
      folder: 'campus-connect',
      gravity: 'face',
      crop: 'thumb',
      width: 400,
      height: 400,
    });
    
    console.log(`Uploaded! URL: ${res.secure_url}`);
    
    await prisma.faculty.updateMany({
      where: { name },
      data: { image: res.secure_url }
    });
    
    console.log(`Updated database for ${name}`);
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
