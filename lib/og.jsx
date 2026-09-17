import { promises as fs } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { content } from "./content";

export const OG_SIZE = { width: 1200, height: 630 };

// Link preview for LinkedIn, WhatsApp, Teams & co. Rendered once at build time
// (no edge runtime), so the image is instantly available when a link is shared.
async function portraitDataUrl() {
  try {
    const file = path.join(process.cwd(), "content", "photos", "Professional_pic.jpeg");
    return `data:image/jpeg;base64,${(await fs.readFile(file)).toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function renderOGImage(lang) {
  const { profile, ui } = content[lang];
  const photo = await portraitDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "#0a0a0b",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: photo ? 680 : 1040 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#8b909b",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#34d399" }} />
            {profile.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 84,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 36, color: "#c8ccd4", lineHeight: 1.3 }}>
            {profile.role}
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 32, color: "#8b909b", lineHeight: 1.3 }}>
            {ui.facts.statusValue}
          </div>
        </div>
        {photo && (
          <img
            src={photo}
            width={336}
            height={420}
            style={{
              objectFit: "cover",
              borderRadius: 28,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        )}
      </div>
    ),
    OG_SIZE
  );
}
