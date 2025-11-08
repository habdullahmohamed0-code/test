'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { motion, useScroll } from 'framer-motion'
import { User, LogOut, Coins } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b-2 border-green-200' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-glow-green transition-transform group-hover:scale-110">
              {/* RecyCool Logo - using image from public folder */}
              <Image
                src="/recycool-logo.jpeg"
                alt="RecyCool Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-green-600 font-[family-name:var(--font-poppins)]">
              RecyCool
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            {user && (
              <Link
                href="/redeem"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group"
              >
                Redeem
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            )}
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group"
              >
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Points */}
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 md:px-4 py-2 rounded-full shadow-sm">
                  <Coins className="w-4 md:w-5 h-4 md:h-5 text-green-600" />
                  <span className="font-bold text-gray-800 text-sm md:text-base">{user.points}</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">pts</span>
                </div>

                {/* Avatar Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-white border border-gray-200 p-2.5 rounded-full hover:scale-105 transition-transform shadow-sm">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border-2 border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-800">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-600 mt-1 inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        {user.role === 'admin' ? 'Administrator' : 'Member'}
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 p-4 text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
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
                  <Button variant="ghost" className="hover:bg-primary/10">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="gradient-primary text-white hover:opacity-90 shadow-glow-green">
                    Sign Up
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
