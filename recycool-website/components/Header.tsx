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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-xl border-b-2 border-green-300' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className={`container mx-auto px-4 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-glow-green transition-transform group-hover:scale-110">
              <Image
                src="/recycool-logo.jpeg"
                alt="RecyCool Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <span className={`text-2xl font-bold font-[family-name:var(--font-poppins)] transition-colors duration-300 ${
              isScrolled ? 'text-green-600' : 'text-white drop-shadow-lg'
            }`}>
              RecyCool
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className={`transition-colors font-medium relative group ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                isScrolled ? 'bg-green-600' : 'bg-white'
              }`}></span>
            </Link>
            <Link
              href="/products"
              className={`transition-colors font-medium relative group ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Products
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                isScrolled ? 'bg-green-600' : 'bg-white'
              }`}></span>
            </Link>
            {user && (
              <Link
                href="/redeem"
                className={`transition-colors font-medium relative group ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                Redeem
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                  isScrolled ? 'bg-green-600' : 'bg-white'
                }`}></span>
              </Link>
            )}
            <Link
              href="/about"
              className={`transition-colors font-medium relative group ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              About Us
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                isScrolled ? 'bg-green-600' : 'bg-white'
              }`}></span>
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className={`transition-colors font-medium relative group ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                Admin
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                  isScrolled ? 'bg-green-600' : 'bg-white'
                }`}></span>
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Points */}
                <div className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full shadow-sm transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-white/20 backdrop-blur-sm border border-white/30'
                }`}>
                  <Coins className={`w-4 md:w-5 h-4 md:h-5 transition-colors ${isScrolled ? 'text-green-600' : 'text-white'}`} />
                  <span className={`font-bold text-sm md:text-base transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{user.points}</span>
                  <span className={`text-xs hidden sm:inline transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}>pts</span>
                </div>

                {/* Avatar Dropdown */}
                <div className="relative group">
                  <button className={`flex items-center gap-2 p-2.5 rounded-full hover:scale-105 transition-all shadow-sm ${
                    isScrolled 
                      ? 'bg-white border border-gray-200' 
                      : 'bg-white/20 backdrop-blur-sm border border-white/30'
                  }`}>
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
                      className="w-full p-4 text-left hover:bg-red-50 text-red-600 font-medium transition-colors flex items-center gap-2 rounded-b-xl"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button className={`transition-all ${
                    isScrolled 
                      ? 'gradient-primary text-white hover:opacity-90 shadow-glow-green'
                      : 'bg-white text-green-600 hover:bg-white/90'
                  }`}>
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className={`border-2 transition-all ${
                    isScrolled
                      ? 'border-green-600 text-green-600 hover:bg-green-50 bg-transparent'
                      : 'border-white text-white hover:bg-white/10 bg-transparent'
                  }`}>
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
