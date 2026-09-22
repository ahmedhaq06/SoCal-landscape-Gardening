import { useState, useEffect } from 'react'
import './App.css'

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

// Signature Selected Work Portfolio
const PORTFOLIO_PROJECTS = [
  {
    id: 'silver-lake-hillside',
    category: 'drought',
    categoryLabel: 'Drought-Tolerant & Lighting',
    title: 'Silver Lake Hillside Sanctuary',
    location: 'Silver Lake, Los Angeles',
    shortDesc: 'A complete hillside garden reset with native agave, custom illuminated limestone steps, and drought-resilient flora.',
    image: '/projects/hillside.jpg',
    specs: {
      scope: 'Hillside landscape design, stone steps, ambient lighting, native planting',
      timeline: '3 Weeks Installation',
      keyFlora: 'Mature Olive Trees, Agave Attenuata, Blue Fescue, Mexican Feather Grass',
      result: '80% water reduction with dramatic evening curb appeal.'
    }
  },
  {
    id: 'silver-lake-courtyard',
    category: 'residential',
    categoryLabel: 'Residential Garden Care',
    title: 'Silver Lake Private Courtyard',
    location: 'Silver Lake, CA',
    shortDesc: 'Mature olive tree centerpiece, custom flagstone patio, climbing Jasmine walls, and ongoing precision garden maintenance.',
    image: '/projects/courtyard.jpg',
    specs: {
      scope: 'Courtyard hardscape, organic soil enrichment, drip irrigation, teak outdoor living',
      timeline: 'Ongoing Weekly Care',
      keyFlora: 'European Olive, Star Jasmine, Lavender, Rosemary',
      result: 'A tranquil private sanctuary crafted for effortless outdoor dining.'
    }
  },
  {
    id: 'pasadena-estate',
    category: 'drought',
    categoryLabel: 'Climate-Conscious Estate',
    title: 'Pasadena Drought-Tolerant Grounds',
    location: 'Pasadena, CA',
    shortDesc: 'Decomposed granite pathways, tiered natural stone retaining beds, Mediterranean lavender, and smart drip irrigation.',
    image: '/projects/pasadena.jpg',
    specs: {
      scope: 'Retaining stonework, decomposed granite paths, smart water controllers, drip lines',
      timeline: '2 Weeks Installation',
      keyFlora: 'Spanish Lavender, Salvia, Succulent Collections, Drought Turf',
      result: 'Thriving year-round greenery under full Southern California sun.'
    }
  },
  {
    id: 'santa-monica-coastal',
    category: 'hardscape',
    categoryLabel: 'Hardscape & Lighting',
    title: 'Santa Monica Coastal Living Space',
    location: 'Santa Monica, CA',
    shortDesc: 'Sleek poured concrete patio, custom integrated fire hearth, architectural planters, and warm dusk lighting.',
    image: '/projects/coastal.jpg',
    specs: {
      scope: 'Concrete patio hardscape, fire pit installation, brass landscape lighting',
      timeline: '4 Weeks Execution',
      keyFlora: 'Architectural Succulents, Coastal Palms, Boxwood Accents',
      result: 'Expanded living space with seamless indoor-to-outdoor flow.'
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

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
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
        <a href="#top" className="brand-logo" aria-label="SoCal Landscape & Gardening Home">
          <div className="brand-badge">SL<span>+</span></div>
          <div className="brand-text">
            <span>SoCal</span>
            <b>Landscape &amp; Gardening</b>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#why-us" className="nav-link">Why Us</a>
          <a href="#process" className="nav-link">Process</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        <div className="nav-cta-group">
          <a href="#estimate" className="btn-primary">
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
        <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
        <a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a>
        <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
        <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        <a href="#estimate" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center', marginTop: '12px' }}>
          Start a Project →
        </a>
      </div>

      <main id="top">
        {/* 3. Hero Section */}
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
              <a href="#work" className="btn-secondary">
                <span>View Our Work</span>
                <span className="btn-arrow">↓</span>
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
                src="/projects/hillside.jpg" 
                alt="Architectural modern hillside landscaping in Silver Lake Los Angeles" 
              />
            </div>
            <div className="hero-location-pill">
              <span>FEATURED PROJECT</span>
              <b>Silver Lake Hillside Sanctuary</b>
            </div>
          </div>
        </section>

        {/* 4. Trust Bar / Metrics */}
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

        {/* 7. Services Section */}
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
                    <a href="#estimate" onClick={() => handleServiceSelect(svc.title)} className="btn-secondary" style={{ width: '100%' }}>
                      Explore Service →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Interactive Service Directory */}
            <div className="services-directory-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <h3 className="directory-title">Complete Service Directory</h3>
                  <p className="directory-sub">Explore all 12 specialized services we offer across Greater Los Angeles.</p>
                </div>
                <input 
                  type="text" 
                  placeholder="Search services (e.g., drip, sod, pruning)..."
                  value={directorySearch}
                  onChange={e => setDirectorySearch(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    minWidth: '260px'
                  }}
                />
              </div>

              <div className="directory-grid">
                {filteredDirectoryServices.map((service, index) => (
                  <div key={service.id} className="directory-item">
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--clay)', fontWeight: '700', marginBottom: '4px' }}>
                        SERVICE {String(index + 1).padStart(2, '0')}
                      </div>
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                    </div>
                    <button onClick={() => handleServiceSelect(service.title)}>
                      Discuss This Service <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
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

        {/* 9. Process Section */}
        <section className="process-section" id="process">
          <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 48px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="eyebrow-badge">OUR WORKFLOW</div>
            </div>
            <h2 className="section-title">From first conversation to final delivery.</h2>
            <p className="section-sub">A simple, transparent process designed to remove friction and keep you informed at every step.</p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-step-badge">01</div>
              <h3>Discover &amp; Walkthrough</h3>
              <p>Share your property details or schedule an in-person site walk. We review your priorities, light exposure, soil, and drainage.</p>
            </div>

            <div className="process-card">
              <div className="process-step-badge">02</div>
              <h3>Tailored Proposal</h3>
              <p>Receive a clear, transparent estimate within one business day with plant recommendations, scope details, and schedule.</p>
            </div>

            <div className="process-card">
              <div className="process-step-badge">03</div>
              <h3>Precision Execution</h3>
              <p>Our experienced crew arrives on schedule to handle planting, irrigation, hardscaping, or pruning with minimal disruption.</p>
            </div>

            <div className="process-card">
              <div className="process-step-badge">04</div>
              <h3>Ongoing Care</h3>
              <p>Enjoy your vibrant outdoor space with optional recurring garden care, seasonal refreshes, and proactive property maintenance.</p>
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

      {/* 14. Footer */}
      <footer className="main-footer">
        <div className="footer-wrapper">
          <div className="footer-brand">
            <a href="#top" className="brand-logo" style={{ color: '#ffffff' }}>
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
              <li><a href="#work">Selected Work</a></li>
              <li><a href="#services">Services Catalog</a></li>
              <li><a href="#why-us">Why SoCal Landscape</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#reviews">Verified Reviews</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Featured Services</h4>
            <ul>
              <li><a href="#services">Garden &amp; Lawn Care</a></li>
              <li><a href="#services">Irrigation Systems &amp; Audits</a></li>
              <li><a href="#services">Drought Tolerant Design</a></li>
              <li><a href="#services">Tree Trimming &amp; Pruning</a></li>
              <li><a href="#services">Hardscape &amp; Lighting</a></li>
              <li><a href="#services">HOA &amp; Commercial Care</a></li>
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
            <a href="#top" style={{ color: 'var(--gold)', fontWeight: '600' }}>Back to top ↑</a>
          </div>
        </div>
      </footer>

      {/* 15. Mobile Sticky Bar */}
      <div className="mobile-sticky-bar">
        <div className="btn-group">
          <a href="tel:+12135667469" className="btn-secondary" style={{ padding: '10px', fontSize: '0.85rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
            📞 Call
          </a>
          <a href="#estimate" className="btn-primary" style={{ padding: '10px', fontSize: '0.85rem' }}>
            Get an Estimate →
          </a>
        </div>
      </div>
    </div>
  )
}
