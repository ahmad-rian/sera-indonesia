import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import createGlobe from 'cobe';
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
  Waves,
  AlertTriangle,
  Filter,
  TrendingUp,
  Eye,
  Share2,
  Phone,
  DollarSign,
  UserPlus,
  ExternalLink,
  RefreshCw,
  Bell,
  Heart,
  ChevronRight,
  Play,
  Pause,
  ZoomIn,
  Target,
  BarChart3,
  X,
  Sun,
  Moon
} from 'lucide-react';

// Modern Globe Component
const Globe = ({ className, config }) => {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / 1400);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      width: width * 2,
      height: width * 2,
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: 0.2,
      diffuse: 0.8,
      mapSamples: 16000,
      mapBrightness: 1.8,
      baseColor: [0.1, 0.7, 0.5],
      markerColor: [1, 0.3, 0.3],
      glowColor: [0.2, 0.8, 1],
      markers: [
        // Indonesia Crisis Hotspots
        { location: [0.5, 101.4], size: 0.08 }, // Riau - Forest Fires
        { location: [-6.2, 106.8], size: 0.06 }, // Jakarta - Air Pollution
        { location: [-0.5, 130.8], size: 0.07 }, // Raja Ampat - Coral Bleaching
        { location: [-2.7, 107.6], size: 0.05 }, // Belitung - Illegal Mining
        { location: [-0.2, 117.4], size: 0.06 }, // Central Kalimantan - Deforestation
        { location: [-7.8, 110.4], size: 0.04 }, // Yogyakarta - Urban Pollution
        { location: [3.6, 98.7], size: 0.05 }, // Medan - Industrial Waste
        { location: [-8.3, 115.1], size: 0.05 }, // Bali - Waste Crisis
        { location: [1.5, 124.8], size: 0.04 }, // Manado - Coastal Pollution
        { location: [-3.3, 114.6], size: 0.06 }, // Banjarmasin - River Pollution
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
      ...config,
    });

    setTimeout(() => (canvasRef.current.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        className="w-full h-full opacity-0 transition-opacity duration-500"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
        style={{ maxWidth: '600px', maxHeight: '600px' }}
      />
    </div>
  );
};

const Crisis = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCrisis, setSelectedCrisis] = useState(null);
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isLiveUpdating) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isLiveUpdating]);

  const crisisTypes = [
    { id: 'all', name: 'Semua Krisis', icon: AlertTriangle, color: 'slate', count: 47 },
    { id: 'fire', name: 'Kebakaran Hutan', icon: Flame, color: 'red', count: 12 },
    { id: 'deforestation', name: 'Deforestasi', icon: TreePine, color: 'orange', count: 8 },
    { id: 'pollution', name: 'Polusi Industri', icon: Factory, color: 'purple', count: 15 },
    { id: 'fishing', name: 'Illegal Fishing', icon: Fish, color: 'blue', count: 6 },
    { id: 'waste', name: 'Krisis Sampah', icon: Trash2, color: 'yellow', count: 4 },
    { id: 'mining', name: 'Tambang Ilegal', icon: Mountain, color: 'emerald', count: 2 }
  ];

  const urgentCrisis = [
    {
      id: 1,
      title: "BREAKING: Kebakaran Hutan Masif di Riau",
      location: "Riau",
      timeAgo: "2 jam lalu",
      concernedPeople: 15432,
      severity: "KRITIS",
      type: "fire",
      description: "156 titik api terdeteksi satelit dengan laju deforestasi mencapai 2,340 hektar per hari, mengancam habitat orangutan dan gajah Sumatera",
      impact: "2,340 hektar hutan hilang hari ini",
      coordinates: [0.5, 101.4],
      image: "https://images.unsplash.com/photo-1574263867128-ad2d21b2ced8?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "ALERT: Polusi Udara Jakarta Memburuk",
      location: "DKI Jakarta", 
      timeAgo: "1 jam lalu",
      concernedPeople: 23156,
      severity: "BURUK",
      type: "pollution",
      description: "Konsentrasi PM2.5 mencapai level berbahaya dengan AQI 156, melebihi standar WHO dan mengancam kesehatan 10 juta penduduk",
      impact: "10 juta penduduk terpapar polusi berbahaya",
      coordinates: [-6.2, 106.8],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "URGENT: Deforestasi Kalimantan Accelerating",
      location: "Kalimantan Tengah",
      timeAgo: "4 jam lalu",
      concernedPeople: 8924,
      severity: "KRITIS",
      type: "deforestation",
      description: "Pembukaan lahan untuk perkebunan kelapa sawit menyebabkan hilangnya 1,800 hektar hutan hujan primer dalam sebulan terakhir",
      impact: "1,800 hektar hutan primer hilang bulan ini",
      coordinates: [-0.2, 117.4],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "CRITICAL: Illegal Mining di Belitung",
      location: "Bangka Belitung",
      timeAgo: "6 jam lalu", 
      concernedPeople: 4567,
      severity: "TINGGI",
      type: "mining",
      description: "Tambang timah ilegal merusak ekosistem laut dan mengancam kehidupan nelayan lokal, mencemari 500 hektar perairan",
      impact: "500 hektar laut tercemar timah",
      coordinates: [-2.7, 107.6],
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "EMERGENCY: Krisis Sampah Plastik Bali",
      location: "Bali",
      timeAgo: "3 jam lalu",
      concernedPeople: 12890,
      severity: "KRITIS", 
      type: "waste",
      description: "1,200 ton sampah plastik mengapung di perairan Bali, mengancam pariwisata dan ekosistem laut, ribuan ikan mati",
      impact: "Ribuan ikan mati, pariwisata terancam",
      coordinates: [-8.3, 115.1],
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "ALERT: Pencemaran Sungai Citarum",
      location: "Jawa Barat",
      timeAgo: "5 jam lalu",
      concernedPeople: 18743,
      severity: "BURUK",
      type: "pollution",
      description: "Limbah industri tekstil mencemari Sungai Citarum, mengancam sumber air bersih untuk 15 juta penduduk Jawa Barat",
      impact: "15 juta penduduk terancam krisis air bersih",
      coordinates: [-6.9, 107.6],
      image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&h=300&fit=crop"
    }
  ];

  const actionButtons = [
    {
      id: 'donate',
      title: 'Emergency Donation',
      description: 'Donasi untuk krisis lingkungan terkini',
      icon: DollarSign,
      color: 'emerald',
      bgColor: 'bg-emerald-500',
      amount: 'Rp 2.1M terkumpul',
      action: 'Donasi Sekarang'
    },
    {
      id: 'volunteer',
      title: 'Join Volunteer',
      description: 'Bergabung dengan program relawan',
      icon: UserPlus,
      color: 'blue',
      bgColor: 'bg-blue-500',
      amount: '234 relawan aktif',
      action: 'Daftar Volunteer'
    },
    {
      id: 'share',
      title: 'Share Awareness',
      description: 'Sebarkan kesadaran di media sosial',
      icon: Share2,
      color: 'purple',
      bgColor: 'bg-purple-500',
      amount: '45K shares hari ini',
      action: 'Share Sekarang'
    },
    {
      id: 'contact',
      title: 'Contact Authorities',
      description: 'Hubungi pihak berwajib langsung',
      icon: Phone,
      color: 'red',
      bgColor: 'bg-red-500',
      amount: 'Hotline 24/7',
      action: 'Hubungi Sekarang'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'KRITIS': return 'text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-500/20 dark:border-red-500';
      case 'TINGGI': return 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-400 dark:bg-orange-500/20 dark:border-orange-500';
      case 'BURUK': return 'text-yellow-600 bg-yellow-100 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-500/20 dark:border-yellow-500';
      default: return 'text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-500/20 dark:border-slate-500';
    }
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      fire: Flame,
      deforestation: TreePine,
      pollution: Factory,
      fishing: Fish,
      waste: Trash2,
      mining: Mountain
    };
    return iconMap[type] || AlertTriangle;
  };

  const filteredCrisis = activeFilter === 'all' 
    ? urgentCrisis 
    : urgentCrisis.filter(crisis => crisis.type === activeFilter);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      
      {/* Header Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-emerald-500 to-teal-600 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Live Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                />
                <span className="text-sm font-medium text-white">
                  Live Monitoring Aktif
                </span>
                <div className="h-4 w-px bg-white/30" />
                <span className="text-xs text-white/80">
                  {lastUpdate.toLocaleTimeString('id-ID')} WIB
                </span>
              </motion.div>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="absolute top-4 right-4 lg:top-8 lg:right-8 p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                🌍 KRISIS LINGKUNGAN
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Indonesia
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Monitoring real-time krisis lingkungan Indonesia dari satelit, IoT sensors, dan laporan komunitas. 
                <span className="font-semibold text-yellow-200"> Ambil aksi sekarang sebelum terlambat! </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  <span>Lihat Krisis Urgent</span>
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLiveUpdating(!isLiveUpdating)}
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/20"
                >
                  {isLiveUpdating ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                  <span>{isLiveUpdating ? 'Pause' : 'Resume'} Live Update</span>
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Active Crisis', value: '47', color: 'red' },
                  { label: 'Emergency Level', value: '12', color: 'orange' },
                  { label: 'People Concerned', value: '156K', color: 'emerald' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Globe */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                <Globe className="w-full h-full" />
                
                {/* Floating Crisis Indicators */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 right-1/4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm"
                >
                  🔥 Riau Fire
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-1/3 left-1/4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm"
                >
                  💨 Jakarta Pollution
                </motion.div>
                
                <motion.div
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 right-1/3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm"
                >
                  🌳 Kalimantan
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Crisis Filter Section */}
      <section className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 py-4 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Filter Krisis Lingkungan
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLastUpdate(new Date())}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </motion.button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {crisisTypes.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(type.id)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === type.id
                    ? `bg-${type.color}-500 text-white shadow-lg scale-105`
                    : `bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700`
                }`}
              >
                <type.icon className="h-4 w-4" />
                <span>{type.name}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeFilter === type.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {type.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Feed Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Urgent Crisis Feed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Update terbaru krisis lingkungan yang membutuhkan perhatian segera
            </p>
          </div>

          {/* Crisis Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            <AnimatePresence>
              {filteredCrisis.map((crisis, index) => {
                const TypeIcon = getTypeIcon(crisis.type);
                return (
                  <motion.div
                    key={crisis.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedCrisis(crisis)}
                  >
                    {/* Crisis Image */}
                    <div className="relative w-full h-40 overflow-hidden">
                      <img 
                        src={crisis.image} 
                        alt={crisis.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center space-x-2">
                        <TypeIcon className="h-4 w-4 text-white" />
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getSeverityColor(crisis.severity)}`}>
                          {crisis.severity}
                        </span>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full shadow-lg"
                      />
                    </div>

                    <div className="p-6">
                      {/* Crisis Title */}
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                        {crisis.title}
                      </h3>

                      {/* Crisis Meta */}
                      <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{crisis.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{crisis.timeAgo}</span>
                        </div>
                      </div>

                      {/* Crisis Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                        {crisis.description}
                      </p>

                      {/* Crisis Impact */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 rounded-lg p-3 mb-4 border border-red-100 dark:border-red-500/20">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">
                            Impact: {crisis.impact}
                          </span>
                        </div>
                      </div>

                      {/* Crisis Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                          <Users className="h-4 w-4" />
                          <span>{crisis.concernedPeople.toLocaleString('id-ID')} orang peduli</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                          >
                            <Heart className="h-4 w-4 text-slate-400 hover:text-red-500 transition-colors duration-200" />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                          >
                            <Share2 className="h-4 w-4 text-slate-400 hover:text-blue-500 transition-colors duration-200" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Take Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 dark:from-emerald-500/5 dark:via-blue-500/5 dark:to-purple-500/5 rounded-3xl p-8 lg:p-12 border border-emerald-200/50 dark:border-emerald-800/50 mb-16 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4"
                >
                  🌱 Take Action Now
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-slate-600 dark:text-slate-300"
                >
                  Bergabunglah dalam upaya penyelamatan lingkungan Indonesia. Setiap aksi kecil membuat perbedaan besar.
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {actionButtons.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex p-4 rounded-xl ${action.bgColor} mb-4 shadow-lg`}
                    >
                      <action.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {action.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      {action.description}
                    </p>
                    
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
                      {action.amount}
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 px-4 ${action.bgColor} hover:opacity-90 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl`}
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
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                📞 Emergency Contacts
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Hubungi langsung instansi terkait untuk laporan darurat
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Kementerian LHK',
                  phone: '021-5720227',
                  description: 'Laporan kebakaran hutan dan deforestasi',
                  available: '24/7',
                  color: 'emerald',
                  icon: TreePine
                },
                {
                  title: 'BMKG Emergency',
                  phone: '021-4246321',
                  description: 'Peringatan cuaca dan bencana alam',
                  available: '24/7',
                  color: 'blue',
                  icon: AlertTriangle
                },
                {
                  title: 'Basarnas',
                  phone: '115',
                  description: 'Search and rescue operations',
                  available: '24/7',
                  color: 'red',
                  icon: Phone
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${contact.color}-100 dark:bg-${contact.color}-500/20`}>
                        <contact.icon className={`h-5 w-5 text-${contact.color}-600 dark:text-${contact.color}-400`} />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {contact.title}
                      </h4>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${contact.color}-100 dark:bg-${contact.color}-500/20 text-${contact.color}-700 dark:text-${contact.color}-300`}>
                      {contact.available}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {contact.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {contact.phone}
                    </span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center space-x-2 px-4 py-2 bg-${contact.color}-500 hover:bg-${contact.color}-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg`}
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Real-time Updates Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-full border border-slate-200 dark:border-slate-700 shadow-lg">
              <motion.div
                animate={{ rotate: isLiveUpdating ? 360 : 0 }}
                transition={{ duration: 2, repeat: isLiveUpdating ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Last updated: {lastUpdate.toLocaleTimeString('id-ID')} WIB
              </span>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Auto-refresh: <span className={`font-medium ${isLiveUpdating ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isLiveUpdating ? 'ON' : 'OFF'}
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

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
              {/* Modal Header with Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={selectedCrisis.image} 
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
                      const TypeIcon = getTypeIcon(selectedCrisis.type);
                      return <TypeIcon className="h-5 w-5 text-white" />;
                    })()}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getSeverityColor(selectedCrisis.severity)}`}>
                      {selectedCrisis.severity}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedCrisis.title}
                  </h3>
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

              {/* Modal Content */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      Deskripsi Krisis
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedCrisis.description}
                    </p>
                  </div>

                  {/* Impact Assessment */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 rounded-xl p-6 border border-red-200 dark:border-red-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <h5 className="font-semibold text-red-700 dark:text-red-300">Impact Assessment</h5>
                    </div>
                    <p className="text-red-600 dark:text-red-400 font-medium">{selectedCrisis.impact}</p>
                  </div>

                  {/* Statistics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCrisis.concernedPeople.toLocaleString('id-ID')}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Orang Peduli</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCrisis.severity}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Tingkat Keparahan</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCrisis.timeAgo}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Waktu Laporan</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      🚨 Report Emergency
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      📤 Share Crisis
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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

      {/* Footer Section */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌍</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">SERA Indonesia</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Semesta Ruang Alam</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Platform monitoring krisis lingkungan Indonesia secara real-time. Kami berkomitmen untuk menjaga kelestarian alam Indonesia melalui teknologi dan kolaborasi komunitas.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                {[
                  { name: 'Twitter', icon: '🐦', color: 'blue' },
                  { name: 'Instagram', icon: '📷', color: 'pink' },
                  { name: 'Facebook', icon: '📘', color: 'blue' },
                  { name: 'YouTube', icon: '📹', color: 'red' }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg flex items-center justify-center transition-all duration-200"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  'Tentang Kami',
                  'Cara Kerja',
                  'Tim Peneliti',
                  'Media Center',
                  'Partnership'
                ].map((link, index) => (
                  <li key={index}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {[
                  'API Documentation',
                  'Data Repository',
                  'Research Papers',
                  'Educational Content',
                  'Developer Tools'
                ].map((resource, index) => (
                  <li key={index}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                    >
                      {resource}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-500 dark:text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 SERA Indonesia. All rights reserved. Made with 💚 for Indonesia.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Crisis;