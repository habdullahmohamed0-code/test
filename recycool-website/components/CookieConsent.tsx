'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-4 right-4 md:left-8 md:right-8 z-50 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-green-600" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We use cookies 🍪
                </h3>
                <p className="text-gray-600 text-sm">
                  We use cookies to improve your experience on our site and to analyze website traffic. 
                  By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
              </div>

              <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="flex-1 md:flex-none border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none gradient-primary text-white hover:opacity-90 shadow-glow-green"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
