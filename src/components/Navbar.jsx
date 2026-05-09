import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Palette, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/reviews',  label: 'Reviews' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const { theme, setTheme, THEMES } = useTheme()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const themeRef = useRef(null)

  // Show hint on every page load / refresh
  useEffect(() => {
    const t = setTimeout(() => {
      setShowHint(true)
      const t2 = setTimeout(() => {
        setShowHint(false)
      }, 4000)
      return () => clearTimeout(t2)
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleThemeClick = () => {
    setThemeOpen(v => !v)
    setShowHint(false)
  }

  const handleSelectTheme = (id) => {
    setTheme(id)
    setThemeOpen(false)
  }

  const currentTheme = THEMES.find(t => t.id === theme)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none no-underline">
            <span className="font-display text-xl font-semibold text-theme" style={{ letterSpacing: '0.02em' }}>
              MayAnn
            </span>
            <span className="text-accent text-[0.62rem] tracking-[0.22em] uppercase font-light">
              Exports
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[0.73rem] tracking-[0.12em] uppercase transition-colors duration-200 no-underline ${
                  pathname === l.to ? 'text-accent' : 'text-muted hover:text-accent'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: theme button + hamburger */}
          <div className="flex items-center gap-4">

            {/* Theme dropdown */}
            <div className="hidden md:block relative" ref={themeRef}>

              {/* Hint tooltip */}
              {showHint && (
                <div
                  className="absolute right-0 top-12 z-50 px-4 py-3 text-xs whitespace-nowrap"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    borderRadius: '2px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    animation: 'fadeUp 0.4s ease forwards',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Palette size={12} />
                    <span className="tracking-wider uppercase font-medium">Personalise your theme here</span>
                  </div>
                  {/* Arrow pointing up */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '20px',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderBottom: '6px solid var(--accent)',
                    }}
                  />
                </div>
              )}

              {/* Theme button */}
              <button
                onClick={handleThemeClick}
                className="flex items-center gap-2 px-3 py-2 transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  background: showHint ? 'var(--accent-soft)' : 'transparent',
                  color: 'var(--text)',
                  borderColor: showHint ? 'var(--accent)' : 'var(--border)',
                  animation: showHint ? 'pulse-border 1.5s ease-in-out infinite' : 'none',
                }}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: currentTheme?.dot, border: '1px solid var(--border)' }}
                />
                <span className="text-[0.7rem] tracking-[0.14em] uppercase text-muted">Theme</span>
                <Palette size={12} className="text-muted" />
              </button>

              {/* Dropdown list */}
              {themeOpen && (
                <div
                  className="absolute right-0 top-12 z-50 py-2 min-w-[160px]"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                  }}
                >
                  <p
                    className="px-4 py-2 text-[0.62rem] tracking-[0.2em] uppercase"
                    style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}
                  >
                    Choose Theme
                  </p>
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTheme(t.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left"
                      style={{ background: theme === t.id ? 'var(--surface)' : 'transparent' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                      onMouseLeave={e => e.currentTarget.style.background = theme === t.id ? 'var(--surface)' : 'transparent'}
                    >
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ background: t.dot, border: `2px solid ${t.ring}` }}
                      />
                      <span className="text-xs tracking-wider uppercase text-theme">{t.label}</span>
                      {theme === t.id && (
                        <Check size={12} className="ml-auto text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden text-theme p-1"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background: 'var(--bg)' }}
        >
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl font-light no-underline transition-colors ${
                pathname === l.to ? 'text-accent' : 'text-theme'
              }`}
              style={{ letterSpacing: '0.04em' }}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile theme switcher */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <p className="text-xs tracking-[0.2em] uppercase text-muted">Choose Theme</p>
            <div className="flex items-center gap-4">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={t.label}
                  className="flex flex-col items-center gap-2"
                >
                  <span
                    className="w-7 h-7 rounded-full transition-all"
                    style={{
                      background: t.dot,
                      border: `2px solid ${t.ring}`,
                      transform: theme === t.id ? 'scale(1.3)' : 'scale(1)',
                      boxShadow: theme === t.id ? `0 0 0 2px ${t.ring}` : 'none',
                    }}
                  />
                  <span className="text-[0.6rem] tracking-wider uppercase text-muted">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,169,110,0.4); }
          50%       { box-shadow: 0 0 0 4px rgba(200,169,110,0.15); }
        }
      `}</style>
    </>
  )
}