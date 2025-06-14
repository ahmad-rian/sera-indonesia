import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube,
  Github
} from 'lucide-react';
import { FOOTER_LINKS } from '../../lib/constants';

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { name: 'Youtube', icon: Youtube, href: '#', color: 'hover:text-red-500' },
  { name: 'Github', icon: Github, href: '#', color: 'hover:text-gray-400' },
];

const contactInfo = [
  { icon: Mail, text: 'hello@sera.id', href: 'mailto:hello@sera.id' },
  { icon: Phone, text: '+62 21 1234 5678', href: 'tel:+622112345678' },
  { name: 'Jakarta, Indonesia', icon: MapPin, href: '#' },
];

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-500/10 dark:via-transparent dark:to-teal-500/10" />
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Link to="/" className="inline-flex items-center space-x-3 group">
                  <motion.div 
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src="/assets/icons/logo.png"
                      alt="SERA Logo"
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient-sera">SERA</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Semesta Ruang Alam</p>
                  </div>
                </Link>
                
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Platform digital untuk memantau, melaporkan, dan mengambil aksi nyata 
                  dalam menjaga kelestarian lingkungan Indonesia untuk generasi mendatang.
                </p>
                
                <div className="space-y-3">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Link 
                          to={item.href}
                          className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 group"
                        >
                          <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm">{item.text || item.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">Platform</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.platform.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-sm group"
                      >
                        <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-4">Komunitas</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.community.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-sm group"
                      >
                        <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-500 mb-4">Dukungan</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.support.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-sm group"
                      >
                        <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-slate-700 dark:text-slate-400 mb-4">Legal</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.legal.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-sm group"
                      >
                        <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Newsletter</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                    Dapatkan update terbaru tentang lingkungan
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg">
                      Berlangganan
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Ikuti Kami</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={social.href}
                            className={`w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 ${social.color} transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700`}
                            aria-label={social.name}
                          >
                            <Icon className="h-4 w-4" />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-300 dark:border-slate-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm"
            >
              <span>© 2025 SERA INDONESIA  🇮🇩 | All rights reserved </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400 text-sm">
                <Link 
                  to="/terms"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <span>•</span>
                <Link 
                  to="/privacy"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"
        />
      </div>
    </footer>
  );
};

export default Footer;