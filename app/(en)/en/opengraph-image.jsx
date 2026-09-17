import renderOGImage from "../../../lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Oliver Piechocki, IMS Graduate · Business Baccalaureate";

export default function Image() {
  return renderOGImage("en");
}
