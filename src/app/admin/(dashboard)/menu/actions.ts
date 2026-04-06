'use server'

import { createClient } from '@supabase/supabase-js'

const getAdminSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function adminUploadImage(formData: FormData) {
  const file = formData.get('file') as File
  const filePath = formData.get('filePath') as string

  const supabase = getAdminSupabase()
  const { error } = await supabase.storage.from('menu-images').upload(filePath, file)
  
  if (error) throw new Error(error.message)
  
  const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath)
  return data.publicUrl
}

export async function adminDeleteImage(filePath: string) {
  const supabase = getAdminSupabase()
  const { error } = await supabase.storage.from('menu-images').remove([filePath])
  if (error) throw new Error(error.message)
}

export async function adminSaveMenu(payload: any, editingId: string | null) {
  const supabase = getAdminSupabase()
  
  if (editingId) {
    const { error } = await supabase.from('menu_items').update(payload).eq('id', editingId)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('menu_items').insert(payload)
    if (error) throw new Error(error.message)
  }
}

export async function adminDeleteMenu(id: string) {
  const supabase = getAdminSupabase()
  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
