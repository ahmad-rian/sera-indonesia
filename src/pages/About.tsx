"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Leaf,
  BarChart3,
  Users,
  Shield,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Sparkles,
  TreePine,
  Target,
  Lightbulb,
  Heart,
} from "lucide-react"

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const impactRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)


  const features = [
    {
      icon: AlertTriangle,
      title: "Real-Time Crisis Monitoring",
      description:
        "Live environmental alerts, interactive crisis maps, satellite-based monitoring, and community-driven reporting system.",
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    {
      icon: BarChart3,
      title: "Environmental Data Hub",
      description:
        "Real-time Air Quality Index for 34 provinces, deforestation tracker, ocean health metrics, and climate change indicators.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      icon: Leaf,
      title: "Actionable Solutions",
      description:
        "Personal eco-challenges with gamification, community cleanup events, carbon footprint calculator, and conservation donation platform.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      icon: Users,
      title: "Environmental Community",
      description:
        "Local environmental groups discovery, expert knowledge sharing forums, success stories, and mentorship programs.",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const impactMetrics = [
    { metric: "2.3M+", label: "Environmental Actions Tracked", icon: Target },
    { metric: "156K", label: "Trees Planted via Platform", icon: TreePine },
    { metric: "Rp 45M", label: "Donated to Conservation", icon: Heart },
    { metric: "890K+", label: "Active Environmental Warriors", icon: Users },
  ]

  const teamMembers = [
    { name: "Dr. Adi Wijaya", role: "Founder & Environmental Scientist" },
    { name: "Siti Nurhaliza", role: "Chief Technology Officer" },
    { name: "Budi Santoso", role: "Head of Conservation" },
    { name: "Maya Indira", role: "Community Relations Director" },
  ]

  const partners = [
    "Kementerian Lingkungan Hidup dan Kehutanan",
    "WWF Indonesia",
    "Greenpeace Indonesia",
    "WALHI",
    "Indonesia Ocean Pride",
    "Universitas Indonesia",
  ]

  return (
    <div
      className="relative min-h-screen bg-white dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-900"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-50 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-50 dark:bg-teal-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_800px_600px_at_50%_200px,black,transparent)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-full border border-emerald-200 dark:border-emerald-500/30 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-2 h-2 bg-emerald-500 rounded-full"
              />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Platform Aksi Lingkungan Digital Indonesia
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              SERA
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 mb-4">
              Semesta Ruang Alam
            </p>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Platform digital inovatif yang menghubungkan masyarakat Indonesia dengan isu-isu lingkungan terkini dan
              memberikan solusi aksi nyata untuk perlindungan lingkungan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" ref={missionRef} className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Visi & Misi <span className="text-emerald-600 dark:text-emerald-400">SERA</span>
              </h2>

              <div className="space-y-8">
                <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <Shield className="h-6 w-6 text-emerald-500 dark:text-emerald-400 mr-2" />
                    Visi
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "Menjadi platform terdepan yang menghubungkan setiap warga Indonesia dalam gerakan pelestarian
                    lingkungan untuk generasi mendatang."
                  </p>
                </div>

                <div
                  id="vision"
                  ref={visionRef}
                  className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <Globe className="h-6 w-6 text-emerald-500 dark:text-emerald-400 mr-2" />
                    Misi
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Memberikan akses real-time terhadap krisis lingkungan Indonesia",
                      "Memberdayakan masyarakat untuk mengambil aksi nyata lingkungan",
                      "Menyediakan data environmental yang akurat dan dapat dipercaya",
                      "Membangun komunitas environmental warriors Indonesia",
                      "Mendorong transparansi dalam pengelolaan lingkungan",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-1">
                <div className="w-full h-full rounded-xl bg-white dark:bg-slate-800 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Design Philosophy</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center">
                        <Sparkles className="h-5 w-5 mr-2" />
                        "Cosmic Environmentalism"
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        SERA mengadopsi perspektif "semesta" yang melihat bumi sebagai bagian dari sistem yang lebih
                        besar.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        User-Centric Design
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Mobile-first, Bahasa Indonesia, visual storytelling, dan gamification untuk engagement.
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="flex flex-wrap gap-2">
                        {["Holistic", "Scientific", "Future-thinking", "Universal"].map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full dark:border dark:border-emerald-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements - Fixed to show icons in both light and dark mode */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 dark:bg-yellow-400/30 dark:backdrop-blur-md rounded-full flex items-center justify-center dark:border dark:border-yellow-400/50">
                <Lightbulb className="h-6 w-6 text-white dark:text-yellow-300" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-emerald-400 dark:bg-emerald-400/30 dark:backdrop-blur-md rounded-full flex items-center justify-center dark:border dark:border-emerald-400/50">
                <Leaf className="h-6 w-6 text-white dark:text-emerald-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" ref={featuresRef} className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Core Features <span className="text-emerald-600 dark:text-emerald-400">SERA</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Platform komprehensif untuk monitoring, aksi, dan kolaborasi lingkungan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow dark:hover:border-emerald-500/30 dark:transition-all dark:hover:shadow-emerald-500/10"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section
        id="impact"
        ref={impactRef}
        className="py-16 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Impact <span className="text-emerald-600 dark:text-emerald-400">SERA</span> 2024
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Dampak nyata yang telah kami capai bersama
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30">
                    <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {item.metric}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{item.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              href="#"
              className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium dark:hover:text-emerald-300 transition-colors"
            >
              Lihat laporan lengkap
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Team & Partners Section */}
      <section id="team" ref={teamRef} className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Tim & Mitra <span className="text-emerald-600 dark:text-emerald-400">SERA</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Kolaborasi untuk lingkungan Indonesia yang lebih baik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Users className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2" />
                Tim Inti
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-xl p-4 shadow-md border border-slate-200 dark:border-slate-700 dark:hover:border-emerald-500/30 dark:transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{member.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partners Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Globe className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2" />
                Mitra Kolaborasi
              </h3>

              <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{partner}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Dan 20+ organisasi lingkungan lainnya di seluruh Indonesia
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" ref={ctaRef} className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4">Bergabung dengan SERA</h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari gerakan untuk melindungi lingkungan Indonesia. Setiap aksi kecil Anda berkontribusi
              pada perubahan besar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Mulai Aksi Sekarang
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-400/30 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-emerald-400/50 transition-colors border border-white/20"
              >
                Pelajari Lebih Lanjut
              </motion.button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <a href="#" className="flex items-center text-emerald-100 hover:text-white transition-colors">
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-sm">Volunteer</span>
              </a>
              <a href="#" className="flex items-center text-emerald-100 hover:text-white transition-colors">
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-sm">Partnership</span>
              </a>
              <a href="#" className="flex items-center text-emerald-100 hover:text-white transition-colors">
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-sm">Internship</span>
              </a>
              <a href="#" className="flex items-center text-emerald-100 hover:text-white transition-colors">
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-sm">Contact</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About