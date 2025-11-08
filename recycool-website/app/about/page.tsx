'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Recycle, Package, TrendingUp, Heart } from 'lucide-react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Ahmad Rizki',
      role: 'Project Lead & Hardware Engineer',
      description: 'Memimpin pengembangan Waste2Pay RVM dan koordinasi tim',
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Software Developer',
      description: 'Mengembangkan website dan sistem manajemen database',
    },
    {
      name: 'Budi Santoso',
      role: '3D Printing Specialist',
      description: 'Mengelola produksi merchandise dengan 3D printing',
    },
    {
      name: 'Dewi Lestari',
      role: 'Community Manager',
      description: 'Mengkoordinir gerakan dan engagement dengan komunitas',
    },
    {
      name: 'Farhan Hidayat',
      role: 'Design & Marketing',
      description: 'Membuat konten visual dan strategi marketing',
    },
    {
      name: 'Rina Wijaya',
      role: 'Research & Documentation',
      description: 'Riset dampak lingkungan dan dokumentasi project',
    },
  ]

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
              Tentang RecyCool
            </h1>
            <p className="text-xl opacity-90">
              Gerakan siswa untuk Indonesia yang lebih hijau dan berkelanjutan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl">Visi Kami</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Menjadi pelopor gerakan keberlanjutan di Indonesia yang memberdayakan generasi muda
                      untuk menciptakan solusi inovatif dalam mengatasi krisis plastik dan membangun
                      ekonomi sirkular yang berkelanjutan.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl">Misi Kami</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary font-bold mt-1">•</span>
                        <span>Mengurangi sampah plastik melalui teknologi Waste2Pay RVM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary font-bold mt-1">•</span>
                        <span>Mendaur ulang plastik menjadi produk bernilai</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary font-bold mt-1">•</span>
                        <span>Memberdayakan komunitas sekolah untuk peduli lingkungan</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Background */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
              Latar Belakang Masalah
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full bg-white border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-red-600 mb-2">
                      64 Juta Ton
                    </CardTitle>
                    <CardDescription className="text-base">
                      Sampah plastik per tahun di Indonesia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Menurut Badan Pusat Statistik (BPS), Indonesia menghasilkan sekitar 64 juta ton
                      sampah plastik setiap tahun, menjadikan kita salah satu penyumbang sampah plastik
                      terbesar di dunia.
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
                <Card className="h-full bg-white border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-orange-600 mb-2">
                      40%
                    </CardTitle>
                    <CardDescription className="text-base">
                      Plastik untuk kemasan sekali pakai
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      40% dari total plastik yang diproduksi di Indonesia digunakan untuk kemasan sekali
                      pakai yang langsung dibuang setelah digunakan, menciptakan timbunan sampah yang masif.
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
                <Card className="h-full bg-white border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-yellow-600 mb-2">
                      9%
                    </CardTitle>
                    <CardDescription className="text-base">
                      Tingkat daur ulang global
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Rendahnya tingkat daur ulang menjadi tantangan besar. Menurut UNEP (2022), hanya
                      sekitar 9% plastik global yang benar-benar didaur ulang.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Apa yang Kami Lakukan
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Solusi inovatif untuk mengatasi krisis plastik
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full border-2 border-primary/30 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Waste2Pay RVM</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Membuat prototype <span className="font-semibold">Reverse Vending Machine</span> yang
                      memudahkan masyarakat untuk menukar botol plastik dengan poin rewards yang dapat ditukar
                      dengan merchandise.
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
                <Card className="h-full border-2 border-secondary/30 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                      <Recycle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Recycling Plastik</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Mendaur ulang sampah plastik menjadi produk yang lebih berguna dan bernilai ekonomi
                      menggunakan teknologi <span className="font-semibold">3D printing</span> dengan filament
                      dari plastik daur ulang.
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
                <Card className="h-full border-2 border-accent/30 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Edukasi Komunitas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Mengajak teman-teman untuk <span className="font-semibold">tidak menggunakan botol plastik
                      sekali pakai</span> dan meningkatkan kesadaran tentang pentingnya pengelolaan sampah yang
                      bertanggung jawab.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Tim Kami
              </h2>
              <p className="text-gray-600 text-lg">
                Siswa-siswi SMA Pradita Dirgantara yang berdedikasi untuk lingkungan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white hover:shadow-xl transition-all">
                    <CardHeader>
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-xl text-center">{member.name}</CardTitle>
                      <CardDescription className="text-center font-semibold text-primary">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              Pencapaian Kami
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">400+</p>
                <p className="text-xl opacity-90">Anggota Komunitas</p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">1</p>
                <p className="text-xl opacity-90">Prototype RVM</p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">100%</p>
                <p className="text-xl opacity-90">Dedikasi untuk Lingkungan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
