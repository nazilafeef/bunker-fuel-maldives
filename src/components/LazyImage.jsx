import { useEffect, useRef, useState } from 'react';

/**
 * LazyImage — below-the-fold lazy loading with LQIP blur-up.
 *
 * The image renders only when it scrolls near the viewport
 * (IntersectionObserver, 200px rootMargin). Until the high-res
 * asset has fully decoded, a soft sand gradient stands in.
 *
 * For above-the-fold (hero) images, pass `priority` to skip lazy
 * logic and eagerly fetch.
 *
 * Cached-image race fix: when an image is already in browser cache,
 * the `load` event can fire synchronously during render, before
 * React attaches the `onLoad` listener. We catch this in useEffect
 * by checking `img.complete && img.naturalWidth > 0` after mount.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  aspectRatio = '16/10',
  objectPosition = 'center',
}) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);

  // IntersectionObserver — delay rendering the <img> until it's near the viewport.
  useEffect(() => {
    if (priority || inView) return;
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, inView]);

  // Cached-image race fix: if the image is already complete when the
  // <img> mounts (because it was in cache), the load event fired before
  // React attached the listener. Flip state immediately on mount.
  useEffect(() => {
    if (!inView) return;
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [inView]);

  return (
    <div
      ref={wrapperRef}
      className={`relative image-bleed bg-sand-200 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Soft sand placeholder until the image is decoded */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-sand-200 via-sand-100 to-lagoon-50"
        aria-hidden="true"
      />
      {inView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-[filter,opacity,transform] duration-700 ease-out ${
            loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-[1.02]'
          } ${imgClassName}`}
          style={{ objectPosition }}
        />
      )}
    </div>
  );
}