import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zsyfptwczvafpfdmuene.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeWZwdHdjenZhZnBmZG11ZW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTAyNzg1OCwiZXhwIjoyMDkwNjAzODU4fQ.L65Ufb6fqVOy7XnbDL_L11Qkd-xtjcCnUjpiOcVM3ho'
const supabase = createClient(supabaseUrl, supabaseKey)

async function createBucket() {
  const { data, error } = await supabase.storage.createBucket('menu-images', {
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    fileSizeLimit: 5242880 // 5MB
  })

  if (error) {
    if (error.message.includes('already exists') || error.message.includes('duplicate')) {
       console.log('Bucket "menu-images" already exists. Updating to public...')
       const { data: updateData, error: updateError } = await supabase.storage.updateBucket('menu-images', {
         public: true,
       })
       if (updateError) {
           console.error('Failed to make bucket public:', updateError)
       } else {
           console.log('Bucket updated to public successfully.')
       }
    } else {
      console.error('Error creating bucket:', error)
    }
  } else {
    console.log('Bucket "menu-images" created successfully and set to public!')
  }
}

createBucket()
