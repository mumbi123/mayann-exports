const SERVICES = [
  {
    num: '01',
    title: 'Find, Source & Export',
    desc: 'We locate exactly what you need across China\'s vast manufacturing landscape. From niche products to bulk orders, we handle the entire sourcing chain.',
  },
  {
    num: '02',
    title: 'Quality Inspection',
    desc: 'On-the-ground quality checks are performed before any shipment leaves the factory. What you see is exactly what you get — guaranteed.',
  },
  {
    num: '03',
    title: 'Supplier & Vendor Verification',
    desc: 'We physically visit and vet factories, checking licenses, capacity, and track records so you only work with legitimate, reliable suppliers.',
  },
  {
    num: '04',
    title: 'Explore & Compare Prices',
    desc: 'We survey multiple factories and vendors for each product, bringing you a transparent comparison so you always secure the best deal.',
  },
  {
    num: '05',
    title: 'Warehousing & Consolidation',
    desc: 'Hold and consolidate multiple orders from different suppliers in our warehouse before a single combined shipment — saving you freight costs significantly.',
  },
  {
    num: '06',
    title: 'Pay Supplier on Your Behalf',
    desc: 'Navigating international payments to Chinese suppliers can be complex. We handle all supplier payments directly, safely, and with full transparency.',
  },
  {
    num: '07',
    title: 'Shipping & Logistics',
    desc: 'We manage the full logistics chain — from factory door to your destination. Sea freight, air freight, customs clearance — handled end-to-end.',
  },
  {
    num: '08',
    title: 'Business Support & China Tour',
    desc: 'Planning to visit China? We provide guided factory tours, market visits, and business support to help you make the most of your trip.',
  },
]

const PRODUCTS = [
  { img: '/furniture.jpg', t: 'Furniture &\nBuilding Materials' },
  { img: '/cars.jpg',      t: 'Cars &\nVehicles' },
  { img: '/medical.jpg',   t: 'Medical Supplies\n& Cosmetics' },
  { img: '/gear.jpg',      t: 'Equipment &\nMachinery' },
  { img: '/clothes.jpg',   t: 'Clothing &\nApparel' },
]

export default function Services() {
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
            <p className="text-xs tracking-[0.22em] uppercase text-muted">What We Offer</p>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-light text-theme leading-tight max-w-2xl">
            End-to-end<br />
            <em className="text-accent not-italic">sourcing</em> services
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map(s => (
            <div key={s.num} className="card p-8 flex gap-6">
              <div className="flex-shrink-0">
                <span className="font-display text-5xl font-light text-accent opacity-30 leading-none block">
                  {s.num}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-theme mb-3">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products we source */}
      <section
        className="py-20"
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-5 mb-12">
            <span className="line w-10" />
            <p className="text-xs tracking-[0.22em] uppercase text-muted">Range of Products</p>
          </div>
          <h2 className="font-display text-4xl font-light text-theme mb-12">
            If it's made in China, we can find it.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PRODUCTS.map(p => (
              <div
                key={p.t}
                className="text-center overflow-hidden"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <div className="w-full h-36 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.t}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-3 text-xs leading-snug text-muted whitespace-pre-line">{p.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
