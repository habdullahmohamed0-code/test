'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('recycool_cookie_consent')
    if (!consent) {
      // Show banner after 1 second
      setTimeout(() => setShow(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('recycool_cookie_consent', 'accepted')
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('recycool_cookie_consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to analyze website traffic and optimize your experience. 
                    By accepting, you agree to our use of cookies for analytics purposes. 
                    Your data helps us improve RecyCool for everyone.
                  </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="flex-1 md:flex-none border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={handleAccept}
                    className="flex-1 md:flex-none gradient-primary text-white hover:opacity-90"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
