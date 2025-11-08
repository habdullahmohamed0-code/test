'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4 font-[family-name:var(--font-poppins)]">
              RecyCool
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A student-led sustainability movement at SMA Pradita Dirgantara,
              empowering 400+ community members to combat Indonesia's plastic crisis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/redeem" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Redeem Points
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">recycool@praditadirgantara.sch.id</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  SMA Pradita Dirgantara, Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white shadow-glow-green"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-10 h-10 gradient-secondary rounded-full flex items-center justify-center text-white shadow-glow-blue"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center text-white shadow-soft"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} RecyCool - SMA Pradita Dirgantara. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with ♻️ for a sustainable future
          </p>
        </div>
      </div>
    </footer>
  )
}
