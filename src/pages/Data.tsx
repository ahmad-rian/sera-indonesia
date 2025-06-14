import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import {
  Thermometer,
  Wind,
  Trees,
  Waves,
  Factory,
  TrendingUp,
  TrendingDown,
  Globe,
  Fish,
  AlertTriangle,
  Download,
  Activity,
  Zap,
  Droplets,
  MapPin,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Data = () => {
  const { theme } = useTheme();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('air');

  const aqiData = [
    { province: 'DKI Jakarta', aqi: 156, status: 'Tidak Sehat', color: '#ef4444', population: 10560000 },
    { province: 'Jawa Barat', aqi: 134, status: 'Tidak Sehat untuk Sensitif', color: '#f97316', population: 48037000 },
    { province: 'Banten', aqi: 142, status: 'Tidak Sehat untuk Sensitif', color: '#f97316', population: 11904000 },
    { province: 'Jawa Tengah', aqi: 98, status: 'Sedang', color: '#eab308', population: 34257000 },
    { province: 'Jawa Timur', aqi: 87, status: 'Sedang', color: '#eab308', population: 39500000 },
    { province: 'Sumatera Utara', aqi: 78, status: 'Sedang', color: '#eab308', population: 14799000 },
    { province: 'Riau', aqi: 201, status: 'Sangat Tidak Sehat', color: '#dc2626', population: 6394000 },
    { province: 'Kalimantan Tengah', aqi: 165, status: 'Tidak Sehat', color: '#ef4444', population: 2669000 },
    { province: 'Papua', aqi: 42, status: 'Baik', color: '#22c55e', population: 4303000 },
    { province: 'Bali', aqi: 67, status: 'Sedang', color: '#eab308', population: 4317000 }
  ];

  const deforestationData = [
    { year: '2018', kalimantan: 485000, sumatera: 312000, papua: 156000, sulawesi: 89000 },
    { year: '2019', kalimantan: 523000, sumatera: 334000, papua: 167000, sulawesi: 94000 },
    { year: '2020', kalimantan: 456000, sumatera: 298000, papua: 178000, sulawesi: 102000 },
    { year: '2021', kalimantan: 489000, sumatera: 278000, papua: 189000, sulawesi: 87000 },
    { year: '2022', kalimantan: 434000, sumatera: 234000, papua: 198000, sulawesi: 76000 },
    { year: '2023', kalimantan: 398000, sumatera: 212000, papua: 203000, sulawesi: 68000 },
    { year: '2024', kalimantan: 356000, sumatera: 189000, papua: 178000, sulawesi: 61000 }
  ];

  const oceanHealthData = [
    { region: 'Raja Ampat', coralHealth: 78, fishPop: 85, plasticPollution: 23 },
    { region: 'Bunaken', coralHealth: 72, fishPop: 79, plasticPollution: 31 },
    { region: 'Wakatobi', coralHealth: 81, fishPop: 88, plasticPollution: 19 },
    { region: 'Komodo', coralHealth: 68, fishPop: 71, plasticPollution: 45 },
    { region: 'Bali', coralHealth: 54, fishPop: 62, plasticPollution: 67 },
    { region: 'Lombok', coralHealth: 61, fishPop: 69, plasticPollution: 52 }
  ];

  const climateData = [
    { month: 'Jan', temperature: 26.8, rainfall: 312, seaLevel: 1.2 },
    { month: 'Feb', temperature: 27.1, rainfall: 298, seaLevel: 1.3 },
    { month: 'Mar', temperature: 27.4, rainfall: 276, seaLevel: 1.1 },
    { month: 'Apr', temperature: 27.8, rainfall: 189, seaLevel: 0.9 },
    { month: 'May', temperature: 28.2, rainfall: 156, seaLevel: 0.8 },
    { month: 'Jun', temperature: 28.1, rainfall: 134, seaLevel: 0.7 },
    { month: 'Jul', temperature: 27.9, rainfall: 142, seaLevel: 0.6 },
    { month: 'Aug', temperature: 28.3, rainfall: 167, seaLevel: 0.8 },
    { month: 'Sep', temperature: 28.6, rainfall: 198, seaLevel: 1.1 },
    { month: 'Oct', temperature: 28.4, rainfall: 234, seaLevel: 1.4 },
    { month: 'Nov', temperature: 27.8, rainfall: 289, seaLevel: 1.6 },
    { month: 'Dec', temperature: 27.2, rainfall: 334, seaLevel: 1.5 }
  ];

  const carbonEmissions = [
    { sector: 'Energi', value: 615.8, percentage: 37.8 },
    { sector: 'Pertanian', value: 487.2, percentage: 29.9 },
    { sector: 'Kehutanan', value: 398.6, percentage: 24.5 },
    { sector: 'Industri', value: 89.4, percentage: 5.5 },
    { sector: 'Transportasi', value: 37.8, percentage: 2.3 }
  ];

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const tabOptions = [
    { id: 'air', name: 'Kualitas Udara', icon: Wind },
    { id: 'forest', name: 'Deforestasi', icon: Trees },
    { id: 'ocean', name: 'Kesehatan Laut', icon: Waves },
    { id: 'climate', name: 'Iklim', icon: Thermometer }
  ];

  const timeRanges = [
    { id: '7d', name: '7 Hari' },
    { id: '30d', name: '30 Hari' },
    { id: '90d', name: '3 Bulan' },
    { id: '1y', name: '1 Tahun' }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22c55e';
    if (aqi <= 100) return '#eab308';
    if (aqi <= 150) return '#f97316';
    if (aqi <= 200) return '#ef4444';
    return '#dc2626';
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any; label?: any }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString('id-ID') : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                📊 Dashboard Data Lingkungan
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Monitoring real-time kondisi lingkungan Indonesia dengan data scientifik
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white transition-colors duration-300"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {tabOptions.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'air' && (
            <motion.div
              key="air"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: 'Rata-rata AQI Nasional', 
                    value: Math.round(aqiData.reduce((sum, item) => sum + item.aqi, 0) / aqiData.length).toString(),
                    change: '-12%',
                    trend: 'down',
                    icon: Wind,
                    color: 'orange'
                  },
                  { 
                    title: 'Provinsi Terburuk', 
                    value: 'Riau',
                    change: 'AQI 201',
                    trend: 'up',
                    icon: AlertTriangle,
                    color: 'red'
                  },
                  { 
                    title: 'Populasi Terpapar', 
                    value: `${Math.round(aqiData.reduce((sum, item) => sum + (item.aqi > 100 ? item.population : 0), 0) / 1000000)}M`,
                    change: '+8%',
                    trend: 'up',
                    icon: Users,
                    color: 'purple'
                  },
                  { 
                    title: 'Stasiun Monitoring', 
                    value: '156',
                    change: '+24',
                    trend: 'up',
                    icon: Activity,
                    color: 'emerald'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-500/20' :
                        stat.color === 'red' ? 'bg-red-100 dark:bg-red-500/20' :
                        stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20' :
                        stat.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-500/20' : 
                        'bg-gray-100 dark:bg-gray-500/20'
                      }`}>
                        <stat.icon className={`h-6 w-6 ${
                          stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                          stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
                          stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                          stat.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 
                          'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{stat.title}</h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Kualitas Udara Per Provinsi</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={aqiData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                      <XAxis 
                        dataKey="province" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        stroke={theme === 'dark' ? '#94a3b8' : '#64748b'}
                        fontSize={12}
                      />
                      <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="aqi" fill="#8884d8">
                        {aqiData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getAQIColor(entry.aqi)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Status AQI</h3>
                  <div className="space-y-4">
                    {aqiData.slice(0, 6).map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700 transition-colors duration-300">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">{item.province}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold" style={{ color: item.color }}>{item.aqi}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">AQI</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'forest' && (
            <motion.div
              key="forest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: 'Total Deforestasi 2024', 
                    value: '784K',
                    change: '-15%',
                    trend: 'down',
                    icon: Trees,
                    color: 'red',
                    unit: 'hektar'
                  },
                  { 
                    title: 'Hotspot Terdeteksi', 
                    value: '2,847',
                    change: '+234',
                    trend: 'up',
                    icon: Zap,
                    color: 'orange'
                  },
                  { 
                    title: 'Spesies Terancam', 
                    value: '142',
                    change: '+12',
                    trend: 'up',
                    icon: Fish,
                    color: 'purple'
                  },
                  { 
                    title: 'Dampak Ekonomi', 
                    value: '$2.1B',
                    change: '+18%',
                    trend: 'up',
                    icon: TrendingUp,
                    color: 'emerald'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        stat.color === 'red' ? 'bg-red-100 dark:bg-red-500/20' :
                        stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-500/20' :
                        stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20' :
                        stat.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-500/20' : 
                        'bg-gray-100 dark:bg-gray-500/20'
                      }`}>
                        <stat.icon className={`h-6 w-6 ${
                          stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
                          stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                          stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                          stat.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 
                          'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{stat.title}</h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                      {stat.unit && <span className="text-sm font-normal ml-1">{stat.unit}</span>}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tren Deforestasi Per Pulau (2018-2024)</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={deforestationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="year" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                    <YAxis 
                      stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} 
                      tickFormatter={formatYAxis}
                      domain={[0, 'dataMax']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="kalimantan" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Kalimantan" />
                    <Area type="monotone" dataKey="sumatera" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} name="Sumatera" />
                    <Area type="monotone" dataKey="papua" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.6} name="Papua" />
                    <Area type="monotone" dataKey="sulawesi" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Sulawesi" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {activeTab === 'ocean' && (
            <motion.div
              key="ocean"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Kesehatan Terumbu Karang</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={oceanHealthData}>
                      <RadialBar
                        dataKey="coralHealth"
                        cornerRadius={10}
                        fill="#10b981"
                      />
                      <Tooltip content={<CustomTooltip />} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Polusi Plastik vs Populasi Ikan</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={oceanHealthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="region" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="fishPop" stroke="#0ea5e9" strokeWidth={3} name="Populasi Ikan %" />
                      <Line type="monotone" dataKey="plasticPollution" stroke="#ef4444" strokeWidth={3} name="Polusi Plastik %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Status Kawasan Konservasi Laut</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {oceanHealthData.map((area, index) => (
                    <div key={index} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700 transition-colors duration-300">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{area.region}</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Kesehatan Karang</span>
                            <span className="font-medium text-slate-900 dark:text-white">{area.coralHealth}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${area.coralHealth}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Populasi Ikan</span>
                            <span className="font-medium text-slate-900 dark:text-white">{area.fishPop}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${area.fishPop}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Polusi Plastik</span>
                            <span className="font-medium text-slate-900 dark:text-white">{area.plasticPollution}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${area.plasticPollution}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'climate' && (
            <motion.div
              key="climate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: 'Suhu Rata-rata', 
                    value: '27.8°C',
                    change: '+0.5°C',
                    trend: 'up',
                    icon: Thermometer,
                    color: 'red'
                  },
                  { 
                    title: 'Curah Hujan', 
                    value: '2,340mm',
                    change: '-12%',
                    trend: 'down',
                    icon: Droplets,
                    color: 'blue'
                  },
                  { 
                    title: 'Kenaikan Muka Laut', 
                    value: '3.2mm',
                    change: '+0.8mm',
                    trend: 'up',
                    icon: Waves,
                    color: 'cyan'
                  },
                  { 
                    title: 'Emisi Karbon', 
                    value: '1.63Gt',
                    change: '-2.1%',
                    trend: 'down',
                    icon: Factory,
                    color: 'purple'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        stat.color === 'red' ? 'bg-red-100 dark:bg-red-500/20' :
                        stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/20' :
                        stat.color === 'cyan' ? 'bg-cyan-100 dark:bg-cyan-500/20' :
                        stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20' : 
                        'bg-gray-100 dark:bg-gray-500/20'
                      }`}>
                        <stat.icon className={`h-6 w-6 ${
                          stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
                          stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          stat.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' :
                          stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 
                          'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{stat.title}</h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tren Suhu & Curah Hujan</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={climateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="month" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <YAxis yAxisId="temp" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <YAxis yAxisId="rain" orientation="right" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={3} name="Suhu (°C)" />
                      <Line yAxisId="rain" type="monotone" dataKey="rainfall" stroke="#0ea5e9" strokeWidth={3} name="Curah Hujan (mm)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Emisi Karbon per Sektor</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={carbonEmissions}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {carbonEmissions.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Kenaikan Muka Laut Indonesia</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={climateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="month" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                    <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="seaLevel" 
                      stroke="#06b6d4" 
                      fill="#06b6d4" 
                      fillOpacity={0.6}
                      name="Kenaikan Muka Laut (mm)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg">
                    <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sumber Data Terpercaya</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'BMKG', desc: 'Meteorologi & Klimatologi', icon: '🌡️' },
                    { name: 'KLHK', desc: 'Kementerian Lingkungan', icon: '🌱' },
                    { name: 'BPS', desc: 'Badan Pusat Statistik', icon: '📊' },
                    { name: 'NASA', desc: 'Satelit Monitoring', icon: '🛰️' }
                  ].map((source, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, translateY: -2 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{source.icon}</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">{source.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{source.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-slate-900 dark:text-white">Frekuensi Update</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Kualitas Udara', freq: 'Real-time', color: 'bg-green-500' },
                    { type: 'Deforestasi', freq: 'Harian', color: 'bg-orange-500' },
                    { type: 'Kesehatan Laut', freq: 'Mingguan', color: 'bg-blue-500' },
                    { type: 'Data Iklim', freq: 'Bulanan', color: 'bg-purple-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item.type}:</span>
                      <span className="text-slate-600 dark:text-slate-400">{item.freq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">API Access</h3>
                </div>
                <p className="text-emerald-100 mb-6">
                  Akses data lingkungan Indonesia secara real-time melalui API yang powerful dan mudah digunakan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-white text-emerald-600 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Dapatkan API Key
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-emerald-400 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-300 transition-colors"
                  >
                    Lihat Dokumentasi
                  </motion.button>
                </div>
                <p className="text-xs text-emerald-100 mt-3">
                  ✨ Gratis untuk penelitian & penggunaan non-komersial
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Data Points', value: '2.1M+', icon: '📊' },
                  { label: 'API Calls/Month', value: '450K+', icon: '🚀' },
                  { label: 'Researchers', value: '1,200+', icon: '👥' },
                  { label: 'Uptime', value: '99.9%', icon: '⚡' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Live Data</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Update terakhir: {new Date().toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })} • {new Date().toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })} WIB
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  <span>Indonesia</span>
                </div>
                <div className="flex space-x-2">
                  {['📧', '🐦', '📱'].map((icon, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-sm hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors duration-300"
                    >
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;