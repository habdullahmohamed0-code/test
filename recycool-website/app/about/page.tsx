'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Recycle, Package, TrendingUp, Heart } from 'lucide-react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Ahmad Rizki',
      role: 'Project Lead & Hardware Engineer',
      description: 'Leading Waste2Pay RVM development and coordinating the team',
      image: 'https://via.placeholder.com/200x200/22c55e/ffffff?text=AR',
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Software Developer',
      description: 'Developing website and database management systems',
      image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=SN',
    },
    {
      name: 'Budi Santoso',
      role: '3D Printing Specialist',
      description: 'Managing merchandise production with 3D printing technology',
      image: 'https://via.placeholder.com/200x200/14b8a6/ffffff?text=BS',
    },
    {
      name: 'Dewi Lestari',
      role: 'Community Manager',
      description: 'Coordinating movement and community engagement initiatives',
      image: 'https://via.placeholder.com/200x200/22c55e/ffffff?text=DL',
    },
    {
      name: 'Farhan Hidayat',
      role: 'Design & Marketing Lead',
      description: 'Creating visual content and developing marketing strategies',
      image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=FH',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {/* Hero Section */}
      <section className="py-24 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
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
              <Users className="w-10 h-10" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              About RecyCool
            </h1>
            <p className="text-xl opacity-95 leading-relaxed">
              Be Cool, and Keep the Earth Cool
            </p>
            <p className="text-lg opacity-90 mt-3">
              A student-led sustainability project at SMA Pradita Dirgantara
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass border-2 border-primary/30 hover:shadow-glow-green transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      To become a pioneer sustainability movement that demonstrates how technology, innovation, and real action can work together to create cleaner, greener, and more environmentally conscious Indonesia. Through RecyCool, we aim to build a sustainable circular economy system that transforms waste into valuable resources.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass border-2 border-secondary/30 hover:shadow-glow-blue transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-1">✓</span>
                        <span>Support SDG 12: Responsible Consumption and Production through innovative waste management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-1">✓</span>
                        <span>Contribute to Indonesia's Zero Waste 2025 target by reducing waste by 30% and processing 70% of waste into useful products</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-1">✓</span>
                        <span>Build a culture of caring for the environment and increase awareness of waste management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-1">✓</span>
                        <span>Create creative and environmentally friendly solutions for plastic waste through circular economy</span>
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
      <section className="py-24 bg-gradient-to-br from-red-50/50 to-orange-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-[family-name:var(--font-poppins)]">
                Problem Background
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the scale of Indonesia's plastic waste challenge
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass border-2 border-red-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="text-5xl mb-3">📊</div>
                    <CardTitle className="text-4xl font-bold text-red-600 mb-2">
                      64M Tons
                    </CardTitle>
                    <CardDescription className="text-base font-semibold">
                      Annual Plastic Waste
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      According to the Indonesian Plastics Industry Association (Inaplas) and BPS (Statistics Indonesia), 
                      Indonesia generates approximately 64 million tons of plastic waste every year, making us one of the 
                      largest plastic waste contributors globally. This waste pollutes various ecosystems from soil, air, 
                      to water bodies and the living creatures within them.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass border-2 border-orange-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="text-5xl mb-3">📦</div>
                    <CardTitle className="text-4xl font-bold text-orange-600 mb-2">
                      40%
                    </CardTitle>
                    <CardDescription className="text-base font-semibold">
                      Single-Use Packaging
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      According to the Ministry of Environment and Forestry (KLHK, 2023), approximately 40% of total 
                      plastic is used as single-use packaging such as beverage bottles, plastic bags, straws, and sachets 
                      that are immediately discarded after use, creating massive waste accumulation that is difficult to decompose.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass border-2 border-yellow-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="text-5xl mb-3">♻️</div>
                    <CardTitle className="text-4xl font-bold text-yellow-600 mb-2">
                      9%
                    </CardTitle>
                    <CardDescription className="text-base font-semibold">
                      Global Recycling Rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Low recycling rates pose a major challenge. According to UNEP (2022), only about 9% of
                      global plastic is actually recycled.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient font-[family-name:var(--font-poppins)]">
                What We Do
              </h2>
              <p className="text-xl text-gray-600">
                Innovative solutions to tackle the plastic crisis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full glass border-2 border-primary/30 hover:border-primary hover:shadow-glow-green transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Waste2Pay RVM</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700">
                      Our <span className="font-semibold">Waste2Pay Reverse Vending Machine</span> is equipped with advanced technology 
                      including camera sensors, servo motors, ultrasonic sensors, and touchscreen monitor. The machine recognizes the type 
                      and quantity of waste, identifies users through their unique account code, and automatically records digital points 
                      that can be exchanged for recycled products.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full glass border-2 border-secondary/30 hover:border-secondary hover:shadow-glow-blue transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Recycle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Plastic Recycling</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700">
                      In partnership with <span className="font-semibold">Paste Lab</span>, an experienced and highly credible waste manager, 
                      we transform collected plastic waste into functional products such as 3D printer filaments, coasters, chairs, tables, 
                      and other creative crafts. This implements the principles of reduce, reuse, and recycle in a true circular economy model.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full glass border-2 border-accent/30 hover:border-accent hover:shadow-soft transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Community Education</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700">
                      We conduct awareness campaigns involving all students and school community through educational sessions, 
                      poster creation, social media campaigns, and interactive games designed to foster environmental care in a fun way. 
                      Our digital platform allows real-time monitoring of contributions, point redemption, and learning about waste management.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-[family-name:var(--font-poppins)]">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600">
                Dedicated students from SMA Pradita Dirgantara leading the sustainability movement
              </p>
              <p className="text-base text-gray-500 mt-2">
                Target: 400+ community members (±300 students + ±100 staff & families)
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {teamMembers.slice(0, 3).map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full glass hover:shadow-2xl transition-all group">
                    <CardHeader>
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-glow-green transition-shadow">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
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

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {teamMembers.slice(3, 5).map((member, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full glass hover:shadow-2xl transition-all group">
                    <CardHeader>
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-glow-blue transition-shadow">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
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

      {/* Achievements */}
      <section className="py-24 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-6 font-[family-name:var(--font-poppins)]">
              Our Achievements
            </h2>
            <p className="text-center text-lg opacity-90 mb-8">Supporting Indonesia's Zero Waste 2025 & SDG 12</p>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">400+</p>
                <p className="text-xl opacity-95">Community Members</p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">1</p>
                <p className="text-xl opacity-95">Waste2Pay RVM</p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">30%</p>
                <p className="text-xl opacity-95">Waste Reduction Target</p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">70%</p>
                <p className="text-xl opacity-95">Waste Processing Target</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
