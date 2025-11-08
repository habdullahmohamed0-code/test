'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Recycle, Users, TrendingUp, Sparkles, Package, ShoppingBag, Key } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [rvmData, setRvmData] = useState({
    totalBottles: 0,
    onlineHours: 0,
    totalUsers: 0,
    isOnline: false,
  })

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetchRVMData()
    fetchProducts()
  }, [])

  const fetchRVMData = async () => {
    const { data, error } = await supabase
      .from('rvm_status')
      .select('*')
      .single()

    if (data) {
      setRvmData({
        totalBottles: data.total_bottles_collected,
        onlineHours: data.online_hours,
        totalUsers: data.total_users,
        isOnline: data.is_online,
      })
    }
  }

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .limit(3)

    if (data) {
      setProducts(data)
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Main Screen */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-white to-secondary/20">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Floating Team Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="backdrop-blur-lg bg-white/90 shadow-2xl border-2 border-primary/20">
                <CardHeader>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6"
                  >
                    <Recycle className="w-12 h-12 text-white" />
                  </motion.div>
                  <CardTitle className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    RecyCool
                  </CardTitle>
                  <CardDescription className="text-xl text-gray-700 mt-4">
                    Gerakan Keberlanjutan untuk Indonesia yang Lebih Hijau
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    RecyCool adalah gerakan keberlanjutan yang dipimpin siswa di SMA Pradita Dirgantara,
                    memberdayakan <span className="font-bold text-primary">400+ anggota komunitas</span> untuk
                    mengatasi krisis plastik Indonesia melalui inovasi waste management dan circular economy solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/products">
                      <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Lihat Produk
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button size="lg" variant="outline">
                        Tentang Kami
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Problem Background Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
              Krisis Plastik di Indonesia
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-red-600">64 Juta Ton</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Indonesia menghasilkan sekitar <span className="font-semibold">64 juta ton sampah plastik</span> setiap tahun
                      (Badan Pusat Statistik)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-orange-600">40%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      <span className="font-semibold">40% dari total plastik</span> yang diproduksi di Indonesia
                      digunakan untuk kemasan sekali pakai yang langsung dibuang
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-yellow-600">9%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Rendahnya tingkat daur ulang, hanya sekitar <span className="font-semibold">9% plastik global</span> yang
                      benar-benar didaur ulang (UNEP, 2022)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Solusi Kami
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Inovasi untuk mengatasi krisis plastik
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white border-2 border-primary/30 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Waste2Pay RVM</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Membuat prototype Reverse Vending Machine yang dapat menukar botol plastik dengan poin rewards
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white border-2 border-secondary/30 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                      <Recycle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Recycling Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Mendaur ulang sampah plastik menjadi produk yang lebih berguna dan bernilai ekonomi
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white border-2 border-accent/30 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Community Movement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Mengajak teman-teman untuk mengurangi penggunaan botol plastik sekali pakai
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waste2Pay RVM Data Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Waste2Pay Statistics
              </h2>
              <p className="text-gray-600 text-lg">Real-time data dari vending machine kami</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
                <div className={`w-3 h-3 rounded-full ${rvmData.isOnline ? 'bg-primary animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm font-semibold">{rvmData.isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-6xl font-bold text-primary">
                      {rvmData.totalBottles.toLocaleString()}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700">
                      Botol Terkumpul
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30">
                  <CardHeader>
                    <CardTitle className="text-6xl font-bold text-secondary">
                      {rvmData.onlineHours.toFixed(0)}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700">
                      Jam Online
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-6xl font-bold text-accent">
                      {rvmData.totalUsers.toLocaleString()}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700">
                      Pengguna Aktif
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Produk Kami
              </h2>
              <p className="text-gray-600 text-lg">
                Merchandise dari plastik daur ulang
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full bg-white hover:shadow-2xl transition-all">
                    <CardHeader>
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                        {product.category === 'Accessories' && <Key className="w-20 h-20 text-primary" />}
                        {product.category === 'Bags' && <ShoppingBag className="w-20 h-20 text-secondary" />}
                        {product.category === 'Home Decor' && <Sparkles className="w-20 h-20 text-accent" />}
                      </div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Points Required</p>
                          <p className="text-2xl font-bold text-primary">{product.points_required}</p>
                        </div>
                        {product.bottles_needed && (
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Botol Dibutuhkan</p>
                            <p className="text-xl font-semibold text-secondary">{product.bottles_needed}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Lihat Semua Produk
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Movement
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Jadilah bagian dari perubahan! Bergabunglah dengan 400+ member RecyCool
              dan bantu selamatkan lingkungan dari krisis plastik.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
