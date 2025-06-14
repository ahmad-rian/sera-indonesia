import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Satellite,
  BarChart3,
  Users,
  Shield,
  Zap,
  Globe,
  Camera,
  Bell,
  Database,
  Smartphone,
  TrendingUp,
  Play,
  Pause
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const mainFeatures = [
    {
      icon: Satellite,
      title: "Monitoring Satelit Real-time",
      description: "Teknologi satelit canggih untuk memantau deforestasi, kebakaran hutan, dan perubahan tutupan lahan Indonesia secara real-time 24/7.",
      benefits: ["Deteksi dini kebakaran hutan", "Monitoring deforestasi akurat", "Analisis perubahan iklim"],
      color: "blue",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      coverage: "34 Provinsi",
      accuracy: "99.2%"
    },
    {
      icon: BarChart3,
      title: "AI-Powered Analytics",
      description: "Sistem analitik berbasis kecerdasan buatan yang mengolah big data lingkungan untuk prediksi dan insight yang actionable.",
      benefits: ["Prediksi cuaca ekstrem", "Analisis tren polusi", "Forecasting environmental"],
      color: "emerald",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
      coverage: "1M+ Data Points",
      accuracy: "95.8%"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Platform kolaboratif yang menghubungkan masyarakat, pemerintah, dan organisasi untuk aksi lingkungan bersama.",
      benefits: ["Laporan komunitas", "Koordinasi aksi lokal", "Knowledge sharing"],
      color: "purple",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      coverage: "89K+ Users",
      accuracy: "98.5%"
    },
    {
      icon: Shield,
      title: "Early Warning System",
      description: "Sistem peringatan dini yang terintegrasi untuk ancaman lingkungan seperti banjir, longsor, dan polusi udara ekstrem.",
      benefits: ["Alert real-time", "Notifikasi emergency", "Protokol evakuasi"],
      color: "red",
      bgGradient: "from-red-500/20 to-orange-500/20",
      coverage: "24/7 Monitoring",
      accuracy: "97.3%"
    }
  ];

  const techStack = [
    {
      category: "Data Collection",
      technologies: [
        { name: "Satellite Imagery", icon: Satellite, desc: "MODIS, Landsat, Sentinel" },
        { name: "IoT Sensors", icon: Zap, desc: "Air quality, water quality" },
        { name: "Community Reports", icon: Camera, desc: "Crowdsourced validation" }
      ]
    },
    {
      category: "Processing & Analytics", 
      technologies: [
        { name: "Machine Learning", icon: Database, desc: "TensorFlow, PyTorch" },
        { name: "Big Data", icon: Globe, desc: "Hadoop, Spark cluster" },
        { name: "Real-time Processing", icon: TrendingUp, desc: "Apache Kafka, Redis" }
      ]
    },
    {
      category: "User Interface",
      technologies: [
        { name: "Mobile App", icon: Smartphone, desc: "iOS, Android native" },
        { name: "Web Dashboard", icon: BarChart3, desc: "React, D3.js visualization" },
        { name: "Alert System", icon: Bell, desc: "Push notifications, SMS" }
      ]
    }
  ];

  const impactMetrics = [
    { label: "Hutan Terselamatkan", value: "156,234", unit: "Hektar", growth: "+23%" },
    { label: "Laporan Diverifikasi", value: "89,432", unit: "Reports", growth: "+45%" },
    { label: "Emisi CO2 Reduced", value: "2.3M", unit: "Ton", growth: "+18%" },
    { label: "Komunitas Aktif", value: "234", unit: "Kota", growth: "+67%" }
  ];

  return (
    <section ref={sectionRef} className="relative bg-white dark:bg-slate-900 py-20 lg:py-24 overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_800px_600px_at_50%_300px,black,transparent)]" />
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
            <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Teknologi Terdepan
            </span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Platform Environmental
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Intelligence Terlengkap
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Menggabungkan teknologi satelit, AI, dan kekuatan komunitas untuk menciptakan 
            ekosistem monitoring lingkungan paling canggih di Indonesia
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            
            <div className="space-y-6">
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    activeFeature === index 
                      ? `border-${feature.color}-300 dark:border-${feature.color}-600 bg-gradient-to-r ${feature.bgGradient} shadow-xl` 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-${feature.color}-500 text-white shadow-lg`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {feature.description}
                      </p>
                      
                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.4 }}
                          className="space-y-3"
                        >
                          <div className="flex flex-wrap gap-2">
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <span 
                                key={benefitIndex}
                                className={`px-3 py-1 text-xs rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-500/20 text-${feature.color}-700 dark:text-${feature.color}-300`}
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div>
                              <span className="text-slate-500 dark:text-slate-400">Coverage: </span>
                              <span className="font-semibold text-slate-900 dark:text-white">{feature.coverage}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 dark:text-slate-400">Accuracy: </span>
                              <span className="font-semibold text-slate-900 dark:text-white">{feature.accuracy}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700">
                <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  
                  <div className="absolute inset-4 top-12">
                    <div className="grid grid-cols-3 gap-4 h-full">
                      <div className="space-y-2">
                        <div className="h-2 bg-emerald-500/50 rounded" />
                        <div className="h-4 bg-emerald-500/30 rounded" />
                        <div className="h-3 bg-emerald-500/40 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-blue-500/50 rounded" />
                        <div className="h-2 bg-blue-500/30 rounded" />
                        <div className="h-5 bg-blue-500/40 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-purple-500/50 rounded" />
                        <div className="h-2 bg-purple-500/30 rounded" />
                        <div className="h-3 bg-purple-500/40 rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                    >
                      {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                    </motion.button>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {mainFeatures[activeFeature].title}
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Live Demo - Interactive Dashboard
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Technology Stack
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Infrastruktur teknologi yang mendukung platform SERA Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 text-center">
                  {category.category}
                </h4>
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <tech.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-slate-900 dark:text-white">
                          {tech.name}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl p-8 lg:p-12 border border-emerald-200 dark:border-emerald-800"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Impact Metrics
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Hasil nyata dari teknologi dan kolaborasi komunitas
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50"
              >
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {metric.unit}
                </div>
                <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {metric.growth} pertumbuhan
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;