import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Award,
  TrendingUp,
  Heart,
  Shield,
  Leaf,
  MessageCircle,
  Play
} from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Siti Nurbaya",
      role: "Menteri Lingkungan Hidup dan Kehutanan",
      organization: "Kementerian LHK RI",
      location: "Jakarta",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      content: "Platform SERA Indonesia telah menjadi game-changer dalam upaya konservasi nasional. Data real-time yang disediakan membantu kami membuat keputusan policy yang lebih tepat dan cepat, terutama dalam menangani krisis lingkungan seperti kebakaran hutan di Riau.",
      impact: "15% faster emergency response",
      date: "Desember 2024",
      verified: true,
      category: "Government"
    },
    {
      id: 2,
      name: "Prof. Dr. Emil Salim",
      role: "Pakar Lingkungan Senior",
      organization: "Universitas Indonesia",
      location: "Jakarta",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      content: "Sebagai akademisi yang sudah 40 tahun berkecimpung di bidang lingkungan, saya sangat terkesan dengan integrasi teknologi satelit dan AI yang dikembangkan SERA. Ini adalah masa depan monitoring lingkungan Indonesia yang sudah menjadi kenyataan hari ini.",
      impact: "Used in 12 research projects",
      date: "November 2024",
      verified: true,
      category: "Academic"
    },
    {
      id: 3,
      name: "Riko Kurniawan",
      role: "Koordinator Relawan",
      organization: "Greenpeace Indonesia",
      location: "Pontianak, Kalimantan Barat",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      content: "Berkat early warning system SERA, kami berhasil menyelamatkan 2,340 hektar hutan Kalimantan dari illegal logging. Notifikasi real-time memungkinkan tim kami merespons dengan cepat dan koordinasi dengan pihak berwajib menjadi jauh lebih efektif.",
      impact: "2,340 hectares forest saved",
      date: "Oktober 2024",
      verified: true,
      category: "NGO"
    },
    {
      id: 4,
      name: "Indira Chandra",
      role: "Environmental Data Scientist",
      organization: "WWF Indonesia",
      location: "Bali",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      content: "API data SERA sangat powerful untuk research kami. Akurasi data satelit mencapai 99.2% dan update real-time membantu kami menganalisis tren deforestasi dengan presisi tinggi. Dashboard analytics-nya juga sangat user-friendly untuk tim non-technical.",
      impact: "99.2% data accuracy achieved",
      date: "September 2024",
      verified: true,
      category: "Research"
    },
    {
      id: 5,
      name: "Budi Santoso",
      role: "Kepala Desa",
      organization: "Desa Tanjung Harapan",
      location: "Jambi",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      content: "Sebagai kepala desa yang wilayahnya sering terdampak kabut asap, platform SERA membantu kami memproteksi warga dengan peringatan dini kualitas udara. Fitur community reporting juga memudahkan warga melaporkan titik api baru secara langsung.",
      impact: "Protected 1,200 villagers",
      date: "Agustus 2024",
      verified: true,
      category: "Community"
    },
    {
      id: 6,
      name: "Maya Soetrisno",
      role: "Marine Conservation Manager",
      organization: "Conservation International Indonesia",
      location: "Raja Ampat, Papua Barat",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      content: "Monitoring pemutihan karang di Raja Ampat menjadi lebih sistematis dengan SERA. Teknologi underwater sensor integration dan satellite imagery membantu kami melacak health status 45% terumbu karang dengan detail yang sebelumnya tidak mungkin dicapai.",
      impact: "Monitoring 45% coral reefs",
      date: "Juli 2024",
      verified: true,
      category: "Marine"
    }
  ];

  const impactStats = [
    {
      icon: Shield,
      value: "23,456",
      label: "Hectares Protected",
      description: "Luas hutan yang berhasil diselamatkan",
      growth: "+34%"
    },
    {
      icon: Users,
      value: "89,123",
      label: "Active Users",
      description: "Pengguna aktif dari berbagai sektor",
      growth: "+67%"
    },
    {
      icon: MessageCircle,
      value: "15,432",
      label: "Community Reports",
      description: "Laporan masyarakat yang terverifikasi",
      growth: "+45%"
    },
    {
      icon: Award,
      value: "99.2%",
      label: "Data Accuracy",
      description: "Tingkat akurasi monitoring satelit",
      growth: "+12%"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Government: "blue",
      Academic: "purple", 
      NGO: "emerald",
      Research: "orange",
      Community: "teal",
      Marine: "cyan"
    };
    return colors[category as keyof typeof colors] || "slate";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      Government: Shield,
      Academic: Award,
      NGO: Heart,
      Research: TrendingUp,
      Community: Users,
      Marine: Leaf
    };
    return icons[category as keyof typeof icons] || Users;
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-20 lg:py-24 overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-6 h-6 bg-emerald-400/30 rounded-full"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-16 w-4 h-4 bg-blue-400/30 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-200 dark:border-emerald-500/20 mb-6"
          >
            <Heart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Dipercaya Para Ahli
            </span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Testimoni dari Para
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pemimpin Lingkungan
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Mendengar langsung dari para ahli, praktisi, dan pemimpin lingkungan tentang 
            dampak nyata platform SERA Indonesia dalam konservasi dan monitoring lingkungan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden"
                >
                  <div className="absolute top-6 right-6 w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <Quote className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                      "{testimonials[activeTestimonial].content}"
                    </blockquote>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {testimonials[activeTestimonial].name}
                          </h4>
                          {testimonials[activeTestimonial].verified && (
                            <Shield className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {testimonials[activeTestimonial].role}
                        </p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {testimonials[activeTestimonial].organization}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{testimonials[activeTestimonial].location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{testimonials[activeTestimonial].date}</span>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-${getCategoryColor(testimonials[activeTestimonial].category)}-100 dark:bg-${getCategoryColor(testimonials[activeTestimonial].category)}-500/20 text-${getCategoryColor(testimonials[activeTestimonial].category)}-700 dark:text-${getCategoryColor(testimonials[activeTestimonial].category)}-300`}>
                        {React.createElement(getCategoryIcon(testimonials[activeTestimonial].category), { className: "h-3 w-3" })}
                        <span className="text-xs font-medium">{testimonials[activeTestimonial].category}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                          Impact: {testimonials[activeTestimonial].impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevTestimonial}
                  className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Play className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextTestimonial}
                  className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </motion.button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                {testimonials.map((testimonial, index) => (
                  <motion.button
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                      activeTestimonial === index
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-slate-900 dark:text-white text-sm truncate">
                          {testimonial.name}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {testimonial.organization}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {stat.description}
              </div>
              <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {stat.growth} growth
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;