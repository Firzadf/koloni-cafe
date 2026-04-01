'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 text-red-200 hover:text-white hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
    >
      <i className='bx bx-log-out text-xl'></i>
      <span>Log Out</span>
    </button>
  )
}
