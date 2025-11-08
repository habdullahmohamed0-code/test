import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  full_name: string
  role: 'user' | 'admin'
  points: number
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export async function registerUser(
  email: string,
  password: string,
  fullName: string
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar' }
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Insert new user
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          full_name: fullName,
          role: 'user',
          points: 0,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return {
      success: true,
      message: 'Registrasi berhasil',
      user: {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        points: data.points,
      },
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, message: 'Terjadi kesalahan saat registrasi' }
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // Get user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return { success: false, message: 'Email atau password salah' }
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
      return { success: false, message: 'Email atau password salah' }
    }

    return {
      success: true,
      message: 'Login berhasil',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        points: user.points,
      },
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Terjadi kesalahan saat login' }
  }
}
