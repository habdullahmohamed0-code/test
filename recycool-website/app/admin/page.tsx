'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import {
  Users,
  Package,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Power,
  Terminal,
  BarChart3,
} from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('stats')
  const [isLoading, setIsLoading] = useState(true)

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    pendingRedemptions: 0,
    totalBottles: 0,
    totalTraffic: 0,
  })

  // Users
  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [pointsToAdd, setPointsToAdd] = useState('')

  // Products
  const [products, setProducts] = useState<any[]>([])

  // Redemptions
  const [redemptions, setRedemptions] = useState<any[]>([])

  // RVM Status
  const [rvmStatus, setRvmStatus] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    if (user.role !== 'admin') {
      router.push('/')
      return
    }

    fetchAllData()
  }, [user])

  const fetchAllData = async () => {
    await Promise.all([
      fetchStats(),
      fetchUsers(),
      fetchProducts(),
      fetchRedemptions(),
      fetchRVMStatus(),
    ])
    setIsLoading(false)
  }

  const fetchStats = async () => {
    const [usersData, productsData, redemptionsData, rvmData, trafficData] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('redemptions').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('rvm_status').select('total_bottles_collected').single(),
      supabase.from('website_traffic').select('id', { count: 'exact', head: true }),
    ])

    setStats({
      totalUsers: usersData.count || 0,
      totalProducts: productsData.count || 0,
      pendingRedemptions: redemptionsData.count || 0,
      totalBottles: rvmData.data?.total_bottles_collected || 0,
      totalTraffic: trafficData.count || 0,
    })
  }

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setUsers(data)
  }

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setProducts(data)
  }

  const fetchRedemptions = async () => {
    const { data } = await supabase
      .from('redemptions')
      .select(`
        *,
        users (full_name, email)
      `)
      .order('created_at', { ascending: false })

    if (data) setRedemptions(data)
  }

  const fetchRVMStatus = async () => {
    const { data } = await supabase
      .from('rvm_status')
      .select('*')
      .single()

    if (data) setRvmStatus(data)
  }

  const handleUpdatePoints = async (userId: string, pointsChange: number) => {
    const targetUser = users.find((u) => u.id === userId)
    if (!targetUser) return

    const newPoints = Math.max(0, targetUser.points + pointsChange)

    const { error } = await supabase
      .from('users')
      .update({ points: newPoints })
      .eq('id', userId)

    if (!error) {
      alert(`Points updated successfully! New points: ${newPoints}`)
      fetchUsers()
    }
  }

  const handleConfirmRedemption = async (redemptionId: string, status: 'confirmed' | 'cancelled') => {
    const { error } = await supabase
      .from('redemptions')
      .update({
        status,
        confirmed_at: new Date().toISOString(),
        confirmed_by: user?.id,
      })
      .eq('id', redemptionId)

    if (!error) {
      alert(`Redemption ${status}!`)
      fetchRedemptions()
    }
  }

  const handleUpdateProductStock = async (productId: string, newStock: number) => {
    const { error } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', productId)

    if (!error) {
      alert('Stock updated!')
      fetchProducts()
    }
  }

  const handleToggleRVM = async () => {
    if (!rvmStatus) return

    const newStatus = !rvmStatus.is_online

    const { error } = await supabase
      .from('rvm_status')
      .update({
        is_online: newStatus,
        [newStatus ? 'last_online' : 'last_offline']: new Date().toISOString(),
      })
      .eq('id', rvmStatus.id)

    if (!error) {
      alert(`RVM is now ${newStatus ? 'ONLINE' : 'OFFLINE'}`)
      fetchRVMStatus()
    }
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Kelola website RecyCool</p>
        </motion.div>

        {/* Stats Overview */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
                      <Users className="w-8 h-8 text-primary/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Total Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-bold text-secondary">{stats.totalProducts}</p>
                      <Package className="w-8 h-8 text-secondary/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Pending Redemptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-bold text-yellow-600">{stats.pendingRedemptions}</p>
                      <Activity className="w-8 h-8 text-yellow-600/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Bottles Collected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-bold text-green-600">{stats.totalBottles}</p>
                      <TrendingUp className="w-8 h-8 text-green-600/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600">Website Traffic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-bold text-purple-600">{stats.totalTraffic}</p>
                      <BarChart3 className="w-8 h-8 text-purple-600/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {['stats', 'users', 'products', 'redemptions', 'rvm'].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? 'default' : 'outline'}
                className={activeTab === tab ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>

          {/* Users Management */}
          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Manage Users</CardTitle>
                <CardDescription>View and update user points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{u.full_name}</p>
                        <p className="text-sm text-gray-600">{u.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Role: {u.role} | Points: {u.points}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            const points = prompt('Enter points to add (negative to subtract):')
                            if (points) handleUpdatePoints(u.id, parseInt(points))
                          }}
                          className="bg-primary"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Update Points
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Management */}
          {activeTab === 'products' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Manage Products</CardTitle>
                <CardDescription>Update product stock and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>Points: {product.points_required}</span>
                          <span>Stock: {product.stock}</span>
                          <span>Active: {product.is_active ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            const stock = prompt('Enter new stock:')
                            if (stock) handleUpdateProductStock(product.id, parseInt(stock))
                          }}
                          className="bg-secondary"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Update Stock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Redemptions Management */}
          {activeTab === 'redemptions' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Redemption Confirmations</CardTitle>
                <CardDescription>Confirm or cancel redemption requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {redemptions.map((redemption) => (
                    <div
                      key={redemption.id}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{redemption.product_name}</p>
                          <p className="text-sm text-gray-600">
                            User: {redemption.users?.full_name} ({redemption.users?.email})
                          </p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span>Points: {redemption.points_spent}</span>
                            <span>Ticket: {redemption.ticket_code}</span>
                            <span>Status: {redemption.status}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(redemption.created_at).toLocaleString('id-ID')}
                          </p>
                        </div>
                        {redemption.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleConfirmRedemption(redemption.id, 'confirmed')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleConfirmRedemption(redemption.id, 'cancelled')}
                              variant="destructive"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* RVM Control */}
          {activeTab === 'rvm' && rvmStatus && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Waste2Pay RVM Control</CardTitle>
                <CardDescription>Monitor and control the vending machine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">RVM Status</h3>
                      <div className={`w-4 h-4 rounded-full ${rvmStatus.is_online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    </div>
                    <p className="text-3xl font-bold text-primary mb-2">
                      {rvmStatus.is_online ? 'ONLINE' : 'OFFLINE'}
                    </p>
                    <Button
                      onClick={handleToggleRVM}
                      className={`w-full mt-4 ${rvmStatus.is_online ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      <Power className="w-4 h-4 mr-2" />
                      Turn {rvmStatus.is_online ? 'OFF' : 'ON'}
                    </Button>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-4">Statistics</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Total Bottles</p>
                        <p className="text-2xl font-bold text-secondary">{rvmStatus.total_bottles_collected}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-secondary">{rvmStatus.total_users}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Online Hours</p>
                        <p className="text-2xl font-bold text-secondary">{rvmStatus.online_hours.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {rvmStatus.ssh_url && (
                  <div className="p-6 bg-gray-900 text-green-400 rounded-lg font-mono">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-5 h-5" />
                      <span className="font-semibold">SSH Access</span>
                    </div>
                    <p className="text-sm">{rvmStatus.ssh_url}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
