import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const HEADING_SEGMENTS = [
  { text: 'The bridge\n', accent: false },
  { text: 'you need',     accent: true  },
]
const HEADING_FULL = HEADING_SEGMENTS.map(s => s.text).join('')

function TypewriterHeading() {
  const [count, setCount] = useState(0)
  const done = count >= HEADING_FULL.length

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setCount(c => c + 1), 60)
    return () => clearTimeout(t)
  }, [count, done])

  let remaining = count
  const visible = HEADING_SEGMENTS.map(seg => {
    const slice = seg.text.slice(0, Math.max(0, remaining))
    remaining = Math.max(0, remaining - seg.text.length)
    return { text: slice, accent: seg.accent }
  })

  return (
    <h1 className="font-display text-6xl md:text-7xl font-light text-theme leading-tight max-w-2xl">
      {visible.map((seg, i) =>
        seg.text.split('\n').map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {seg.accent
              ? <em className="text-accent not-italic">{line}</em>
              : line}
            {j < arr.length - 1 && <br />}
          </span>
        ))
      )}
      {!done && (
        <span style={{
          display: 'inline-block', width: 3, height: '0.8em',
          marginLeft: 2, verticalAlign: 'middle',
          backgroundColor: 'var(--accent)',
          animation: 'tw-blink 1s ease-in-out infinite',
        }} />
      )}
      <style>{`@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </h1>
  )
}

const VALUES = [
  { title: 'Transparency',  desc: 'No hidden fees, no surprise costs. We keep you informed at every step of the sourcing process.' },
  { title: 'Trust',         desc: 'Your money and interests are protected. We only recommend suppliers we have personally verified.' },
  { title: 'Efficiency',    desc: "We move quickly so you don't miss market windows. Fast turnaround on quotes, inspections, and shipments." },
  { title: 'Partnership',   desc: "We treat your business like our own — the better you do, the better we do. Long-term relationships are our goal." },
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
          
        </span>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-5 mb-6">
            <span className="line w-10" />
            <p className="text-xs tracking-[0.22em] uppercase text-muted">Our Story</p>
          </div>
          <TypewriterHeading />
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