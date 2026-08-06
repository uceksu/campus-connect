import { MetadataRoute } from "next";
import { getSiteLogo } from "@/lib/actions/settings";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const customLogo = await getSiteLogo();
  const iconSrc = customLogo || "/icon.png";

  return {
    name: "Campus Connect UCE",
    short_name: "KSU UCE",
    description: "The complete guide and resource hub for UCE students.",
    start_url: "/",
    display: "standalone",
    background_color: "#071333",
    theme_color: "#456be5",
    icons: [
      {
        src: iconSrc,
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: iconSrc,
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
