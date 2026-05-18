import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <div className="font-display text-2xl font-semibold text-theme mb-1">MayAnn</div>
          <div className="text-accent text-xs tracking-[0.22em] uppercase mb-5">Exports</div>
          <p className="text-muted text-sm leading-relaxed max-w-xs">
            Creating a bridge between you and China. Your trusted sourcing partner for quality products at competitive prices.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-muted mb-5">Navigate</p>
          <div className="flex flex-col gap-3">
            {[['/', 'Home'], ['/services', 'Services'], ['/about', 'About Us'], ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm text-muted hover:text-accent transition-colors no-underline">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-muted mb-5">Get In Touch</p>
          <div className="flex flex-col gap-4">
            <a href="mailto:mayannexports@gmail.com" className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors no-underline">
              <Mail size={15} className="text-accent flex-shrink-0" />
              mayannexports@gmail.com
            </a>
            <a href="https://wa.me/8613298329703" className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors no-underline">
              <MessageCircle size={15} className="text-accent flex-shrink-0" />
              WhatsApp: +86 132 9832 9703
            </a>
            <a href="tel:+8613298329703" className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors no-underline">
              <Phone size={15} className="text-accent flex-shrink-0" />
              +86 132 9832 9703
            </a>
            <div className="flex items-center gap-3 text-sm text-muted">
              <MessageCircle size={15} className="text-accent flex-shrink-0" />
              WeChat: MayAnnexports
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }} className="py-5">
        <p className="text-center text-xs text-muted tracking-widest uppercase">
          © {new Date().getFullYear()} MayAnn Exports · All rights reserved
        </p>
      </div>
    </footer>
  )
}
