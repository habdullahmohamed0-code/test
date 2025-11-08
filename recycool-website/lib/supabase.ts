import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  users: {
    id: string
    email: string
    full_name: string
    password_hash: string
    role: 'user' | 'admin'
    points: number
    created_at: string
    updated_at: string
    last_bottle_submit: string | null
  }
  products: {
    id: string
    name: string
    description: string | null
    image_url: string | null
    points_required: number
    stock: number
    bottles_needed: number | null
    category: string | null
    is_active: boolean
    created_at: string
    updated_at: string
  }
  redemptions: {
    id: string
    user_id: string
    product_id: string | null
    product_name: string
    points_spent: number
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    ticket_code: string
    notes: string | null
    created_at: string
    updated_at: string
    confirmed_at: string | null
    confirmed_by: string | null
  }
  rvm_data: {
    id: string
    user_id: string | null
    bottles_submitted: number
    points_earned: number
    submission_date: string
  }
  rvm_status: {
    id: string
    is_online: boolean
    total_bottles_collected: number
    total_users: number
    online_hours: number
    last_online: string | null
    last_offline: string | null
    ssh_url: string | null
    updated_at: string
  }
}
