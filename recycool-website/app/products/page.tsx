'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { Key, ShoppingBag, Sparkles, Package, Printer } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('points_required', { ascending: true })

    if (data) {
      setProducts(data)
    }
    setIsLoading(false)
  }

  const getIcon = (category: string) => {
    switch (category) {
      case 'Accessories':
        return <Key className="w-16 h-16 text-primary" />
      case 'Bags':
        return <ShoppingBag className="w-16 h-16 text-secondary" />
      case 'Home Decor':
        return <Sparkles className="w-16 h-16 text-accent" />
      default:
        return <Package className="w-16 h-16 text-primary" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-24 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Package className="w-10 h-10" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              Product Catalog
            </h1>
            <p className="text-xl opacity-95 leading-relaxed">
              Quality merchandise made from recycled plastic. Every purchase helps reduce plastic waste!
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Printing Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white border-2 border-green-300 hover:border-green-500 hover:shadow-2xl transition-all overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-8">
                  <div className="w-32 h-32 gradient-primary rounded-2xl flex items-center justify-center shadow-glow-green">
                    <Printer className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <CardHeader>
                    <CardTitle className="text-3xl">3D Printing Innovation</CardTitle>
                    <CardDescription className="text-lg">
                      Technology for a sustainable future
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We use <span className="font-bold text-primary">3D printing systems</span> with filament
                      made from <span className="font-bold text-secondary">recycled plastic bottles</span>.
                      Each product is manufactured with high precision and is environmentally friendly.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No products available yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full bg-white hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-green-400 overflow-hidden group">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                        {/* Product Image */}
                        <Image
                          src="/recycool-logo.jpeg"
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-contain p-8 bg-white group-hover:scale-110 transition-transform duration-300"
                        />
                        {product.stock > 0 ? (
                          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                            In Stock
                          </span>
                        ) : (
                          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                        <CardDescription className="text-base">{product.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Points Required</p>
                            <p className="text-3xl font-bold text-primary">{product.points_required}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Stock</p>
                            <p className="text-2xl font-semibold text-gray-800">{product.stock}</p>
                          </div>
                        </div>

                        {product.bottles_needed && (
                          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                                  <Package className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Made from</p>
                                  <p className="text-2xl font-bold text-secondary">
                                    {product.bottles_needed} bottles
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 text-center">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              Get These Products!
            </h2>
            <p className="text-xl opacity-95 mb-8 leading-relaxed">
              Collect points by depositing plastic bottles in our Waste2Pay RVM,
              then exchange them for cool merchandise!
            </p>
            <div className="bg-white border-2 border-blue-200 p-8 rounded-2xl inline-block shadow-lg">
              <p className="text-sm mb-3 text-gray-600 font-medium">How to earn points:</p>
              <p className="text-4xl font-bold text-gray-900">1 Bottle = <span className="text-green-600">10 Points</span></p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
