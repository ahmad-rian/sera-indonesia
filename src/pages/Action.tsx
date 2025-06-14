"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TreePine,
  Users,
  Building,
  Megaphone,
  Target,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Users2,
  Recycle,
  Car,
  Zap,
  Droplets,
  TrendingUp,
  Star,
  Trophy,
  Globe,
  Phone,
  Mail,
  Search,
} from "lucide-react"

import { useTheme } from "../context/ThemeContext"

interface Challenge {
  id: number
  title: string
  description: string
  points: number
  difficulty: string
  category: string
  icon: any
  timeLimit: string
  participants: number
  completed: boolean
}

const Action = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("personal")
  const [userProfile, setUserProfile] = useState({
    name: "Eco Warrior",
    level: "Advanced",
    points: 2340,
    rank: "Top 5%",
    treesPlanted: 12,
    carbonSaved: 245,
    wasteReduced: 156,
    streak: 15,
  })
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([])
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const dailyChallenges: Challenge[] = [
    {
      id: 1,
      title: "Kurangi Plastik Sekali Pakai",
      description: "Gunakan tumbler dan tas belanja sendiri hari ini",
      points: 50,
      difficulty: "Easy",
      category: "waste",
      icon: Recycle,
      timeLimit: "24 jam",
      participants: 1247,
      completed: false,
    },
    {
      id: 2,
      title: "Gunakan Transportasi Umum",
      description: "TransJakarta, KRL, atau angkot untuk perjalanan hari ini",
      points: 30,
      difficulty: "Easy",
      category: "transport",
      icon: Car,
      timeLimit: "24 jam",
      participants: 892,
      completed: true,
    },
    {
      id: 3,
      title: "Hemat Energi 2 Jam",
      description: "Matikan perangkat elektronik yang tidak perlu",
      points: 20,
      difficulty: "Easy",
      category: "energy",
      icon: Zap,
      timeLimit: "2 jam",
      participants: 634,
      completed: false,
    },
    {
      id: 4,
      title: "Plant Virtual Tree",
      description: "Donasi untuk program penanaman pohon Kalimantan",
      points: 100,
      difficulty: "Medium",
      category: "conservation",
      icon: TreePine,
      timeLimit: "Unlimited",
      participants: 2156,
      completed: false,
    },
    {
      id: 5,
      title: "Hemat Air 50 Liter",
      description: "Kurangi penggunaan air dengan mandi lebih singkat",
      points: 40,
      difficulty: "Medium",
      category: "water",
      icon: Droplets,
      timeLimit: "24 jam",
      participants: 567,
      completed: false,
    },
  ]

  const communityInitiatives = [
    {
      id: 1,
      title: "Bersih-Bersih Pantai Ancol",
      location: "Jakarta Utara",
      date: "2025-06-20",
      time: "07:00 WIB",
      participants: 156,
      maxParticipants: 200,
      organizer: "Jakarta Green Community",
      description: "Aksi bersih-bersih pantai untuk mengurangi sampah plastik di pesisir Jakarta",
      category: "cleanup",
      status: "upcoming",
      impact: "500 kg sampah ditargetkan",
      requirements: ["Bawa sarung tangan", "Pakai pakaian nyaman", "Bawa air minum"],
    },
    {
      id: 2,
      title: "Penanaman 1000 Pohon Mangrove",
      location: "Muara Angke, Jakarta",
      date: "2025-06-25",
      time: "06:00 WIB",
      participants: 89,
      maxParticipants: 150,
      organizer: "Mangrove Care Indonesia",
      description: "Program restorasi mangrove untuk melindungi pesisir Jakarta dari abrasi",
      category: "planting",
      status: "upcoming",
      impact: "1000 bibit mangrove",
      requirements: ["Siap basah-basahan", "Bawa sepatu khusus", "Registrasi wajib"],
    },
    {
      id: 3,
      title: "Bike to Work Challenge",
      location: "Seluruh Jakarta",
      date: "2025-06-16 - 2025-06-22",
      time: "Seminggu penuh",
      participants: 2341,
      maxParticipants: 5000,
      organizer: "Jakarta Bike Community",
      description: "Kampanye bersepeda ke kantor untuk mengurangi polusi udara Jakarta",
      category: "transport",
      status: "ongoing",
      impact: "500 ton CO2 berkurang",
      requirements: ["Punya sepeda", "Helm safety", "Dokumentasi perjalanan"],
    },
    {
      id: 4,
      title: "Zero Waste Workshop",
      location: "Bandung Creative Hub",
      date: "2025-06-18",
      time: "13:00 WIB",
      participants: 34,
      maxParticipants: 50,
      organizer: "Bandung Zero Waste",
      description: "Workshop membuat produk ramah lingkungan dari sampah rumah tangga",
      category: "education",
      status: "upcoming",
      impact: "Skill zero waste",
      requirements: ["Bawa sampah plastik bersih", "Alat tulis", "Semangat belajar"],
    },
  ]

  const corporateActions = [
    {
      id: 1,
      company: "PT Unilever Indonesia",
      title: "Sustainable Living Plan 2025",
      description: "Program komprehensif mengurangi jejak karbon dan waste-to-zero initiative",
      certification: "B-Corp Certified",
      volunteerHours: 12450,
      carbonOffset: "25,000 ton CO2",
      participants: 8900,
      programs: ["Plastic reduction", "Clean water access", "Sustainable sourcing"],
      impact: "Zero waste to landfill achieved",
      joinable: true,
    },
    {
      id: 2,
      company: "Bank Mandiri",
      title: "Green Finance Initiative",
      description: "Pembiayaan hijau untuk UMKM dan proyek renewable energy di Indonesia",
      certification: "ISO 14001",
      volunteerHours: 8750,
      carbonOffset: "15,000 ton CO2",
      participants: 5600,
      programs: ["Green lending", "Paperless banking", "Solar energy"],
      impact: "1000+ UMKM terbantu",
      joinable: true,
    },
    {
      id: 3,
      company: "Telkom Indonesia",
      title: "Digital for Environment",
      description: "Digitalisasi untuk efisiensi energi dan smart city solutions",
      certification: "Green Building",
      volunteerHours: 6890,
      carbonOffset: "18,500 ton CO2",
      participants: 7200,
      programs: ["Smart grid", "IoT for environment", "Digital inclusion"],
      impact: "30% energy reduction",
      joinable: false,
    },
  ]

  const advocacyActions = [
    {
      id: 1,
      title: "Tolak Pembangunan Pabrik di Kawasan Hijau",
      description: "Petisi menolak pembangunan pabrik semen di kawasan konservasi Kendeng, Jawa Tengah",
      target: 50000,
      current: 34567,
      category: "petition",
      urgency: "high",
      deadline: "2025-07-01",
      organizer: "Walhi Jawa Tengah",
      impact: "Lindungi 2000 hektar hutan lindung",
      status: "active",
    },
    {
      id: 2,
      title: "Dukung RUU Pengelolaan Sampah Plastik",
      description: "Kampanye mendukung regulasi ketat untuk pengurangan sampah plastik nasional",
      target: 100000,
      current: 78543,
      category: "support",
      urgency: "medium",
      deadline: "2025-08-15",
      organizer: "Greenpeace Indonesia",
      impact: "Kurangi 60% sampah plastik",
      status: "active",
    },
    {
      id: 3,
      title: "Moratorium Izin Tambang Baru",
      description: "Petisi moratorium pemberian izin tambang baru di wilayah hutan Indonesia",
      target: 75000,
      current: 89234,
      category: "petition",
      urgency: "high",
      deadline: "Achieved",
      organizer: "Forest Watch Indonesia",
      impact: "Selamatkan 500,000 hektar hutan",
      status: "completed",
    },
  ]

  const tabOptions = [
    { id: "personal", name: "Aksi Personal", icon: Target },
    { id: "community", name: "Komunitas", icon: Users },
    { id: "corporate", name: "Korporasi", icon: Building },
    { id: "advocacy", name: "Advokasi", icon: Megaphone },
  ]

  const categoryFilters = [
    { id: "all", name: "Semua" },
    { id: "waste", name: "Sampah" },
    { id: "transport", name: "Transportasi" },
    { id: "energy", name: "Energi" },
    { id: "water", name: "Air" },
    { id: "conservation", name: "Konservasi" },
  ]

  const completeChallenge = (challengeId: number) => {
    setCompletedChallenges((prev) => [...prev, challengeId])
    const challenge = dailyChallenges.find((c) => c.id === challengeId)
    if (challenge) {
      setUserProfile((prev) => ({
        ...prev,
        points: prev.points + challenge.points,
        streak: prev.streak + 1,
      }))
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
      case "Hard":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      waste: Recycle,
      transport: Car,
      energy: Zap,
      water: Droplets,
      conservation: TreePine,
      cleanup: Users2,
      planting: TreePine,
      education: Users,
    }
    return icons[category as keyof typeof icons] || Target
  }

  const filteredChallenges = dailyChallenges.filter((challenge) => {
    const matchesFilter = filter === "all" || challenge.category === filter
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <section
        className={`relative py-20 transition-colors duration-500 overflow-hidden ${
          theme === "dark" ? "bg-slate-900" : "bg-white"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-50 dark:bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-50 dark:bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_800px_600px_at_50%_200px,black,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
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
                Bergabung dengan 234,567 Eco Warriors
              </span>
            </motion.div>

            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              🌱{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Aksi Nyata
              </span>
              <br />
              Untuk Bumi Indonesia
            </h1>

            <p
              className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto transition-colors duration-500 ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Platform aksi lingkungan terlengkap di Indonesia. Mulai dari tantangan harian, bergabung dengan komunitas,
              hingga advokasi kebijakan lingkungan.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`inline-block p-8 rounded-2xl border shadow-xl transition-colors duration-500 ${
                theme === "dark"
                  ? "bg-slate-800/80 border-slate-700/50 backdrop-blur-xl"
                  : "bg-white/80 border-slate-200/50 backdrop-blur-xl"
              }`}
            >
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="h-3 w-3 text-yellow-800" />
                  </div>
                </div>
                <div className="text-left">
                  <h3
                    className={`text-xl font-bold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {userProfile.name}
                  </h3>
                  <p
                    className={`transition-colors duration-500 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Level {userProfile.level} • {userProfile.rank}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Eco Points",
                    value: userProfile.points.toLocaleString(),
                    icon: Star,
                    color: "text-yellow-500",
                  },
                  { label: "Trees Planted", value: userProfile.treesPlanted, icon: TreePine, color: "text-green-500" },
                  { label: "CO2 Saved", value: `${userProfile.carbonSaved}kg`, icon: Globe, color: "text-blue-500" },
                  { label: "Day Streak", value: userProfile.streak, icon: TrendingUp, color: "text-purple-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                    <div
                      className={`text-2xl font-bold transition-colors duration-500 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-500 ${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 ${
          theme === "dark" ? "bg-slate-900/95 border-slate-700/50" : "bg-white/95 border-slate-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-6">
            {tabOptions.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : theme === "dark"
                      ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 backdrop-blur-sm"
                      : "text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 backdrop-blur-sm"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "personal" && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari tantangan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700/50 text-white placeholder-slate-400"
                        : "bg-white/70 border-slate-200/50 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`px-4 py-3 rounded-lg border transition-colors duration-300 backdrop-blur-sm ${
                    theme === "dark"
                      ? "bg-slate-800/70 border-slate-700/50 text-white"
                      : "bg-white/70 border-slate-200/50 text-slate-900"
                  }`}
                >
                  {categoryFilters.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h2
                  className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  🎯 Tantangan Harian
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredChallenges.map((challenge, index) => {
                    const IconComponent = challenge.icon
                    const isCompleted = completedChallenges.includes(challenge.id) || challenge.completed

                    return (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`relative rounded-2xl p-6 border shadow-lg transition-all duration-300 backdrop-blur-sm ${
                          theme === "dark"
                            ? "bg-slate-800/80 border-slate-700/50 hover:border-emerald-500/50"
                            : "bg-white/80 border-slate-200/50 hover:border-emerald-500/50"
                        } ${isCompleted ? "opacity-75" : ""}`}
                      >
                        {isCompleted && (
                          <div className="absolute top-4 right-4">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          </div>
                        )}

                        <div className="flex items-start space-x-4 mb-4">
                          <div
                            className={`p-3 rounded-lg ${
                              challenge.category === "waste"
                                ? "bg-orange-100 dark:bg-orange-500/20"
                                : challenge.category === "transport"
                                  ? "bg-blue-100 dark:bg-blue-500/20"
                                  : challenge.category === "energy"
                                    ? "bg-yellow-100 dark:bg-yellow-500/20"
                                    : challenge.category === "water"
                                      ? "bg-cyan-100 dark:bg-cyan-500/20"
                                      : "bg-green-100 dark:bg-green-500/20"
                            }`}
                          >
                            <IconComponent
                              className={`h-6 w-6 ${
                                challenge.category === "waste"
                                  ? "text-orange-600 dark:text-orange-400"
                                  : challenge.category === "transport"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : challenge.category === "energy"
                                      ? "text-yellow-600 dark:text-yellow-400"
                                      : challenge.category === "water"
                                        ? "text-cyan-600 dark:text-cyan-400"
                                        : "text-green-600 dark:text-green-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(challenge.difficulty)}`}
                              >
                                {challenge.difficulty}
                              </span>
                              <span className="text-lg font-bold text-emerald-500">+{challenge.points} pts</span>
                            </div>
                          </div>
                        </div>

                        <h3
                          className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {challenge.title}
                        </h3>

                        <p
                          className={`text-sm mb-4 transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {challenge.description}
                        </p>

                        <div className="flex items-center justify-between text-sm mb-6">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span
                              className={`transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {challenge.participants}
                            </span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => completeChallenge(challenge.id)}
                          disabled={isCompleted}
                          className={`w-full py-3 px-4 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                            isCompleted
                              ? "bg-green-500 text-white cursor-not-allowed"
                              : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                          }`}
                        >
                          {isCompleted ? "Selesai!" : "Mulai Challenge"}
                        </motion.button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div>
                <h2
                  className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  👥 Inisiatif Komunitas
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {communityInitiatives.map((initiative, index) => (
                    <motion.div
                      key={initiative.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-2xl p-6 border shadow-lg transition-all duration-300 backdrop-blur-sm ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              initiative.category === "cleanup"
                                ? "bg-blue-100 dark:bg-blue-500/20"
                                : initiative.category === "planting"
                                  ? "bg-green-100 dark:bg-green-500/20"
                                  : initiative.category === "transport"
                                    ? "bg-purple-100 dark:bg-purple-500/20"
                                    : "bg-orange-100 dark:bg-orange-500/20"
                            }`}
                          >
                            {(() => {
                              const CategoryIcon = getCategoryIcon(initiative.category)
                              return (
                                <CategoryIcon
                                  className={`h-5 w-5 ${
                                    initiative.category === "cleanup"
                                      ? "text-blue-600 dark:text-blue-400"
                                      : initiative.category === "planting"
                                        ? "text-green-600 dark:text-green-400"
                                        : initiative.category === "transport"
                                          ? "text-purple-600 dark:text-purple-400"
                                          : "text-orange-600 dark:text-orange-400"
                                  }`}
                                />
                              )
                            })()}
                          </div>
                          <div>
                            <h3
                              className={`text-lg font-bold transition-colors duration-500 ${
                                theme === "dark" ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {initiative.title}
                            </h3>
                            <p
                              className={`text-sm transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {initiative.organizer}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            initiative.status === "upcoming"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                              : initiative.status === "ongoing"
                                ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400"
                          }`}
                        >
                          {initiative.status === "upcoming"
                            ? "Mendatang"
                            : initiative.status === "ongoing"
                              ? "Berlangsung"
                              : "Selesai"}
                        </span>
                      </div>

                      <p
                        className={`text-sm mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {initiative.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span
                            className={`text-sm transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            {initiative.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span
                            className={`text-sm transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            {initiative.date}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
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
                            {initiative.participants}/{initiative.maxParticipants}
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 transition-colors duration-500 ${
                            theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(initiative.participants / initiative.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "bg-slate-700/50" : "bg-slate-50/80"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">Impact</span>
                        </div>
                        <p
                          className={`text-sm transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {initiative.impact}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Daftar Sekarang
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "corporate" && (
            <motion.div
              key="corporate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div>
                <h2
                  className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  🏢 Aksi Korporasi
                </h2>

                <div className="space-y-8">
                  {corporateActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-2xl p-8 border shadow-lg transition-all duration-300 backdrop-blur-sm ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3
                                className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
                                  theme === "dark" ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {action.company}
                              </h3>
                              <p className={`text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2`}>
                                {action.title}
                              </p>
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                                {action.certification}
                              </span>
                            </div>
                            <div className={`text-right ${action.joinable ? "" : "opacity-50"}`}>
                              <span
                                className={`text-xs transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                                }`}
                              >
                                Status
                              </span>
                              <p className={`font-semibold ${action.joinable ? "text-green-500" : "text-gray-500"}`}>
                                {action.joinable ? "Open" : "Internal"}
                              </p>
                            </div>
                          </div>

                          <p
                            className={`text-base mb-6 transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-300" : "text-slate-600"
                            }`}
                          >
                            {action.description}
                          </p>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="text-center">
                              <div className="text-xl font-bold text-blue-500">
                                {action.volunteerHours.toLocaleString()}
                              </div>
                              <div
                                className={`text-xs transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                Volunteer Hours
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-500">{action.carbonOffset}</div>
                              <div
                                className={`text-xs transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                Carbon Offset
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-purple-500">
                                {action.participants.toLocaleString()}
                              </div>
                              <div
                                className={`text-xs transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                Participants
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-orange-500">{action.programs.length}</div>
                              <div
                                className={`text-xs transition-colors duration-500 ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                Programs
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {action.programs.map((program, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 text-sm rounded-full transition-colors duration-500 ${
                                  theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {program}
                              </span>
                            ))}
                          </div>

                          <div
                            className={`p-4 rounded-lg mb-6 transition-colors duration-500 ${
                              theme === "dark" ? "bg-slate-700/50" : "bg-emerald-50/80"
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Award className="h-4 w-4 text-emerald-500" />
                              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                Key Achievement
                              </span>
                            </div>
                            <p
                              className={`text-sm transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-300" : "text-emerald-700"
                              }`}
                            >
                              {action.impact}
                            </p>
                          </div>

                          {action.joinable && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              Join Corporate Program
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "advocacy" && (
            <motion.div
              key="advocacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div>
                <h2
                  className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  📢 Hub Advokasi
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {advocacyActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-2xl p-6 border shadow-lg transition-all duration-300 backdrop-blur-sm ${
                        theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-lg ${
                              action.urgency === "high"
                                ? "bg-red-100 dark:bg-red-500/20"
                                : action.urgency === "medium"
                                  ? "bg-yellow-100 dark:bg-yellow-500/20"
                                  : "bg-blue-100 dark:bg-blue-500/20"
                            }`}
                          >
                            <Megaphone
                              className={`h-5 w-5 ${
                                action.urgency === "high"
                                  ? "text-red-600 dark:text-red-400"
                                  : action.urgency === "medium"
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-blue-600 dark:text-blue-400"
                              }`}
                            />
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              action.category === "petition"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                                : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                            }`}
                          >
                            {action.category === "petition" ? "Petisi" : "Dukungan"}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            action.status === "active"
                              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                          }`}
                        >
                          {action.status === "active" ? "Aktif" : "Tercapai"}
                        </span>
                      </div>

                      <h3
                        className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {action.title}
                      </h3>

                      <p
                        className={`text-sm mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {action.description}
                      </p>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span
                            className={`transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            Progress
                          </span>
                          <span
                            className={`font-medium transition-colors duration-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {action.current.toLocaleString()} / {action.target.toLocaleString()}
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-3 transition-colors duration-500 ${
                            theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              action.current >= action.target ? "bg-green-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${Math.min((action.current / action.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span
                            className={`text-xs transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            Organizer
                          </span>
                          <p
                            className={`font-medium transition-colors duration-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {action.organizer}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`text-xs transition-colors duration-500 ${
                              theme === "dark" ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            Deadline
                          </span>
                          <p
                            className={`font-medium ${
                              action.deadline === "Achieved"
                                ? "text-green-500"
                                : theme === "dark"
                                  ? "text-white"
                                  : "text-slate-900"
                            }`}
                          >
                            {action.deadline}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg mb-4 transition-colors duration-500 ${
                          theme === "dark" ? "bg-slate-700/50" : "bg-emerald-50/80"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">Expected Impact</span>
                        </div>
                        <p
                          className={`text-sm transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-300" : "text-emerald-700"
                          }`}
                        >
                          {action.impact}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={action.status === "completed"}
                        className={`w-full py-3 px-4 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                          action.status === "completed"
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                        }`}
                      >
                        {action.status === "completed" ? "Target Tercapai!" : "Dukung Sekarang"}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`rounded-2xl p-8 border shadow-xl transition-colors duration-500 backdrop-blur-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/90 to-slate-700/90 border-slate-600/50"
                      : "bg-gradient-to-br from-blue-50/90 to-emerald-50/90 border-blue-200/50"
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    📞 Kontak Pemerintah
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Kementerian LHK",
                        phone: "021-5720227",
                        email: "info@menlhk.go.id",
                        description: "Laporan deforestasi dan pencemaran",
                      },
                      {
                        title: "DPR RI",
                        phone: "021-5715566",
                        email: "humas@dpr.go.id",
                        description: "Aspirasi kebijakan lingkungan",
                      },
                      {
                        title: "Ombudsman RI",
                        phone: "021-7918387",
                        email: "info@ombudsman.go.id",
                        description: "Pengaduan layanan publik",
                      },
                    ].map((contact, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm ${
                          theme === "dark" ? "bg-slate-800/80 border-slate-700/50" : "bg-white/80 border-slate-200/50"
                        }`}
                      >
                        <h4
                          className={`font-bold mb-3 transition-colors duration-500 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {contact.title}
                        </h4>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-blue-500" />
                            <span
                              className={`text-sm transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-300" : "text-slate-600"
                              }`}
                            >
                              {contact.phone}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-green-500" />
                            <span
                              className={`text-sm transition-colors duration-500 ${
                                theme === "dark" ? "text-slate-300" : "text-slate-600"
                              }`}
                            >
                              {contact.email}
                            </span>
                          </div>
                        </div>

                        <p
                          className={`text-xs mt-3 transition-colors duration-500 ${
                            theme === "dark" ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {contact.description}
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                          Hubungi
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section
        className={`relative py-16 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90"
            : "bg-gradient-to-br from-emerald-50/90 to-blue-50/90"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-50 dark:bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-50 dark:bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              🌍 Bersama Kita Bisa Ubah Indonesia
            </h2>
            <p
              className={`text-xl mb-8 transition-colors duration-500 ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Setiap aksi kecil Anda berkontribusi pada perubahan besar untuk lingkungan Indonesia. Mari mulai hari ini!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Mulai Aksi Sekarang
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 border-2 font-bold rounded-xl transition-all duration-200 backdrop-blur-sm ${
                  theme === "dark"
                    ? "border-slate-600/50 text-white hover:bg-slate-800/50"
                    : "border-slate-300/50 text-slate-900 hover:bg-white/50"
                }`}
              >
                Pelajari Lebih Lanjut
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Action
