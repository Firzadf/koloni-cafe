'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MenuItem } from '@/types'
import { supabase } from '@/lib/supabaseClient'

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  useEffect(() => {
    async function loadMenu() {
      const { data } = await supabase.from('menu_items').select('*')
      if (data) setMenuItems(data as MenuItem[])
      setLoading(false)
    }
    loadMenu()
  }, [])

  const categories = ['All', 'Coffee', 'Non Coffee', 'Ricebowl', 'Snack']

  const filteredMenu = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase())

  return (
    <>
      <header className="l-header" id="header" style={{ position: 'relative', background: 'white', borderBottom: '1px solid #eee' }}>
          <nav className="nav bd-container">
              <Link href="/" className="nav__logo flex items-center gap-2">
                  <img src="/assets/img/logo/koloni-logo.jpg" alt="Koloni Logo" className="h-5 w-5 object-cover rounded-full" />
                  Koloni
              </Link>
              <div className="nav__menu" id="nav-menu">
                  <ul className="nav__list">
                      <li className="nav__item"><Link href="/#home" className="nav__link">Home</Link></li>
                      <li className="nav__item"><Link href="/menu" className="nav__link active-link">Full Menu</Link></li>
                  </ul>
              </div>
          </nav>
      </header>

      <main className="l-main" style={{ paddingTop: '2rem' }}>
          <section className="menu section bd-container" id="menu">
              <span className="section-subtitle">Complete List</span>
              <h2 className="section-title">Koloni Menu</h2>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors cursor-pointer border border-transparent hover:border-[var(--first-color)] ${
                      activeCategory === cat 
                        ? 'bg-[var(--first-color)] text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="menu__container bd-grid">
                  {loading ? (
                    <p className="text-center col-span-full">Loading full menu...</p>
                  ) : filteredMenu.length === 0 ? (
                    <p className="text-center col-span-full">No menu items found for this category.</p>
                  ) : (
                    filteredMenu.map(item => (
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
      </main>

      <footer className="footer section bd-container mt-12">
          <div className="footer__container bd-grid text-center">
              <div className="footer__content mx-auto">
                  <Link href="/" className="footer__logo inline-flex items-center gap-2 mb-4">
                      <img src="/assets/img/logo/koloni-logo.jpg" alt="Koloni Logo" className="h-5 w-5 object-cover rounded-full" />
                      Koloni
                  </Link>
                  <span className="footer__description block">Cafe & Co-working</span>
              </div>
          </div>
          <p className="footer__copy text-center pb-8">&#169; {new Date().getFullYear()} Koloni. All right reserved</p>
      </footer>
    </>
  )
}
