import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { emergencyAlerts } from '../../data/emergencyAlerts';
import CardSwap, { Card } from '../magicui/CardSwap';
import { HyperText } from '../magicui/HyperText';

const HeroSection: React.FC = () => {
  const [, setCurrentAlert] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % emergencyAlerts.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const cardData = [
    {
      id: 1,
      image: "/assets/images/polusi_udara.webp",
      alt: "Polusi Udara Jakarta",
      title: "Polusi Udara Jakarta",
      status: "BURUK",
      statusColor: "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400",
      description: "Kualitas udara Jakarta mencapai level tidak sehat dengan konsentrasi PM2.5 tinggi",
      indicator: "AQI 89 - Tidak Sehat untuk Sensitif",
      indicatorColor: "text-red-600 dark:text-red-400",
      fallbackGradient: "from-gray-400 to-gray-600"
    },
    {
      id: 2,
      image: "/assets/images/kebakaran_riau.webp",
      alt: "Kebakaran Hutan Riau",
      title: "Kebakaran Hutan Riau",
      status: "DARURAT",
      statusColor: "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400",
      description: "Kebakaran hutan dan lahan gambut yang meluas mengancam ekosistem dan kualitas udara",
      indicator: "156 Titik Api Terdeteksi Hari Ini",
      indicatorColor: "text-orange-600 dark:text-orange-400",
      fallbackGradient: "from-orange-400 to-red-600"
    },
    {
      id: 3,
      image: "/assets/images/raja_ampat.webp",
      alt: "Pemutihan Karang Raja Ampat",
      title: "Krisis Raja Ampat",
      status: "KRITIS",
      statusColor: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      description: "Pemutihan karang massal akibat pemanasan air laut mengancam biodiversitas laut",
      indicator: "45% Terumbu Karang Mengalami Pemutihan",
      indicatorColor: "text-blue-600 dark:text-blue-400",
      fallbackGradient: "from-blue-400 to-teal-600"
    },
    {
      id: 4,
      image: "/assets/images/deforasi_kalimantan.webp",
      alt: "Deforestasi Kalimantan",
      title: "Deforestasi Kalimantan",
      status: "TINGGI",
      statusColor: "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400",
      description: "Penggundulan hutan untuk perkebunan kelapa sawit dan pertambangan terus meningkat",
      indicator: "6.2 Juta Ha Hutan Hilang (2023)",
      indicatorColor: "text-green-600 dark:text-green-400",
      fallbackGradient: "from-green-400 to-brown-600"
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget as HTMLImageElement;
    const fallback = target.nextElementSibling as HTMLElement;
    target.style.display = 'none';
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <section className="relative min-h-screen bg-white dark:bg-slate-900 overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-50 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-50 dark:bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_800px_600px_at_50%_200px,black,transparent)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        <div className="min-h-[70vh] sm:min-h-[80vh] flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
          
          <div className="flex-1 w-full max-w-2xl space-y-6 sm:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-3 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-200 dark:border-emerald-500/20"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Monitoring Aktif
                </span>
                <div className="h-4 w-px bg-emerald-300 dark:bg-emerald-700" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                  Live
                </span>
              </motion.div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-4"
                >
                  <HyperText
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white text-center lg:text-left"
                    duration={1200}
                    delay={800}
                    startOnView={false}
                    animateOnHover={true}
                  >
                    Welcome to SERA INDONESIA 
                  </HyperText>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white leading-tight"
                >
                  Lindungi
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Alam Indonesia
                  </span>
                  <span>🇮🇩</span>
                  <br />
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl text-justify"
                >
                  Platform digital untuk memantau kondisi lingkungan Indonesia dan 
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400"> mengambil aksi nyata </span> 
                  melawan krisis ekologi yang mengancam masa depan 🌿
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">89</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">AQI Jakarta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">6.2M</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Ha Hutan Hilang</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">24/7</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Monitoring</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/data"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <span>Jelajahi Data</span>
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/report"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Laporkan Masalah</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div style={{ 
                height: '500px', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px'
              }}>
                <CardSwap
                  width="100%"
                  height={400}
                  cardDistance={35}
                  verticalDistance={45}
                  delay={4000}
                  pauseOnHover={true}
                  easing="linear"
                >
                  {cardData.map((card) => (
                    <Card 
                      key={card.id}
                      customClass={
                        card.id === 3 
                          ? "p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl"
                          : "p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl"
                      }
                    >
                      <div className="mb-3">
                        <div className={`w-full ${card.id === 3 ? 'h-40' : 'h-52'} rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 mb-3`}>
                          <img 
                            src={card.image}
                            alt={card.alt}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                          <div className={`w-full h-full bg-gradient-to-br ${card.fallbackGradient} hidden items-center justify-center text-white text-xs`}>
                            {card.alt}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className={`${card.id === 3 ? 'text-xl' : 'text-base'} font-semibold text-slate-900 dark:text-white`}>
                            {card.title}
                          </h3>
                          <span className={`px-2 py-1 ${card.statusColor} text-xs font-medium rounded-md`}>
                            {card.status}
                          </span>
                        </div>
                      </div>
                      <p className={`${card.id === 3 ? 'text-sm mb-4' : 'text-xs mb-2'} text-slate-600 dark:text-slate-300 line-clamp-2`}>
                        {card.description}
                      </p>
                      <div className={`flex items-center ${card.id === 3 ? 'text-sm' : 'text-xs'} ${card.indicatorColor} font-medium`}>
                        <div className="w-2 h-2 bg-current rounded-full mr-2" />
                        {card.indicator}
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;