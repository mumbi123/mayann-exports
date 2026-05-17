import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

// ── Constants ────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { label: 'Furniture & Building Materials' },
  { label: 'Cars & Vehicles' },
  { label: 'Medical Supplies & Cosmetics' },
  { label: 'Equipment & Machinery' },
  { label: 'Clothing & Apparel' },
  { label: 'Everything Made in China' },
]

const SEGMENTS = [
  { text: 'Creating a\n', accent: false },
  { text: 'Bridge',       accent: true  },
  { text: '\nBetween\nYou & China', accent: false },
]

const FULL_TEXT = SEGMENTS.map(s => s.text).join('')

const CAPABILITIES = ['Direct Sourcing', 'Quality Control', 'Safe Logistics', 'Price Match']

// ── Theme map ─────────────────────────────────────────────────────────────────

const THEME_STYLES = {
  'theme-ivory': {
    surface: '#f9f7f2', card: '#ffffff', text: '#1a1410',
    textMuted: 'rgba(26,20,16,0.55)', accent: '#c0271d',
    border: 'rgba(26,20,16,0.08)', capLabel: '#c0271d',
    watermarkOpacity: 0.06, glowColor: 'rgba(192,39,29,0.10)',
    btnOutline: 'rgba(26,20,16,0.12)', productHover: 'rgba(26,20,16,0.03)',
  },
  'theme-pearl': {
    surface: '#eef0f6', card: '#ffffff', text: '#1a1d2e',
    textMuted: 'rgba(26,29,46,0.55)', accent: '#c0271d',
    border: 'rgba(26,29,46,0.08)', capLabel: '#c0271d',
    watermarkOpacity: 0.05, glowColor: 'rgba(123,156,196,0.15)',
    btnOutline: 'rgba(26,29,46,0.12)', productHover: 'rgba(26,29,46,0.03)',
  },
  'theme-blush': {
    surface: '#f4ede9', card: '#ffffff', text: '#2a1813',
    textMuted: 'rgba(42,24,19,0.55)', accent: '#c0271d',
    border: 'rgba(42,24,19,0.08)', capLabel: '#c0271d',
    watermarkOpacity: 0.06, glowColor: 'rgba(192,113,90,0.12)',
    btnOutline: 'rgba(42,24,19,0.12)', productHover: 'rgba(42,24,19,0.03)',
  },
  'theme-midnight': {
    surface: '#16161e', card: '#1f1f2a', text: '#e8e6df',
    textMuted: 'rgba(232,230,223,0.50)', accent: '#e0332a',
    border: 'rgba(232,230,223,0.08)', capLabel: '#e0332a',
    watermarkOpacity: 0.04, glowColor: 'rgba(200,169,110,0.10)',
    btnOutline: 'rgba(232,230,223,0.12)', productHover: 'rgba(232,230,223,0.04)',
  },
}

// ── Breakpoint hook ───────────────────────────────────────────────────────────

function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return {
    isMobile:  width < 640,
    isTablet:  width >= 640 && width < 1024,
    isDesktop: width >= 1024,
  }
}

// ── Typewriter Heading ────────────────────────────────────────────────────────

function TypewriterHeading({ accentColor, textColor, isMobile, isTablet }) {
  const [count, setCount] = useState(0)
  const done = count >= FULL_TEXT.length

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setCount(c => c + 1), 55)
    return () => clearTimeout(t)
  }, [count, done])

  let remaining = count
  const visible = SEGMENTS.map(seg => {
    const slice = seg.text.slice(0, Math.max(0, remaining))
    remaining = Math.max(0, remaining - seg.text.length)
    return { text: slice, accent: seg.accent }
  })

  return (
    <h1 style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      fontSize: isMobile ? '2.5rem' : isTablet ? '3.4rem' : 'clamp(3rem,5vw,5rem)',
      fontWeight: 300,
      letterSpacing: '-0.02em',
      lineHeight: 1.08,
      marginBottom: '1.25rem',
      color: textColor,
      textAlign: isMobile ? 'center' : 'left',
    }}>
      {visible.map((seg, i) =>
        seg.text.split('\n').map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {seg.accent
              ? <span style={{ color: accentColor, fontWeight: 400 }}>{line}</span>
              : line}
            {j < arr.length - 1 && <br />}
          </span>
        ))
      )}
      {!done && (
        <span style={{
          display: 'inline-block', width: 3, height: '0.8em',
          marginLeft: 4, verticalAlign: 'middle',
          backgroundColor: accentColor, animation: 'blink 1s ease-in-out infinite',
        }} />
      )}
    </h1>
  )
}

// ── MayAnn Card ───────────────────────────────────────────────────────────────

function MayAnnCard({ T, isMobile, isTablet, logoSrc }) {
  const pad   = isMobile ? '24px 20px 20px' : '36px 36px 32px'
  const bleed = isMobile ? '0 -20px'         : '0 -36px'
  const imgH  = isMobile ? 180               : isTablet ? 220 : 240

  return (
    <div style={{
      width: '100%',
      background: T.card,
      borderRadius: isMobile ? 20 : 28,
      boxShadow: '0 24px 64px -16px rgba(0,0,0,0.13), 0 4px 16px -4px rgba(0,0,0,0.06)',
      padding: pad,
      border: `1px solid ${T.border}`,
      transition: 'background 0.4s',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: isMobile ? '1.2rem' : '1.35rem', fontWeight: 700, color: T.text, letterSpacing: '-0.01em' }}>
            MayAnn Exports
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.83rem', color: T.accent, fontWeight: 600 }}>
            Global Trade Partner
          </p>
        </div>
        <span style={{
          width: 11, height: 11, borderRadius: '50%',
          background: T.accent, boxShadow: `0 0 8px ${T.accent}88`,
          animation: 'pulse 2s ease-in-out infinite', flexShrink: 0, marginTop: 4,
        }} />
      </div>

      {/* Logo panel */}
      <div style={{ margin: bleed, background: T.surface, overflow: 'hidden', height: imgH }}>
        <img
          src={logoSrc}
          alt="MayAnn Exports Logo"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: T.border, margin: '22px 0 18px' }} />

      {/* Capabilities */}
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.capLabel, marginBottom: 14 }}>
        Core Capabilities
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 11, columnGap: 8 }}>
        {CAPABILITIES.map(cap => (
          <div key={cap} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.82rem', fontWeight: 500, color: T.text }}>
            <CheckCircle2 size={14} color={T.accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            {cap}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ label, T }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '17px 20px', borderRadius: 14,
        border: `1px solid ${hovered ? T.accent + '44' : T.border}`,
        background: hovered ? T.productHover : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <span style={{ fontWeight: 500, color: T.text, fontSize: '0.9rem', opacity: 0.85 }}>{label}</span>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? T.accent : T.border,
        color: hovered ? '#fff' : T.text,
        transition: 'background 0.2s, color 0.2s', flexShrink: 0,
      }}>
        <ArrowRight size={14} />
      </div>
    </div>
  )
}

// ── Home ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const { theme } = useTheme()
  const T = THEME_STYLES[theme] ?? THEME_STYLES['theme-ivory']
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const logoSrc = theme === 'theme-midnight' ? '/logo2.png' : '/logo.jpeg'

  return (
    <div style={{ minHeight: '100vh', background: T.surface, color: T.text, transition: 'background 0.4s, color 0.4s' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: isDesktop ? '100vh' : 'auto',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: isMobile
          ? '6.5rem 1.25rem 3.5rem'
          : isTablet
          ? '7rem 2.5rem 4rem'
          : '0 clamp(1.5rem,5vw,4rem)',
      }}>

        {/* Watermark */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${logoSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: isMobile ? 'center 35%' : isTablet ? '50% 40%' : '45% center',
          backgroundSize: isMobile ? '280px auto' : isTablet ? '380px auto' : '520px auto',
          opacity: T.watermarkOpacity, pointerEvents: 'none',
        }} />

        {/* Glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 15% 40%, ${T.glowColor}, transparent)`,
          pointerEvents: 'none',
        }} />

        {/* ── MOBILE & TABLET: stacked layout ─────────────────────────────── */}
        {(isMobile || isTablet) && (
          <div style={{
            position: 'relative', zIndex: 1,
            width: '100%', maxWidth: isTablet ? 680 : 480,
            margin: '0 auto',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: isMobile ? '2rem' : '2.5rem',
          }}>
            {/* Card first on mobile/tablet */}
            <div style={{ width: '100%', maxWidth: isTablet ? 420 : '100%' }}>
              <MayAnnCard T={T} isMobile={isMobile} isTablet={isTablet} logoSrc={logoSrc} />
            </div>

            {/* Text below card */}
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
                <span style={{ height: 1, width: 28, background: T.accent, display: 'block' }} />
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: T.accent, margin: 0 }}>
                  Sourcing Excellence
                </p>
              </div>

              <TypewriterHeading accentColor={T.accent} textColor={T.text} isMobile={isMobile} isTablet={isTablet} />

              <p style={{
                fontSize: isMobile ? '0.97rem' : '1.05rem',
                color: T.textMuted, maxWidth: 480,
                margin: '0 auto 2rem', lineHeight: 1.7, fontWeight: 300,
              }}>
                We bridge the complex gap between global businesses and Chinese manufacturing with
                on-the-ground presence and verified factory networks.
              </p>

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, justifyContent: 'center' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 30px', borderRadius: 9999, background: T.accent, color: '#fff',
                  fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
                  boxShadow: `0 8px 32px -8px ${T.accent}66`, transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Start Sourcing <ArrowRight size={17} />
                </Link>

                <Link to="/services" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '13px 30px', borderRadius: 9999,
                  border: `1.5px solid ${T.btnOutline}`, background: 'transparent',
                  color: T.text, fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = T.btnOutline}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── DESKTOP: side-by-side layout ─────────────────────────────────── */}
        {isDesktop && (
          <div style={{
            position: 'relative', zIndex: 1,
            width: '100%', maxWidth: 1280, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 420px',
            gap: 'clamp(2rem,4vw,5rem)', alignItems: 'center',
          }}>
            {/* Left: text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <span style={{ height: 1, width: 32, background: T.accent, display: 'block' }} />
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: T.accent, margin: 0 }}>
                  Sourcing Excellence
                </p>
              </div>

              <TypewriterHeading accentColor={T.accent} textColor={T.text} isMobile={false} isTablet={false} />

              <p style={{
                fontSize: '1.05rem', color: T.textMuted,
                maxWidth: 520, marginBottom: '2.5rem', lineHeight: 1.7, fontWeight: 300,
              }}>
                We bridge the complex gap between global businesses and Chinese manufacturing with
                on-the-ground presence and verified factory networks.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 32px', borderRadius: 9999, background: T.accent, color: '#fff',
                  fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
                  boxShadow: `0 8px 32px -8px ${T.accent}66`, transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Start Sourcing <ArrowRight size={17} />
                </Link>

                <Link to="/services" style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '14px 32px', borderRadius: 9999,
                  border: `1.5px solid ${T.btnOutline}`, background: 'transparent',
                  color: T.text, fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = T.btnOutline}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Right: card */}
            <MayAnnCard T={T} isMobile={false} isTablet={false} logoSrc={logoSrc} />
          </div>
        )}
      </section>

      {/* ── PRODUCTS GRID ─────────────────────────────────────────────────── */}
      <section style={{
        padding: isMobile ? '3rem 1.25rem' : isTablet ? '4rem 2.5rem' : 'clamp(4rem,8vh,6rem) clamp(1.5rem,5vw,4rem)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {PRODUCTS.map((p, i) => <ProductCard key={i} label={p.label} T={T} />)}
        </div>
      </section>

      <style>{`
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  )
}