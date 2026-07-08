import { ImageResponse } from "next/og";
import { profile } from "../lib/content";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            color: "#8b909b",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          {profile.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#8b909b",
            marginTop: 18,
          }}
        >
          {profile.role} at KSH Hottingen
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 48,
          }}
        >
          {["IT", "Business", "Finance"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#c8ccd4",
                fontSize: 22,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
