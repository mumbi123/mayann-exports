import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

// ---------- 1. DYNAMIC GALLERY BUILDER (6 categories, 3×2) ----------
function buildBaseGalleryItems() {
  const imagePaths = (folder, prefix, start, end, exclusions = []) => {
    const paths = [];
    for (let i = start; i <= end; i++) {
      if (exclusions.includes(i)) continue;
      paths.push(`/images/${folder}/${prefix}${i}`); // no extension
    }
    return paths;
  };

  const videoPaths = (folder, prefix, start, end) => {
    const paths = [];
    for (let i = start; i <= end; i++) {
      paths.push(`/images/${folder}/${prefix}${i}.mp4`);
    }
    return paths;
  };

  return [
    {
      label: 'Furniture Sourcing',
      media: imagePaths('furniture', 'furniture', 0, 8),
    },
    {
      label: 'Machinery Inspection',
      media: imagePaths('machines', 'machine', 0, 4),
    },
    {
      label: 'Auto Sourcing',
      media: [
        ...imagePaths('cars', 'cars', 0, 6),
        '/images/cars/cars7.mp4',
      ],
    },
    {
      label: 'Clothing Suppliers',
      media: [
        ...videoPaths('clothes', 'clothes', 1, 4),
        ...imagePaths('clothes', 'clothes', 5, 6),
      ],
    },
    {
      label: 'Medical Supplies',
      media: imagePaths('medical', 'medical', 0, 4),
    },
    {
      label: 'Warehouse Logistics & Shipping',
      media: [
        ...imagePaths('warehouse', 'transport', 1, 3),
        ...videoPaths('warehouse', 'transport', 4, 7),
      ],
    },
  ];
}

// ---------- 2. RESOLVE .jpg / .jpeg AT RUNTIME ----------
async function resolveMediaUrl(basePath) {
  if (basePath.endsWith('.mp4')) return basePath;
  const tryExt = async (ext) => {
    const url = `${basePath}.${ext}`;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  };
  const jpg = await tryExt('jpg');
  if (jpg) return jpg;
  const jpeg = await tryExt('jpeg');
  return jpeg;
}

async function buildResolvedGallery() {
  const baseItems = buildBaseGalleryItems();
  const resolvedItems = await Promise.all(
    baseItems.map(async (item) => {
      const resolvedMedia = await Promise.all(
        item.media.map((media) => resolveMediaUrl(media))
      );
      return {
        ...item,
        images: resolvedMedia.filter(Boolean),
      };
    })
  );
  return resolvedItems;
}

// ---------- 3. REACT COMPONENT (3×2 grid & category titles) ----------
export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    buildResolvedGallery().then(setGalleryItems);
  }, []);

  const openLightbox = (item, clickedIndex = 0) => {
    setLightbox({ item, mediaIndex: clickedIndex });
  };
  const closeLightbox = () => setLightbox(null);

  const prev = () =>
    setLightbox((lb) => ({
      ...lb,
      mediaIndex: (lb.mediaIndex - 1 + lb.item.images.length) % lb.item.images.length,
    }));

  const next = () =>
    setLightbox((lb) => ({
      ...lb,
      mediaIndex: (lb.mediaIndex + 1) % lb.item.images.length,
    }));

  const isVideo = (url) => url?.endsWith('.mp4');

  return (
    <div className="pt-24">
      {/* Header */}
      <section
        className="py-20 px-6"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-5 mb-6">
            <span className="line w-10" />
            <p className="text-xs tracking-[0.22em] uppercase text-muted">Our Work</p>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-light text-theme leading-tight">
            Gallery
          </h1>
          <p className="text-muted mt-4 max-w-lg leading-relaxed text-sm">
            A glimpse into our operations across China — from factory floors to warehouse
            consolidation and everything in between.
          </p>
        </div>
      </section>

      {/* Grid — 3 columns on desktop, 2 on mobile (3×2 = 6 items) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: '1fr' }}>
          {galleryItems.map((item, idx) => {
            const firstMedia = item.images[0];
            const isFirstVideo = isVideo(firstMedia);
            return (
              <div
                key={idx}
                onClick={() => openLightbox(item, 0)}
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  aspectRatio: '1 / 1',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Thumbnail: image or video */}
                {isFirstVideo ? (
                  <div className="absolute inset-0 w-full h-full bg-black">
                    <video
                      src={firstMedia}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-12 h-12 text-white opacity-80" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={firstMedia}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Hover overlay - shows category title BEFORE opening */}
                <div className="gallery-overlay">
                  <div className="text-center px-4">
                    <span
                      className="font-display text-base font-light block mb-1"
                      style={{ color: 'var(--bg)', letterSpacing: '0.05em' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: 'var(--bg)', opacity: 0.75 }}
                    >
                      {item.images.length} media item{item.images.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted mt-10 tracking-wider">
          Click any category to view photos/videos · Contact us to see product samples
        </p>
      </section>

      {/* Categories tags (unchanged) */}
      <section
        className="py-16"
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.22em] uppercase text-muted mb-10">Product Ranges</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Furniture',
              'Building Materials',
              'Cars',
              'Medical Supplies',
              'Cosmetics',
              'Machinery',
              'Equipment',
              'Clothing',
              'Apparel',
              'Electronics',
            ].map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 text-xs tracking-wider uppercase text-muted"
                style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox - shows category title AFTER opening (bottom bar) */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={28} />
            </button>

            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              {isVideo(lightbox.item.images[lightbox.mediaIndex]) ? (
                <video
                  src={lightbox.item.images[lightbox.mediaIndex]}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={lightbox.item.images[lightbox.mediaIndex]}
                  alt={lightbox.item.label}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Bottom bar: category title displayed here AFTER opening */}
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="font-display text-white text-lg font-light">
                {lightbox.item.label}
              </p>
              {lightbox.item.images.length > 1 && (
                <div className="flex items-center gap-4">
                  <button onClick={prev} className="text-white opacity-70 hover:opacity-100">
                    <ChevronLeft size={24} />
                  </button>
                  <span className="text-white text-xs opacity-60">
                    {lightbox.mediaIndex + 1} / {lightbox.item.images.length}
                  </span>
                  <button onClick={next} className="text-white opacity-70 hover:opacity-100">
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>

            {/* Dot indicators */}
            {lightbox.item.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {lightbox.item.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox((lb) => ({ ...lb, mediaIndex: i }))}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      background:
                        i === lightbox.mediaIndex
                          ? 'var(--accent)'
                          : 'rgba(255,255,255,0.3)',
                      transform: i === lightbox.mediaIndex ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}