import { AlertTriangle, Trees, Wind } from 'lucide-react';
import type { EmergencyAlert } from '../types/index';

export const emergencyAlerts: EmergencyAlert[] = [
  {
    id: 1,
    title: "Raja Ampat Terancam: Pertambangan Nikel",
    description: "Rencana pertambangan nikel di Raja Ampat menimbulkan kekhawatiran besar terhadap kerusakan lingkungan, merusak ekosistem laut dan darat yang sangat sensitif serta mengancam mata pencaharian masyarakat adat.",
    location: "Raja Ampat, Papua Barat Daya",
    severity: "KRITIS",
    time: "2 jam lalu",
    type: "mining",
    icon: AlertTriangle,
    color: "text-red-600",
    bgGradient: "from-red-500/20 to-amber-500/20",
    accentColor: "bg-red-500",
    stats: "Izin tambang di wilayah konservasi",
    image: "⛏️"
  },
  {
    id: 2,
    title: "Kebakaran Hutan dan Lahan di Sumatera",
    description: "Titik api meningkat tajam di beberapa provinsi, menyebabkan kabut asap pekat dan dampak serius pada kesehatan.",
    location: "Sumatera (Riau, Jambi, Sumatera Selatan)",
    severity: "DARURAT",
    time: "5 jam lalu",
    type: "fire",
    icon: Trees,
    color: "text-orange-600",
    bgGradient: "from-orange-500/20 to-red-500/20",
    accentColor: "bg-orange-500",
    stats: "Puluhan ribu hektar terbakar",
    image: "🔥"
  },
  {
    id: 3,
    title: "Pencemaran Udara Kronis di Megapolitan",
    description: "Kualitas udara di Jakarta dan sekitarnya sering mencapai level tidak sehat, dipicu oleh emisi kendaraan dan industri.",
    location: "Jakarta dan sekitarnya",
    severity: "TINGGI",
    time: "1 hari lalu",
    type: "pollution",
    icon: Wind,
    color: "text-yellow-600",
    bgGradient: "from-yellow-500/20 to-orange-500/20",
    accentColor: "bg-yellow-500",
    stats: "AQI sering di atas 150",
    image: "🏭"
  },
  {
    id: 4,
    title: "Ancaman Deforestasi Hutan di Kalimantan",
    description: "Pembukaan lahan ilegal dan ekspansi perkebunan mengancam hutan hujan dan keanekaragaman hayati, termasuk habitat orangutan.",
    location: "Kalimantan (khususnya Kalimantan Tengah)",
    severity: "PERHATIAN",
    time: "2 hari lalu",
    type: "deforestation",
    icon: Trees,
    color: "text-blue-600",
    bgGradient: "from-blue-500/20 to-teal-500/20",
    accentColor: "bg-blue-500",
    stats: "Ribuan hektar terancam",
    image: "🐒"
  }
];
