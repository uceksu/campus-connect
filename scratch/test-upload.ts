import fs from 'fs';
import path from 'path';

async function run() {
  const file = fs.readFileSync('package.json');
  const fd = new FormData();
  fd.append("image", new Blob([file]), "package.json");
  const res = await fetch("http://localhost:3000/api/cloudinary/upload", { method: "POST", body: fd });
  console.log(res.status, await res.text());
}
run();
