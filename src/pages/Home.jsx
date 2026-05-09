import { Link } from 'react-router-dom'
import { ArrowRight, Globe, ShieldCheck, TrendingDown } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: Globe,        title: 'China-Based Team',   desc: 'On-the-ground presence means faster sourcing, real factory visits, and genuine supplier relationships.' },
  { icon: ShieldCheck,  title: 'Verified Suppliers',  desc: 'Every supplier is vetted before we recommend them — protecting your money and your time.' },
  { icon: TrendingDown, title: 'Lowest Prices',       desc: 'We compare across multiple factories so you always get the most competitive rate available.' },
]

const PRODUCTS = [
  { label: 'Furniture & Building Materials' },
  { label: 'Cars & Vehicles' },
  { label: 'Medical Supplies & Cosmetics' },
  { label: 'Equipment & Machinery' },
  { label: 'Clothing & Apparel' },
  { label: 'Everything Made in China' },
]

export default function Home() {
  return (
    <div>

      {/* ── HERO ─────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center hero-glow overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${-10 + i * 20}%`,
                right: `${-5 + i * 5}%`,
                width: '1px',
                height: '140%',
                background: 'var(--accent-soft)',
                transform: 'rotate(15deg)',
                opacity: 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="fade-up delay-100 text-xs tracking-[0.25em] uppercase text-accent mb-6">
              China Sourcing Experts
            </p>
            <h1 className="fade-up delay-200 font-display text-6xl md:text-7xl font-light leading-[1.08] text-theme mb-6">
              Creating a<br />
              <em className="text-accent not-italic">Bridge</em><br />
              Between<br />
              You & China
            </h1>
            <p className="fade-up delay-300 text-muted leading-relaxed max-w-md mb-10">
              MayAnn Exports is your full-service China sourcing partner — from finding the right factory
              to landing goods at your door.
            </p>
            <div className="fade-up delay-400 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Start Sourcing
              </Link>
              <Link to="/services" className="btn-ghost">
                Our Services
              </Link>
            </div>
          </div>

          {/* Right card */}
          <div className="fade-up delay-300 hidden md:block">
            <div
              className="relative p-10"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
            >
              <div className="relative z-10">
                <img
                  src="/logo.jpeg"
                  alt="MayAnn Exports"
                  className="w-28 h-28 object-contain mb-6"
                />
                <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4">What We Source</p>
                <div className="flex flex-col gap-3">
                  {PRODUCTS.map(p => (
                    <div key={p.label} className="flex items-center gap-3 text-sm text-theme">
                      <span className="line w-3 flex-shrink-0" style={{ height: '1px' }} />
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {[
            { n: '500+', label: 'Products Sourced' },
            { n: '100%', label: 'Supplier Verified' },
            { n: '20+', label: 'Product Categories' },
            { n: '24/7', label: 'Support Available' },
          ].map((s, i) => (
            <div
              key={i}
              className="py-10 px-6 text-center"
              style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="font-display text-4xl font-light text-accent mb-1">{s.n}</div>
              <div className="text-xs tracking-[0.14em] uppercase text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HIGHLIGHTS ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-center gap-5 mb-14">
          <span className="line w-10" />
          <p className="text-xs tracking-[0.22em] uppercase text-muted">Why MayAnn</p>
        </div>
        <h2 className="font-display text-5xl font-light text-theme mb-16 max-w-xl leading-tight">
          Your trusted partner on the ground
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-8">
              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{ border: '1px solid var(--accent)' }}
              >
                <Icon size={20} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-theme mb-3">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="line w-10 mx-auto mb-6" />
          <h2 className="font-display text-5xl font-light text-theme mb-6 leading-tight">
            Ready to source from China?
          </h2>
          <p className="text-muted mb-10 leading-relaxed">
            Tell us what you need — we'll find it, inspect it, and deliver it to you.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Contact Us <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}