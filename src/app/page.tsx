'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MenuItem } from '@/types'
import { supabase } from '@/lib/supabaseClient'

export default function LandingPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMenu() {
      const { data } = await supabase.from('menu_items').select('*').limit(9)
      if (data) setMenuItems(data as MenuItem[])
      setLoading(false)
    }
    loadMenu()
  }, [])
  useEffect(() => {
    // Basic show menu toggle from template's main.js
    const toggleMenu = () => {
      const navMenu = document.getElementById('nav-menu')
      navMenu?.classList.toggle('show-menu')
    }

    const navToggle = document.getElementById('nav-toggle')
    navToggle?.addEventListener('click', toggleMenu)

    const navLinks = document.querySelectorAll('.nav__link')
    navLinks.forEach(n => n.addEventListener('click', () => {
      const navMenu = document.getElementById('nav-menu')
      navMenu?.classList.remove('show-menu')
    }))

    return () => {
      navToggle?.removeEventListener('click', toggleMenu)
    }
  }, [])

  return (
    <>
      {/*========== SCROLL TOP ==========*/}
      <a href="#" className="scrolltop" id="scroll-top">
          <i className='bx bx-chevron-up scrolltop__icon'></i>
      </a>

      {/*========== HEADER ==========*/}
      <header className="l-header" id="header">
          <nav className="nav bd-container">
              <Link href="#" className="nav__logo flex items-center gap-2">
                  <img src="/assets/img/logo/koloni-logo.jpg" alt="Koloni Logo" className="h-5 w-5 object-cover rounded-full" />
                  Koloni
              </Link>

              <div className="nav__menu" id="nav-menu">
                  <ul className="nav__list">
                      <li className="nav__item"><Link href="#home" className="nav__link active-link">Home</Link></li>
                      <li className="nav__item"><Link href="#about" className="nav__link">About</Link></li>
                      <li className="nav__item"><Link href="#gallery" className="nav__link">Gallery</Link></li>
                      <li className="nav__item"><Link href="#menu" className="nav__link">Menu</Link></li>
                      <li className="nav__item"><Link href="#contact" className="nav__link">Contact</Link></li>
                      <li><i className='bx bx-moon change-theme' id="theme-button"></i></li>
                  </ul>
              </div>

              <div className="nav__toggle" id="nav-toggle">
                  <i className='bx bx-menu'></i>
              </div>
          </nav>
      </header>

      <main className="l-main">
          {/*========== HOME ==========*/}
          <section className="home" id="home">
              <div className="home__container bd-container bd-grid">
                  <div className="home__data">
                      <h1 className="home__title">Koloni Food<br/>& Space</h1>
                      <h2 className="home__subtitle text-2xl font-semibold mb-2">A Hidden Escape <br/> in the Heart of Nature.</h2>
                      <p className="mb-6 text-gray-600 max-w-lg">Step away from the city's hustle and embrace the blend of subtle flavors and natural tranquility of Situgede Ecotourism.</p>
                      <Link href="#menu" className="button">View Menu</Link>
                  </div>
  
                  <img src="/assets/img/home.png" alt="" className="home__img" />
              </div>
          </section>
          
          {/*========== ABOUT ==========*/}
          <section className="about section bd-container" id="about">
              <div className="about__container  bd-grid">
                  <div className="about__data">
                      <span className="section-subtitle about__initial">Our Story</span>
                      <h2 className="section-title about__initial">More Than Just a <br/> Stopover</h2>
                      <p className="about__description text-justify">
                        Hidden within the lush tranquility of Situgede Ecotourism, Koloni Food & Space serves not just as a cafe, but as a momentary escape to recharge. We believe that warm conversations, delicious food, and fresh air are the perfect combination everyone covets.
                        <br/><br/>
                        True to the name "Koloni", this place is designed as a communal space for everyone—whether for focused work, relaxing with family, or enjoying an afternoon with close friends. Surrounded by trees and a natural ambiance, Koloni offers a hidden gem experience that makes you feel far from the city noise, even when you're so close.
                        <br/><br/>
                        From our legendary Koloniers Coffee to an appetizing array of ricebowls and snacks, every dish is prepared to complement your relaxing moments here.
                      </p>
                  </div>

                  <img src="/assets/img/about.jpg" alt="About Koloni" className="about__img rounded-xl shadow-md" />
              </div>
          </section>

          {/*========== FEATURES ==========*/}
          <section className="services section bd-container" id="services">
              <span className="section-subtitle">Why Koloni?</span>
              <h2 className="section-title">What We Offer</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-4">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                      <i className='bx bx-leaf text-4xl text-[var(--first-color)] mb-4'></i>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Hidden Place</h3>
                      <p className="text-gray-600 text-sm">Located within Situgede Ecotourism, offering tranquility and fresh air that blends with nature. A momentary healing spot that's easily within reach.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                      <i className='bx bx-coffee-togo text-4xl text-[var(--first-color)] mb-4'></i>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Comfort Drink & Food</h3>
                      <p className="text-gray-600 text-sm">Serving a wide selection, from legendary coffee blends to hearty ricebowls and snacks designed to satisfy both your heart and craving.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                      <i className='bx bx-group text-4xl text-[var(--first-color)] mb-4'></i>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Communal Space</h3>
                      <p className="text-gray-600 text-sm">A comfortable and spacious area built to become a gathering place, share stories, or simply to enjoy a serene me-time.</p>
                  </div>
              </div>
          </section>

          {/*========== GALLERY ==========*/}
          <section className="gallery section bd-container" id="gallery">
              <span className="section-subtitle">Visuals</span>
              <h2 className="section-title">Gallery</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  <img src="/assets/img/gallery/koloni1.jpg" alt="Gallery 1" className="w-full h-48 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform" />
                  <img src="/assets/img/gallery/koloni2.jpg" alt="Gallery 2" className="w-full h-48 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform" />
                  <img src="/assets/img/gallery/koloni3.jpg" alt="Gallery 3" className="w-full h-48 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform" />
                  <img src="/assets/img/gallery/koloni4.jpg" alt="Gallery 4" className="w-full h-48 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform" />
                  <img src="/assets/img/gallery/koloni5.jpg" alt="Gallery 5" className="w-full h-48 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform" />
                  <img src="/assets/img/gallery/koloni6.jpg" alt="Gallery 6" className="w-full h-48 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform" />
              </div>
          </section>

          {/*========== MENU (Preview) ==========*/}
          <section className="menu section bd-container" id="menu">
              <span className="section-subtitle">Special</span>
              <h2 className="section-title">Menu of the week</h2>

              <div className="menu__container bd-grid">
                  {loading ? (
                    <p className="text-center col-span-full">Loading menu preview...</p>
                  ) : menuItems.length === 0 ? (
                    <p className="text-center col-span-full">Menu preview is empty.</p>
                  ) : (
                    menuItems.map(item => (
                      <div key={item.id} className="menu__content">
                          <img src={item.image_url} alt={item.name} className="menu__img" />
                          <h3 className="menu__name">{item.name}</h3>
                          <span className="menu__detail">{item.description}</span>
                          <span className="menu__preci">Rp {item.price.toLocaleString()}</span>
                          <Link href="/table/01" className="button menu__button"><i className='bx bx-cart-alt'></i></Link>
                      </div>
                    ))
                  )}
              </div>

              <div className="text-center mt-8 pt-4">
                  <Link href="/menu" className="button">View All Menu</Link>
              </div>
          </section>

          {/*========== CONTACT US ==========*/}
          <section className="contact section bd-container" id="contact">
              <div className="contact__container bd-grid">
                  <div className="contact__data">
                      <span className="section-subtitle contact__initial">Let's talk</span>
                      <h2 className="section-title contact__initial">Contact us</h2>
                      <p className="contact__description">If you want to reserve a table in our cafe, contact us and we will attend you quickly.</p>
                  </div>

                  <div className="contact__button">
                      <Link href="https://api.whatsapp.com/send/?phone=6282321710901&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="button">Contact us now</Link>
                  </div>
              </div>
          </section>
      </main>

      {/*========== FOOTER ==========*/}
      <footer className="footer section bd-container">
          <div className="footer__container bd-grid">
              <div className="footer__content">
                  <Link href="#" className="footer__logo flex items-center gap-2 mb-4">
                      <img src="/assets/img/logo/koloni-logo.jpg" alt="Koloni Logo" className="h-5 w-5 object-cover rounded-full" />
                      Koloni
                  </Link>
                  <span className="footer__description">Cafe & Co-working</span>
                  <div>
                      <Link href="https://www.facebook.com/people/Koloni-FO/pfbid0ZAQ7G6N65pwcXfEa8zedUrJnYxhhDo7RgU1oYVZKrYYGQs1ZnbVUbn9v5zEJKFDFl/?ref=NONE_ig_profile_ac" target="_blank" rel="noopener noreferrer" className="footer__social"><i className='bx bxl-facebook'></i></Link>
                      <Link href="https://www.instagram.com/koloniers/" target="_blank" rel="noopener noreferrer" className="footer__social"><i className='bx bxl-instagram'></i></Link>
                  </div>
              </div>

              <div className="footer__content">
                  <h3 className="footer__title">Information</h3>
                  <ul>
                      <li><Link href="#" className="footer__link">Event</Link></li>
                      <li><Link href="#" className="footer__link">Contact us</Link></li>
                      <li><Link href="#" className="footer__link">Privacy policy</Link></li>
                      <li><Link href="#" className="footer__link">Terms of services</Link></li>
                  </ul>
              </div>

              <div className="footer__content">
                  <h3 className="footer__title">Address</h3>
                  <ul>
                      <li>RT.01/RW.03, Situgede</li>
                      <li>Kec. Bogor Bar., Kota Bogor</li>
                      <li>Jawa Barat</li>
                      <li>+62 823 2171 0901</li>
                  </ul>
              </div>
          </div>
          <p className="footer__copy">&#169; 2026 Koloni. All right reserved</p>
      </footer>
    </>
  )
}
