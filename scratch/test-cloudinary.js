const fs = require('fs');

async function run() {
  const fileBuf = fs.readFileSync('app/icon.png');
  const blob = new Blob([fileBuf], { type: 'image/png' });
  const fd = new FormData();
  fd.append("image", blob, "icon.png");
  
  try {
    const res = await fetch("http://localhost:3000/api/cloudinary/upload", { method: "POST", body: fd });
    console.log(res.status, await res.text());
  } catch(e) {
    console.log(e)
  }
}
run();
