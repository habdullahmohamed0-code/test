'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Recycle, Users, TrendingUp, Sparkles, Package, ShoppingBag, Key, Play } from 'lucide-react'
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
    const { data } = await supabase
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
    const { data } = await supabase
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
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        {/* Animated Background - Optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-4"
                >
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    🌍 Student-Led Sustainability Movement
                  </span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-gray-900 font-[family-name:var(--font-poppins)]">
                  Welcome to{' '}
                  <span className="text-green-600">RecyCool</span>
                </h1>
                
                <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  A student-led sustainability project at SMA Pradita Dirgantara, empowering <span className="font-bold text-green-600">400+ community members</span> (300 students + 100 staff) to combat Indonesia's plastic crisis through our innovative Waste2Pay vending machine and circular economy solutions.
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
                  <Link href="/products">
                    <Button size="lg" className="gradient-primary text-white hover:opacity-90 shadow-glow-green group">
                      Explore Products
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-green-600">400+</p>
                    <p className="text-xs md:text-sm text-gray-700 font-medium">Members</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">{rvmData.totalBottles}</p>
                    <p className="text-xs md:text-sm text-gray-700 font-medium">Bottles</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-teal-600">{rvmData.totalUsers}</p>
                    <p className="text-xs md:text-sm text-gray-700 font-medium">Users</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Image/Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {/* RecyCool Team Photo */}
                  <Image
                    src="/recycool-logo.jpeg"
                    alt="RecyCool Team"
                    width={600}
                    height={700}
                    className="w-full h-auto object-contain bg-white p-8 rounded-2xl"
                  />
                  
                  {/* Floating Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl"
                  >
                    <p className="text-sm font-semibold text-gray-700 mb-2">Our Mission</p>
                    <p className="text-gray-600 text-sm">
                      Be Cool, and Keep the Earth Cool - Creating sustainable consumption and production patterns through our Waste2Pay reverse vending machine.
                    </p>
                  </motion.div>
                </div>

                {/* Decorative Elements - Static for performance */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Simplified animation */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Problem Background Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-[family-name:var(--font-poppins)]">
                The Plastic Crisis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the magnitude of Indonesia's plastic pollution problem
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full glass border-2 border-red-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-3xl">📊</span>
                    </div>
                    <CardTitle className="text-4xl font-bold text-red-600 mb-2">64M</CardTitle>
                    <CardDescription className="text-base font-semibold text-gray-700">
                      Tons of Plastic Waste Annually
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      According to the Indonesian Plastics Industry Association (Inaplas) and BPS (Statistics Indonesia), Indonesia generates approximately 64 million tons of plastic waste every year.
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
                <Card className="h-full glass border-2 border-orange-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-3xl">📦</span>
                    </div>
                    <CardTitle className="text-4xl font-bold text-orange-600 mb-2">40%</CardTitle>
                    <CardDescription className="text-base font-semibold text-gray-700">
                      Single-Use Packaging
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      According to the Ministry of Environment and Forestry (KLHK, 2023), 40% of total plastic is used for single-use packaging like beverage bottles, plastic bags, straws, and sachets that are immediately discarded after use.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full glass border-2 border-yellow-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-3xl">♻️</span>
                    </div>
                    <CardTitle className="text-4xl font-bold text-yellow-600 mb-2">9%</CardTitle>
                    <CardDescription className="text-base font-semibold text-gray-700">
                      Global Recycling Rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Low recycling rates are a major challenge. Only about 9% of global plastic is actually recycled (UNEP, 2022).
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-[family-name:var(--font-poppins)]">
                Our Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Innovative approaches to tackle the plastic crisis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full glass border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Package className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Waste2Pay RVM</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">
                      Our innovative Reverse Vending Machine equipped with camera sensors, servo motors, ultrasonic sensors, and touchscreen monitor. Users donate plastic bottles and receive digital points automatically recorded on the RecyCool website.
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
                <Card className="h-full glass border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-20 h-20 gradient-secondary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Recycle className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Recycling Innovation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">
                      In partnership with Paste Lab, we transform collected plastic bottles into functional products like 3D printer filaments, coasters, chairs, and creative crafts, implementing a true circular economy model.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full glass border-2 border-teal-200 hover:border-teal-400 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Community Movement</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">
                      Through educational campaigns, awareness sessions, social media campaigns, posters, and interactive games, we build an environmentally conscious culture at our school and beyond.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waste2Pay RVM Data Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-[family-name:var(--font-poppins)]">
                Waste2Pay Statistics
              </h2>
              <p className="text-xl text-gray-600 mb-6">Real-time data from our vending machine</p>
              <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
                <div className={`w-3 h-3 rounded-full ${rvmData.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="font-semibold">{rvmData.isOnline ? 'System Online' : 'System Offline'}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center glass border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="text-6xl mb-2">🍾</div>
                    <CardTitle className="text-5xl font-bold text-green-600">
                      {rvmData.totalBottles.toLocaleString()}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700 mt-2">
                      Bottles Collected
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center glass border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="text-6xl mb-2">⏰</div>
                    <CardTitle className="text-5xl font-bold text-blue-600">
                      {rvmData.onlineHours.toFixed(0)}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700 mt-2">
                      Hours Online
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center glass border-2 border-teal-200 hover:border-teal-400 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="text-6xl mb-2">👥</div>
                    <CardTitle className="text-5xl font-bold text-teal-600">
                      {rvmData.totalUsers.toLocaleString()}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700 mt-2">
                      Active Users
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-[family-name:var(--font-poppins)]">
                Check Our Products
              </h2>
              <p className="text-xl text-gray-600">
                Eco-friendly merchandise made from recycled plastic
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
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <Card className="h-full glass hover:shadow-2xl transition-all overflow-hidden group">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-56 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                        {/* Product Image */}
                        <Image
                          src="/recycool-logo.jpeg"
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-contain p-6 bg-white group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Points Required</p>
                          <p className="text-3xl font-bold text-primary">{product.points_required}</p>
                        </div>
                        {product.bottles_needed && (
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Made from</p>
                            <p className="text-xl font-semibold text-secondary">{product.bottles_needed} bottles</p>
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button size="lg" className="gradient-primary text-white hover:opacity-90 shadow-glow-green group">
                  View All Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-24 gradient-primary text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              Join Our Movement
            </h2>
            <p className="text-xl mb-10 opacity-95 leading-relaxed">
              Be part of the change! Join 400+ RecyCool members at SMA Pradita Dirgantara and help save the environment from plastic pollution. Supporting SDG 12: Responsible Consumption and Production. Together, we can make Indonesia greener and contribute to Indonesia's Zero Waste 2025 target.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-xl">
                  Sign Up Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Decorative stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <p className="text-4xl font-bold mb-2">♻️</p>
                <p className="text-lg opacity-90">Sustainable</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">🌱</p>
                <p className="text-lg opacity-90">Eco-Friendly</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">🤝</p>
                <p className="text-lg opacity-90">Community</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
