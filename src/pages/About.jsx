import { Link } from 'react-router-dom'

const VALUES = [
  { title: 'Transparency',  desc: 'No hidden fees, no surprise costs. We keep you informed at every step of the sourcing process.' },
  { title: 'Trust',         desc: 'Your money and interests are protected. We only recommend suppliers we have personally verified.' },
  { title: 'Efficiency',    desc: 'We move quickly so you don\'t miss market windows. Fast turnaround on quotes, inspections, and shipments.' },
  { title: 'Partnership',   desc: 'We treat your business like our own — the better you do, the better we do. Long-term relationships are our goal.' },
]

export default function About() {
  return (
    <div className="pt-24">

      {/* Header */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <span
          className="font-display absolute -right-8 -bottom-10 text-[220px] font-light leading-none select-none pointer-events-none"
          style={{ color: 'var(--accent-soft)', opacity: 0.5 }}
        >
          桥
        </span>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-5 mb-6">
            <span className="line w-10" />
            <p className="text-xs tracking-[0.22em] uppercase text-muted">Our Story</p>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-light text-theme leading-tight max-w-2xl">
            The bridge<br />
            <em className="text-accent not-italic">you need</em>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-20 items-start">
        <div>
          <h2 className="font-display text-4xl font-light text-theme mb-8 leading-tight">
            Why MayAnn Exports exists
          </h2>
          <div className="flex flex-col gap-5 text-muted leading-relaxed text-sm">
            <p>
              Importing from China shouldn't be a guessing game. Yet for most businesses, it is — dealing
              with unverified suppliers, unclear pricing, and goods that don't match what was ordered.
            </p>
            <p>
              MayAnn Exports was founded to change that. Based in China, we are physically present where
              the manufacturing happens — visiting factories, verifying suppliers, and inspecting quality
              before anything ships.
            </p>
            <p>
              Our slogan, <span className="text-accent italic">"Creating a Bridge Between You and China,"</span> is
              not just marketing. It's the job we do every day — connecting global buyers with China's
              manufacturing capability in a way that is transparent, efficient, and trustworthy.
            </p>
            <p>
              Whether you're a small business sourcing your first container or an established importer
              looking for a reliable partner, MayAnn Exports is here to make it work.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="flex flex-col gap-6">
          <p className="text-xs tracking-[0.22em] uppercase text-muted mb-2">Our Values</p>
          {VALUES.map(v => (
            <div key={v.title} className="flex gap-5 items-start">
              <span className="line w-6 mt-2 flex-shrink-0" style={{ height: '1px' }} />
              <div>
                <h4 className="font-display text-lg font-semibold text-theme mb-1">{v.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-4xl font-light text-theme mb-5">Let's work together</h2>
          <p className="text-muted text-sm mb-10">
            Reach out today and let us show you what seamless China sourcing feels like.
          </p>
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </section>
    </div>
  )
}
