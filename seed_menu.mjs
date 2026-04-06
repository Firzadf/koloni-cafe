import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zsyfptwczvafpfdmuene.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeWZwdHdjenZhZnBmZG11ZW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTAyNzg1OCwiZXhwIjoyMDkwNjAzODU4fQ.L65Ufb6fqVOy7XnbDL_L11Qkd-xtjcCnUjpiOcVM3ho'
const supabase = createClient(supabaseUrl, supabaseKey)

const menuItems = [
  // Koloni Coffee
  { name: 'Esspresso', price: 20000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Americano (Hot/Ice)', price: 20000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Coffee Late (Hot/Ice)', price: 25000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Cappuccino (Hot/Ice)', price: 25000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Es Kopi Koloniers', price: 29000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Vanila Ice Coffee', price: 25000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Avocado Coffee', price: 25000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Es Kopi Gula Aren', price: 25000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Kopi Tubruk Legenda', price: 20000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Kopi Susu Doeloe', price: 23000, category: 'Coffee', description: 'Koloni Coffee', image_url: '/assets/img/plate3.png' },

  // Non Coffee
  { name: 'Koloni Booster (Hot/Ice)', price: 25000, category: 'Non Coffee', description: 'Non Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Red Valvet', price: 25000, category: 'Non Coffee', description: 'Non Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Choco Hazelnut (Hot/Ice)', price: 25000, category: 'Non Coffee', description: 'Non Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Ice ChocoMilo', price: 25000, category: 'Non Coffee', description: 'Non Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Lemon Tea (Hot/Ice)', price: 20000, category: 'Non Coffee', description: 'Non Coffee', image_url: '/assets/img/plate3.png' },
  { name: 'Ice Lychee Tea', price: 25000, category: 'Non Coffee', description: 'Non Coffee', image_url: '/assets/img/plate3.png' },

  // Ricebowl
  { name: 'Chicken Katsu', price: 36000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Chicken Teriyaki', price: 35000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Beef Black Peppers', price: 36000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Beef Patty Barbeque', price: 36000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Spaghetti Aglio Olio', price: 35000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Nasi Goreng Koloni', price: 35000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Mie Goreng', price: 35000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Ayam Goreng Serundeng', price: 33000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Ayam Bakar', price: 33000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },
  { name: 'Ayam Goreng Nasi Wangi', price: 33000, category: 'Ricebowl', description: 'Optional Sambal: Sambal Ijo, Sambal Merah, Sambal Bawang', image_url: '/assets/img/plate1.png' },

  // Snack
  { name: 'Koloniers Cheese Burger', price: 30000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
  { name: 'Basket Case', price: 33000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
  { name: 'French Fries', price: 20000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
  { name: 'Roti Bakar Koloniers', price: 27000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
  { name: 'Pisang Bakar', price: 25000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
  { name: 'Cimplung', price: 27000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
  { name: 'Pisang Goreng', price: 25000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
  { name: 'Singkong Goreng', price: 23000, category: 'Snack', description: 'Snack', image_url: '/assets/img/plate2.png' },
];

async function seed() {
  console.log('Seeding menu terms...');
  const { error: deleteError } = await supabase.from('menu_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.error('Failed to clear menu:', deleteError);
  }
  const { error, data } = await supabase.from('menu_items').insert(menuItems);
  if (error) {
    console.error('Error seeding menu items:', error);
  } else {
    console.log('Menu items seeded successfully!');
  }
}

seed();
