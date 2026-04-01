'use client'

import { useState, use, useEffect } from 'react'
import Link from 'next/link'
import { MenuItem } from '@/types'
import { supabase } from '@/lib/supabaseClient'

export default function TableMenuPage({ params }: { params: Promise<{ tableId: string }> }) {
  const { tableId } = use(params)
  const [cart, setCart] = useState<{item: MenuItem, quantity: number}[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMenu() {
      const { data } = await supabase.from('menu_items').select('*')
      if (data) setMenuItems(data as MenuItem[])
      setLoading(false)
    }
    loadMenu()
  }, [])

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id)
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { item, quantity: 1 }]
    })
  }

  const resetCart = () => setCart([])

  const total = cart.reduce((sum, current) => sum + (current.item.price * current.quantity), 0)

  return (
    <div className="pt-24 min-h-screen bg-[var(--body-color)]">
      <header className="l-header" id="header" style={{boxShadow: '0 2px 4px rgba(0,0,0,.1)'}}>
        <nav className="nav bd-container">
            <Link href="/" className="nav__logo">Koloni Space</Link>
            <div className="font-semibold text-green-600">Table {tableId}</div>
        </nav>
      </header>

      <main className="bd-container">
        <h2 className="section-title mt-8">Table {tableId} Menu</h2>
        
        <div className="menu__container bd-grid mt-4">
          {loading ? (
            <p className="text-center col-span-full">Loading menu...</p>
          ) : menuItems.length === 0 ? (
            <p className="text-center col-span-full">Menu is currently empty.</p>
          ) : (
            menuItems.map((item: MenuItem) => (
              <div key={item.id} className="menu__content">
                  <img src={item.image_url} alt={item.name} className="menu__img" />
                  <h3 className="menu__name">{item.name}</h3>
                  <span className="menu__detail">{item.description}</span>
                  <span className="menu__preci">Rp {item.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(item)} className="button menu__button cursor-pointer">
                    <i className='bx bx-cart-alt'></i>
                  </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center z-50">
            <div>
              <p className="font-bold text-[var(--title-color)]">{cart.reduce((a,b)=>a+b.quantity, 0)} Items</p>
              <p className="text-green-600 font-bold">Rp {total.toLocaleString()}</p>
            </div>
            <Link 
              href={`/table/${tableId}/checkout?cart=${encodeURIComponent(JSON.stringify(cart))}`}
              className="button"
            >
              Checkout
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
