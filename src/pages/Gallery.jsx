import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

// ---------- 1. DYNAMIC GALLERY BUILDER ----------
function buildBaseGalleryItems() {
  const imagePaths = (folder, prefix, start, end) => {
    const paths = [];
    for (let i = start; i <= end; i++) {
      paths.push(`/images/${folder}/${prefix}${i}`); // no extension — resolved at runtime
    }
    return paths;
  };

  return [
    {
      label: 'Furniture Sourcing',
      media: [
        ...imagePaths('furniture', 'furniture', 1, 8), // furniture1–furniture8 jpg/jpeg
      ],
    },
    {
      label: 'Machinery Inspection',
      media: [
        ...imagePaths('machines', 'machine', 0, 3), // machine0–machine3 jpg/jpeg
      ],
    },
    {
      label: 'Auto Sourcing',
      media: [
        ...imagePaths('cars', 'cars', 0, 3), // cars0–cars3 jpg/jpeg
        '/images/cars/cars4.mp4',            // cars4 mp4
      ],
    },
    {
      label: 'Medical Supplies',
      media: imagePaths('medical', 'medical', 0, 4),
    },
    {
      label: 'Warehouse Logistics & Shipping',
      media: [
        ...imagePaths('warehouse', 'transport', 1, 4), // transport1–4 images (transport4 is an image)
        '/images/warehouse/transport5.mp4',             // transport5 mp4 (Now Muted)
        '/images/warehouse/transport6.mp4',             // transport6 mp4 (Now Muted)
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

// ---------- 3. REACT COMPONENT ----------
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
    <div className="pt-24 transition-colors duration-500" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
      
      {/* Header */}
      <section
        className="py-20 px-6"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-5 mb-6">
            <span className="w-10 h-px bg-current opacity-30" />
            <p className="text-xs tracking-[0.22em] uppercase opacity-60">Our Work</p>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-extralight tracking-tight leading-tight">
            Gallery
          </h1>
          <p className="opacity-70 mt-4 max-w-lg leading-relaxed text-sm font-light">
            A glimpse into our operations across China — from factory floors to warehouse
            consolidation and everything in between.
          </p>
        </div>
      </section>

      {/* Grid — 3 columns on desktop, 2 on mobile */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6" style={{ gridAutoRows: '1fr' }}>
          {galleryItems.map((item, idx) => {
            const firstMedia = item.images[0];
            const isFirstVideo = isVideo(firstMedia);
            return (
              <div
                key={idx}
                onClick={() => openLightbox(item, 0)}
                className="relative overflow-hidden cursor-pointer group rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl"
                style={{
                  aspectRatio: '1 / 1',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
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

                {/* Adaptive Hover Overlay Mask */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <span
                      className="font-display text-base font-normal block mb-1 text-white tracking-wide"
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xs tracking-widest uppercase text-slate-400"
                    >
                      {item.images.length} item{item.images.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs opacity-50 mt-10 tracking-wider">
          Click any category to view photos/videos · Contact us to see product samples
        </p>
      </section>

      {/* Category tags */}
      <section
        className="py-16"
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.22em] uppercase opacity-50 mb-10">Product Ranges</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Furniture', 'Building Materials', 'Cars', 'Medical Supplies',
              'Cosmetics', 'Machinery', 'Equipment', 'Clothing', 'Apparel', 'Electronics',
            ].map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 text-xs tracking-wider uppercase rounded-lg transition-colors border bg-current/[0.02]"
                style={{ borderColor: 'var(--border)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          style={{ background: 'rgba(10,10,12,0.95)' }}
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
                  muted // <--- CRITICAL FIX: Forces transport5, transport6, etc. to load completely muted in Lightbox view
                  playsInline
                />
              ) : (
                <img
                  src={lightbox.item.images[lightbox.mediaIndex]}
                  alt={lightbox.item.label}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

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

            {lightbox.item.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {lightbox.item.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox((lb) => ({ ...lb, mediaIndex: i }))}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      background: i === lightbox.mediaIndex ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
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