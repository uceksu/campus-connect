import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Campus Connect UCE",
    short_name: "KSU UCE",
    description: "The complete guide and resource hub for UCE students.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faff",
    theme_color: "#456be5",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
