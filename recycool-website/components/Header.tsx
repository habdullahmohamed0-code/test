'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { User, LogOut, Coins } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">RC</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RecyCool
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Produk
            </Link>
            {user && (
              <Link
                href="/redeem"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Redeem
              </Link>
            )}
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Tentang Kami
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Points */}
                <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full">
                  <Coins className="w-5 h-5 text-primary" />
                  <span className="font-bold text-gray-800">{user.points}</span>
                </div>

                {/* Avatar Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-gradient-to-br from-primary to-secondary p-2 rounded-full hover:scale-105 transition-transform">
                    <User className="w-5 h-5 text-white" />
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-800">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {user.role === 'admin' ? 'Administrator' : 'Member'}
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 p-4 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
