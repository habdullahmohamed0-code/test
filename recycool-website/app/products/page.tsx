'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
    const { data, error } = await supabase
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Katalog Produk
            </h1>
            <p className="text-xl opacity-90">
              Merchandise berkualitas dari plastik daur ulang. Setiap pembelian membantu mengurangi sampah plastik!
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Printing Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Printer className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-center">Inovasi 3D Printing</CardTitle>
                <CardDescription className="text-center text-lg">
                  Teknologi untuk masa depan berkelanjutan
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 text-lg">
                  Kami menggunakan sistem <span className="font-bold text-primary">3D printing</span> dengan filament
                  yang dibuat dari <span className="font-bold text-secondary">botol plastik daur ulang</span>.
                  Setiap produk diproduksi dengan presisi tinggi dan ramah lingkungan.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">Belum ada produk tersedia</p>
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
                  <Card className="h-full bg-white hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-primary/30">
                    <CardHeader>
                      <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                        {getIcon(product.category)}
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                          <CardDescription className="text-base">{product.description}</CardDescription>
                        </div>
                        {product.stock > 0 ? (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Tersedia
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Habis
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
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
                          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                                  <Package className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Dibuat dari</p>
                                  <p className="text-xl font-bold text-secondary">
                                    {product.bottles_needed} Botol
                                  </p>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 max-w-[100px] text-right">
                                Per 1 item
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="pt-2">
                          <p className="text-xs text-gray-500 text-center italic">
                            Kategori: {product.category}
                          </p>
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
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Dapatkan Produk Ini!
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Kumpulkan poin dengan menyetorkan botol plastik di Waste2Pay RVM kami,
              lalu tukarkan dengan merchandise keren ini!
            </p>
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg inline-block">
              <p className="text-sm mb-2">Cara mendapatkan poin:</p>
              <p className="text-3xl font-bold">1 Botol = 10 Points</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
