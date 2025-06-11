import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Thermometer, 
  Trees, 
  Waves, 
  Cloud,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  Users,
  DollarSign,
  Calculator,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

const StatsSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isNewsAutoplay, setIsNewsAutoplay] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll news - reduced frequency
  useEffect(() => {
    if (!isNewsAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000); // Increased to 5 seconds
    
    return () => clearInterval(interval);
  }, [isNewsAutoplay]);

  const quickStats = [
    {
      icon: Thermometer,
      title: "Kualitas Udara Jakarta",
      value: "156",
      unit: "AQI",
      status: "Tidak Sehat",
      trend: "up",
      change: "+12",
      color: "red",
      bgGradient: "from-red-500/10 to-orange-500/10",
      borderColor: "border-red-200 dark:border-red-800"
    },
    {
      icon: Trees,
      title: "Deforestasi Bulan Ini",
      value: "12,345",
      unit: "Hektar",
      status: "Tinggi",
      trend: "down",
      change: "-8%",
      color: "orange",
      bgGradient: "from-orange-500/10 to-yellow-500/10",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    {
      icon: Waves,
      title: "Status Raja Ampat",
      value: "KRITIS",
      unit: "45% Pemutihan",
      status: "Darurat",
      trend: "up",
      change: "+15%",
      color: "red",
      bgGradient: "from-red-500/10 to-pink-500/10",
      borderColor: "border-red-200 dark:border-red-800"
    },
    {
      icon: Cloud,
      title: "Emisi Karbon Hari Ini",
      value: "2.3M",
      unit: "Ton CO2",
      status: "Tinggi",
      trend: "up",
      change: "+5%",
      color: "slate",
      bgGradient: "from-slate-500/10 to-gray-500/10",
      borderColor: "border-slate-200 dark:border-slate-700"
    }
  ];

  const breakingNews = [
    {
      id: 1,
      title: "Kebakaran Hutan Riau Meluas - 156 Titik Api Terdeteksi",
      time: "2 jam lalu",
      urgent: true,
      hashtags: ["#KarhutlaRiau", "#DaruratAsap"],
      image: "🔥"
    },
    {
      id: 2,
      title: "Pemutihan Karang Raja Ampat Mencapai 45% - Status Kritis",
      time: "4 jam lalu", 
      urgent: true,
      hashtags: ["#SaveRajaAmpat", "#CoralBleaching"],
      image: "🐠"
    },
    {
      id: 3,
      title: "Jakarta Peringkat 3 Kota Terpolusi Dunia Hari Ini",
      time: "6 jam lalu",
      urgent: false,
      hashtags: ["#JakartaPollution", "#AirQuality"],
      image: "🏭"
    },
    {
      id: 4,
      title: "Deforestasi Kalimantan Meningkat 23% dalam 3 Bulan Terakhir",
      time: "8 jam lalu",
      urgent: false,
      hashtags: ["#StopDeforestasi", "#SaveKalimantan"],
      image: "🌳"
    }
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Laporkan Pencemaran",
      description: "Laporkan masalah lingkungan di sekitar Anda",
      color: "emerald",
      bgColor: "bg-emerald-500",
      reports: "1,234"
    },
    {
      icon: DollarSign,
      title: "Donasi Konservasi", 
      description: "Dukung program pelestarian alam Indonesia",
      color: "blue",
      bgColor: "bg-blue-500",
      reports: "Rp 2.1M"
    },
    {
      icon: Users,
      title: "Join Local Action",
      description: "Bergabung dengan komunitas lingkungan terdekat",
      color: "purple",
      bgColor: "bg-purple-500",
      reports: "89 Grup"
    },
    {
      icon: Calculator,
      title: "Hitung Carbon Footprint",
      description: "Ukur jejak karbon aktivitas harian Anda",
      color: "teal",
      bgColor: "bg-teal-500",
      reports: "Free"
    }
  ];

  const communityStats = [
    { label: "Total Laporan", value: "15,432", icon: Eye },
    { label: "Pengguna Aktif", value: "89,123", icon: Users },
    { label: "Dana Terkumpul", value: "Rp 45M", icon: DollarSign }
  ];

  // Simplified animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/50 py-16 lg:py-20 overflow-hidden">
      
      {/* Simplified Background - Only 2 elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-50 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-50 dark:bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simplified Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Status Lingkungan Indonesia
            <span className="text-emerald-600 dark:text-emerald-400"> Real-time</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Pantau kondisi terkini lingkungan Indonesia dan ambil aksi untuk perubahan yang lebih baik
          </p>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
            <span className="inline-flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              LIVE
            </span>
            {" "}Last updated: {currentTime.toLocaleTimeString('id-ID')} WIB
          </div>
        </motion.div>

        {/* Optimized Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 rounded-2xl p-6 shadow-lg border ${stat.borderColor} hover:shadow-xl transition-all duration-300 group cursor-pointer`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.bgGradient} mb-4 group-hover:scale-105 transition-transform duration-200`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-500/20 text-${stat.color}-700 dark:text-${stat.color}-300`}>
                    {stat.status}
                  </span>
                  <div className={`flex items-center space-x-1 text-xs ${stat.trend === 'up' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* News & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Optimized News Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse" />
                  Breaking News Environmental
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Live Feed</span>
                  <button
                    onClick={() => setIsNewsAutoplay(!isNewsAutoplay)}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {isNewsAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {/* Simplified News Carousel */}
              <div className="relative h-48 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNewsIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700"
                  >
                    <div className="flex items-start space-x-4 h-full">
                      <div className="text-3xl">
                        {breakingNews[currentNewsIndex].image}
                      </div>
                      <div className="flex-1 min-w-0">
                        {breakingNews[currentNewsIndex].urgent && (
                          <div className="flex items-center mb-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-xs text-red-500 font-semibold">URGENT</span>
                          </div>
                        )}
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 leading-tight">
                          {breakingNews[currentNewsIndex].title}
                        </h4>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {breakingNews[currentNewsIndex].time}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {breakingNews[currentNewsIndex].hashtags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="text-xs bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Simple Navigation */}
                <button
                  onClick={prevNews}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-lg hover:scale-105 transition-transform"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextNews}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-lg hover:scale-105 transition-transform"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              {/* Simple Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {breakingNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentNewsIndex 
                        ? 'bg-emerald-500 w-6' 
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Statistik Komunitas
              </h3>
              <div className="space-y-4">
                {communityStats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-600/50 transition-colors duration-200 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <stat.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simplified Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Quick Action Hub
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Mulai berkontribusi untuk lingkungan Indonesia hari ini
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`inline-flex p-3 rounded-xl ${action.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-3 py-1 rounded-full bg-${action.color}-100 dark:bg-${action.color}-500/20 text-${action.color}-700 dark:text-${action.color}-300 font-medium`}>
                    {action.reports}
                  </span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;