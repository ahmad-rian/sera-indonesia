"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Clock,
  Users,
  Flame,
  TreePine,
  Factory,
  Fish,
  Trash2,
  Mountain,
  AlertTriangle,
  TrendingUp,
  Share2,
  Phone,
  DollarSign,
  UserPlus,
  RefreshCw,
  Heart,
  ChevronRight,
  Play,
  Pause,
  X,
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { Globe } from "../components/magicui/Globe"

interface CrisisData {
  id: number
  title: string
  location: string
  timeAgo: string
  concernedPeople: number
  severity: "KRITIS" | "TINGGI" | "BURUK"
  type: string
  description: string
  impact: string
  image: string
}

interface CrisisType {
  id: string
  name: string
  icon: React.ComponentType<any>
  color: string
  count: number
}

const GlobeSection: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
      <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mx-auto bg-white dark:bg-slate-800 rounded-full p-4 sm:p-6 lg:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Globe
            config={{
              width: 900,
              height: 900,
              devicePixelRatio: 2,
              phi: 0,
              theta: 0.3,
              dark: 0.3,
              diffuse: 1.0,
              mapSamples: 24000,
              mapBrightness: 1.2,
              baseColor: [0.9, 0.9, 0.95],
              markerColor: [1, 0.2, 0.2],
              glowColor: [0.8, 0.8, 1],
              markers: [
                { location: [0.5, 101.4], size: 0.08 },
                { location: [-6.2, 106.8], size: 0.06 },
                { location: [-2.7, 107.6], size: 0.07 },
                { location: [-0.5, 130.8], size: 0.05 },
                { location: [-8.3, 115.1], size: 0.05 },
                { location: [3.6, 98.7], size: 0.05 },
                { location: [-7.8, 110.4], size: 0.04 },
                { location: [1.5, 124.8], size: 0.04 },
                { location: [-3.3, 114.6], size: 0.06 },
              ],
            }}
          />
        </div>
      </div>

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg"
      >
        🔥 Riau Fire
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg"
      >
        💨 Jakarta Pollution
      </motion.div>

      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg"
      >
        🌳 Kalimantan
      </motion.div>
    </div>
  )
}

const Crisis: React.FC = () => {
  const { theme } = useTheme()
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedCrisis, setSelectedCrisis] = useState<CrisisData | null>(null)
  const [isLiveUpdating, setIsLiveUpdating] = useState<boolean>(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    if (isLiveUpdating) {
      const interval = setInterval(() => {
        setLastUpdate(new Date())
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [isLiveUpdating])

  const crisisTypes: CrisisType[] = [
    { id: "all", name: "Semua Krisis", icon: AlertTriangle, color: "emerald", count: 0 }, // Will be calculated
    { id: "fire", name: "Kebakaran Hutan", icon: Flame, color: "red", count: 0 },
    { id: "deforestation", name: "Deforestasi", icon: TreePine, color: "orange", count: 0 },
    { id: "pollution", name: "Polusi Industri", icon: Factory, color: "purple", count: 0 },
    { id: "fishing", name: "Illegal Fishing", icon: Fish, color: "blue", count: 0 },
    { id: "waste", name: "Krisis Sampah", icon: Trash2, color: "yellow", count: 0 },
    { id: "mining", name: "Tambang Ilegal", icon: Mountain, color: "emerald", count: 0 },
  ]

  const urgentCrisis: CrisisData[] = [
    {
      id: 1,
      title: "BREAKING: Kebakaran Hutan Masif di Riau",
      location: "Riau",
      timeAgo: "2 jam lalu",
      concernedPeople: 15432,
      severity: "KRITIS",
      type: "fire",
      description:
        "156 titik api terdeteksi satelit dengan laju deforestasi mencapai 2,340 hektar per hari, mengancam habitat orangutan dan gajah Sumatera",
      impact: "2,340 hektar hutan hilang hari ini",
      image: "https://images.unsplash.com/photo-1574263867128-ad2d21b2ced8?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "URGENT: Kebakaran Lahan Gambut Jambi Meluas",
      location: "Jambi",
      timeAgo: "4 jam lalu",
      concernedPeople: 8923,
      severity: "KRITIS",
      type: "fire",
      description:
        "Kebakaran lahan gambut seluas 2,800 hektar sulit dipadamkan, asap tebal mengganggu penerbangan dan aktivitas masyarakat",
      impact: "2,800 hektar lahan gambut terbakar",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "ALERT: Polusi Udara Jakarta Memburuk",
      location: "DKI Jakarta",
      timeAgo: "1 jam lalu",
      concernedPeople: 23156,
      severity: "BURUK",
      type: "pollution",
      description:
        "Konsentrasi PM2.5 mencapai level berbahaya dengan AQI 156, melebihi standar WHO dan mengancam kesehatan 10 juta penduduk",
      impact: "10 juta penduduk terpapar polusi berbahaya",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "WARNING: Polusi Industri Cilegon Meningkat",
      location: "Banten",
      timeAgo: "6 jam lalu",
      concernedPeople: 12845,
      severity: "TINGGI",
      type: "pollution",
      description:
        "Pencemaran udara dari kawasan industri Cilegon mencapai radius 15 km, warga mengeluh sesak napas dan iritasi mata",
      impact: "500.000 warga terdampak polusi industri",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "URGENT: Deforestasi Kalimantan Accelerating",
      location: "Kalimantan Tengah",
      timeAgo: "3 jam lalu",
      concernedPeople: 8924,
      severity: "KRITIS",
      type: "deforestation",
      description:
        "Pembukaan lahan untuk perkebunan kelapa sawit menyebabkan hilangnya 1,800 hektar hutan hujan primer dalam sebulan terakhir",
      impact: "1,800 hektar hutan primer hilang bulan ini",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "CRITICAL: Deforestasi Papua Barat Mengkhawatirkan",
      location: "Papua Barat",
      timeAgo: "8 jam lalu",
      concernedPeople: 6234,
      severity: "KRITIS",
      type: "deforestation",
      description:
        "Aktivitas illegal logging menghancurkan 950 hektar hutan lindung, mengancam habitat endemik burung cendrawasih",
      impact: "950 hektar hutan lindung rusak",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      title: "ALERT: Illegal Fishing Natuna Meningkat",
      location: "Kepulauan Natuna",
      timeAgo: "5 jam lalu",
      concernedPeople: 4521,
      severity: "TINGGI",
      type: "fishing",
      description:
        "Kapal asing ilegal menangkap ikan dengan pukat harimau, merusak ekosistem laut dan merugikan nelayan lokal",
      impact: "200 ton ikan dicuri, ekosistem terancam",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      title: "WARNING: Overfishing Laut Banda",
      location: "Maluku",
      timeAgo: "12 jam lalu",
      concernedPeople: 3892,
      severity: "TINGGI",
      type: "fishing",
      description:
        "Penangkapan ikan berlebihan menggunakan bom ikan merusak terumbu karang dan mengurangi populasi ikan drastis",
      impact: "15 hektar terumbu karang rusak",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
    },
    {
      id: 9,
      title: "URGENT: Krisis Sampah Plastik Bali",
      location: "Bali",
      timeAgo: "7 jam lalu",
      concernedPeople: 9876,
      severity: "BURUK",
      type: "waste",
      description:
        "Pantai Kuta dan Sanur dipenuhi sampah plastik hingga 50 ton per hari, mengancam pariwisata dan ekosistem laut",
      impact: "50 ton sampah plastik per hari",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop",
    },
    {
      id: 10,
      title: "CRITICAL: TPA Bantar Gebang Overload",
      location: "Bekasi",
      timeAgo: "10 jam lalu",
      concernedPeople: 15234,
      severity: "KRITIS",
      type: "waste",
      description:
        "Tempat Pembuangan Akhir Bantar Gebang melebihi kapasitas, gas metana mencemari udara dalam radius 5 km",
      impact: "300.000 warga terpapar gas beracun",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    },
    {
      id: 11,
      title: "ALERT: Tambang Emas Ilegal Lombok",
      location: "Lombok",
      timeAgo: "14 jam lalu",
      concernedPeople: 5643,
      severity: "TINGGI",
      type: "mining",
      description:
        "Penambangan emas tradisional menggunakan merkuri mencemari sungai dan mengancam kesehatan 50.000 penduduk",
      impact: "50.000 penduduk terpapar merkuri",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 12,
      title: "WARNING: Tambang Batubara Ilegal Kaltim",
      location: "Kalimantan Timur",
      timeAgo: "16 jam lalu",
      concernedPeople: 4127,
      severity: "TINGGI",
      type: "mining",
      description:
        "Aktivitas tambang batubara tanpa izin merusak 400 hektar hutan dan mencemari 3 sungai di Kalimantan Timur",
      impact: "400 hektar hutan rusak, 3 sungai tercemar",
      image: "https://images.unsplash.com/photo-1611951531015-e5fb9e5e0e6a?w=400&h=300&fit=crop",
    },
  ]

  // Calculate counts based on actual data
  const getCrisisTypesWithCounts = () => {
    const counts = crisisTypes.map((type) => ({
      ...type,
      count: type.id === "all" ? urgentCrisis.length : urgentCrisis.filter((crisis) => crisis.type === type.id).length,
    }))
    return counts
  }

  const crisisTypesWithCounts = getCrisisTypesWithCounts()

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "KRITIS":
        return "text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-500/20 dark:border-red-500/30"
      case "TINGGI":
        return "text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-400 dark:bg-orange-500/20 dark:border-orange-500/30"
      case "BURUK":
        return "text-yellow-600 bg-yellow-100 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-500/20 dark:border-yellow-500/30"
      default:
        return "text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-500/20 dark:border-slate-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      fire: Flame,
      deforestation: TreePine,
      pollution: Factory,
      fishing: Fish,
      waste: Trash2,
      mining: Mountain,
    }
    return iconMap[type] || AlertTriangle
  }

  const filteredCrisis =
    activeFilter === "all" ? urgentCrisis : urgentCrisis.filter((crisis) => crisis.type === activeFilter)

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "dark bg-slate-900 text-white" : "bg-white text-slate-900"}`}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white dark:bg-slate-900 transition-colors duration-500 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900/30" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-6 lg:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-3 py-2 sm:px-4 bg-emerald-100 dark:bg-emerald-500/20 rounded-full border border-emerald-200 dark:border-emerald-500/30 mb-4 sm:mb-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"
                />
                <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Live Monitoring Aktif
                </span>
                <div className="h-3 w-px bg-emerald-300 dark:bg-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                  {lastUpdate.toLocaleTimeString("id-ID")} WIB
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                🚨 KRISIS LINGKUNGAN
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Indonesia
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                Platform monitoring real-time krisis lingkungan Indonesia dari satelit, IoT sensors, dan laporan
                komunitas.
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {" "}
                  Ambil aksi sekarang sebelum terlambat!{" "}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById("crisis-feed")
                    element?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }}
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Lihat Krisis Urgent</span>
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLiveUpdating(!isLiveUpdating)}
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-lg"
                >
                  {isLiveUpdating ? (
                    <Pause className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                  <span className="text-sm sm:text-base">{isLiveUpdating ? "Pause" : "Resume"} Live Update</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {[
                  { label: "Active Crisis", value: urgentCrisis.length.toString(), color: "red", icon: AlertTriangle },
                  {
                    label: "Emergency Level",
                    value: urgentCrisis.filter((c) => c.severity === "KRITIS").length.toString(),
                    color: "orange",
                    icon: TrendingUp,
                  },
                  {
                    label: "People Concerned",
                    value: `${Math.round(urgentCrisis.reduce((sum, c) => sum + c.concernedPeople, 0) / 1000)}K`,
                    color: "emerald",
                    icon: Users,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center p-3 sm:p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex justify-center mb-2">
                      <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 text-${stat.color}-500`} />
                    </div>
                    <div className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:order-2"
            >
              <GlobeSection />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 py-4 sm:py-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Filter Krisis Lingkungan</h3>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {crisisTypesWithCounts.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(type.id)}
                className={`inline-flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm ${
                  activeFilter === type.id
                    ? `bg-${type.color}-500 text-white shadow-lg`
                    : `bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700`
                }`}
              >
                <type.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{type.name}</span>
                <span className="sm:hidden">{type.name.split(" ")[0]}</span>
                <span
                  className={`px-1 sm:px-2 py-0.5 text-xs rounded-full ${
                    activeFilter === type.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {type.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Feed Section */}
      <section id="crisis-feed" className="py-8 sm:py-16 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              🚨 Urgent Crisis Feed
            </h2>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300">
              Update terbaru krisis lingkungan yang membutuhkan perhatian segera
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <AnimatePresence>
              {filteredCrisis.map((crisis, index) => {
                const TypeIcon = getTypeIcon(crisis.type)
                return (
                  <motion.div
                    key={crisis.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedCrisis(crisis)}
                  >
                    <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                      <img
                        src={crisis.image || "/placeholder.svg"}
                        alt={crisis.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <TypeIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        <span
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border ${getSeverityColor(crisis.severity)}`}
                        >
                          {crisis.severity}
                        </span>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full shadow-lg"
                      />
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                        {crisis.title}
                      </h3>

                      <div className="flex items-center space-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{crisis.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{crisis.timeAgo}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {crisis.description}
                      </p>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 rounded-lg p-3 mb-4 border border-red-100 dark:border-red-500/20">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-400" />
                          <span className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300">
                            Impact: {crisis.impact}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">
                            {crisis.concernedPeople.toLocaleString("id-ID")} orang peduli
                          </span>
                          <span className="sm:hidden">{(crisis.concernedPeople / 1000).toFixed(1)}K peduli</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 hover:text-red-500 transition-colors duration-200" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 hover:text-blue-500 transition-colors duration-200" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Crisis Detail Modal */}
          <AnimatePresence>
            {selectedCrisis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={() => setSelectedCrisis(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-48 sm:h-64 overflow-hidden">
                    <img
                      src={selectedCrisis.image || "/placeholder.svg"}
                      alt={selectedCrisis.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <button
                      onClick={() => setSelectedCrisis(null)}
                      className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg transition-colors duration-200"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {(() => {
                          const TypeIcon = getTypeIcon(selectedCrisis.type)
                          return <TypeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        })()}
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getSeverityColor(selectedCrisis.severity)}`}
                        >
                          {selectedCrisis.severity}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedCrisis.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-white/80">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedCrisis.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{selectedCrisis.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-8">
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Deskripsi Krisis</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedCrisis.description}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
                          <h5 className="font-semibold text-red-700 dark:text-red-300">Impact Assessment</h5>
                        </div>
                        <p className="text-red-600 dark:text-red-400 font-medium">{selectedCrisis.impact}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {selectedCrisis.concernedPeople.toLocaleString("id-ID")}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Orang Peduli</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {selectedCrisis.severity}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Tingkat Keparahan</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {selectedCrisis.timeAgo}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Waktu Laporan</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 sm:px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                        >
                          🚨 Report Emergency
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 sm:px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                        >
                          📤 Share Crisis
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 sm:px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                        >
                          💰 Donate Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-3xl p-6 sm:p-12 border border-emerald-200/50 dark:border-slate-600/50 mb-8 sm:mb-16 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  🌱 Take Action Now
                </h3>
                <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300">
                  Bergabunglah dalam upaya penyelamatan lingkungan Indonesia. Setiap aksi kecil membuat perbedaan besar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                {[
                  {
                    id: "donate",
                    title: "Emergency Donation",
                    description: "Donasi untuk krisis lingkungan terkini",
                    icon: DollarSign,
                    bgColor: "bg-emerald-500",
                    amount: "Rp 2.1M terkumpul",
                    action: "Donasi Sekarang",
                  },
                  {
                    id: "volunteer",
                    title: "Join Volunteer",
                    description: "Bergabung dengan program relawan",
                    icon: UserPlus,
                    bgColor: "bg-blue-500",
                    amount: "234 relawan aktif",
                    action: "Daftar Volunteer",
                  },
                  {
                    id: "share",
                    title: "Share Awareness",
                    description: "Sebarkan kesadaran di media sosial",
                    icon: Share2,
                    bgColor: "bg-purple-500",
                    amount: "45K shares hari ini",
                    action: "Share Sekarang",
                  },
                  {
                    id: "contact",
                    title: "Contact Authorities",
                    description: "Hubungi pihak berwajib langsung",
                    icon: Phone,
                    bgColor: "bg-red-500",
                    amount: "Hotline 24/7",
                    action: "Hubungi Sekarang",
                  },
                ].map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-8 text-center shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex p-3 sm:p-4 rounded-xl ${action.bgColor} mb-4 sm:mb-6 shadow-lg`}
                    >
                      <action.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </motion.div>

                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                      {action.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 sm:mb-4">
                      {action.description}
                    </p>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6 font-medium">
                      {action.amount}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-2 sm:py-3 px-4 ${action.bgColor} hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base`}
                    >
                      {action.action}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 sm:mb-16"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                📞 Emergency Contacts
              </h3>
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300">
                Hubungi langsung instansi terkait untuk laporan darurat
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  title: "Kementerian LHK",
                  phone: "021-5720227",
                  description: "Laporan kebakaran hutan dan deforestasi",
                  available: "24/7",
                  color: "emerald",
                  icon: TreePine,
                },
                {
                  title: "BMKG Emergency",
                  phone: "021-4246321",
                  description: "Peringatan cuaca dan bencana alam",
                  available: "24/7",
                  color: "blue",
                  icon: AlertTriangle,
                },
                {
                  title: "Basarnas",
                  phone: "115",
                  description: "Search and rescue operations",
                  available: "24/7",
                  color: "red",
                  icon: Phone,
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 sm:p-3 rounded-lg bg-${contact.color}-100 dark:bg-${contact.color}-500/20`}>
                        <contact.icon
                          className={`h-5 w-5 sm:h-6 sm:w-6 text-${contact.color}-600 dark:text-${contact.color}-400`}
                        />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{contact.title}</h4>
                    </div>
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-${contact.color}-100 dark:bg-${contact.color}-500/20 text-${contact.color}-700 dark:text-${contact.color}-300`}
                    >
                      {contact.available}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 sm:mb-6">
                    {contact.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {contact.phone}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-${contact.color}-500 hover:bg-${contact.color}-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg text-sm sm:text-base`}
                    >
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Call</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Status Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-3 sm:space-x-4 px-4 sm:px-8 py-3 sm:py-4 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg">
              <motion.div
                animate={{ rotate: isLiveUpdating ? 360 : 0 }}
                transition={{ duration: 2, repeat: isLiveUpdating ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Last updated: {lastUpdate.toLocaleTimeString("id-ID")} WIB
              </span>
              <div className="h-3 sm:h-4 w-px bg-slate-300 dark:bg-slate-600" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Auto-refresh:{" "}
                <span
                  className={`font-medium ${isLiveUpdating ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {isLiveUpdating ? "ON" : "OFF"}
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Crisis
