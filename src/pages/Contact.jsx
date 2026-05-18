import { useState } from 'react'
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react'

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mayannexports@gmail.com',
    href: 'mailto:mayannexports@gmail.com',
    note: 'Best for detailed inquiries',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+86 132 9832 9703',
    href: 'https://wa.me/8613298329703',
    note: 'Fast responses, 24/7',
  },
  {
    icon: Phone,
    label: 'Calls',
    value: '+86 132 9832 9703',
    href: 'tel:+8613298329703',
    note: 'Direct line',
  },
  {
    icon: MessageCircle,
    label: 'WeChat',
    value: 'MayAnnexports',
    href: null,
    note: 'Add us on WeChat',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'China',
    href: null,
    note: 'On-the-ground in China',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(v => ({ ...v, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Build mailto link
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    const mailto = `mailto:mayannexports@gmail.com?subject=${encodeURIComponent(form.subject || 'Inquiry from Website')}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
  }

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
            <p className="text-xs tracking-[0.22em] uppercase text-muted">Get In Touch</p>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-light text-theme leading-tight">
            Let's start<br />
            <em className="text-accent not-italic">sourcing</em>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">

        {/* Contact Methods */}
        <div>
          <h2 className="font-display text-3xl font-light text-theme mb-10">
            Reach us directly
          </h2>
          <div className="flex flex-col gap-6">
            {CONTACT_METHODS.map(({ icon: Icon, label, value, href, note }) => (
              <div key={label} className="flex items-start gap-5 group">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <Icon size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.14em] uppercase text-muted mb-1">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-theme text-sm font-medium hover:text-accent transition-colors no-underline block"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-theme text-sm font-medium">{value}</p>
                  )}
                  <p className="text-muted text-xs mt-1">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-display text-3xl font-light text-theme mb-10">
            Send an enquiry
          </h2>

          {sent ? (
            <div
              className="p-8 text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-display text-xl text-theme mb-2">Message prepared!</h3>
              <p className="text-muted text-sm">Your email client has opened with the message. Send it to reach us.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-wider uppercase text-muted block mb-2">
                    Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="field"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-muted block mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs tracking-wider uppercase text-muted block mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What are you sourcing?"
                  className="field"
                />
              </div>

              <div>
                <label className="text-xs tracking-wider uppercase text-muted block mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe what you need — product type, quantity, destination..."
                  className="field"
                />
              </div>

              <button type="submit" className="btn-primary flex items-center justify-center gap-2 w-full mt-2">
                <Send size={14} /> Send Message
              </button>
              <p className="text-xs text-muted text-center">
                This will open your email client with the message pre-filled.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}