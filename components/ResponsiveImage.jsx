// Renders the variants produced by scripts/generate-manifest.mjs: the browser picks
// AVIF, then WebP, then JPEG, in the smallest width that fits `sizes`.
// `priority` is for the one above-the-fold image; everything else loads lazily.
export default function ResponsiveImage({ image, alt, sizes, priority = false, className = "" }) {
  if (!image) return null;
  const common = {
    alt,
    className,
    decoding: "async",
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
    ...(image.width && { width: image.width, height: image.height }),
  };

  if (!image.avif) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image.src} {...common} />;
  }

  return (
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} srcSet={image.jpg} sizes={sizes} {...common} />
    </picture>
  );
}
