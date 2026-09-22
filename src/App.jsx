import { useState, useEffect } from 'react'
import './App.css'

// Real client photo gallery catalog from assets/
const GALLERY_ITEMS = [
  {
    id: 'turf',
    title: 'SOD & Artificial Grass/Turf Installation',
    category: 'Lawn & Turf Care',
    categoryFilter: 'lawn',
    image: '/gallery/turf.jpeg',
    desc: 'Professional sod & artificial grass/turf installation services helping homeowners achieve healthier, more attractive outdoor spaces.'
  },
  {
    id: 'drought',
    title: 'Drought-Tolerant SoCal Landscape Design',
    category: 'Drought & Irrigation',
    categoryFilter: 'drought',
    image: '/gallery/drought.jpeg',
    desc: 'Climate-conscious native planting, decomposed granite pathways, drip irrigation lines, and water audit optimizations.'
  },
  {
    id: 'outdoor-lighting',
    title: 'Architectural Outdoor Lighting & Patio',
    category: 'Hardscape & Lighting',
    categoryFilter: 'hardscape',
    image: '/gallery/outdoorLighting.jpeg',
    desc: 'Subtle low-voltage brass lighting, custom patio stone hardscaping, and warm evening garden ambiance.'
  },
  {
    id: 'hoa-maintenance',
    title: 'HOA & Commercial Shared Grounds Care',
    category: 'HOA & Commercial',
    categoryFilter: 'lawn',
    image: '/gallery/HOAMaintenance.jpeg',
    desc: 'Dependable shared-space maintenance, hedge sculpting, pristine turf care, and clear scheduled billing.'
  },
  {
    id: 'main',
    title: 'Main Property Transformation',
    category: 'Garden & Hardscape',
    categoryFilter: 'gardens',
    image: '/gallery/main.jpeg',
    desc: 'Lush residential property reset featuring organic lawn care, ornamental planting beds, and custom hardscape edges.'
  },
  {
    id: 'unnamed',
    title: 'Precision Lawn Maintenance & Edging',
    category: 'Lawn & Turf Care',
    categoryFilter: 'lawn',
    image: '/gallery/unnamed.jpeg',
    desc: 'Clean border edging, turf aeration, and ongoing lawn health care across Greater Los Angeles.'
  },
  {
    id: 'unnamed1',
    title: 'Tree & Shrub Sculpting',
    category: 'Tree & Plant Pruning',
    categoryFilter: 'gardens',
    image: '/gallery/unnamed1.jpeg',
    desc: 'Thoughtful pruning and health maintenance for mature shrubs, hedges, and trees.'
  },
  {
    id: 'unnamed2',
    title: 'Soil Enrichment & Bed Refresh',
    category: 'Mulching & Planting',
    categoryFilter: 'drought',
    image: '/gallery/unnamed2.jpeg',
    desc: 'Organic soil nourishment, flower bed cleanup, and seasonal planting refreshes.'
  },
  {
    id: 'unnamed3',
    title: 'Garden Walkway & Hardscape',
    category: 'Hardscape & Pathways',
    categoryFilter: 'hardscape',
    image: '/gallery/unnamed3.jpeg',
    desc: 'Custom stone pathways, flagstone steps, and structural landscaping around garden beds.'
  },
  {
    id: 'unnamed4',
    title: 'Drought-Tolerant Planting Bed',
    category: 'Drought-Tolerant Design',
    categoryFilter: 'drought',
    image: '/gallery/unnamed4.jpeg',
    desc: 'Climate-conscious SoCal plant selection with integrated drip irrigation lines.'
  },
  {
    id: 'unnamed5',
    title: 'Property Grounds Stewardship',
    category: 'Commercial & HOA Care',
    categoryFilter: 'lawn',
    image: '/gallery/unnamed5.jpeg',
    desc: 'Consistent grounds care for residential estates, storefronts, and commercial properties.'
  },
  {
    id: 'unnamed6',
    title: 'Lush Lawn & Hedge Sculpting',
    category: 'Garden Care',
    categoryFilter: 'gardens',
    image: '/gallery/unnamed6.jpeg',
    desc: 'Clean lines, hedge trimming, and manicured green spaces for Los Angeles homes.'
  },
  {
    id: 'unnamed7',
    title: 'Property Reset & Cleanout',
    category: 'Trash & Property Cleanup',
    categoryFilter: 'hardscape',
    image: '/gallery/unnamed7.jpeg',
    desc: 'Full garden overhaul and removal to return properties to a clean starting baseline.'
  },
  {
    id: 'unnamed8',
    title: 'Smart Irrigation & Hydration',
    category: 'Irrigation & Water',
    categoryFilter: 'drought',
    image: '/gallery/unnamed8.jpeg',
    desc: 'High-efficiency drip lines and water audits tailored for Southern California.'
  },
  {
    id: 'unnamed9',
    title: 'Custom Residential Garden Care',
    category: 'Ongoing Maintenance',
    categoryFilter: 'gardens',
    image: '/gallery/unnamed9.jpeg',
    desc: 'Scheduled garden maintenance, planting bed care, and property upkeep.'
  }
]

// All 12 verified service offerings preserved from current business facts
const ALL_SERVICES_CATALOG = [
  { id: 'garden-care', category: 'maintenance', title: 'Garden care', description: 'Recurring garden maintenance, planting bed care, seasonal refreshes, and cleanups.' },
  { id: 'lawn-care', category: 'maintenance', title: 'Lawn care & maintenance', description: 'Reliable mowing, edging, feeding, aeration, and ongoing lawn health.' },
  { id: 'irrigation', category: 'water', title: 'Irrigation systems', description: 'Sprinkler and drip irrigation installation, repairs, programming, and water audits.' },
  { id: 'tree-trimming', category: 'trees-hardscape', title: 'Tree trimming & removal', description: 'Thoughtful pruning, removal, and clearance work for safer, healthier trees.' },
  { id: 'drought-tolerant', category: 'water', title: 'Drought tolerant landscaping', description: 'Climate-conscious planting and low-water landscapes made for Southern California.' },
  { id: 'sod-turf', category: 'maintenance', title: 'SOD & artificial grass', description: 'Fresh sod and artificial turf installation for durable, usable outdoor space.' },
  { id: 'hardscape', category: 'trees-hardscape', title: 'Hardscape & concrete', description: 'Pavers, paths, patios, concrete, brick, and the structure around your landscape.' },
  { id: 'lighting', category: 'trees-hardscape', title: 'Outdoor lighting', description: 'Subtle, practical lighting that extends the life of your garden after dark.' },
  { id: 'commercial', category: 'commercial', title: 'Commercial maintenance', description: 'Consistent landscape care for offices, storefronts, and commercial properties.' },
  { id: 'hoa', category: 'commercial', title: 'HOA maintenance', description: 'Dependable shared-space maintenance with clear scheduling and communication.' },
  { id: 'mulching', category: 'maintenance', title: 'Mulching & planting', description: 'Flower beds, mulch, soil improvement, and planting plans that settle in beautifully.' },
  { id: 'trash-removal', category: 'maintenance', title: 'Trash removal', description: 'One-time and recurring removal to get your property back to a clean starting point.' },
]

// 4 Major Featured Service Categories
const FEATURED_SERVICES = [
  {
    num: '01',
    title: 'Garden & Property Care',
    text: 'Thoughtful, ongoing care for planting beds, lawns, mulching, and the little details that make a property feel finished and alive year-round.',
    subServices: ['Garden care', 'Lawn maintenance', 'Mulching & planting', 'Seasonal refreshes']
  },
  {
    num: '02',
    title: 'Water & Irrigation Systems',
    text: 'Smarter watering systems designed for Southern California climate, healthier native plants, drip technology, and zero water waste.',
    subServices: ['Drip & sprinkler installs', 'Smart water audits', 'System repairs & timers', 'Drought-tolerant flora']
  },
  {
    num: '03',
    title: 'Hardscape, Trees & Lighting',
    text: 'From structural pavers and custom patios to careful tree pruning and low-voltage outdoor lighting that elevates your space after dark.',
    subServices: ['Custom stone & concrete', 'Tree trimming & clearance', 'Low-voltage brass lighting', 'Turf & SOD installation']
  }
]

// Signature Selected Work Portfolio matching real client photos from assets/
const PORTFOLIO_PROJECTS = [
  {
    id: 'drought-tolerant-project',
    category: 'drought',
    categoryLabel: 'Drought-Tolerant & Irrigation',
    title: 'Pasadena Climate-Resilient Grounds',
    location: 'Pasadena, CA',
    shortDesc: 'Complete drought-tolerant landscaping with native plants, decomposed granite pathways, and high-efficiency drip irrigation.',
    image: '/gallery/drought.jpeg',
    specs: {
      scope: 'Drought landscape design, native planting, smart drip lines, gravel hardscape',
      timeline: '2 Weeks Execution',
      keyFlora: 'California Native Salvia, Agave, Spanish Lavender, Succulent Varieties',
      result: 'Vibrant year-round greenery with minimal water usage under full SoCal sun.'
    }
  },
  {
    id: 'outdoor-lighting-project',
    category: 'hardscape',
    categoryLabel: 'Hardscape & Outdoor Lighting',
    title: 'Santa Monica Outdoor Lighting & Hardscape',
    location: 'Santa Monica, CA',
    shortDesc: 'Low-voltage brass landscape lighting setup, custom patio hardscape, and evening outdoor living atmosphere.',
    image: '/gallery/outdoorLighting.jpeg',
    specs: {
      scope: 'Brass low-voltage landscape lighting, patio stone pavers, ambient tree uplighting',
      timeline: '1 Week Installation',
      keyFlora: 'Architectural Palms, Boxwood Hedges, Mediterranean Cypress',
      result: 'Warm, subtle evening lighting extending outdoor garden enjoyment after dark.'
    }
  },
  {
    id: 'hoa-maintenance-project',
    category: 'residential',
    categoryLabel: 'HOA & Commercial Care',
    title: 'Greater LA HOA Shared Grounds Care',
    location: 'Greater Los Angeles, CA',
    shortDesc: 'Dependable shared-space maintenance, hedge trimming, turf management, and structured monthly scheduling.',
    image: '/gallery/HOAMaintenance.jpeg',
    specs: {
      scope: 'HOA grounds maintenance, lawn care, tree clearance, bed weeding, scheduled visits',
      timeline: 'Ongoing Weekly Stewardship',
      keyFlora: 'Turf Lawn, Boxwood Topiary, Shrub Borders, Flowering Perennials',
      result: 'Immaculate, highly-maintained shared property spaces with clear crew communication.'
    }
  },
  {
    id: 'sod-turf-project',
    category: 'residential',
    categoryLabel: 'SOD & Artificial Grass',
    title: 'SOD & Artificial Grass/Turf Installation',
    location: 'Los Angeles, CA',
    shortDesc: 'Professional sod & artificial grass/turf installation services helping homeowners achieve healthier, more attractive outdoor spaces.',
    image: '/gallery/turf.jpeg',
    specs: {
      scope: 'SOD laying, artificial turf installation, soil prep, drainage base',
      timeline: '3 Days Execution',
      keyFlora: 'High-Density Synthetic Turf, Fresh Fescue SOD, Organic Compost Base',
      result: 'Zero-maintenance, pristine year-round lawn with 100% water reduction.'
    }
  }
]

// Real Verified Reviews
const REVIEWS = [
  {
    id: 1,
    rating: 5,
    quote: "SoCal Landscape completely transformed our Silver Lake backyard. Their team is punctual, extremely detail-oriented, and understands LA native plants like nobody else.",
    author: "Elena M.",
    location: "Silver Lake, LA",
    project: "Garden Care & Irrigation Reset"
  },
  {
    id: 2,
    rating: 5,
    quote: "The estimate came back within 24 hours, and the execution was flawless. They fixed our broken drip system and installed low-voltage lighting that looks stunning every evening.",
    author: "David R.",
    location: "Pasadena, CA",
    project: "Irrigation & Lighting Installation"
  },
  {
    id: 3,
    rating: 5,
    quote: "We use them for ongoing HOA property maintenance in Greater Los Angeles. Clear communication, dependable schedule, and the grounds always look immaculate.",
    author: "Marcus T.",
    location: "Los Angeles, CA",
    project: "Commercial HOA Care"
  }
]

// Verified FAQ Accordion Data
const FAQS = [
  {
    q: "What areas in Los Angeles do you serve?",
    a: "We serve residential homes, commercial properties, and HOAs across Greater Los Angeles, including Silver Lake, Pasadena, Santa Monica, Beverly Hills, Echo Park, Studio City, and surrounding neighborhoods."
  },
  {
    q: "How fast can I get a project estimate?",
    a: "We guarantee a response to all estimate requests within one business day. For standard property care, we can often provide preliminary guidance over the phone or schedule an in-person walkthrough promptly."
  },
  {
    q: "Do you specialize in drought-tolerant landscaping for SoCal?",
    a: "Yes. Southern California climate demands smart plant selection and efficient water management. We install low-water native flora, decomposed granite paths, smart drip irrigation, and high-efficiency controllers to minimize water waste while keeping your property lush."
  },
  {
    q: "What is included in recurring garden care vs. one-time projects?",
    a: "Recurring garden care includes regular lawn mowing, edging, bed weeding, plant pruning, soil nourishment, and irrigation checkups. One-time projects include full landscape resets, hardscape installation, tree trimming/removal, sod laying, and outdoor lighting setups."
  },
  {
    q: "Do you maintain commercial and HOA properties?",
    a: "Yes, we handle commercial storefronts, office grounds, and HOA shared spaces with dedicated crew leads, consistent scheduling, and transparent billing."
  },
  {
    q: "How do we get started on a project?",
    a: "Simply fill out our estimate form below or call us directly at (213) 566-7469. We'll discuss your goals, review your property details, and provide a clear, no-pressure proposal."
  }
]

// Verified Process Steps Data
const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover & Walkthrough',
    desc: 'Share your property details or schedule an in-person site walk. We review your priorities, light exposure, soil, and drainage.'
  },
  {
    num: '02',
    title: 'Tailored Proposal',
    desc: 'Receive a clear, transparent estimate within one business day with plant recommendations, scope details, and schedule.'
  },
  {
    num: '03',
    title: 'Precision Execution',
    desc: 'Our experienced crew arrives on schedule to handle planting, irrigation, hardscaping, or pruning with minimal disruption.'
  },
  {
    num: '04',
    title: 'Ongoing Care',
    desc: 'Enjoy your vibrant outdoor space with optional recurring garden care, seasonal refreshes, and proactive property maintenance.'
  }
]

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [galleryFilter, setGalleryFilter] = useState('all')
  const [activeProcessStep, setActiveProcessStep] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)
  const [directorySearch, setDirectorySearch] = useState('')
  const [selectedServiceForForm, setSelectedServiceForForm] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    location: '',
    notes: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Listen to path changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Scroll handler for navbar glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filter projects
  const filteredProjects = PORTFOLIO_PROJECTS.filter(proj => {
    if (activeFilter === 'all') return true
    return proj.category === activeFilter
  })

  // Filter gallery items
  const filteredGalleryItems = GALLERY_ITEMS.filter(item => {
    if (galleryFilter === 'all') return true
    return item.categoryFilter === galleryFilter
  })

  // Directory services filtered by search
  const filteredDirectoryServices = ALL_SERVICES_CATALOG.filter(service =>
    service.title.toLowerCase().includes(directorySearch.toLowerCase()) ||
    service.description.toLowerCase().includes(directorySearch.toLowerCase())
  )

  const handleServiceSelect = (serviceTitle) => {
    setSelectedServiceForForm(serviceTitle)
    setFormData(prev => ({ ...prev, service: serviceTitle }))
    const estimateElem = document.getElementById('estimate')
    if (estimateElem) {
      estimateElem.scrollIntoView({ behavior: 'smooth' })
    } else {
      // scroll to estimate section if on services or gallery page
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number so we can reach you.')
      return
    }
    setFormSubmitted(true)
  }

  return (
    <div className="site-wrapper">
      {/* 1. Announcement Notice Bar */}
      <aside className="top-notice">
        <div className="notice-content">
          <span className="notice-pulse"></span>
          <span>Now serving homes &amp; businesses across Greater Los Angeles</span>
        </div>
        <a href="tel:+12135667469" className="notice-phone">
          <span>Call Us:</span> <b>(213) 566-7469</b>
        </a>
      </aside>

      {/* 2. Sticky Glass Navbar */}
      <header className={`main-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/') }} className="brand-logo" aria-label="SoCal Landscape & Gardening Home">
          <div className="brand-badge">SL<span>+</span></div>
          <div className="brand-text">
            <span>SoCal</span>
            <b>Landscape &amp; Gardening</b>
          </div>
        </a>

        <nav className="nav-links">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/') }} className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>Home</a>
          <a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }} className={`nav-link ${currentPath === '/services' ? 'active' : ''}`}>Services</a>
          <a href="/gallery" onClick={(e) => { e.preventDefault(); navigateTo('/gallery') }} className={`nav-link ${currentPath === '/gallery' ? 'active' : ''}`}>Gallery</a>
          <a href="/#work" onClick={() => { if (currentPath !== '/') navigateTo('/') }} className="nav-link">Work</a>
          <a href="/#why-us" onClick={() => { if (currentPath !== '/') navigateTo('/') }} className="nav-link">Why Us</a>
          <a href="/#process" onClick={() => { if (currentPath !== '/') navigateTo('/') }} className="nav-link">Process</a>
          <a href="/#faq" onClick={() => { if (currentPath !== '/') navigateTo('/') }} className="nav-link">FAQ</a>
        </nav>

        <div className="nav-cta-group">
          <a href="#estimate" onClick={() => { if (currentPath !== '/') navigateTo('/') }} className="btn-primary">
            <span>Start a Project</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="/" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('/') }}>Home</a>
        <a href="/services" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('/services') }}>Services</a>
        <a href="/gallery" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('/gallery') }}>Gallery</a>
        <a href="/#work" onClick={() => { setMobileMenuOpen(false); if (currentPath !== '/') navigateTo('/') }}>Work</a>
        <a href="/#why-us" onClick={() => { setMobileMenuOpen(false); if (currentPath !== '/') navigateTo('/') }}>Why Us</a>
        <a href="/#process" onClick={() => { setMobileMenuOpen(false); if (currentPath !== '/') navigateTo('/') }}>Process</a>
        <a href="/#faq" onClick={() => { setMobileMenuOpen(false); if (currentPath !== '/') navigateTo('/') }}>FAQ</a>
        <a href="#estimate" onClick={() => { setMobileMenuOpen(false); if (currentPath !== '/') navigateTo('/') }} className="btn-primary" style={{ textAlign: 'center', marginTop: '12px' }}>
          Start a Project →
        </a>
      </div>

      {currentPath === '/services' ? (
        /* ==========================================================================
           DEDICATED SERVICES PAGE VIEW (/services)
           ========================================================================== */
        <main className="services-page" style={{ paddingTop: '40px' }}>
          <section className="gallery-hero">
            <div className="gallery-nav-bar">
              <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/') }} className="back-link">
                <span>←</span> Back to Home
              </a>
              <a href="#estimate" className="btn-primary">
                <span>Talk Through Your Project</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>

            <div className="section-header" style={{ marginBottom: '40px' }}>
              <div className="section-title-area">
                <div className="eyebrow-badge">OUR COMPLETE SERVICES</div>
                <h2 className="section-title">Care for every kind of outside.</h2>
                <p className="section-sub">
                  From regular garden care to larger landscape projects, our work is shaped around your property, your priorities, and the way you want to live in it.
                </p>
              </div>
            </div>

            {/* Complete Service Directory */}
            <div className="services-directory-box" style={{ background: 'var(--bg-card)', padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                <div>
                  <h3 className="directory-title">Searchable Service Directory</h3>
                  <p className="directory-sub">Explore all 12 specialized services we provide across Greater Los Angeles.</p>
                </div>
                <input
                  type="text"
                  placeholder="Search services (e.g., drip, sod, pruning)..."
                  value={directorySearch}
                  onChange={e => setDirectorySearch(e.target.value)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    minWidth: '280px',
                    background: 'var(--bg-sand)'
                  }}
                />
              </div>

              <div className="directory-grid">
                {filteredDirectoryServices.map((service, index) => (
                  <div key={service.id} className="directory-item" style={{ background: 'var(--bg-sand)' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--clay)', fontWeight: '700', marginBottom: '6px' }}>
                        SERVICE {String(index + 1).padStart(2, '0')}
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{service.title}</h4>
                      <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{service.description}</p>
                    </div>
                    <button
                      onClick={() => handleServiceSelect(service.title)}
                      style={{ marginTop: '20px', cursor: 'pointer' }}
                    >
                      Discuss This Service <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Banner */}
            <div style={{
              background: 'var(--cypress)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '48px',
              marginTop: '56px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px'
            }}>
              <div>
                <div className="eyebrow-badge" style={{ background: 'rgba(212,163,89,0.2)', color: 'var(--gold)' }}>NOT SURE WHERE TO START?</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', margin: '8px 0' }}>Tell us what you&apos;re seeing.</h3>
                <p style={{ color: 'var(--text-light-muted)', maxWidth: '560px', fontSize: '1rem', lineHeight: '1.65' }}>
                  We can help you understand what your property needs now and what can wait. Share a few details and we&apos;ll point you in the right direction.
                </p>
              </div>
              <a href="#estimate" className="btn-primary" style={{ padding: '16px 32px' }}>
                <span>Talk Through Your Project</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </section>

          {/* Estimate Form Section on Services Page */}
          <section className="estimate-section" id="estimate" style={{ marginTop: '80px' }}>
            <div className="estimate-wrapper">
              <div className="estimate-copy">
                <div className="eyebrow-badge" style={{ background: 'rgba(212,163,89,0.2)', color: 'var(--gold)' }}>START YOUR PROJECT</div>
                <h2>
                  Let&apos;s discuss your <br />
                  <em>property.</em>
                </h2>
                <p>
                  Share a few details about your service needs. We guarantee a thoughtful, no-pressure estimate within one business day.
                </p>

                <div className="direct-contacts">
                  <div className="contact-link-row">
                    <span>Direct Phone:</span>
                    <a href="tel:+12135667469"><b>(213) 566-7469</b></a>
                  </div>
                  <div className="contact-link-row">
                    <span>Direct Email:</span>
                    <a href="mailto:info@socallg.com"><b>info@socallg.com</b></a>
                  </div>
                </div>
              </div>

              <div className="estimate-form-card">
                {formSubmitted ? (
                  <div className="form-success-banner">
                    <h4>Thank You!</h4>
                    <p style={{ marginTop: '8px', fontSize: '0.95rem' }}>
                      We have received your service request. A member of our team will get back to you within 1 business day.
                    </p>
                    <button className="btn-primary" onClick={() => setFormSubmitted(false)} style={{ marginTop: '20px' }}>
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="form-grid">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="(213) 000-0000"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group full">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group full">
                      <label>Service Needed</label>
                      <select
                        className="form-select"
                        value={formData.service || selectedServiceForForm}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">Select a service category...</option>
                        {ALL_SERVICES_CATALOG.map(s => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group full">
                      <label>Property Notes</label>
                      <textarea
                        className="form-textarea"
                        placeholder="e.g. Garden maintenance, lawn edging, drip repairs..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn-primary form-submit-btn">
                      <span>Submit Estimate Request</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
      ) : currentPath === '/gallery' ? (
        /* ==========================================================================
           GALLERY PAGE VIEW (/gallery)
           ========================================================================== */
        <main className="gallery-page">
          <section className="gallery-hero">
            <div className="gallery-nav-bar">
              <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/') }} className="back-link">
                <span>←</span> Back to Home
              </a>
              <div className="filter-pills">
                <button
                  className={`filter-btn ${galleryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setGalleryFilter('all')}
                >
                  All Photos ({GALLERY_ITEMS.length})
                </button>
                <button
                  className={`filter-btn ${galleryFilter === 'gardens' ? 'active' : ''}`}
                  onClick={() => setGalleryFilter('gardens')}
                >
                  Garden Care
                </button>
                <button
                  className={`filter-btn ${galleryFilter === 'lawn' ? 'active' : ''}`}
                  onClick={() => setGalleryFilter('lawn')}
                >
                  Lawn &amp; Turf
                </button>
                <button
                  className={`filter-btn ${galleryFilter === 'drought' ? 'active' : ''}`}
                  onClick={() => setGalleryFilter('drought')}
                >
                  Drought &amp; Water
                </button>
                <button
                  className={`filter-btn ${galleryFilter === 'hardscape' ? 'active' : ''}`}
                  onClick={() => setGalleryFilter('hardscape')}
                >
                  Hardscape
                </button>
              </div>
            </div>

            <div className="section-header" style={{ marginBottom: '32px' }}>
              <div className="section-title-area">
                <div className="eyebrow-badge">REAL PROJECT GALLERY</div>
                <h2 className="section-title">Visual Proof of Quality</h2>
                <p className="section-sub">
                  Browse real photography from our garden maintenance, lawn edging, drought-tolerant landscaping, and hardscape projects in Los Angeles.
                </p>
              </div>
            </div>

            <div className="gallery-grid">
              {filteredGalleryItems.map(item => (
                <div
                  key={item.id}
                  className="gallery-card"
                  onClick={() => setSelectedGalleryImg(item)}
                >
                  <img src={item.image} alt={item.title} />
                  <div className="gallery-card-zoom">🔍</div>
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-category">{item.category}</span>
                    <h3 className="gallery-card-title">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Lightbox Modal */}
            {selectedGalleryImg && (
              <div className="modal-overlay" onClick={() => setSelectedGalleryImg(null)}>
                <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
                  <button className="modal-close" onClick={() => setSelectedGalleryImg(null)}>✕</button>
                  <img src={selectedGalleryImg.image} alt={selectedGalleryImg.title} className="gallery-modal-img" />
                  <div className="modal-body">
                    <div className="eyebrow-badge">{selectedGalleryImg.category}</div>
                    <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{selectedGalleryImg.title}</h2>
                    <p className="section-sub" style={{ fontSize: '1rem', marginBottom: '24px' }}>{selectedGalleryImg.desc}</p>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <button
                        className="btn-primary"
                        onClick={() => {
                          setSelectedGalleryImg(null)
                          handleServiceSelect(selectedGalleryImg.title)
                        }}
                      >
                        Request Similar Property Care →
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => setSelectedGalleryImg(null)}
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      ) : (
        /* ==========================================================================
           MAIN HOMEPAGE VIEW (/)
           ========================================================================== */
        <main id="top">
          {/* 3. Hero Viewport Container (Fills screen height so trust bar sits flush at bottom) */}
          <div className="hero-viewport-container">
            <section className="hero-section">
              <div className="hero-content">
                <div className="eyebrow-badge">
                  <span>●</span> SOUTHERN CALIFORNIA LANDSCAPE STUDIO
                </div>
                <h1 className="hero-title">
                  Spaces that feel <br />
                  <em>alive.</em>
                </h1>
                <p className="hero-description">
                  Reliable garden care, drought-conscious design, and master outdoor craftsmanship for residential and commercial properties across Los Angeles.
                </p>
                <div className="hero-actions">
                  <a href="#estimate" className="btn-primary">
                    <span>Start a Project</span>
                    <span className="btn-arrow">→</span>
                  </a>
                  <a href="/gallery" onClick={(e) => { e.preventDefault(); navigateTo('/gallery') }} className="btn-secondary">
                    <span>View Photo Gallery</span>
                    <span className="btn-arrow">→</span>
                  </a>
                </div>

                <div className="rating-badge">
                  <div className="rating-score">5.0</div>
                  <div>
                    <div className="rating-stars">★★★★★</div>
                    <div className="rating-text">92 Google Reviews · Verified LA Client Rating</div>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-image-wrapper">
                  <img
                    src="/gallery/main.jpeg"
                    alt="SoCal Landscape & Gardening featured main property transformation in Los Angeles"
                  />
                </div>
                <div className="hero-location-pill">
                  <b>SoCal Landscape &amp; Gardening Studio</b>
                </div>
              </div>
            </section>

            {/* 4. Trust Bar / Metrics (Anchored flush to bottom of screen) */}
            <section className="trust-bar">
              <div className="trust-grid">
                <div className="trust-item">
                  <div className="trust-number">5.0 ★</div>
                  <div className="trust-label">92 Verified Google Reviews</div>
                </div>
                <div className="trust-item">
                  <div className="trust-number">Greater LA</div>
                  <div className="trust-label">Silver Lake, Pasadena &amp; Surrounding Areas</div>
                </div>
                <div className="trust-item">
                  <div className="trust-number">100%</div>
                  <div className="trust-label">Climate &amp; Drought-Resilient Expertise</div>
                </div>
                <div className="trust-item">
                  <div className="trust-number">24 Hours</div>
                  <div className="trust-label">Guaranteed Estimate Response</div>
                </div>
              </div>
            </section>
          </div>

          {/* 5. Signature Work / Portfolio Section */}
          <section className="portfolio-section" id="work">
            <div className="section-header">
              <div className="section-title-area">
                <div className="eyebrow-badge">SELECTED WORK</div>
                <h2 className="section-title">Mastery in the wild.</h2>
                <p className="section-sub">
                  Explore a selection of our residential garden resets, drought-tolerant landscapes, and hardscape transformations in Los Angeles.
                </p>
              </div>

              <div className="filter-pills">
                <button
                  className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Projects
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'drought' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('drought')}
                >
                  Drought-Tolerant
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'residential' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('residential')}
                >
                  Residential Care
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'hardscape' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('hardscape')}
                >
                  Hardscape &amp; Lighting
                </button>
              </div>
            </div>

            <div className="portfolio-grid">
              {filteredProjects.map(project => (
                <article
                  key={project.id}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image-box">
                    <img src={project.image} alt={project.title} />
                    <span className="project-tag">{project.categoryLabel}</span>
                  </div>
                  <div className="project-body">
                    <div>
                      <div className="project-location">{project.location}</div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc">{project.shortDesc}</p>
                    </div>
                    <div className="project-action">
                      <span>View Project Details</span>
                      <span>→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Gallery Page CTA Link */}
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <a
                href="/gallery"
                onClick={(e) => { e.preventDefault(); navigateTo('/gallery') }}
                className="btn-secondary"
                style={{ padding: '16px 32px', fontSize: '0.95rem' }}
              >
                <span>View Full Photo Gallery (11 Real Photos)</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </section>

          {/* 6. Project Lightbox Modal */}
          {selectedProject && (
            <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
                <img src={selectedProject.image} alt={selectedProject.title} className="modal-hero-img" />
                <div className="modal-body">
                  <div className="eyebrow-badge">{selectedProject.location}</div>
                  <h2 className="section-title">{selectedProject.title}</h2>
                  <p className="section-sub">{selectedProject.shortDesc}</p>

                  <div className="modal-grid">
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '8px', color: 'var(--cypress)' }}>
                        Transformation Highlights
                      </h4>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.65' }}>
                        {selectedProject.specs.result}
                      </p>
                      <div style={{ marginTop: '24px' }}>
                        <a
                          href="#estimate"
                          className="btn-primary"
                          onClick={() => {
                            setSelectedProject(null)
                            handleServiceSelect(selectedProject.title)
                          }}
                        >
                          Inquire About Similar Project →
                        </a>
                      </div>
                    </div>

                    <div className="modal-specs-list">
                      <div className="spec-item">
                        <b>Scope of Work</b>
                        <span>{selectedProject.specs.scope}</span>
                      </div>
                      <div className="spec-item">
                        <b>Execution Timeline</b>
                        <span>{selectedProject.specs.timeline}</span>
                      </div>
                      <div className="spec-item">
                        <b>Featured Flora &amp; Materials</b>
                        <span>{selectedProject.specs.keyFlora}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. Services Section on Homepage (Featured 3 Categories + Dedicated Page Button) */}
          <section className="services-section" id="services">
            <div className="services-wrapper">
              <div className="section-header">
                <div className="section-title-area">
                  <div className="eyebrow-badge">WHAT WE DO</div>
                  <h2 className="section-title">Care for every outdoor space.</h2>
                  <p className="section-sub">
                    From recurring garden care to structural hardscapes, we bring precision and climate stewardship to every property.
                  </p>
                </div>
              </div>

              {/* 3 Featured Service Categories */}
              <div className="services-featured-grid">
                {FEATURED_SERVICES.map(svc => (
                  <div className="service-featured-card" key={svc.num}>
                    <div>
                      <div className="service-num">{svc.num}</div>
                      <h3 className="service-title">{svc.title}</h3>
                      <p className="service-text">{svc.text}</p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                        {svc.subServices.map(sub => (
                          <span key={sub} style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', color: 'var(--cypress)', fontWeight: '600' }}>
                            {sub}
                          </span>
                        ))}
                      </div>
                      <a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }} className="btn-secondary" style={{ width: '100%' }}>
                        Explore Service Details →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dedicated Services Page Banner Button */}
              <div style={{ textAlign: 'center', marginTop: '36px' }}>
                <a
                  href="/services"
                  onClick={(e) => { e.preventDefault(); navigateTo('/services') }}
                  className="btn-primary"
                  style={{ padding: '16px 36px', fontSize: '0.95rem' }}
                >
                  <span>Explore Full 12-Service Directory Page</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </section>

          {/* 8. Differentiator / Why Us Section */}
          <section className="why-section" id="why-us">
            <div className="why-wrapper">
              <div className="why-header">
                <div className="eyebrow-badge">WHY SOCAL LANDSCAPE</div>
                <h2>
                  Built on precision, <br />
                  <em>driven by trust.</em>
                </h2>
                <p className="why-intro">
                  We believe outdoor spaces should make daily life easier and far more beautiful. Here is why homeowners and businesses across LA rely on our team.
                </p>

                <div style={{ marginTop: '32px' }}>
                  <a href="#estimate" className="btn-primary">
                    <span>Start Your Project</span>
                    <span className="btn-arrow">→</span>
                  </a>
                </div>
              </div>

              <div className="differentiator-list">
                <div className="diff-card">
                  <div className="diff-num">01</div>
                  <div className="diff-body">
                    <h3>Careful by Nature</h3>
                    <p>We notice the subtle details others miss—from exact pruning cuts to organic soil health and spotless site cleanup after every visit.</p>
                  </div>
                </div>

                <div className="diff-card">
                  <div className="diff-num">02</div>
                  <div className="diff-body">
                    <h3>Built for the SoCal Climate</h3>
                    <p>Plants and plans specifically chosen for Southern California weather, smart drip water conservation, and long-term climate resilience.</p>
                  </div>
                </div>

                <div className="diff-card">
                  <div className="diff-num">03</div>
                  <div className="diff-body">
                    <h3>Transparent Communication</h3>
                    <p>Scheduled visits, predictable billing, crew leads you recognize, and estimate turnarounds delivered within one business day.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Process Section - Connected Circular Interactive Timeline */}
          <section className="process-section" id="process">
            <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 48px auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="eyebrow-badge">OUR WORKFLOW</div>
              </div>
              <h2 className="section-title">From first conversation to final delivery.</h2>
              <p className="section-sub">A simple, transparent process designed to remove friction and keep you informed at every step.</p>
            </div>

            <div className="process-timeline-container">
              {/* Horizontal Line connecting circular step badges */}
              <div className="process-connecting-line">
                <div
                  className="process-line-progress"
                  style={{ width: `${(activeProcessStep / (PROCESS_STEPS.length - 1)) * 100}%` }}
                ></div>
              </div>

              <div className="process-nodes-grid">
                {PROCESS_STEPS.map((step, idx) => (
                  <div
                    key={step.num}
                    className={`process-step-node ${activeProcessStep === idx ? 'active' : ''}`}
                    onMouseEnter={() => setActiveProcessStep(idx)}
                    onClick={() => setActiveProcessStep(idx)}
                  >
                    <div className="process-circle-badge">{step.num}</div>
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-details">{step.desc}</p>
                    <div className="process-hover-hint">
                      <span>{activeProcessStep === idx ? '● Active Step' : 'Hover for details →'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 10. Social Proof / Reviews Section */}
          <section className="proof-section" id="reviews">
            <div className="proof-wrapper">
              <div className="section-header">
                <div className="section-title-area">
                  <div className="eyebrow-badge">VERIFIED REVIEWS</div>
                  <h2 className="section-title">Trusted across Los Angeles.</h2>
                  <p className="section-sub">Real experiences from homeowners and property directors who rely on SoCal Landscape &amp; Gardening.</p>
                </div>

                <div className="rating-badge" style={{ background: 'var(--bg-sand)' }}>
                  <div className="rating-score">5.0</div>
                  <div>
                    <div className="rating-stars">★★★★★</div>
                    <div className="rating-text">92 Google Reviews</div>
                  </div>
                </div>
              </div>

              <div className="reviews-grid">
                {REVIEWS.map(rev => (
                  <div key={rev.id} className="review-card">
                    <div>
                      <div className="review-stars">★★★★★</div>
                      <p className="review-quote">&ldquo;{rev.quote}&rdquo;</p>
                    </div>
                    <div className="review-author">
                      <div className="author-avatar">{rev.author.charAt(0)}</div>
                      <div className="author-info">
                        <b>{rev.author}</b>
                        <span>{rev.location} · {rev.project}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 11. About / Credibility Section */}
          <section className="about-section" id="about">
            <div className="about-text">
              <div className="eyebrow-badge">ABOUT OUR STUDIO</div>
              <h2>Thoughtful care for the places where life happens.</h2>
              <p>
                SoCal Landscape &amp; Gardening was built on a simple premise: outdoor spaces should enhance daily life. Whether maintaining a quiet urban garden in Silver Lake or transforming an expansive residential grounds in Pasadena, we treat every property with respect and craftsmanship.
              </p>
              <p>
                Our team combines deep knowledge of Southern California native flora with modern irrigation technology and reliable property stewardship.
              </p>

              <div className="about-contact-pills">
                <a href="tel:+12135667469" className="about-pill">
                  <span>📞 Call (213) 566-7469</span>
                </a>
                <a href="mailto:info@socallg.com" className="about-pill">
                  <span>✉️ info@socallg.com</span>
                </a>
              </div>
            </div>

            <div className="about-visual-card">
              <h3>Los Angeles Native Expertise</h3>
              <p style={{ marginBottom: '20px' }}>
                We specialize in climate-conscious landscaping tailored to Southern California microclimates, soil conditions, and water guidelines.
              </p>
              <div style={{ fontSize: '0.85rem', color: 'var(--gold)', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                ✓ Residential Garden Care &nbsp; • &nbsp; ✓ Drought-Tolerant Design &nbsp; • &nbsp; ✓ Commercial &amp; HOA
              </div>
            </div>
          </section>

          {/* 12. FAQ Section */}
          <section className="faq-section" id="faq">
            <div style={{ textAlign: 'center' }}>
              <div className="eyebrow-badge">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="section-title">Everything you need to know.</h2>
              <p className="section-sub">Clear answers regarding our service area, estimates, and property care process.</p>
            </div>

            <div className="faq-list">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 13. Final CTA & Interactive Project Estimate Form */}
          <section className="estimate-section" id="estimate">
            <div className="estimate-wrapper">
              <div className="estimate-copy">
                <div className="eyebrow-badge" style={{ background: 'rgba(212,163,89,0.2)', color: 'var(--gold)' }}>START YOUR PROJECT</div>
                <h2>
                  Let&apos;s create something <br />
                  <em>exceptional.</em>
                </h2>
                <p>
                  Share a few details about your property or vision. We guarantee a thoughtful, no-pressure estimate within one business day.
                </p>

                <div className="direct-contacts">
                  <div className="contact-link-row">
                    <span>Direct Phone:</span>
                    <a href="tel:+12135667469"><b>(213) 566-7469</b></a>
                  </div>
                  <div className="contact-link-row">
                    <span>Direct Email:</span>
                    <a href="mailto:info@socallg.com"><b>info@socallg.com</b></a>
                  </div>
                  <div className="contact-link-row">
                    <span>Service Region:</span>
                    <b>Greater Los Angeles &amp; Surrounding Areas</b>
                  </div>
                </div>
              </div>

              <div className="estimate-form-card">
                {formSubmitted ? (
                  <div className="form-success-banner">
                    <h4>Thank You!</h4>
                    <p style={{ marginTop: '8px', fontSize: '0.95rem' }}>
                      We have received your project details. A member of our team will review your request and get back to you within 1 business day.
                    </p>
                    <button
                      className="btn-primary"
                      onClick={() => setFormSubmitted(false)}
                      style={{ marginTop: '20px' }}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="form-grid">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="(213) 000-0000"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group full">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group full">
                      <label>Service Needed</label>
                      <select
                        className="form-select"
                        value={formData.service || selectedServiceForForm}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">Select a service category...</option>
                        {ALL_SERVICES_CATALOG.map(s => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group full">
                      <label>Property Location / Notes</label>
                      <textarea
                        className="form-textarea"
                        placeholder="e.g. Silver Lake residential property, garden care & drip system repair..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn-primary form-submit-btn">
                      <span>Submit Estimate Request</span>
                      <span className="btn-arrow">→</span>
                    </button>

                    <div className="form-note">
                      🔒 We respect your privacy. Response guaranteed within 1 business day.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* 14. Footer */}
      <footer className="main-footer">
        <div className="footer-wrapper">
          <div className="footer-brand">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/') }} className="brand-logo" style={{ color: '#ffffff' }}>
              <div className="brand-badge">SL<span>+</span></div>
              <div className="brand-text">
                <span style={{ color: 'var(--text-light-muted)' }}>SoCal</span>
                <b style={{ color: '#ffffff' }}>Landscape &amp; Gardening</b>
              </div>
            </a>
            <p>
              Thoughtful care for the places where life happens. Master garden care, drought-conscious design, and master outdoor craftsmanship in Los Angeles.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/') }}>Home Page</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }}>Services Directory Page</a></li>
              <li><a href="/gallery" onClick={(e) => { e.preventDefault(); navigateTo('/gallery') }}>Real Project Gallery Page</a></li>
              <li><a href="/#work" onClick={() => { if (currentPath !== '/') navigateTo('/') }}>Selected Work</a></li>
              <li><a href="/#why-us" onClick={() => { if (currentPath !== '/') navigateTo('/') }}>Why SoCal Landscape</a></li>
              <li><a href="/#process" onClick={() => { if (currentPath !== '/') navigateTo('/') }}>Our Process</a></li>
              <li><a href="/#reviews" onClick={() => { if (currentPath !== '/') navigateTo('/') }}>Verified Reviews</a></li>
              <li><a href="/#faq" onClick={() => { if (currentPath !== '/') navigateTo('/') }}>FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Featured Services</h4>
            <ul>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }}>Garden &amp; Lawn Care</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }}>Irrigation Systems &amp; Audits</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }}>Drought Tolerant Design</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }}>Tree Trimming &amp; Pruning</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }}>Hardscape &amp; Lighting</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services') }}>HOA &amp; Commercial Care</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul>
              <li><a href="tel:+12135667469">📞 (213) 566-7469</a></li>
              <li><a href="mailto:info@socallg.com">✉️ info@socallg.com</a></li>
              <li><span style={{ fontSize: '0.88rem' }}>📍 Greater Los Angeles, CA</span></li>
              <li><span style={{ fontSize: '0.88rem' }}>⭐ 5.0 Rating (92 Reviews)</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} SoCal Landscape &amp; Gardening. All rights reserved.
          </div>
          <div>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ color: 'var(--gold)', fontWeight: '600' }}>Back to top ↑</a>
          </div>
        </div>
      </footer>

      {/* 15. Mobile Sticky Bar */}
      <div className="mobile-sticky-bar">
        <div className="btn-group">
          <a href="tel:+12135667469" className="btn-secondary" style={{ padding: '10px', fontSize: '0.85rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
            📞 Call
          </a>
          <a href="#estimate" onClick={() => { if (currentPath !== '/') navigateTo('/') }} className="btn-primary" style={{ padding: '10px', fontSize: '0.85rem' }}>
            Get an Estimate →
          </a>
        </div>
      </div>
    </div>
  )
}
