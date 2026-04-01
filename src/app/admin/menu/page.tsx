'use client'

import { useState, useEffect } from 'react'
import { MenuItem } from '@/types'
import { supabase } from '@/lib/supabaseClient'

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMenu = async () => {
    const { data } = await supabase.from('menu_items').select('*')
    if (data) setItems(data as MenuItem[])
    setLoading(false)
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    // Optimistic update
    setItems(items.filter(item => item.id !== id))
    
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (error) {
      alert('Delete failed: ' + error.message)
      fetchMenu() // Revert
    }
  }

  const handleEdit = (id: string) => {
    alert('Opening Edit Modal for Item: ' + id)
  }

  const handleAdd = async () => {
    const name = prompt('Menu Name')
    if (!name) return
    const priceStr = prompt('Price (number)')
    if (!priceStr) return
    
    const newItem = {
      name,
      category: 'Food',
      price: parseInt(priceStr, 10),
      description: 'New dish description',
      image_url: '/assets/img/plate1.png'
    }

    const { data, error } = await supabase.from('menu_items').insert(newItem).select().single()
    if (error) {
      alert('Failed to add item: ' + error.message)
    } else if (data) {
      setItems([...items, data as MenuItem])
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Menu Management</h2>
        <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <i className='bx bx-plus mr-2'></i>
          <span>Add New Item</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={item.image_url} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {item.price.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-900">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
