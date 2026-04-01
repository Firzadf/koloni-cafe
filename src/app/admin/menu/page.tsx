'use client'

import { useState } from 'react'
import { MenuItem } from '@/types'

const initialMenuItems: MenuItem[] = [
  { id: '1', name: 'Barbecue Salad', category: 'Food', price: 22000, description: 'Delicious dish', image_url: '/assets/img/plate1.png' },
  { id: '2', name: 'Salad with Fish', category: 'Food', price: 35000, description: 'Delicious dish', image_url: '/assets/img/plate2.png' },
  { id: '3', name: 'Spinach Salad', category: 'Food', price: 25000, description: 'Delicious dish', image_url: '/assets/img/plate3.png' },
]

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(initialMenuItems)
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleEdit = (id: string) => {
    setIsEditing(true)
    // Prototype: In a real app, open a modal with the item data
    alert('Opening Edit Modal for Item: ' + id)
  }

  const handleAdd = () => {
    // Prototype: In a real app, open an empty modal to add new item
    const newItem: MenuItem = {
      id: Math.random().toString(36).substr(2, 6),
      name: 'New Menu Item',
      category: 'Food',
      price: 15000,
      description: 'New dish description',
      image_url: '/assets/img/plate1.png'
    }
    setItems([...items, newItem])
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
