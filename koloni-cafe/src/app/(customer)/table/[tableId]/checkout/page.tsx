'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { MenuItem } from '@/types'

export default function CheckoutPage({ params }: { params: Promise<{ tableId: string }> }) {
  const { tableId } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const cartQuery = searchParams?.get('cart')
  
  const [cart, setCart] = useState<{item: MenuItem, quantity: number}[]>([])
  const [isPaid, setIsPaid] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (cartQuery) {
      try {
        setCart(JSON.parse(cartQuery))
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
  }, [cartQuery])

  const total = cart.reduce((sum, current) => sum + (current.item.price * current.quantity), 0)

  const handlePayment = async () => {
    // Simulate API call to save order
    // In actual implementation, we'd save to Supabase here
    const mockId = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase()
    setOrderId(mockId)
    setIsPaid(true)
  }

  if (isPaid) {
    return (
      <div className="pt-24 min-h-screen bg-[var(--body-color)] flex flex-col items-center justify-center text-center p-4">
        <i className='bx bx-check-circle text-6xl text-green-500 mb-4'></i>
        <h2 className="section-title">Payment Successful!</h2>
        <p className="mb-2">Your order <strong>{orderId}</strong> has been received.</p>
        <p className="mb-6">The kitchen is preparing your order.</p>
        <Link href={`/table/${tableId}`} className="button">Back to Menu</Link>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-[var(--body-color)] pb-32">
      <header className="l-header" id="header" style={{boxShadow: '0 2px 4px rgba(0,0,0,.1)'}}>
        <nav className="nav bd-container">
            <Link href={`/table/${tableId}`} className="nav__logo"><i className='bx bx-arrow-back mr-2'></i> Back</Link>
            <div className="font-semibold text-green-600">Checkout Table {tableId}</div>
        </nav>
      </header>

      <main className="bd-container">
        <h2 className="section-title mt-8">Order Summary</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
          {cart.map((cartItem, i) => (
            <div key={i} className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <p className="font-bold text-[var(--title-color)]">{cartItem.item.name}</p>
                <p className="text-sm text-gray-500">{cartItem.quantity} x Rp {cartItem.item.price.toLocaleString()}</p>
              </div>
              <p className="font-bold text-[var(--title-color)]">Rp {(cartItem.quantity * cartItem.item.price).toLocaleString()}</p>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6 text-xl">
            <p className="font-bold text-[var(--title-color)]">Total</p>
            <p className="font-bold text-green-600">Rp {total.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
          <h3 className="font-bold text-lg mb-4 text-[var(--title-color)]">Scan to Pay (QRIS)</h3>
          <div className="bg-gray-200 w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400">
            {/* Real QR code image would go here */}
            <span className="text-gray-500 text-sm">QRIS Prototype Placeholder</span>
          </div>
          <button onClick={handlePayment} className="button w-full cursor-pointer text-lg font-bold">
            <i className='bx bx-check-shield mr-2'></i> Saya Sudah Bayar
          </button>
        </div>
      </main>
    </div>
  )
}
