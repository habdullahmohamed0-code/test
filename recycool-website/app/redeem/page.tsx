'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Key, ShoppingBag, Sparkles, Package, Ticket, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function RedeemPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [products, setProducts] = useState<any[]>([])
  const [redemptions, setRedemptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isRedeeming, setIsRedeeming] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchProducts()
    fetchRedemptions()
  }, [user])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .gt('stock', 0)
      .order('points_required', { ascending: true })

    if (data) setProducts(data)
    setIsLoading(false)
  }

  const fetchRedemptions = async () => {
    if (!user) return

    const { data } = await supabase
      .from('redemptions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) setRedemptions(data)
  }

  const handleRedeem = async (product: any) => {
    if (!user || isRedeeming) return

    if (user.points < product.points_required) {
      alert('Insufficient points!')
      return
    }

    if (product.stock < 1) {
      alert('Out of stock!')
      return
    }

    setIsRedeeming(true)
    setSelectedProduct(product)

    try {
      // Generate ticket code
      const ticketCode = `RCY-${Date.now().toString(36).toUpperCase()}`

      // Create redemption
      const { data: redemption, error: redemptionError } = await supabase
        .from('redemptions')
        .insert([
          {
            user_id: user.id,
            product_id: product.id,
            product_name: product.name,
            points_spent: product.points_required,
            status: 'pending',
            ticket_code: ticketCode,
          },
        ])
        .select()
        .single()

      if (redemptionError) throw redemptionError

      // Update user points
      const newPoints = user.points - product.points_required
      const { error: userError } = await supabase
        .from('users')
        .update({ points: newPoints })
        .eq('id', user.id)

      if (userError) throw userError

      // Update product stock
      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: product.stock - 1 })
        .eq('id', product.id)

      if (stockError) throw stockError

      // Update local user state
      const updatedUser = { ...user, points: newPoints }
      localStorage.setItem('recycool_user', JSON.stringify(updatedUser))
      window.location.reload()

      alert(`Successfully redeemed ${product.name}!\nTicket Code: ${ticketCode}`)
    } catch (error) {
      console.error('Redeem error:', error)
      alert('An error occurred during redemption. Please try again.')
    } finally {
      setIsRedeeming(false)
      setSelectedProduct(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" />
            Confirmed
          </span>
        )
      case 'completed':
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        )
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        )
    }
  }

  const getIcon = (category: string) => {
    switch (category) {
      case 'Accessories':
        return <Key className="w-12 h-12 text-primary" />
      case 'Bags':
        return <ShoppingBag className="w-12 h-12 text-secondary" />
      case 'Home Decor':
        return <Sparkles className="w-12 h-12 text-accent" />
      default:
        return <Package className="w-12 h-12 text-primary" />
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-white">
            <CardHeader>
              <CardTitle className="text-4xl">Redeem Points</CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Exchange your points for awesome merchandise!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Your current points:</p>
                  <p className="text-5xl font-bold">{user.points}</p>
                </div>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Package className="w-12 h-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Products */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Available Products</h2>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No products available for redemption yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all">
                    <CardHeader>
                      <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                        {getIcon(product.category)}
                      </div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Points</p>
                          <p className="text-2xl font-bold text-primary">{product.points_required}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Stock</p>
                          <p className="text-xl font-semibold">{product.stock}</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleRedeem(product)}
                        disabled={user.points < product.points_required || product.stock < 1 || isRedeeming}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      >
                        {isRedeeming && selectedProduct?.id === product.id ? (
                          'Processing...'
                        ) : user.points < product.points_required ? (
                          'Insufficient Points'
                        ) : product.stock < 1 ? (
                          'Out of Stock'
                        ) : (
                          'Redeem Sekarang'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Redemption History */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Redemption History</h2>
          {redemptions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No redemption history yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {redemptions.map((redemption, index) => (
                <motion.div
                  key={redemption.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Ticket className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                {redemption.product_name}
                              </h3>
                              <p className="text-sm text-gray-500 mb-2">
                                {new Date(redemption.created_at).toLocaleDateString('id-ID', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                              <div className="flex items-center gap-4">
                                <div className="bg-primary/10 px-4 py-2 rounded-lg">
                                  <p className="text-xs text-gray-600">Points Used</p>
                                  <p className="text-lg font-bold text-primary">{redemption.points_spent}</p>
                                </div>
                                <div className="bg-secondary/10 px-4 py-2 rounded-lg">
                                  <p className="text-xs text-gray-600">Ticket Code</p>
                                  <p className="text-sm font-mono font-bold text-secondary">
                                    {redemption.ticket_code}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {getStatusBadge(redemption.status)}
                        </div>
                      </div>
                      {redemption.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Catatan:</span> {redemption.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
