import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
  console.log("Creating EEE department...");

  const dept = await prisma.department.create({
    data: {
      name: "Electrical & Electronics Engineering",
      shortName: "EEE",
      description: "The Department of Electrical & Electronics Engineering provides a strong foundation in power systems, power electronics, drives, and applied electronics, preparing students for modern electrical engineering challenges.",
    }
  });
  console.log("Created Department:", dept.name);

  // Upload images and get URLs
  const uploadFile = async (file: string, name: string) => {
    console.log(`Uploading image for ${name}...`);
    const res = await cloudinary.uploader.upload(file, {
      folder: 'campus-connect',
      gravity: 'face',
      crop: 'thumb',
      width: 400,
      height: 400,
    });
    console.log(`✓ Uploaded: ${res.secure_url}`);
    return res.secure_url;
  };

  const facultyList = [
    {
      name: "AMBILY V R",
      designation: "Assistant Professor",
      specialization: "POWER ELECTRONICS AND DRIVES",
      email: "vr.ambily@gmail.com",
      phone: "9656522339",
      isHOD: true,
      imageFile: "scratch/eee_slice_1_1.png",
    },
    {
      name: "MARIA JOSEPH",
      designation: "Assistant Professor",
      specialization: "POWER ELECTRONICS AND DRIVES",
      email: "neenat19@gmail.com",
      phone: "9446791734",
      isHOD: false,
      imageFile: "scratch/eee_slice_1_2.png",
    },
    {
      name: "MAYAMOL S",
      designation: "Assistant Professor",
      specialization: "POWER ELECTRONICS AND DRIVES",
      email: "mayasruthy@yahoo.com",
      phone: "8281686589",
      isHOD: false,
      imageFile: "scratch/eee_slice_2_1.png",
    },
    {
      name: "NIMMY BERCHMANS",
      designation: "Assistant Professor",
      specialization: "POWER ELECTRONICS AND DRIVES",
      email: "nimmyberk@gmail.com",
      phone: "9497324091",
      isHOD: false,
      imageFile: "scratch/eee_slice_2_2.png",
    },
    {
      name: "SHAHANA P SAITH",
      designation: "Assistant Professor",
      specialization: "POWER ELECTRONICS",
      email: "shahanapsaith@gmail.com",
      phone: "9745203864",
      isHOD: false,
      imageFile: "scratch/eee_slice_2_3.png",
    },
    {
      name: "SREEKALA C.S.",
      designation: "Assistant Professor",
      specialization: "POWER SYSTEM",
      email: "sreekalakaithakombil@gmail.com",
      phone: "9496181605",
      isHOD: false,
      imageFile: "scratch/eee_slice_3_1.png",
    },
    {
      name: "THANOOJA ANN JOSE",
      designation: "Assistant Professor",
      specialization: "APPLIED ELECTRONICS",
      email: "thanoojaannjose@gmail.com",
      phone: "9539843018",
      isHOD: false,
      imageFile: "scratch/eee_slice_3_2.png",
    },
    {
      name: "BIBN KUMAR",
      designation: "TRADESMAN",
      specialization: "",
      email: "bibinkumar@gmail.com",
      phone: "7907924167",
      isHOD: false,
      imageFile: null, // No photo
    },
  ];

  for (const f of facultyList) {
    const image = f.imageFile ? await uploadFile(f.imageFile, f.name) : null;
    await prisma.faculty.create({
      data: {
        name: f.name,
        designation: f.designation,
        specialization: f.specialization || null,
        email: f.email,
        phone: f.phone,
        isHOD: f.isHOD,
        image,
        departmentId: dept.id,
      }
    });
    console.log(`✓ Added faculty: ${f.name}`);
  }

  console.log("\n✅ EEE migration complete!");
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
