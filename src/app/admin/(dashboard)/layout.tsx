import Link from 'next/link'
import { ReactNode } from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/app/admin/LogoutButton'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--first-color)] text-white shadow-md flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold tracking-wider">Koloni Admin</Link>
        </div>
        <nav className="mt-6 flex flex-col gap-2 px-4 flex-1">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--first-color-alt)] rounded-lg transition-colors"
          >
            <i className='bx bx-list-ul text-xl'></i>
            <span>Orders</span>
          </Link>
          <Link 
            href="/admin/menu" 
            className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--first-color-alt)] rounded-lg transition-colors"
          >
            <i className='bx bx-food-menu text-xl'></i>
            <span>Menu Items</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-[var(--first-color-alt)]">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold uppercase">
              {user.email?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

