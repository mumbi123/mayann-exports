import { useState, useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

const HEADING_SEGMENTS = [
  { text: 'What our clients\n', accent: false },
  { text: 'say',                accent: true  },
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
    <h1 className="font-display text-6xl md:text-7xl font-light text-theme leading-tight">
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
        <span
          style={{
            display: 'inline-block', width: 3, height: '0.8em',
            marginLeft: 2, verticalAlign: 'middle',
            backgroundColor: 'var(--accent)',
            animation: 'tw-blink 1s ease-in-out infinite',
          }}
        />
      )}
      <style>{`
        @keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </h1>
  )
}

const ALL_REVIEWS = [
  // ── Zambia ───────────────────────────────────────────────────────────────
  { name: 'Chanda Mwale',      country: 'Zambia', rating: 5, text: 'Honestly I was nervous about importing from China for the first time but MayAnn held my hand through everything. My furniture arrived exactly as I ordered and the price was unbelievable compared to what we pay locally.' },
  { name: 'Thandiwe Phiri',    country: 'Zambia', rating: 5, text: 'I have used three sourcing agents before MayAnn and none of them come close. They actually pick up the phone, they actually follow up. My clothing stock arrived on time and in perfect condition.' },
  { name: 'Bwalya Mutale',     country: 'Zambia', rating: 5, text: 'The supplier they connected me with for building materials has become my permanent supplier now. Quality is consistent and pricing is always competitive. MayAnn did proper due diligence.' },
  { name: 'Mulenga Kapata',    country: 'Zambia', rating: 4, text: 'Good experience overall. There was a small delay with customs but MayAnn kept me updated every step. Will definitely use again for my next order of electrical equipment.' },
  { name: 'Namukolo Sikazwe',  country: 'Zambia', rating: 5, text: 'I run a small boutique in Lusaka and sourcing clothes used to be a headache. MayAnn found me exactly what I described, checked the quality before shipping and my customers love the new stock.' },
  { name: 'Katongo Banda',     country: 'Zambia', rating: 5, text: 'They paid my supplier on my behalf when my bank transfer was taking too long. That kind of flexibility is rare. Real partners not just agents.' },
  { name: 'Mwamba Chileshe',   country: 'Zambia', rating: 5, text: 'Three orders done through MayAnn now and each one has been smoother than the last. They know what they are doing and they are honest about timelines which I appreciate.' },
  { name: 'Prisca Lungu',      country: 'Zambia', rating: 5, text: 'I needed medical supplies for my clinic and was worried about getting counterfeit products. MayAnn verified everything and sent me inspection photos before shipping. Very professional.' },
  { name: 'Kelvin Tembo',      country: 'Zambia', rating: 4, text: 'MayAnn compared prices from four different factories for my machinery order. Saved me quite a bit. Communication could be slightly faster sometimes but results are always good.' },
  { name: 'Sithembile Dube',   country: 'Zambia', rating: 5, text: 'Imported office furniture for our company. Everything was exactly as described and the consolidation service saved us a lot on shipping. Will be ordering again next quarter.' },
  { name: 'Chanda Mwansa',     country: 'Zambia', rating: 5, text: 'My hardware shop has been growing steadily since I started sourcing through MayAnn. I get better quality at lower prices and the whole process has become routine now.' },
  { name: 'Mutinta Hachilima', country: 'Zambia', rating: 5, text: 'The first time I used MayAnn I was skeptical. Now I am on my sixth order and I cannot imagine importing without them. They genuinely care about your business succeeding.' },
  { name: 'Towela Mwanza',     country: 'Zambia', rating: 4, text: 'Very helpful team. I had some confusion about customs documentation and they guided me through everything patiently. The actual sourcing and quality was spot on.' },
  { name: 'Mapalo Nkonde',     country: 'Zambia', rating: 5, text: 'Sourced gym equipment for my gym through MayAnn. The quality is excellent and my members have complimented the new equipment. Worth every kwacha spent.' },
  { name: 'Luyando Chipimo',   country: 'Zambia', rating: 5, text: 'MayAnn found me a clothing manufacturer that actually produces what I design. The sampling process was smooth and the bulk order was perfect. Very rare to find this reliability.' },
  { name: 'Mwila Kabwe',       country: 'Zambia', rating: 5, text: 'Used the warehousing service to consolidate four different orders into one shipment. The cost saving was significant and everything arrived together without any mix ups.' },
  { name: 'Gift Chilemba',     country: 'Zambia', rating: 5, text: 'Starting an import business felt overwhelming until I found MayAnn. They made the whole process understandable and every order since has gone smoothly. Could not ask for more.' },

  // ── South Africa ─────────────────────────────────────────────────────────
  { name: 'Lungelo Ndlovu',    country: 'South Africa', rating: 5, text: 'I was sourcing gym equipment for my fitness studio and MayAnn found me a factory that made exactly what I needed at half the price of local suppliers. Quality inspection gave me peace of mind.' },
  { name: 'Nompilo Zulu',      country: 'South Africa', rating: 5, text: 'What I like most is they are straight with you. No sugarcoating, no overpromising. They told me exactly what to expect and delivered on every single point.' },
  { name: 'Sipho Mahlangu',    country: 'South Africa', rating: 5, text: 'Been importing clothing through MayAnn for eight months now. My business has grown because I can finally get consistent quality at good prices. Game changer for my shop.' },
  { name: 'Zanele Mokoena',    country: 'South Africa', rating: 4, text: 'Solid service. The factory visit they arranged for us when we traveled to China was incredibly well organised. Saw exactly where our products were being made which built a lot of trust.' },
  { name: 'Thabo Sithole',     country: 'South Africa', rating: 5, text: 'MayAnn sourced cosmetics for our beauty supply business. All documentation was in order, customs was smooth and the products are exactly what we ordered. Very happy.' },
  { name: 'Nomsa Khumalo',     country: 'South Africa', rating: 5, text: 'The price comparison they did across five suppliers saved our company a significant amount. They genuinely work to get you the best deal, not just the easiest one.' },
  { name: 'Bongani Shabalala', country: 'South Africa', rating: 5, text: 'Used MayAnn for building materials for a construction project. Everything arrived on schedule and within budget. Their logistics team is very capable.' },
  { name: 'Ayanda Mthembu',    country: 'South Africa', rating: 4, text: 'Good service and responsive team. I appreciate that they verified my supplier before I paid anything. Saved me from what could have been a costly mistake.' },
  { name: 'Nokuthula Dlamini', country: 'South Africa', rating: 5, text: 'MayAnn sourced stock for my hardware store and the margins have improved significantly. Their ability to compare prices across factories is genuinely valuable.' },
  { name: 'Sandile Buthelezi', country: 'South Africa', rating: 4, text: 'Good reliable service. They took the time to understand exactly what I needed before sourcing anything. That attention to detail shows in the quality of what arrives.' },
  { name: 'Palesa Motaung',    country: 'South Africa', rating: 5, text: 'I run a clothing boutique and MayAnn has transformed how I source stock. Consistent quality, honest timelines and they genuinely look after you as a client.' },

  // ── USA ───────────────────────────────────────────────────────────────────
  { name: 'Marcus Henderson',  country: 'USA', rating: 5, text: 'I have worked with sourcing agents before but MayAnn is on a completely different level. They found me a verified manufacturer for my e-commerce brand within days. Quality control was thorough and shipping was seamless.' },
  { name: 'Ashley Turner',     country: 'USA', rating: 5, text: 'Running a small business and importing from China always felt risky until MayAnn. They handled supplier vetting, inspection and shipping. My product line launched on time and under budget.' },
  { name: 'James Whitfield',   country: 'USA', rating: 4, text: 'Used MayAnn to source industrial equipment for our facility. The price comparison across multiple factories saved us several thousand dollars. Communication was professional throughout.' },
  { name: 'Brittany Cole',     country: 'USA', rating: 5, text: 'MayAnn sourced beauty products for my brand. Every item was inspected before leaving the factory and the documentation for customs was spotless. Will be a repeat client for sure.' },
  { name: 'Derek Morrison',    country: 'USA', rating: 5, text: 'I was skeptical about using an agent but MayAnn proved themselves immediately. They visited the factory, sent detailed photos and the goods were exactly as described. Straight shooters.' },
  { name: 'Tiffany Brooks',    country: 'USA', rating: 5, text: 'My clothing label needed a reliable manufacturer and MayAnn delivered. The sampling was quick, the bulk order was perfect and they kept me updated at every stage. Highly recommend.' },

  // ── Canada ────────────────────────────────────────────────────────────────
  { name: 'Ryan Mackenzie',    country: 'Canada', rating: 5, text: 'MayAnn sourced hardware for our retail chain and the quality has been consistently excellent across three orders. They genuinely do the legwork so you do not have to worry.' },
  { name: 'Stephanie Lafleur', country: 'Canada', rating: 5, text: 'As a first-time importer I was overwhelmed by the process. MayAnn broke everything down step by step and every order has been smooth since. The supplier verification gave me real confidence.' },
  { name: 'Tyler Johansson',   country: 'Canada', rating: 4, text: 'Good solid service. They compared four suppliers for my furniture order and the one they recommended has been excellent. Minor shipping delay but MayAnn stayed on top of it.' },
  { name: 'Megan Okafor',      country: 'Canada', rating: 5, text: 'I source medical equipment for a healthcare company and MayAnn has been invaluable. Their verification process is meticulous and every delivery has matched the specifications exactly.' },
  { name: 'Liam Tremblay',     country: 'Canada', rating: 5, text: 'The warehousing and consolidation service alone saved me thousands on freight. MayAnn thinks practically about cost efficiency which is exactly what a growing business needs.' },
  { name: 'Natasha Singh',     country: 'Canada', rating: 5, text: 'Used MayAnn to source gym equipment for our fitness centres. Exceptional quality, properly inspected and arrived on schedule. Our members have been very happy with the new equipment.' },

  // ── UAE ───────────────────────────────────────────────────────────────────
  { name: 'Khalid Al Mansoori', country: 'UAE', rating: 5, text: 'MayAnn sourced building materials for one of our construction projects and the quality was excellent. Their supplier verification process is exactly what the industry needs. Very professional team.' },
  { name: 'Fatima Al Hashimi',  country: 'UAE', rating: 5, text: 'I needed cosmetics and beauty products sourced for my retail business and MayAnn handled everything flawlessly. The inspection report gave me full confidence before I approved the shipment.' },
  { name: 'Omar Al Rashid',     country: 'UAE', rating: 5, text: 'We have used MayAnn for several large machinery orders now. Each time the price comparison has saved us significantly and the quality has been above what we expected. Excellent partners.' },
  { name: 'Aisha Al Neyadi',    country: 'UAE', rating: 4, text: 'Good experience overall. MayAnn verified our supplier thoroughly and advised us against one factory that had inconsistent reviews. That kind of honest guidance is rare and valuable.' },
  { name: 'Sultan Al Ketbi',    country: 'UAE', rating: 5, text: 'Sourced furniture for our offices through MayAnn. The consolidation service was very cost effective and everything arrived in perfect condition. We will definitely be using them again.' },
  { name: 'Mariam Al Zaabi',    country: 'UAE', rating: 5, text: 'MayAnn handled payments to our Chinese supplier when we had banking complications. They were transparent about every transaction and the goods arrived without any issues whatsoever.' },

  // ── UK ────────────────────────────────────────────────────────────────────
  { name: 'Oliver Chambers',   country: 'UK', rating: 5, text: 'MayAnn sourced clothing for our fashion label and the quality control was exceptional. They visited the factory, reviewed samples thoroughly and the final order was exactly right. Will use again without question.' },
  { name: 'Sophie Hargreaves', country: 'UK', rating: 5, text: 'I run a home interiors business and MayAnn has become an essential part of my supply chain. Reliable, honest and they always find the best price without compromising on quality.' },
  { name: 'James Patel',       country: 'UK', rating: 5, text: 'Used MayAnn to source medical equipment for our clinic. The verification and inspection process was rigorous and every item arrived exactly to specification. Highly professional service.' },
  { name: 'Charlotte Webb',    country: 'UK', rating: 4, text: 'Solid and dependable service. MayAnn compared multiple suppliers for my product range and the savings were real. One small customs query arose but they resolved it quickly and kept me informed.' },
  { name: 'Harry Griffiths',   country: 'UK', rating: 5, text: 'Three successful orders through MayAnn and each has been better than the last. They know the Chinese manufacturing landscape inside out and that knowledge shows in the results they deliver.' },
  { name: 'Emma Richardson',   country: 'UK', rating: 5, text: 'MayAnn sourced gym equipment for our fitness studio chain. On time, on budget and exactly as specified. Their logistics team navigated UK customs without any issues. Outstanding from start to finish.' },
]

function getRandom4(excludeIdxs = []) {
  const pool = ALL_REVIEWS.map((r, i) => ({ ...r, idx: i })).filter(r => !excludeIdxs.includes(r.idx))
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 4)
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < rating ? 'var(--accent)' : 'transparent'}
          stroke="var(--accent)"
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  const [current, setCurrent] = useState(() => getRandom4())
  const [fading, setFading] = useState(false)
  const [countdown, setCountdown] = useState(30)

  const rotate = (curr) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(getRandom4(curr.map(r => r.idx)))
      setFading(false)
      setCountdown(30)
    }, 500)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          rotate(current)
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [current])

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
            <p className="text-xs tracking-[0.22em] uppercase text-muted">Client Feedback</p>
          </div>
          <TypewriterHeading />
          <p className="text-muted mt-4 max-w-lg leading-relaxed text-sm">
            Trusted by importers across Zambia, South Africa, USA, Canada, UAE, UK and beyond.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3">
          {[
            { n: '50+', label: 'Verified Reviews' },
            { n: '4.9', label: 'Average Rating' },
            { n: '6',   label: 'Countries Featured' },
          ].map((s, i) => (
            <div
              key={i}
              className="py-10 px-6 text-center"
              style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="font-display text-4xl font-light text-accent mb-1">{s.n}</div>
              <div className="text-xs tracking-[0.14em] uppercase text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Rotating Reviews */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-5">
            <span className="line w-10" />
            <p className="text-xs tracking-[0.22em] uppercase text-muted">Featured Reviews</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted">
              Next in <span className="text-accent font-medium">{countdown}s</span>
            </span>
            <button
              onClick={() => rotate(current)}
              className="btn-ghost"
              style={{ padding: '10px 24px', fontSize: '0.75rem' }}
            >
              Next Reviews
            </button>
          </div>
        </div>

        <div
          className="grid md:grid-cols-2 gap-6"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {current.map((review, i) => (
            <div key={`${review.name}-${i}`} className="card p-8 flex flex-col justify-between">
              <div>
                <StarRating rating={review.rating} />
                <p className="text-theme text-sm leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0 font-display text-sm font-semibold text-accent"
                  style={{ background: 'var(--accent-soft)', borderRadius: '50%' }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-theme leading-none mb-1">{review.name}</p>
                  <p className="text-xs text-muted">{review.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}