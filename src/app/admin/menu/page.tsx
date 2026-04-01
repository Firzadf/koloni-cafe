'use client'

import { useState, useEffect } from 'react'
import { MenuItem } from '@/types'
import { supabase } from '@/lib/supabaseClient'

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form Data
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Food')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState('')

  const fetchMenu = async () => {
    const { data } = await supabase.from('menu_items').select('*')
    if (data) setItems(data as MenuItem[])
    setLoading(false)
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    // Optimistic UI update
    setItems(items.filter(item => item.id !== id))
    
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (error) {
      alert('Delete failed: ' + error.message)
      fetchMenu() // Revert UI
    } else {
      // Optional: Delete image from storage if it's stored in S3/Supabase
      if (imageUrl && imageUrl.includes('supabase.co')) {
        const path = imageUrl.split('/').pop()
        if (path) supabase.storage.from('menu-images').remove([path])
      }
    }
  }

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingId(item.id)
      setName(item.name)
      setCategory(item.category)
      setPrice(item.price.toString())
      setDescription(item.description)
      setExistingImageUrl(item.image_url)
    } else {
      setEditingId(null)
      setName('')
      setCategory('Food')
      setPrice('')
      setDescription('')
      setExistingImageUrl('')
    }
    setImageFile(null)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let finalImageUrl = existingImageUrl

      // 1. Upload Image to Supabase Storage if a new file is chosen
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('menu-images')
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('menu-images')
          .getPublicUrl(filePath)

        finalImageUrl = publicUrl
      }

      // 2. Set Fallback Image if absolutely none provided
      if (!finalImageUrl) finalImageUrl = '/assets/img/plate1.png'

      const payload = {
        name,
        category,
        price: parseInt(price, 10),
        description,
        image_url: finalImageUrl
      }

      if (editingId) {
        // UPDATE Existing
        const { error } = await supabase.from('menu_items').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        // INSERT New
        const { error } = await supabase.from('menu_items').insert(payload)
        if (error) throw error
      }

      await fetchMenu() // Refresh List
      closeModal()
    } catch (err: any) {
      alert('Failed to save menu: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        <button 
          onClick={() => openModal()}
          className="bg-[var(--first-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--first-color-alt)] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <i className='bx bx-plus'></i> Add New Item
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading menu data...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 overflow-hidden">No menu items found.</td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">
                      <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    </td>
                    <td className="p-4 font-medium">{item.name}<br /><span className="text-sm font-normal text-gray-500">{item.description}</span></td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 text-green-600 font-medium">Rp {item.price.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openModal(item)} className="text-blue-500 hover:text-blue-700 mr-4 cursor-pointer">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id, item.image_url)} className="text-red-500 hover:text-red-700 cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* CRUD Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 animate-fade-in">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Menu Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:outline-[var(--first-color)]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:outline-[var(--first-color)]">
                    <option value="Food">Food</option>
                    <option value="Drink">Drink</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rp)</label>
                  <input required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:outline-[var(--first-color)]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-300 rounded p-2 h-20 focus:outline-[var(--first-color)]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageFile(e.target.files[0])
                    }
                  }} 
                  className="w-full border border-gray-300 rounded p-2 file:bg-[var(--first-color)] file:text-white file:border-0 file:px-4 file:py-1 file:rounded file:mr-2 cursor-pointer" 
                />
                {existingImageUrl && !imageFile && (
                  <p className="text-xs text-gray-500 mt-1">Currently using: {existingImageUrl.split('/').pop()}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">Cancel</button>
                <button disabled={isSubmitting} type="submit" className="px-4 py-2 text-white bg-[var(--first-color)] hover:bg-[var(--first-color-alt)] rounded-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                  {isSubmitting ? 'Saving...' : 'Save Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
