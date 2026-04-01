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
      const { data } = await supabase.from('menu_items').select('*').limit(3)
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
              <Link href="#" className="nav__logo">Koloni Space</Link>

              <div className="nav__menu" id="nav-menu">
                  <ul className="nav__list">
                      <li className="nav__item"><Link href="#home" className="nav__link active-link">Home</Link></li>
                      <li className="nav__item"><Link href="#about" className="nav__link">About</Link></li>
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
                      <h2 className="home__subtitle">Welcome to the best cafe <br/> in town.</h2>
                      <Link href="#menu" className="button">View Menu</Link>
                  </div>
  
                  <img src="/assets/img/home.png" alt="" className="home__img" />
              </div>
          </section>
          
          {/*========== ABOUT ==========*/}
          <section className="about section bd-container" id="about">
              <div className="about__container  bd-grid">
                  <div className="about__data">
                      <span className="section-subtitle about__initial">About us</span>
                      <h2 className="section-title about__initial">We serve the best <br/> coffee and food</h2>
                      <p className="about__description">Relax and enjoy our curated menu with a great atmosphere. Perfect for hanging out or working.</p>
                      <Link href="#" className="button">Explore history</Link>
                  </div>

                  <img src="/assets/img/about.jpg" alt="" className="about__img" />
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
                      <Link href="#" className="button">Contact us now</Link>
                  </div>
              </div>
          </section>
      </main>

      {/*========== FOOTER ==========*/}
      <footer className="footer section bd-container">
          <div className="footer__container bd-grid">
              <div className="footer__content">
                  <Link href="#" className="footer__logo">Koloni Space</Link>
                  <span className="footer__description">Cafe & Co-working</span>
                  <div>
                      <Link href="#" className="footer__social"><i className='bx bxl-facebook'></i></Link>
                      <Link href="#" className="footer__social"><i className='bx bxl-instagram'></i></Link>
                      <Link href="#" className="footer__social"><i className='bx bxl-twitter'></i></Link>
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
                      <li>Jakarta - Indonesia</li>
                      <li>Jl. Koloni 123</li>
                      <li>+62 811 2233 4455</li>
                      <li>hello@koloni.space</li>
                  </ul>
              </div>
          </div>
          <p className="footer__copy">&#169; 2026 Koloni. All right reserved</p>
      </footer>
    </>
  )
}
