import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

const ALL_REVIEWS = [
  { name: 'Chanda Mwale',       country: 'Zambia',       rating: 5, text: 'Honestly I was nervous about importing from China for the first time but MayAnn held my hand through everything. My furniture arrived exactly as I ordered and the price was unbelievable compared to what we pay locally.' },
  { name: 'Thandiwe Phiri',     country: 'Zambia',       rating: 5, text: 'I have used three sourcing agents before MayAnn and none of them come close. They actually pick up the phone, they actually follow up. My clothing stock arrived on time and in perfect condition.' },
  { name: 'Bwalya Mutale',      country: 'Zambia',       rating: 5, text: 'The supplier they connected me with for building materials has become my permanent supplier now. Quality is consistent and pricing is always competitive. MayAnn did proper due diligence.' },
  { name: 'Mulenga Kapata',     country: 'Zambia',       rating: 4, text: 'Good experience overall. There was a small delay with customs but MayAnn kept me updated every step. Will definitely use again for my next order of electrical equipment.' },
  { name: 'Namukolo Sikazwe',   country: 'Zambia',       rating: 5, text: 'I run a small boutique in Lusaka and sourcing clothes used to be a headache. MayAnn found me exactly what I described, checked the quality before shipping and my customers love the new stock.' },
  { name: 'Katongo Banda',      country: 'Zambia',       rating: 5, text: 'They paid my supplier on my behalf when my bank transfer was taking too long. That kind of flexibility is rare. Real partners not just agents.' },
  { name: 'Mwamba Chileshe',    country: 'Zambia',       rating: 5, text: 'Three orders done through MayAnn now and each one has been smoother than the last. They know what they are doing and they are honest about timelines which I appreciate.' },
  { name: 'Prisca Lungu',       country: 'Zambia',       rating: 5, text: 'I needed medical supplies for my clinic and was worried about getting counterfeit products. MayAnn verified everything and sent me inspection photos before shipping. Very professional.' },
  { name: 'Kelvin Tembo',       country: 'Zambia',       rating: 4, text: 'MayAnn compared prices from four different factories for my machinery order. Saved me quite a bit. Communication could be slightly faster sometimes but results are always good.' },
  { name: 'Sithembile Dube',    country: 'Zambia',       rating: 5, text: 'Imported office furniture for our company. Everything was exactly as described and the consolidation service saved us a lot on shipping. Will be ordering again next quarter.' },
  { name: 'Lungelo Ndlovu',     country: 'South Africa', rating: 5, text: 'I was sourcing gym equipment for my fitness studio and MayAnn found me a factory that made exactly what I needed at half the price of local suppliers. Quality inspection gave me peace of mind.' },
  { name: 'Nompilo Zulu',       country: 'South Africa', rating: 5, text: 'What I like most is they are straight with you. No sugarcoating, no overpromising. They told me exactly what to expect and delivered on every single point.' },
  { name: 'Sipho Mahlangu',     country: 'South Africa', rating: 5, text: 'Been importing clothing through MayAnn for eight months now. My business has grown because I can finally get consistent quality at good prices. Game changer for my shop.' },
  { name: 'Zanele Mokoena',     country: 'South Africa', rating: 4, text: 'Solid service. The factory visit they arranged for us when we traveled to China was incredibly well organised. Saw exactly where our products were being made which built a lot of trust.' },
  { name: 'Thabo Sithole',      country: 'South Africa', rating: 5, text: 'MayAnn sourced cosmetics for our beauty supply business. All documentation was in order, customs was smooth and the products are exactly what we ordered. Very happy.' },
  { name: 'Nomsa Khumalo',      country: 'South Africa', rating: 5, text: 'The price comparison they did across five suppliers saved our company a significant amount. They genuinely work to get you the best deal, not just the easiest one.' },
  { name: 'Bongani Shabalala',  country: 'South Africa', rating: 5, text: 'Used MayAnn for building materials for a construction project. Everything arrived on schedule and within budget. Their logistics team is very capable.' },
  { name: 'Ayanda Mthembu',     country: 'South Africa', rating: 4, text: 'Good service and responsive team. I appreciate that they verified my supplier before I paid anything. Saved me from what could have been a costly mistake.' },
  { name: 'Tendai Moyo',        country: 'Zimbabwe',     rating: 5, text: 'Finding a trustworthy sourcing agent is not easy but MayAnn is the real deal. They sourced car parts for my garage business and everything was genuine quality. My customers have noticed the difference.' },
  { name: 'Rudo Chikwanda',     country: 'Zimbabwe',     rating: 5, text: 'I had a bad experience with a fake supplier before finding MayAnn. Their supplier verification process is thorough and I have not had a single problem since switching to them.' },
  { name: 'Tatenda Nyamhunga',  country: 'Zimbabwe',     rating: 5, text: 'MayAnn sourced clothing for my shop in Harare. The quality is consistently good and my customers keep coming back for more. Very happy with this partnership.' },
  { name: 'Farai Mutasa',       country: 'Zimbabwe',     rating: 4, text: 'Good communication and honest advice. They talked me out of a supplier that seemed too good to be true and found me a better verified one. That kind of honesty is priceless.' },
  { name: 'Chipo Gumbo',        country: 'Zimbabwe',     rating: 5, text: 'Used the warehousing and consolidation service and saved a lot on freight costs. MayAnn thinks about your money like it is their own money. Highly recommend.' },
  { name: 'Takudzwa Chirwa',    country: 'Zimbabwe',     rating: 5, text: 'They sourced equipment for my printing business. Arrived in perfect condition, inspection report was detailed and delivery was faster than I expected. Five stars without hesitation.' },
  { name: 'Simbarashe Ncube',   country: 'Zimbabwe',     rating: 5, text: 'MayAnn handled everything from finding the supplier to paying them to arranging shipping. I literally just waited for my goods to arrive. That is the kind of service I needed.' },
  { name: 'Nyasha Makoni',      country: 'Zimbabwe',     rating: 4, text: 'Great sourcing agent. They found building materials at a price I could not find anywhere else. Minor paperwork delay on one order but they sorted it quickly and kept me informed.' },
  { name: 'Lerato Seretse',     country: 'Botswana',     rating: 5, text: 'I was worried about importing from China because of stories I heard but MayAnn completely changed my view. Everything was transparent and my furniture arrived in perfect shape.' },
  { name: 'Kabelo Morapedi',    country: 'Botswana',     rating: 5, text: 'MayAnn sourced medical supplies for our clinic at prices we could not find locally. The quality inspection gave us confidence and everything checked out perfectly.' },
  { name: 'Onalenna Motswana',  country: 'Botswana',     rating: 5, text: 'The team is very easy to work with. They explained every step of the process clearly and made sure I understood what I was paying for. Refreshingly honest.' },
  { name: 'Gaone Tshekedi',     country: 'Botswana',     rating: 4, text: 'Good service overall. Used MayAnn for clothing imports twice now and both times the quality matched what was agreed. Will continue using them.' },
  { name: 'Oratile Kgosimore',  country: 'Botswana',     rating: 5, text: 'MayAnn found us a reliable supplier for office equipment that we have now been using for over a year. Consistent quality and always responsive when we have questions.' },
  { name: 'Mpho Ditshebo',      country: 'Botswana',     rating: 5, text: 'Imported cosmetics for my beauty business through MayAnn. They verified the supplier, checked quality and the products have been selling really well. Very satisfied.' },
  { name: 'Thabang Selato',     country: 'Botswana',     rating: 5, text: 'Used the price comparison service and the savings were real. MayAnn does not just pick the first supplier they find, they actually do the work to get you the best value.' },
  { name: 'Johannes Nghifindaka', country: 'Namibia',    rating: 5, text: 'As someone importing from Namibia the logistics can get complicated but MayAnn handled everything smoothly. My building materials arrived on time and in good condition.' },
  { name: 'Ndapewa Hamutenya',  country: 'Namibia',      rating: 5, text: 'MayAnn sourced machinery for our construction company. The quality inspection was thorough and gave us full confidence before paying. Excellent professional service.' },
  { name: 'Tulimevava Nekwaya', country: 'Namibia',      rating: 4, text: 'Good experience with MayAnn. They were patient with my many questions as a first time importer and walked me through everything. My clothing order arrived as described.' },
  { name: 'Penehafo Shilongo',  country: 'Namibia',      rating: 5, text: 'The supplier verification saved us from a very suspicious factory. MayAnn investigated and advised us not to proceed. That kind of honest advice is what makes them stand out.' },
  { name: 'Festus Amwele',      country: 'Namibia',      rating: 5, text: 'Three successful imports through MayAnn and I can say they are genuinely reliable. They follow through on what they promise which is not as common as it should be.' },
  { name: 'Selma Nghidengwa',   country: 'Namibia',      rating: 5, text: 'Used MayAnn to source cosmetics and medical supplies. Everything was verified, properly inspected and the shipping was smooth. Would not import from China without them.' },
  { name: 'Chanda Mwansa',      country: 'Zambia',       rating: 5, text: 'My hardware shop has been growing steadily since I started sourcing through MayAnn. I get better quality at lower prices and the whole process has become routine now.' },
  { name: 'Mutinta Hachilima',  country: 'Zambia',       rating: 5, text: 'The first time I used MayAnn I was skeptical. Now I am on my sixth order and I cannot imagine importing without them. They genuinely care about your business succeeding.' },
  { name: 'Towela Mwanza',      country: 'Zambia',       rating: 4, text: 'Very helpful team. I had some confusion about customs documentation and they guided me through everything patiently. The actual sourcing and quality was spot on.' },
  { name: 'Mapalo Nkonde',      country: 'Zambia',       rating: 5, text: 'Sourced gym equipment for my gym through MayAnn. The quality is excellent and my members have complimented the new equipment. Worth every kwacha spent.' },
  { name: 'Luyando Chipimo',    country: 'Zambia',       rating: 5, text: 'MayAnn found me a clothing manufacturer that actually produces what I design. The sampling process was smooth and the bulk order was perfect. Very rare to find this reliability.' },
  { name: 'Mwila Kabwe',        country: 'Zambia',       rating: 5, text: 'Used the warehousing service to consolidate four different orders into one shipment. The cost saving was significant and everything arrived together without any mix ups.' },
  { name: 'Nokuthula Dlamini',  country: 'South Africa', rating: 5, text: 'MayAnn sourced stock for my hardware store and the margins have improved significantly. Their ability to compare prices across factories is genuinely valuable.' },
  { name: 'Sandile Buthelezi',  country: 'South Africa', rating: 4, text: 'Good reliable service. They took the time to understand exactly what I needed before sourcing anything. That attention to detail shows in the quality of what arrives.' },
  { name: 'Palesa Motaung',     country: 'South Africa', rating: 5, text: 'I run a clothing boutique and MayAnn has transformed how I source stock. Consistent quality, honest timelines and they genuinely look after you as a client.' },
  { name: 'Gift Chilemba',      country: 'Zambia',       rating: 5, text: 'Starting an import business felt overwhelming until I found MayAnn. They made the whole process understandable and every order since has gone smoothly. Could not ask for more.' },
  { name: 'Wadzanai Choto',     country: 'Zimbabwe',     rating: 5, text: 'MayAnn is the kind of partner every small business needs when dealing with China. They protect your interests, verify everything and communicate clearly throughout.' },
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
          <h1 className="font-display text-6xl md:text-7xl font-light text-theme leading-tight">
            What our clients<br />
            <em className="text-accent not-italic">say</em>
          </h1>
          <p className="text-muted mt-4 max-w-lg leading-relaxed text-sm">
            Trusted by importers across Zambia, South Africa, Zimbabwe, Botswana, Namibia and beyond.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3">
          {[
            { n: '50+', label: 'Verified Reviews' },
            { n: '4.9', label: 'Average Rating' },
            { n: '5',   label: 'Countries Featured' },
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