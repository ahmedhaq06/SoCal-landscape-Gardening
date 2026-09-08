import { useEffect } from 'react'
import './App.css'
import './services-page.css'

const allServices = [
  ['Garden care', 'Recurring garden maintenance, planting bed care, seasonal refreshes, and cleanups.'],
  ['Lawn care & maintenance', 'Reliable mowing, edging, feeding, aeration, and ongoing lawn health.'],
  ['Irrigation systems', 'Sprinkler and drip irrigation installation, repairs, programming, and water audits.'],
  ['Tree trimming & removal', 'Thoughtful pruning, removal, and clearance work for safer, healthier trees.'],
  ['Drought tolerant landscaping', 'Climate-conscious planting and low-water landscapes made for Southern California.'],
  ['SOD & artificial grass', 'Fresh sod and artificial turf installation for durable, usable outdoor space.'],
  ['Hardscape & concrete', 'Pavers, paths, patios, concrete, brick, and the structure around your landscape.'],
  ['Outdoor lighting', 'Subtle, practical lighting that extends the life of your garden after dark.'],
  ['Commercial maintenance', 'Consistent landscape care for offices, storefronts, and commercial properties.'],
  ['HOA maintenance', 'Dependable shared-space maintenance with clear scheduling and communication.'],
  ['Mulching & planting', 'Flower beds, mulch, soil improvement, and planting plans that settle in beautifully.'],
  ['Trash removal', 'One-time and recurring removal to get your property back to a clean starting point.'],
]

function ServicesPage() {
  return (
    <main className="services-page">
      <div className="notice"><span><span className="pin">●</span> Now serving homes and businesses across Greater Los Angeles</span><a href="tel:+12135667469">(213) 566-7469</a></div>
      <header className="nav"><a className="brand" href="/"><span className="brand-mark">SL<span>+</span></span><span>SoCal<br /><b>Landscape</b> &amp; Gardening</span></a><a className="text-link" href="/">← Back to home</a><a className="button button-small" href="/#estimate">Get an estimate <span>↗</span></a></header>
      <section className="services-intro"><p className="eyebrow">Our services</p><h1>Care for every<br /><em>kind of outside.</em></h1><p>From regular garden care to larger landscape projects, our work is shaped around your property, your priorities, and the way you want to live in it.</p></section>
      <section className="service-directory">{allServices.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{description}</p></div><a className="text-link" href="/#estimate" aria-label={`Request an estimate for ${title}`}>Discuss this service <span>↗</span></a></article>)}</section>
      <section className="services-cta"><div><p className="eyebrow">Not sure where to start?</p><h2>Tell us what<br /><em>you&apos;re seeing.</em></h2></div><div><p>We can help you understand what your property needs now and what can wait. Share a few details and we&apos;ll point you in the right direction.</p><a className="button" href="/#estimate">Talk through your project <span>↗</span></a></div></section>
      <footer><a className="brand" href="/"><span className="brand-mark">SL<span>+</span></span><span>SoCal<br /><b>Landscape</b> &amp; Gardening</span></a><div><p className="eyebrow">Based in Los Angeles</p><p>Thoughtful care for the places<br />where life happens.</p></div><div><p className="eyebrow">Get in touch</p><a href="mailto:info@socallg.com">info@socallg.com</a><br /><a href="tel:+12135667469">(213) 566-7469</a></div></footer>
    </main>
  )
}

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const services = [
    { number: '01', title: 'Garden care', text: 'Thoughtful, ongoing care for planting beds, lawns, and the little details that make a property feel finished.', image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=85' },
    { number: '02', title: 'Irrigation & water', text: 'Smarter watering systems designed for Southern California weather, healthier plants, and lower waste.', image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=85' },
    { number: '03', title: 'Trees & landscape', text: 'From careful pruning to complete outdoor transformations, we make your property work beautifully.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85' },
  ]

  if (window.location.pathname === '/services') return <ServicesPage />

  return (
    <main>
      <div className="notice"><span className="pin">●</span> Now serving homes and businesses across Greater Los Angeles <a href="tel:+12135667469">(213) 566-7469</a></div>
      <header className="nav"><a className="brand" href="#top" aria-label="SoCal Landscape and Gardening home"><span className="brand-mark">SL<span>+</span></span><span>SoCal<br /><b>Landscape</b> &amp; Gardening</span></a><nav><a href="#approach">Our approach</a><a href="#services">Services</a><a href="#work">Our work</a></nav><a className="button button-small" href="#estimate">Get an estimate <span>↗</span></a></header>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">Landscape care, considered</p><h1>Spaces that feel<br /><em>alive.</em></h1><p className="hero-text">Reliable garden care and landscape work for homes, businesses, and the in-between moments of life in Los Angeles.</p><div className="hero-actions"><a className="button" href="#estimate">Plan your space <span>↗</span></a><a className="text-link" href="#work">See our work <span>↓</span></a></div><div className="rating"><strong>5.0</strong><span className="stars">★★★★★</span><span>92 reviews on Google</span></div></div><div className="hero-photo"><img src="https://images.unsplash.com/photo-1558521958-0a228e77e984?auto=format&fit=crop&w=1400&q=90" alt="A lush, carefully planted garden beside a modern Los Angeles home" /><span className="photo-note">Los Angeles, CA<br /><b>Residential garden care</b></span></div></section>
      <section className="proof reveal" id="approach"><div className="proof-intro"><p className="eyebrow">A better kind of outside</p><h2>Good landscapes<br />are <em>felt.</em></h2></div><div className="proof-body"><p>We believe outdoor spaces should make daily life a little easier and a lot more beautiful. Our crews show up when they say they will, work with care, and leave your property better than they found it.</p><div className="proof-list"><div><span>01</span><b>Careful by nature</b><small>We notice the details others miss.</small></div><div><span>02</span><b>Built for LA</b><small>Plants and plans suited to our climate.</small></div><div><span>03</span><b>People you know</b><small>Clear communication, every visit.</small></div></div></div></section>
      <section className="services reveal" id="services"><div className="section-heading"><div><p className="eyebrow">What we do</p><h2>Room to grow.</h2></div><p>From a weekly reset to a complete outdoor transformation, we bring the same thoughtfulness to every property.</p></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><img src={service.image} alt="" /><div className="service-card-content"><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a className="text-link" href="/services">Explore service <span>↗</span></a></div></article>)}</div><a className="button button-outline" href="/services">View all services <span>↗</span></a></section>
      <section className="work reveal" id="work"><div className="work-image"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90" alt="A finished outdoor living space with warm evening lighting" /></div><div className="work-copy"><p className="eyebrow">A recent transformation</p><h2>From overgrown<br />to <em>open.</em></h2><p>Silver Lake · Complete garden cleanup, tree work, and ongoing maintenance.</p><a className="text-link" href="#estimate">See the difference <span>↗</span></a></div></section>
      <section className="estimate reveal" id="estimate"><div><p className="eyebrow">Let&apos;s make a plan</p><h2>Tell us about<br /><em>your space.</em></h2><p className="estimate-copy">A few details is all we need to get the conversation started. No pressure, no pushy upsells.</p><a className="phone" href="tel:+12135667469">Prefer to talk? <b>(213) 566-7469</b></a></div><form onSubmit={(event) => event.preventDefault()}><label>Name<input type="text" placeholder="Your name" /></label><label>Phone<input type="tel" placeholder="(000) 000-0000" /></label><label>Email<input type="email" placeholder="you@example.com" /></label><label>What can we help with?<select defaultValue=""><option value="" disabled>Select a service</option><option>Garden care</option><option>Irrigation</option><option>Landscape project</option><option>Tree work</option></select></label><button className="button" type="submit">Request a free estimate <span>↗</span></button><small>We&apos;ll be in touch within one business day.</small></form></section>
      <footer><a className="brand" href="#top"><span className="brand-mark">SL<span>+</span></span><span>SoCal<br /><b>Landscape</b> &amp; Gardening</span></a><div><p className="eyebrow">Based in Los Angeles</p><p>Thoughtful care for the places<br />where life happens.</p></div><div><p className="eyebrow">Get in touch</p><a href="mailto:info@socallg.com">info@socallg.com</a><br /><a href="tel:+12135667469">(213) 566-7469</a></div></footer>
      <div className="mobile-actions"><a href="tel:+12135667469">Call us</a><a href="#estimate">Get an estimate</a></div>
    </main>
  )
}

export default App
