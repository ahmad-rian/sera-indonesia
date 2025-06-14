"use client"

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Camera,
  Upload,
  AlertTriangle,
  Eye,
  EyeOff,
  Send,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  Factory,
  TreePine,
  Fish,
  Trash2,
  Skull,
  Mountain,
  Droplets,
  Wind,
  Plus,
  X,
  FileText,
  Star,
  MessageCircle,
  Share2,
  Heart,
  Filter,
  Search,
  Calendar,
  BarChart3
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  description: string;
  images: string[];
  status: 'pending' | 'investigating' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
  isAnonymous: boolean;
  createdAt: Date;
  supporters: number;
  comments: number;
  resolution?: string;
  authority?: string;
}

const Report: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'my-reports' | 'trending'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    isAnonymous: false,
    images: [] as File[],
    coordinates: { lat: -7.4298, lng: 109.2408 } // Default to Purwokerto
  });

  const categories = [
    { id: 'industrial-pollution', label: 'Illegal Industrial Pollution', icon: Factory, color: 'text-red-500' },
    { id: 'deforestation', label: 'Illegal Logging/Deforestasi', icon: TreePine, color: 'text-orange-500' },
    { id: 'illegal-fishing', label: 'Illegal Fishing Activities', icon: Fish, color: 'text-blue-500' },
    { id: 'waste-dumping', label: 'Illegal Waste Dumping', icon: Trash2, color: 'text-purple-500' },
    { id: 'wildlife-trafficking', label: 'Wildlife Trafficking', icon: Skull, color: 'text-pink-500' },
    { id: 'illegal-mining', label: 'Illegal Mining Operations', icon: Mountain, color: 'text-yellow-500' },
    { id: 'water-pollution', label: 'Water Pollution', icon: Droplets, color: 'text-cyan-500' },
    { id: 'air-pollution', label: 'Air Pollution Sources', icon: Wind, color: 'text-gray-500' },
  ];

  // Static data for demonstration
  const [allReports, setAllReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Pencemaran Sungai Serayu oleh Limbah Industri',
      category: 'water-pollution',
      location: 'Sungai Serayu, Purwokerto',
      coordinates: { lat: -7.4298, lng: 109.2408 },
      description: 'Ditemukan limbah berwarna hitam dengan bau menyengat mengalir dari pabrik tekstil ke Sungai Serayu. Air sungai berubah warna dan banyak ikan mati.',
      images: ['https://images.unsplash.com/photo-1583592618306-2c2b1beeaca5?w=400&h=300&fit=crop'],
      status: 'investigating',
      priority: 'high',
      reportedBy: 'Ahmad Rizki',
      isAnonymous: false,
      createdAt: new Date('2024-06-10'),
      supporters: 156,
      comments: 23,
      authority: 'Dinas Lingkungan Hidup Banyumas'
    },
    {
      id: '2',
      title: 'Pembakaran Hutan di Gunung Slamet',
      category: 'deforestation',
      location: 'Lereng Gunung Slamet, Baturraden',
      coordinates: { lat: -7.3297, lng: 109.2128 },
      description: 'Terlihat asap tebal dari pembakaran lahan hutan di area konservasi. Diduga untuk pembukaan lahan perkebunan.',
      images: ['https://images.unsplash.com/photo-1574263867128-a3d5c1b1deec?w=400&h=300&fit=crop'],
      status: 'pending',
      priority: 'critical',
      reportedBy: 'Anonymous',
      isAnonymous: true,
      createdAt: new Date('2024-06-12'),
      supporters: 289,
      comments: 45
    },
    {
      id: '3',
      title: 'Penambangan Pasir Ilegal di Sungai Banjaran',
      category: 'illegal-mining',
      location: 'Sungai Banjaran, Banjarnegara',
      coordinates: { lat: -7.3848, lng: 109.6854 },
      description: 'Aktivitas penambangan pasir tanpa izin merusak ekosistem sungai dan mengancam jembatan.',
      images: ['https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop'],
      status: 'resolved',
      priority: 'medium',
      reportedBy: 'Siti Nurhaliza',
      isAnonymous: false,
      createdAt: new Date('2024-05-28'),
      supporters: 78,
      comments: 12,
      resolution: 'Operasi penambangan dihentikan dan area direhabilitasi oleh Pemkab Banjarnegara.',
      authority: 'Dinas ESDM Banjarnegara'
    },
    {
      id: '4',
      title: 'Pembuangan Limbah Plastik ke Laut',
      category: 'waste-dumping',
      location: 'Pantai Cilacap, Jawa Tengah',
      coordinates: { lat: -7.7326, lng: 109.0154 },
      description: 'Tumpukan sampah plastik dari pabrik pengolahan ikan dibuang langsung ke laut.',
      images: ['https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=300&fit=crop'],
      status: 'pending',
      priority: 'high',
      reportedBy: 'Budi Santoso',
      isAnonymous: false,
      createdAt: new Date('2024-06-13'),
      supporters: 92,
      comments: 18
    },
    {
      id: '5',
      title: 'Perdagangan Satwa Langka di Pasar Tradisional',
      category: 'wildlife-trafficking',
      location: 'Pasar Wage, Purwokerto',
      coordinates: { lat: -7.4298, lng: 109.2408 },
      description: 'Ditemukan penjualan burung-burung langka tanpa surat izin di area pasar tradisional.',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      status: 'investigating',
      priority: 'medium',
      reportedBy: 'Current User',
      isAnonymous: false,
      createdAt: new Date('2024-06-08'),
      supporters: 45,
      comments: 8
    },
    {
      id: '6',
      title: 'Pencemaran Udara dari Pabrik Semen',
      category: 'air-pollution',
      location: 'Cilacap, Jawa Tengah',
      coordinates: { lat: -7.7326, lng: 109.0154 },
      description: 'Asap tebal dan debu semen mencemari udara di sekitar pemukiman warga.',
      images: ['https://images.unsplash.com/photo-1611866986826-4ba81717d5f2?w=400&h=300&fit=crop'],
      status: 'resolved',
      priority: 'high',
      reportedBy: 'Maya Indira',
      isAnonymous: false,
      createdAt: new Date('2024-05-20'),
      supporters: 234,
      comments: 56,
      resolution: 'Pabrik dipasang filter udara dan monitoring kualitas udara rutin.',
      authority: 'Dinas Lingkungan Hidup Cilacap'
    }
  ]);

  const [myReports] = useState<Report[]>([
    {
      id: '5',
      title: 'Perdagangan Satwa Langka di Pasar Tradisional',
      category: 'wildlife-trafficking',
      location: 'Pasar Wage, Purwokerto',
      coordinates: { lat: -7.4298, lng: 109.2408 },
      description: 'Ditemukan penjualan burung-burung langka tanpa surat izin di area pasar tradisional.',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      status: 'investigating',
      priority: 'medium',
      reportedBy: 'Current User',
      isAnonymous: false,
      createdAt: new Date('2024-06-08'),
      supporters: 45,
      comments: 8
    }
  ]);

  const [trendingReports] = useState<Report[]>([
    {
      id: '2',
      title: 'Pembakaran Hutan di Gunung Slamet',
      category: 'deforestation',
      location: 'Lereng Gunung Slamet, Baturraden',
      coordinates: { lat: -7.3297, lng: 109.2128 },
      description: 'Terlihat asap tebal dari pembakaran lahan hutan di area konservasi. Diduga untuk pembukaan lahan perkebunan.',
      images: ['https://images.unsplash.com/photo-1574263867128-a3d5c1b1deec?w=400&h=300&fit=crop'],
      status: 'pending',
      priority: 'critical',
      reportedBy: 'Anonymous',
      isAnonymous: true,
      createdAt: new Date('2024-06-12'),
      supporters: 289,
      comments: 45
    },
    {
      id: '6',
      title: 'Pencemaran Udara dari Pabrik Semen',
      category: 'air-pollution',
      location: 'Cilacap, Jawa Tengah',
      coordinates: { lat: -7.7326, lng: 109.0154 },
      description: 'Asap tebal dan debu semen mencemari udara di sekitar pemukiman warga.',
      images: ['https://images.unsplash.com/photo-1611866986826-4ba81717d5f2?w=400&h=300&fit=crop'],
      status: 'resolved',
      priority: 'high',
      reportedBy: 'Maya Indira',
      isAnonymous: false,
      createdAt: new Date('2024-05-20'),
      supporters: 234,
      comments: 56,
      resolution: 'Pabrik dipasang filter udara dan monitoring kualitas udara rutin.',
      authority: 'Dinas Lingkungan Hidup Cilacap'
    },
    {
      id: '1',
      title: 'Pencemaran Sungai Serayu oleh Limbah Industri',
      category: 'water-pollution',
      location: 'Sungai Serayu, Purwokerto',
      coordinates: { lat: -7.4298, lng: 109.2408 },
      description: 'Ditemukan limbah berwarna hitam dengan bau menyengat mengalir dari pabrik tekstil ke Sungai Serayu. Air sungai berubah warna dan banyak ikan mati.',
      images: ['https://images.unsplash.com/photo-1583592618306-2c2b1beeaca5?w=400&h=300&fit=crop'],
      status: 'investigating',
      priority: 'high',
      reportedBy: 'Ahmad Rizki',
      isAnonymous: false,
      createdAt: new Date('2024-06-10'),
      supporters: 156,
      comments: 23,
      authority: 'Dinas Lingkungan Hidup Banyumas'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.category || !formData.location || !formData.description) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }
    
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create new report
    const newReport: Report = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      location: formData.location,
      coordinates: formData.coordinates,
      description: formData.description,
      images: formData.images.length > 0 ? ['https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop'] : [],
      status: 'pending',
      priority: 'medium',
      reportedBy: formData.isAnonymous ? 'Anonymous' : 'Current User',
      isAnonymous: formData.isAnonymous,
      createdAt: new Date(),
      supporters: 0,
      comments: 0
    };

    setAllReports(prev => [newReport, ...prev]);
    setFormData({
      title: '',
      category: '',
      location: '',
      description: '',
      isAnonymous: false,
      images: [],
      coordinates: { lat: -7.4298, lng: 109.2408 }
    });

    setIsSubmitting(false);
    setShowForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'investigating': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : AlertTriangle;
  };

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : 'Unknown Category';
  };

  const getCurrentReports = () => {
    switch (activeTab) {
      case 'my-reports':
        return myReports;
      case 'trending':
        return trendingReports;
      default:
        return allReports;
    }
  };

  const filteredReports = getCurrentReports().filter(report => {
    if (filterStatus !== 'all' && report.status !== filterStatus) return false;
    if (filterCategory !== 'all' && report.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Laporkan Masalah Lingkungan
              </h1>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
                Bersama melindungi lingkungan Indonesia
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Buat Laporan
            </motion.button>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-[10000] bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Laporan berhasil dikirim!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1,247</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Laporan</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">89</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Dalam Proses</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">856</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Terselesaikan</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">68.7%</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tingkat Resolusi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                {[
                  { id: 'all', label: 'Semua Laporan' },
                  { id: 'my-reports', label: 'Laporan Saya' },
                  { id: 'trending', label: 'Trending' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const IconComponent = getCategoryIcon(report.category);
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Report Image */}
                {report.images.length > 0 && (
                  <div className="aspect-video bg-gray-100 dark:bg-slate-700 relative">
                    <img
                      src={report.images[0]}
                      alt={report.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop';
                      }}
                    />
                    {report.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        +{report.images.length - 1} foto
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
                        <IconComponent className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className={`h-4 w-4 ${getPriorityColor(report.priority)}`} />
                      <span className={`text-xs font-medium ${getPriorityColor(report.priority)}`}>
                        {report.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {report.title}
                  </h3>

                  {/* Category and Location */}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {getCategoryLabel(report.category)}
                    </p>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      {report.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {report.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {report.supporters}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {report.comments}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {report.createdAt.toLocaleDateString('id-ID')}
                    </div>
                  </div>

                  {/* Reporter */}
                  <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    Dilaporkan oleh: {report.reportedBy}
                  </div>

                  {/* Resolution */}
                  {report.resolution && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        <strong>Resolusi:</strong> {report.resolution}
                      </p>
                      {report.authority && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          - {report.authority}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Report Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
                onClick={() => setShowForm(false)}
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-800 shadow-xl rounded-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Buat Laporan Baru
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Judul Laporan *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Masukkan judul laporan yang jelas dan deskriptif"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Kategori Masalah *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Pilih kategori masalah</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Lokasi *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Masukkan lokasi kejadian"
                      />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="px-4 py-3 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/40 transition-colors"
                      >
                        <MapPin className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Deskripsi Detail *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Jelaskan detail masalah yang Anda temukan..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Foto/Video Bukti
                    </label>
                    <div className="space-y-4">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          Klik untuk upload foto/video (Max 5 file)
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                          JPG, PNG, MP4 hingga 10MB
                        </p>
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      {/* Preview uploaded files */}
                      {formData.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {formData.images.map((file, index) => (
                            <div key={index} className="relative">
                              <div className="aspect-square bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                <Camera className="h-6 w-6 text-gray-400" />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 truncate">
                                {file.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-center">
                      {formData.isAnonymous ? (
                        <EyeOff className="h-5 w-5 text-gray-500 dark:text-slate-400 mr-3" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 dark:text-slate-400 mr-3" />
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                          Laporan Anonim
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Identitas Anda akan disembunyikan dari publik
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.isAnonymous 
                          ? 'bg-emerald-600' 
                          : 'bg-gray-200 dark:bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isAnonymous ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Kirim Laporan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Report;