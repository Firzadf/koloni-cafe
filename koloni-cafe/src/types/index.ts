export interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  description: string
  image_url: string
}

export type OrderStatus = 'Pending' | 'Cooking' | 'Ready'

export interface Order {
  id: string
  table_id: string
  total_amount: number
  status: OrderStatus
  payment_status: 'Unpaid' | 'Paid'
  created_at?: string
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  price: number
  menu_item?: MenuItem
}
