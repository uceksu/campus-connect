import cv2
import glob
import os

images = [
    r"C:\Users\Lenovo\.gemini\antigravity\brain\2038f207-4d61-48b6-9ec2-f4313cde12c5\.user_uploaded\media__1785690229135.png",
    r"C:\Users\Lenovo\.gemini\antigravity\brain\2038f207-4d61-48b6-9ec2-f4313cde12c5\.user_uploaded\media__1785690229150.png",
    r"C:\Users\Lenovo\.gemini\antigravity\brain\2038f207-4d61-48b6-9ec2-f4313cde12c5\.user_uploaded\media__1785690229156.png"
]

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

for img_path in images:
    img = cv2.imread(img_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    print(f"File: {os.path.basename(img_path)} - Faces found: {len(faces)}")
    
    # Sort faces by Y coordinate (top to bottom)
    faces = sorted(faces, key=lambda f: f[1])
    
    for (x, y, w, h) in faces:
        print(f"  Face at y={y}, w={w}, h={h}")
