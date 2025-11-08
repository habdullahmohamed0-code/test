'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Loader2, User, Mail, Lock, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validate password confirmation
    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      // Register user with Supabase Auth for email verification
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName
          }
        }
      })

      if (authError) {
        setError(authError.message)
        setIsLoading(false)
        return
      }

      // Insert into users table
      if (authData.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: authData.user.id,
            email: email,
            full_name: fullName,
            role: 'user',
            points: 0
          }])

        if (insertError && insertError.code !== '23505') { // Ignore duplicate key error
          console.error('Error inserting user:', insertError)
        }
      }

      setSuccess('Registration successful! Please check your email to verify your account.')
      
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setError('An unexpected error occurred')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white shadow-2xl border-2 border-green-200">
          <CardHeader className="space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto shadow-glow-blue"
            >
              <span className="text-2xl">🌱</span>
            </motion.div>
            <CardTitle className="text-3xl font-bold text-center text-gray-900 font-[family-name:var(--font-poppins)]">
              Join RecyCool
            </CardTitle>
            <CardDescription className="text-center text-base">
              Create your account and start making a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                    className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm" className="text-gray-700 font-medium">Confirm Password</Label>
                <div className="relative">
                  <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="••••••••"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                    className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-green-400"
                  />
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-green-600">•</span> Minimum 6 characters
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl text-sm"
                >
                  {success}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-12 gradient-secondary text-white hover:opacity-90 shadow-glow-blue text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
                  Sign in here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          By signing up, you agree to RecyCool's Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  )
}
