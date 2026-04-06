import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zsyfptwczvafpfdmuene.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeWZwdHdjenZhZnBmZG11ZW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTAyNzg1OCwiZXhwIjoyMDkwNjAzODU4fQ.L65Ufb6fqVOy7XnbDL_L11Qkd-xtjcCnUjpiOcVM3ho'
const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  const email = 'admin@koloni.space'
  const password = 'password123'
  
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  })

  if (error) {
    console.error('Error creating user:', error.message)
    if (error.message.includes('User already registered')) {
        console.log('User already exists. They can log in with their existing credentials.')
    }
  } else {
    console.log('Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
  }
}

createAdminUser()
