"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  MapPin,
  MessageCircle,
  Calendar,
  Award,
  BookOpen,
  Search,
  Filter,
  ChevronRight,
  Clock,
  TrendingUp,
  UserPlus,
  Share2,
  Heart,
  MessageSquare,
  Globe,
  Leaf,
  Trash2,
  Droplets,
  TreePine,
  Mountain,
  Building,
  Mail,
  Phone,
} from "lucide-react"
import { SpinningText } from "../components/magicui/SpinningText"
import { useTheme } from "../context/ThemeContext"

// Forum categories
const forumCategories = [
  {
    id: "region",
    name: "Berdasarkan Wilayah",
    icon: MapPin,
    items: [
      { name: "Jakarta", count: 156, hot: true },
      { name: "Bali", count: 124, hot: true },
      { name: "Jawa Barat", count: 98 },
      { name: "Sumatera", count: 87 },
      { name: "Kalimantan", count: 76 },
      { name: "Sulawesi", count: 65 },
      { name: "Papua", count: 43 },
      { name: "Nusa Tenggara", count: 38 },
    ],
  },
  {
    id: "issue",
    name: "Berdasarkan Isu",
    icon: MessageCircle,
    items: [
      { name: "Perubahan Iklim", count: 213, hot: true },
      { name: "Hutan & Deforestasi", count: 187, hot: true },
      { name: "Sampah Plastik", count: 165, hot: true },
      { name: "Konservasi Laut", count: 142 },
      { name: "Polusi Udara", count: 134 },
      { name: "Energi Terbarukan", count: 98 },
      { name: "Satwa Liar", count: 87 },
      { name: "Pertanian Berkelanjutan", count: 76 },
    ],
  },
]

// Local environmental groups
const localGroups = [
  {
    id: 1,
    name: "WALHI Jakarta",
    location: "Jakarta",
    members: 2345,
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Wahana Lingkungan Hidup Indonesia cabang Jakarta",
    tags: ["Advokasi", "Edukasi", "Konservasi"],
    verified: true,
  },
  {
    id: 2,
    name: "Divers Clean Action",
    location: "Bali",
    members: 1876,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Komunitas penyelam untuk kebersihan laut Indonesia",
    tags: ["Laut", "Sampah", "Konservasi"],
    verified: true,
  },
  {
    id: 3,
    name: "Trash Hero Indonesia",
    location: "Nasional",
    members: 3421,
    image: "https://images.unsplash.com/photo-1618477462146-050d2757350d?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Gerakan nasional untuk Indonesia bebas sampah",
    tags: ["Sampah", "Edukasi", "Aksi"],
    verified: true,
  },
  {
    id: 4,
    name: "Hutan Itu Indonesia",
    location: "Kalimantan",
    members: 1245,
    image: "https://images.unsplash.com/photo-1542376333-5b3e196ad027?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Komunitas pelestarian hutan tropis Indonesia",
    tags: ["Hutan", "Konservasi", "Edukasi"],
    verified: true,
  },
]

// Featured users
const featuredUsers = [
  {
    id: 1,
    name: "Nadine Alexandra",
    username: "@nadinealexandra",
    level: "Environmental Ambassador",
    points: 12450,
    actions: 234,
    contributions: 87,
    badges: 32,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    activeIn: "WALHI Jakarta",
    verified: true,
  },
  {
    id: 2,
    name: "Hamish Daud",
    username: "@hamishdaud",
    level: "Ocean Guardian",
    points: 10876,
    actions: 198,
    contributions: 76,
    badges: 28,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop",
    activeIn: "Divers Clean Action",
    verified: true,
  },
  {
    id: 3,
    name: "Amanda Witdarmono",
    username: "@amandawitdarmono",
    level: "Sustainability Expert",
    points: 9845,
    actions: 187,
    contributions: 65,
    badges: 25,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    activeIn: "Waste4Change",
    verified: true,
  },
]

// Upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Bersih Pantai Ancol",
    organizer: "Divers Clean Action",
    date: "24 Juni 2025",
    time: "07:00 - 11:00 WIB",
    location: "Pantai Ancol, Jakarta",
    participants: 156,
    maxParticipants: 200,
    image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?q=80&w=300&h=200&auto=format&fit=crop",
    category: "cleanup",
  },
  {
    id: 2,
    title: "Workshop Kompos Rumahan",
    organizer: "Indonesia Berkebun",
    date: "26 Juni 2025",
    time: "13:00 - 16:00 WIB",
    location: "Taman Menteng, Jakarta",
    participants: 45,
    maxParticipants: 50,
    image: "https://images.unsplash.com/photo-1621954048671-e8c476dcb72b?q=80&w=300&h=200&auto=format&fit=crop",
    category: "workshop",
  },
  {
    id: 3,
    title: "Webinar: Krisis Iklim Indonesia",
    organizer: "WALHI",
    date: "28 Juni 2025",
    time: "19:00 - 21:00 WIB",
    location: "Online (Zoom)",
    participants: 324,
    maxParticipants: 500,
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=300&h=200&auto=format&fit=crop",
    category: "webinar",
  },
  {
    id: 4,
    title: "Penanaman Mangrove Muara Angke",
    organizer: "Hutan Itu Indonesia",
    date: "30 Juni 2025",
    time: "08:00 - 12:00 WIB",
    location: "Muara Angke, Jakarta Utara",
    participants: 87,
    maxParticipants: 150,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=300&h=200&auto=format&fit=crop",
    category: "planting",
  },
]

// Knowledge resources
const knowledgeResources = [
  {
    id: 1,
    title: "Panduan Pemilahan Sampah Rumah Tangga",
    type: "guide",
    author: "Waste4Change",
    views: 12450,
    likes: 3456,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=300&h=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cara Membuat Ecobrick dari Sampah Plastik",
    type: "tutorial",
    author: "Plastic Free Indonesia",
    views: 8765,
    likes: 2345,
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=300&h=200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Panduan Berkebun Organik di Lahan Sempit",
    type: "guide",
    author: "Indonesia Berkebun",
    views: 7654,
    likes: 1987,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=300&h=200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Mengenal Jenis-Jenis Terumbu Karang Indonesia",
    type: "article",
    author: "Reef Check Indonesia",
    views: 6543,
    likes: 1765,
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=300&h=200&auto=format&fit=crop",
  },
]

// Expert AMAs
const expertAmas = [
  {
    name: "Dr. Amanda Katili",
    role: "Climate Scientist",
    topic: "Krisis Iklim di Indonesia",
    date: "25 Juni 2025",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    name: "Prof. Hadi Susilo",
    role: "Marine Biologist",
    topic: "Konservasi Terumbu Karang",
    date: "27 Juni 2025",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    name: "Dr. Budiawan",
    role: "Forestry Expert",
    topic: "Deforestasi & Solusinya",
    date: "30 Juni 2025",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop",
  },
]

// Success stories
const successStories = [
  {
    title: "Restorasi Mangrove Muara Angke",
    author: "Komunitas Mangrove Jakarta",
    excerpt:
      "Bagaimana kami berhasil menanam 50,000 pohon mangrove dan mengembalikan ekosistem pesisir Jakarta Utara...",
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=400&h=250&auto=format&fit=crop",
    likes: 876,
    comments: 234,
  },
  {
    title: "Gerakan Bebas Plastik di Bali",
    author: "Bye Bye Plastic Bags",
    excerpt:
      "Perjalanan kami mengadvokasi pelarangan kantong plastik sekali pakai di Bali dan dampaknya terhadap lingkungan...",
    image: "https://images.unsplash.com/photo-1621928372481-d86c89a62c4c?q=80&w=400&h=250&auto=format&fit=crop",
    likes: 765,
    comments: 198,
  },
]

// DIY solutions
const diySolutions = [
  {
    title: "Komposter Sederhana dari Ember Bekas",
    difficulty: "Mudah",
    time: "1-2 jam",
    materials: ["Ember bekas", "Tanah", "Sekam padi", "Cairan EM4"],
    image: "https://images.unsplash.com/photo-1621954048671-e8c476dcb72b?q=80&w=300&h=200&auto=format&fit=crop",
  },
  {
    title: "Ecobrick dari Sampah Plastik Rumah Tangga",
    difficulty: "Mudah",
    time: "Berkelanjutan",
    materials: ["Botol plastik", "Sampah plastik bersih", "Tongkat kayu"],
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=300&h=200&auto=format&fit=crop",
  },
  {
    title: "Rain Harvesting System Sederhana",
    difficulty: "Menengah",
    time: "3-4 jam",
    materials: ["Talang air", "Drum/tong", "Pipa PVC", "Filter sederhana"],
    image: "https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=300&h=200&auto=format&fit=crop",
  },
]

const Community: React.FC = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("forums")

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      cleanup: <Trash2 className="h-4 w-4 text-blue-500" />,
      workshop: <BookOpen className="h-4 w-4 text-purple-500" />,
      webinar: <Globe className="h-4 w-4 text-green-500" />,
      planting: <TreePine className="h-4 w-4 text-emerald-500" />,
    }
    return icons[category] || <Calendar className="h-4 w-4 text-gray-500" />
  }

  const tabs = [
    { id: "forums", name: "Forum Diskusi", icon: MessageCircle },
    { id: "groups", name: "Komunitas Lokal", icon: Users },
    { id: "profiles", name: "Profil & Prestasi", icon: Award },
    { id: "knowledge", name: "Berbagi Pengetahuan", icon: BookOpen },
    { id: "events", name: "Acara & Kegiatan", icon: Calendar },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Hero Section with Spinning Text */}
      <section
        className={`relative py-20 overflow-hidden ${
          theme === "dark" ? "bg-slate-900" : "bg-gradient-to-br from-white to-emerald-50/30"
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-50 dark:bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-50 dark:bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_800px_600px_at_50%_200px,black,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-full border border-emerald-200 dark:border-emerald-500/30 mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    Bergabung dengan 234,567 Eco Warriors
                  </span>
                </div>

                <h1
                  className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Komunitas
                  </span>{" "}
                  <br />
                  Lingkungan Indonesia
                </h1>

                <p
                  className={`text-xl md:text-2xl mb-8 max-w-2xl transition-colors duration-500 ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Bergabunglah dengan jaringan aktivis lingkungan terbesar di Indonesia. Diskusi, berbagi, dan bertindak
                  bersama untuk bumi yang lebih baik.
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <UserPlus className="inline-block mr-2 h-5 w-5" />
                    Bergabung Sekarang
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 border-2 font-semibold rounded-xl transition-all duration-200 ${
                      theme === "dark"
                        ? "border-slate-700 text-white hover:bg-slate-800"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Search className="inline-block mr-2 h-5 w-5" />
                    Jelajahi Komunitas
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md lg:max-w-lg"
            >
              <div className="relative flex items-center justify-center">
                <SpinningText
                  className={`text-xl font-bold ${
                    theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                  } w-[300px] h-[300px]`}
                  radius={8}
                >
                  KOMUNITAS • LINGKUNGAN • INDONESIA • BERSAMA • UNTUK • BUMI •
                </SpinningText>
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-full ${
                    theme === "dark" ? "bg-slate-800" : "bg-white"
                  } w-[180px] h-[180px] m-auto shadow-xl border ${
                    theme === "dark" ? "border-slate-700" : "border-slate-100"
                  }`}
                >
                  <Leaf className="h-16 w-16 text-emerald-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 ${
          theme === "dark" ? "bg-slate-900/95 border-slate-700/50" : "bg-white/95 border-slate-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-4 sm:py-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all whitespace-nowrap text-xs sm:text-sm ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                      : theme === "dark"
                        ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 backdrop-blur-sm"
                        : "text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 backdrop-blur-sm"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{tab.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {/* Forums Tab */}
          {activeTab === "forums" && (
            <motion.div
              key="forums"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari topik diskusi..."
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700/50 text-white placeholder-slate-400"
                        : "bg-white/70 border-slate-200/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <button
                  className={`px-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm flex items-center space-x-2 ${
                    theme === "dark"
                      ? "bg-slate-800/70 border-slate-700/50 text-white"
                      : "bg-white/70 border-slate-200/50 text-slate-900"
                  }`}
                >
                  <Filter className="h-5 w-5 text-slate-400" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Forum Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {forumCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`rounded-2xl p-6 border shadow-lg transition-all duration-300 backdrop-blur-sm ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div
                          className={`p-3 rounded-lg ${
                            category.id === "region"
                              ? "bg-blue-100 dark:bg-blue-500/20"
                              : "bg-green-100 dark:bg-green-500/20"
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${
                              category.id === "region"
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          />
                        </div>
                        <h3
                          className={`text-xl font-bold transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {category.name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {category.items.map((item, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ x: 4 }}
                            className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 cursor-pointer ${
                              theme === "dark" ? "hover:bg-slate-700/50" : "hover:bg-slate-100/80"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span
                                className={`font-medium transition-colors duration-500 ${
                                  theme === "dark" ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {item.name}
                              </span>
                              {item.hot && (
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">
                                  Hot
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-3">
                              <span
                                className={`text-sm transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                {item.count} diskusi
                              </span>
                              <ChevronRight className="h-4 w-4 text-slate-400" />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${
                            theme === "dark"
                              ? "bg-slate-700 hover:bg-slate-600 text-white"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          Lihat Semua
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Expert AMAs Section */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Expert AMAs
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center"
                  >
                    Lihat Semua <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {expertAmas.map((expert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl p-5 border transition-all duration-300 ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={expert.image || "/placeholder.svg"}
                          alt={expert.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4
                            className={`font-bold transition-colors duration-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {expert.name}
                          </h4>
                          <p
                            className={`text-sm transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            {expert.role}
                          </p>
                        </div>
                      </div>
                      <h5
                        className={`font-medium mb-2 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {expert.topic}
                      </h5>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-emerald-500" />
                        <span
                          className={`transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {expert.date}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                      >
                        Ingatkan Saya
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Cerita Sukses
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center"
                  >
                    Lihat Semua <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {successStories.map((story, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl overflow-hidden transition-all duration-300 ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      } border`}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <h4
                          className={`text-xl font-bold mb-2 transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {story.title}
                        </h4>
                        <p
                          className={`text-sm mb-3 transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Oleh: {story.author}
                        </p>
                        <p
                          className={`mb-4 transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {story.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span
                                className={`text-sm transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                {story.likes}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4 text-blue-500" />
                              <span
                                className={`text-sm transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                {story.comments}
                              </span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center"
                          >
                            Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Local Groups Tab */}
          {activeTab === "groups" && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari komunitas lingkungan..."
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700/50 text-white placeholder-slate-400"
                        : "bg-white/70 border-slate-200/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <button
                  className={`px-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm flex items-center space-x-2 ${
                    theme === "dark"
                      ? "bg-slate-800/70 border-slate-700/50 text-white"
                      : "bg-white/70 border-slate-200/50 text-slate-900"
                  }`}
                >
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <span>Lokasi Saya</span>
                </button>
              </div>

              {/* Featured Groups */}
              <div>
                <h3
                  className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Komunitas Lingkungan Terverifikasi
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {localGroups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl p-6 border transition-all duration-300 ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src={group.image || "/placeholder.svg"}
                          alt={group.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        {group.verified && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                            Verified
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-lg font-bold mb-1 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {group.name}
                      </h4>
                      <div className="flex items-center space-x-1 mb-3">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span
                          className={`text-xs transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {group.location}
                        </span>
                      </div>
                      <p
                        className={`text-sm mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {group.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 text-xs rounded-full transition-colors duration-500 ${
                              theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-slate-400" />
                          <span
                            className={`text-sm transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            {group.members.toLocaleString()} anggota
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-emerald-600 dark:text-emerald-400 font-medium text-sm"
                        >
                          Gabung
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Temukan Komunitas di Sekitar Anda
                  </h3>
                </div>

                <div
                  className={`rounded-xl overflow-hidden h-96 border transition-all duration-300 ${
                    theme === "dark" ? "border-slate-700/50" : "border-slate-200/50"
                  }`}
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&h=600&auto=format&fit=crop')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="w-full h-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
                      <p className="font-medium text-white text-xl mb-2">Peta Komunitas Lingkungan Indonesia</p>
                      <p className="text-sm text-white/80 mb-6">
                        Izinkan akses lokasi untuk melihat komunitas di sekitar Anda
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                      >
                        Aktifkan Lokasi
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Initiative */}
              <div className="mt-12">
                <div
                  className={`rounded-xl p-8 border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800 to-slate-700/80 border-slate-700/50"
                      : "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-100/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3
                        className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Buat Inisiatif Lingkungan Baru
                      </h3>
                      <p
                        className={`transition-colors duration-500 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Punya ide untuk aksi lingkungan? Buat inisiatif baru dan ajak komunitas untuk bergabung!
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                      Buat Inisiatif
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* User Profiles Tab */}
          {activeTab === "profiles" && (
            <motion.div
              key="profiles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Featured Users */}
              <div>
                <h3
                  className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Environmental Heroes
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl p-6 border transition-all duration-300 ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="relative mb-3">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500"
                          />
                          {user.verified && (
                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <h4
                          className={`text-lg font-bold transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {user.name}
                        </h4>
                        <p
                          className={`text-sm transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {user.username}
                        </p>
                        <div
                          className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                            theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {user.level}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div
                          className={`p-2 rounded-lg text-center ${
                            theme === "dark" ? "bg-slate-700/50" : "bg-slate-50"
                          }`}
                        >
                          <div
                            className={`text-lg font-bold transition-colors duration-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {user.points.toLocaleString()}
                          </div>
                          <div
                            className={`text-xs transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            Points
                          </div>
                        </div>
                        <div
                          className={`p-2 rounded-lg text-center ${
                            theme === "dark" ? "bg-slate-700/50" : "bg-slate-50"
                          }`}
                        >
                          <div
                            className={`text-lg font-bold transition-colors duration-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {user.actions}
                          </div>
                          <div
                            className={`text-xs transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            Actions
                          </div>
                        </div>
                        <div
                          className={`p-2 rounded-lg text-center ${
                            theme === "dark" ? "bg-slate-700/50" : "bg-slate-50"
                          }`}
                        >
                          <div
                            className={`text-lg font-bold transition-colors duration-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {user.badges}
                          </div>
                          <div
                            className={`text-xs transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            Badges
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "bg-slate-700/50" : "bg-slate-50/80"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <Users className="h-4 w-4 text-emerald-500" />
                          <span
                            className={`text-sm font-medium transition-colors duration-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            Active in
                          </span>
                        </div>
                        <p
                          className={`text-sm transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {user.activeIn}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                        >
                          Follow
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-2 rounded-lg transition-colors duration-300 ${
                            theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-100 hover:bg-slate-200"
                          }`}
                        >
                          <MessageSquare className="h-5 w-5 text-slate-500" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Achievements Gallery */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Achievements Gallery
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center"
                  >
                    Lihat Semua <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[
                    { name: "Tree Planter", icon: TreePine, color: "emerald" },
                    { name: "Ocean Guardian", icon: Droplets, color: "blue" },
                    { name: "Waste Warrior", icon: Trash2, color: "orange" },
                    { name: "Climate Activist", icon: Globe, color: "green" },
                    { name: "Mountain Protector", icon: Mountain, color: "purple" },
                    { name: "Urban Greener", icon: Building, color: "teal" },
                  ].map((badge, index) => {
                    const Icon = badge.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className={`rounded-xl p-4 border transition-all duration-300 text-center ${
                          theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                        }`}
                      >
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 bg-${badge.color}-100 dark:bg-${badge.color}-500/20`}
                        >
                          <Icon className={`h-8 w-8 text-${badge.color}-600 dark:text-${badge.color}-400`} />
                        </div>
                        <h4
                          className={`text-sm font-medium transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {badge.name}
                        </h4>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Mentor Program */}
              <div className="mt-12">
                <div
                  className={`rounded-xl p-8 border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800 to-slate-700/80 border-slate-700/50"
                      : "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-100/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3
                        className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Program Mentor Lingkungan
                      </h3>
                      <p
                        className={`transition-colors duration-500 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Baru dalam aktivisme lingkungan? Dapatkan bimbingan dari aktivis berpengalaman melalui program
                        mentoring kami.
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                      >
                        Jadi Mentee
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 border-2 font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                          theme === "dark"
                            ? "border-slate-700 text-white hover:bg-slate-800"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Jadi Mentor
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Knowledge Sharing Tab */}
          {activeTab === "knowledge" && (
            <motion.div
              key="knowledge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Search and Categories */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari pengetahuan lingkungan..."
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700/50 text-white placeholder-slate-400"
                        : "bg-white/70 border-slate-200/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <select
                  className={`px-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm ${
                    theme === "dark"
                      ? "bg-slate-800/70 border-slate-700/50 text-white"
                      : "bg-white/70 border-slate-200/50 text-slate-900"
                  }`}
                >
                  <option value="">Semua Kategori</option>
                  <option value="guide">Panduan</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="article">Artikel</option>
                  <option value="research">Riset</option>
                </select>
              </div>

              {/* Featured Resources */}
              <div>
                <h3
                  className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Sumber Pengetahuan Terpopuler
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {knowledgeResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={resource.image || "/placeholder.svg"}
                          alt={resource.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              resource.type === "guide"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                                : resource.type === "tutorial"
                                  ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                                  : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                            }`}
                          >
                            {resource.type === "guide"
                              ? "Panduan"
                              : resource.type === "tutorial"
                                ? "Tutorial"
                                : "Artikel"}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span
                              className={`text-xs transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {resource.likes}
                            </span>
                          </div>
                        </div>
                        <h4
                          className={`text-base font-bold mb-2 transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {resource.title}
                        </h4>
                        <p
                          className={`text-xs mb-3 transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Oleh: {resource.author}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            <span
                              className={`text-xs transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {resource.views.toLocaleString()} views
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-emerald-600 dark:text-emerald-400 font-medium text-xs"
                          >
                            Baca
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* DIY Solutions */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Solusi DIY Ramah Lingkungan
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center"
                  >
                    Lihat Semua <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {diySolutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={solution.image || "/placeholder.svg"}
                          alt={solution.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              solution.difficulty === "Mudah"
                                ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                            }`}
                          >
                            {solution.difficulty}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span
                              className={`text-xs transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {solution.time}
                            </span>
                          </div>
                        </div>
                        <h4
                          className={`text-lg font-bold mb-3 transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {solution.title}
                        </h4>
                        <div className="mb-4">
                          <p
                            className={`text-xs mb-2 font-medium transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            Bahan-bahan:
                          </p>
                          <ul className="space-y-1">
                            {solution.materials.map((material, i) => (
                              <li
                                key={i}
                                className={`text-xs flex items-center transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                <span className="mr-2">•</span> {material}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                        >
                          Lihat Tutorial
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contribute Knowledge */}
              <div className="mt-12">
                <div
                  className={`rounded-xl p-8 border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800 to-slate-700/80 border-slate-700/50"
                      : "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-100/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3
                        className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Bagikan Pengetahuan Anda
                      </h3>
                      <p
                        className={`transition-colors duration-500 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Punya tips atau panduan ramah lingkungan? Bagikan dengan komunitas untuk menginspirasi lebih
                        banyak orang!
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                      >
                        <Share2 className="inline-block mr-2 h-5 w-5" />
                        Bagikan Pengetahuan
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari acara lingkungan..."
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700/50 text-white placeholder-slate-400"
                        : "bg-white/70 border-slate-200/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm flex items-center space-x-2 ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700/50 text-white"
                        : "bg-white/70 border-slate-200/50 text-slate-900"
                    }`}
                  >
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <span>Lokasi</span>
                  </button>
                  <button
                    className={`px-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm flex items-center space-x-2 ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700/50 text-white"
                        : "bg-white/70 border-slate-200/50 text-slate-900"
                    }`}
                  >
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <span>Tanggal</span>
                  </button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <h3
                  className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Acara Mendatang
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              event.category === "cleanup"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                                : event.category === "workshop"
                                  ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                                  : event.category === "webinar"
                                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                            }`}
                          >
                            {event.category === "cleanup"
                              ? "Bersih-bersih"
                              : event.category === "workshop"
                                ? "Workshop"
                                : event.category === "webinar"
                                  ? "Webinar"
                                  : "Penanaman"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4
                          className={`text-lg font-bold mb-2 transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {event.title}
                        </h4>
                        <p
                          className={`text-xs mb-3 transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Oleh: {event.organizer}
                        </p>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span
                              className={`text-xs transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {event.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span
                              className={`text-xs transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {event.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span
                              className={`text-xs transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span
                              className={`transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              Partisipan
                            </span>
                            <span
                              className={`font-medium transition-colors duration-500 ${
                                theme === "dark" ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {event.participants}/{event.maxParticipants}
                            </span>
                          </div>
                          <div
                            className={`w-full rounded-full h-1.5 transition-colors duration-500 ${
                              theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                            }`}
                          >
                            <div
                              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                        >
                          Daftar
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Calendar View */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Kalender Acara
                  </h3>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-slate-700 hover:bg-slate-600 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      Bulan
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                          : "bg-white hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      Minggu
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                          : "bg-white hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      Hari
                    </motion.button>
                  </div>
                </div>

                <div
                  className={`rounded-xl overflow-hidden border transition-all duration-300 ${
                    theme === "dark" ? "border-slate-700/50" : "border-slate-200/50"
                  }`}
                >
                  <div
                    className={`p-6 transition-colors duration-500 ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4
                        className={`font-bold transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Juni 2025
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          className={`p-1 rounded-lg transition-colors duration-300 ${
                            theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-100"
                          }`}
                        >
                          <ChevronRight className="h-5 w-5 text-slate-400 transform rotate-180" />
                        </button>
                        <button
                          className={`p-1 rounded-lg transition-colors duration-300 ${
                            theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-100"
                          }`}
                        >
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, i) => (
                        <div
                          key={i}
                          className={`text-center py-2 text-sm font-medium transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 30 }, (_, i) => {
                        const day = i + 1
                        const hasEvent = [15, 18, 24, 26, 28, 30].includes(day)
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className={`text-center py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              hasEvent
                                ? theme === "dark"
                                  ? "bg-emerald-500/20 hover:bg-emerald-500/30"
                                  : "bg-emerald-100 hover:bg-emerald-200"
                                : theme === "dark"
                                  ? "hover:bg-slate-700"
                                  : "hover:bg-slate-100"
                            }`}
                          >
                            <span
                              className={`text-sm font-medium transition-colors duration-500 ${
                                hasEvent
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : theme === "dark"
                                    ? "text-white"
                                    : "text-slate-900"
                              }`}
                            >
                              {day}
                            </span>
                            {hasEvent && (
                              <div className="mt-1 flex justify-center">
                                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Event */}
              <div className="mt-12">
                <div
                  className={`rounded-xl p-8 border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800 to-slate-700/80 border-slate-700/50"
                      : "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-100/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3
                        className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Buat Acara Lingkungan
                      </h3>
                      <p
                        className={`transition-colors duration-500 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Punya ide untuk aksi lingkungan? Buat acara dan ajak komunitas untuk berpartisipasi!
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                      <Calendar className="inline-block mr-2 h-5 w-5" />
                      Buat Acara
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
    </div>
  )
}

export default Community
