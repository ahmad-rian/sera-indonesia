import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, TreePine, ArrowLeft, Leaf, Globe } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  

  useEffect(() => {
    document.title = '404 - Halaman Tidak Ditemukan | SERA Indonesia';
  }, []);

  const popularPages = [
    { path: '/', label: 'Beranda', icon: Home, description: 'Kembali ke halaman utama' },
    { path: '/crisis', label: 'Krisis Lingkungan', icon: TreePine, description: 'Lihat data krisis lingkungan' },
    { path: '/data', label: 'Data & Monitoring', icon: Search, description: 'Pantau kualitas udara real-time' },
    { path: '/action', label: 'Aksi Nyata', icon: Leaf, description: 'Ambil aksi untuk lingkungan' },
    { path: '/community', label: 'Komunitas', icon: Globe, description: 'Bergabung dengan komunitas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          
           {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative">
              {/* Main 404 Text */}
              <div className="text-8xl sm:text-9xl font-black text-gray-800 dark:text-gray-200 select-none drop-shadow-lg">
                404
              </div>
              
              {/* Floating Leaves */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Leaf className="absolute -top-4 -left-8 w-8 h-8 text-green-500 animate-bounce" style={{ animationDelay: '0s' }} />
                  <Leaf className="absolute -top-2 right-4 w-6 h-6 text-emerald-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  <Leaf className="absolute bottom-0 -left-4 w-7 h-7 text-teal-500 animate-bounce" style={{ animationDelay: '1s' }} />
                  <TreePine className="w-16 h-16 text-green-600 dark:text-green-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Oops! Halaman Tidak Ditemukan
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Sepertinya halaman yang Anda cari telah hilang di hutan digital. 
              Mari kita bantu Anda menemukan jalan kembali ke konservasi alam! 🌿
            </p>
            
            {/* Show requested path */}
            <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">URL yang dicari:</span>
              <code className="ml-2 text-red-500 dark:text-red-400">{location.pathname}</code>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12 space-y-4">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Beranda
            </Link>
            
            <p className="text-gray-500 dark:text-gray-400">atau jelajahi halaman populer di bawah</p>
          </div>

          {/* Popular Pages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularPages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                      <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {page.label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Help Text */}
          <div className="text-center space-y-2">
            <p className="text-gray-500 dark:text-gray-400">
              Masih bingung? Hubungi tim SERA di{' '}
              <a href="mailto:hello@sera.id" className="text-green-600 dark:text-green-400 hover:underline font-medium">
                hello@sera.id
              </a>
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Bersama SERA, mari lindungi Indonesia untuk generasi mendatang 🇮🇩
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotFound;