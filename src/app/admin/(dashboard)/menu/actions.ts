'use server'

import { createClient } from '@supabase/supabase-js'

const getAdminSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function adminUploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File
    const filePath = formData.get('filePath') as string

    if (!file) throw new Error('No file provided')

    // Convert file to Buffer for Vercel/Node environment compatibility
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const supabase = getAdminSupabase()
    const { error } = await supabase.storage.from('menu-images').upload(filePath, buffer, {
      contentType: file.type,
      upsert: true
    })
    
    if (error) throw new Error(error.message)
    
    const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath)
    return { success: true, url: data.publicUrl }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteImage(filePath: string) {
  try {
    const supabase = getAdminSupabase()
    const { error } = await supabase.storage.from('menu-images').remove([filePath])
    if (error) throw new Error(error.message)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminSaveMenu(payload: any, editingId: string | null) {
  try {
    const supabase = getAdminSupabase()
    
    if (editingId) {
      const { error } = await supabase.from('menu_items').update(payload).eq('id', editingId)
      if (error) throw new Error(error.message)
    } else {
      const { error } = await supabase.from('menu_items').insert(payload)
      if (error) throw new Error(error.message)
    }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteMenu(id: string) {
  try {
    const supabase = getAdminSupabase()
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
