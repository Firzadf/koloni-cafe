'use client'

import { useState, useEffect } from 'react'
import { Order, OrderStatus } from '@/types'
import { supabase } from '@/lib/supabaseClient'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (data) setOrders(data as Order[])
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
    // Set up a simple poll every 10 seconds for prototype purposes
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    // Optimistic update
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    if (error) {
      alert('Error updating status: ' + error.message)
      fetchOrders() // revert
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-200 text-yellow-800'
      case 'Cooking': return 'bg-blue-200 text-blue-800'
      case 'Ready': return 'bg-green-200 text-green-800'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Active Orders</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.table_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {order.total_amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  {order.status === 'Pending' && (
                    <button onClick={() => updateStatus(order.id, 'Cooking')} className="text-blue-600 hover:text-blue-900 font-medium bg-blue-50 px-3 py-1 rounded">Cook</button>
                  )}
                  {order.status === 'Cooking' && (
                    <button onClick={() => updateStatus(order.id, 'Ready')} className="text-green-600 hover:text-green-900 font-medium bg-green-50 px-3 py-1 rounded">Set Ready</button>
                  )}
                  {order.status === 'Ready' && (
                    <span className="text-gray-400 italic">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-8 text-center text-gray-500">No active orders</div>
        )}
      </div>
    </div>
  )
}
