import renderOGImage from "../../lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Oliver Piechocki, IMS-Absolvent · Berufsmaturität Wirtschaft";

export default function Image() {
  return renderOGImage("de");
}
