import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const rolesOrder = [
  "Ketua",
  "Wakil Ketua",
  "Kepala Bidang Sekretaris",
  "Wakil Bidang Sekretaris",
  "Kepala Bidang Bendahara",
  "Wakil Bidang Bendahara",
  "Kepala Bidang Rumah Tangga",
  "Kepala Bidang Dakwah",
  "Kepala Bidang Informasi dan Komunikasi",
  "Kepala Bidang Pengembangan Sumber Daya Manusia",
];

const divisi_staff = [
  "Kepala Divisi Keaparatan Rumah Tangga",
  "Staff Divisi Keaparatan Rumah Tangga",
  "Kepala Divisi Kaderisasi Rumah Tangga",
  "Staff Divisi Kaderisasi Rumah Tangga",
  "Kepala Divisi Kajian Dakwah",
  "Staff Divisi Kajian Dakwah",
  "Kepala Divisi Event Dakwah",
  "Staff Divisi Event Dakwah",
  "Kepala Divisi Media Informasi dan Komunikasi",
  "Staff Divisi Media Informasi dan Komunikasi",
  "Kepala Divisi Humas Informasi dan Komunikasi",
  "Staff Divisi Humas Informasi dan Komunikasi",
  "Kepala Divisi Hadrah Pengembangan Sumber Daya Manusia",
  "Staff Divisi Hadrah Pengembangan Sumber Daya Manusia",
  "Kepala Divisi Vokal Pengembangan Sumber Daya Manusia",
  "Staff Divisi Vokal Pengembangan Sumber Daya Manusia",
  "Kepala Divisi Ratoh Jaroe Pengembangan Sumber Daya Manusia",
  "Staff Divisi Ratoh Jaroe Pengembangan Sumber Daya Manusia",
];

// Variants untuk animasi menu (bisa disesuaikan)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Layanan = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [kalender, setKalender] = useState({ title: "", file: "" });
  const [sarana, setSarana] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visiMisi, setVisiMisi] = useState({
    visi: "",
    misi: [],
  });
  const [activeTab, setActiveTab] = useState("Rumah Tangga");

  useEffect(() => {
    Promise.all([
      fetch("https://senireligiuns-api.vercel.app/api/extracurriculars").then((res) =>
        res.json()
      ),
      fetch("https://senireligiuns-api.vercel.app/api/sarana").then((res) => res.json()),
      fetch("https://senireligiuns-api.vercel.app/api/kalender").then((res) => res.json()),
      fetch("https://senireligiuns-api.vercel.app/api/visi-misi").then((res) => res.json()),
    ])
      .then(([ekskulData, saranaData, kalenderData, visiMisiData]) => {
        setExtracurriculars(ekskulData);
        setSarana(saranaData);
        setKalender(kalenderData[0]);
        setVisiMisi(visiMisiData ? visiMisiData : { visi: "", misi: [] });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const pengurusTetap = extracurriculars
    .filter((item) => ["Ketua", "Wakil Ketua"].includes(item.description))
    .sort(
      (a, b) =>
        rolesOrder.indexOf(a.description) - rolesOrder.indexOf(b.description)
    );

  const pengurusLainnya = extracurriculars
    .filter((item) => !["Ketua", "Wakil Ketua"].includes(item.description))
    .sort(
      (a, b) =>
        rolesOrder.indexOf(a.description) - rolesOrder.indexOf(b.description)
    );

  // Filter sarana berdasarkan kategori aktif (dengan asumsi item.description mengandung kata kunci)
  const filteredSarana = sarana.filter((item) =>
    item.description.toLowerCase().includes(activeTab.toLowerCase())
  );

  const sortedSarana = [...filteredSarana].sort((a, b) => {
    return (
      divisi_staff.indexOf(a.description) - divisi_staff.indexOf(b.description)
    );
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-blue-900 opacity-30"></div>
          <div className="absolute w-96 h-96 -top-20 -right-20 rounded-full bg-indigo-500 opacity-30"></div>
          <div className="absolute w-96 h-96 -bottom-40 -left-20 rounded-full bg-blue-500 opacity-40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kepengurusan Seni Religi
            </h1>
            <div className="w-32 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 z-10">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Struktur Organisasi Section with Modern Design */}
      <div
        id="struktur"
        className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 py-20 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-4xl font-bold text-center mb-3 text-gray-800 tracking-wide">
              Struktur Organisasi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 w-32 h-32 bg-blue-100 rounded-full opacity-70 z-0"></div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-100 rounded-full opacity-70 z-0"></div>

            <div className="relative group z-10 bg-white p-8 rounded-xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-100 opacity-50 rounded-lg transform rotate-1 scale-105 transition-transform duration-300 group-hover:rotate-0"></div>
              {kalender.file && (
                <img
                  src={`http://localhost:5000${kalender.file}`}
                  alt={kalender.title}
                  className="relative z-10 object-cover w-full h-full rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pengurus Harian Tetap Section */}
      <div id="pht" className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-4xl font-bold text-center mb-3 text-gray-800 tracking-wide">
              Pengurus Harian Tetap
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mb-4"></div>
            <p className="text-2xl text-gray-600 text-center">
              Ketua & Wakil Ketua
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-8">
            {pengurusTetap.map((ekstra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-70 rounded-2xl transform rotate-3 scale-105 transition-transform duration-300 group-hover:rotate-1"></div>
                <div className="bg-white p-6 rounded-xl shadow-xl relative z-10 flex flex-col md:flex-row items-center overflow-hidden">
                  <div className="md:w-1/3">
                    <div className="relative w-48 h-48 mx-auto mb-6 md:mb-0 overflow-hidden rounded-full border-4 border-white shadow-lg">
                      <img
                        src={`http://localhost:5000${ekstra.image}`}
                        alt={ekstra.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                    <h3 className="font-bold text-3xl text-gray-800 mb-2">
                      {ekstra.name}
                    </h3>
                    <div className="w-12 h-1 bg-blue-500 mb-4 mx-auto md:mx-0"></div>
                    <p className="text-xl text-blue-600 font-semibold">
                      {ekstra.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Visi Misi Section with Side-by-Side Design */}
      <div id="visi-misi" className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <p className="text-2xl text-gray-600 text-center">Visi & Misi</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col md:flex-row gap-10"
          >
            {/* Visi Section */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border-t-4 border-blue-500 flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Visi</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {visiMisi.visi}
              </p>
            </div>

            {/* Misi Section */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border-t-4 border-blue-500 flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Misi</h3>
              <ul className="space-y-4">
                {visiMisi.misi.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                      <span className="text-blue-600 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Kepala Bidang Section */}
      <div id="kepala-bidang" className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <p className="text-2xl text-gray-600 text-center">
              Kepala Bidang & Wakil Bidang
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {pengurusLainnya.map((ekstra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={`http://localhost:5000${ekstra.image}`}
                    alt={ekstra.name}
                    className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-2xl text-gray-800 mb-2">
                    {ekstra.name}
                  </h3>
                  <div className="w-12 h-1 bg-blue-500 mb-4"></div>
                  <p className="text-blue-600 font-medium">
                    {ekstra.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divisi Staff Section */}
      <div
        id="divisi"
        className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 py-20 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Judul */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 tracking-wider mb-3">
              Divisi Staff
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto"></div>
          </div>

          {/* Menu Filter Divisi Staff */}
          <motion.div
            className="relative py-6 text-white mb-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="max-w-7xl mx-auto px-4">
              <motion.div variants={itemVariants}>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={() => setActiveTab("Rumah Tangga")}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeTab === "Rumah Tangga"
                        ? "bg-white text-blue-800 shadow-lg"
                        : "bg-blue-800 text-white hover:bg-blue-700"
                    }`}
                  >
                    Rumah Tangga
                  </button>
                  <button
                    onClick={() => setActiveTab("Dakwah")}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeTab === "Dakwah"
                        ? "bg-white text-blue-800 shadow-lg"
                        : "bg-blue-800 text-white hover:bg-blue-700"
                    }`}
                  >
                    Dakwah
                  </button>
                  <button
                    onClick={() =>
                      setActiveTab("Informasi dan Komunikasi")
                    }
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeTab === "Informasi dan Komunikasi"
                        ? "bg-white text-blue-800 shadow-lg"
                        : "bg-blue-800 text-white hover:bg-blue-700"
                    }`}
                  >
                    Infokom
                  </button>
                  <button
                    onClick={() =>
                      setActiveTab("Pengembangan Sumber Daya Manusia")
                    }
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeTab === "Pengembangan Sumber Daya Manusia"
                        ? "bg-white text-blue-800 shadow-lg"
                        : "bg-blue-800 text-white hover:bg-blue-700"
                    }`}
                  >
                    PSDM
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Grid Divisi Staff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {sortedSarana.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-2xl text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <div className="w-12 h-1 bg-blue-500 mb-4"></div>
                  <p className="text-blue-600 font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
