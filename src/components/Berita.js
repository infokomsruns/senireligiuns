import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import { useLocation } from "react-router-dom";

const Berita = () => {
  const [news, setNews] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("artikel");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    if (tabParam && ["artikel", "galeri", "kelas"].includes(tabParam)) {
      setActiveTab(tabParam);
    }

    Promise.all([
      fetch("https://senireligiuns-api.vercel.app/api/news").then((res) => res.json()),
      fetch("https://senireligiuns-api.vercel.app/api/galeri").then((res) => res.json()),
    ])
      .then(([newsData, galeriData]) => {
        setNews(newsData);
        setGaleri(galeriData);
      })
      .finally(() => setIsLoading(false));
  }, [location.search]);

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Hero section container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Hero section item variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Tab content variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-r from-blue-600 to-indigo-800 py-36 text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <motion.h1
            className="text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Informasi Terkini
          </motion.h1>
          <motion.p className="text-xl max-w-2xl mb-8" variants={itemVariants}>
            Temukan berita, artikel, dan galeri kegiatan terbaru dari kami
          </motion.p>
          <motion.div variants={itemVariants}>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("artikel")}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === "artikel"
                    ? "bg-white text-blue-800 shadow-lg"
                    : "bg-blue-800 text-white hover:bg-blue-700"
                }`}
              >
                Artikel
              </button>

              <button
                onClick={() => setActiveTab("kelas")}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === "kelas"
                    ? "bg-white text-blue-800 shadow-lg"
                    : "bg-blue-800 text-white hover:bg-blue-700"
                }`}
              >
                Kelas SR
              </button>

              <button
                onClick={() => setActiveTab("galeri")}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === "galeri"
                    ? "bg-white text-blue-800 shadow-lg"
                    : "bg-blue-800 text-white hover:bg-blue-700"
                }`}
              >
                Galeri
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* About Section with Scroll Indicator */}
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Konten Tab */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
          key={activeTab}
        >
          {activeTab === "artikel" && (
            <section className="py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 border-b pb-4 relative">
                <span className="relative z-10">Artikel Terbaru</span>
                <span className="absolute left-0 bottom-0 w-32 h-1 bg-blue-600"></span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {news.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-xl overflow-hidden group"
                  >
                    {/* Image with overlay */}
                    <div className="w-full h-56 bg-gray-200 relative overflow-hidden">
                      {item.image && (
                        <>
                          <img
                            src={`http://localhost:5000${item.image}`}
                            alt={item.title}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                      )}
                    </div>

                    {/* Content with hover effect */}
                    <div className="p-6 flex flex-col flex-grow border-t border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                        {truncateText(item.title, 80)}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">
                        {new Date(item.publishedAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to={`/berita/${item.id}`}
                          className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-900 transition-colors duration-300"
                        >
                          Selengkapnya
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "kelas" && (
            <section className="py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 border-b pb-4 relative">
                <span className="relative z-10">Kelas SR</span>
                <span className="absolute left-0 bottom-0 w-32 h-1 bg-blue-600"></span>
              </h2>

              <div className="space-y-12">
                {/* Intro section */}
                <div className="bg-blue-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Apa Aja Sih Kelas di Seni Religi?
                  </h3>
                  <p className="text-gray-700">
                    Seni Religi merupakan Ormawa Kerohanian Islam yang bergerak
                    dalam bidang seni keislaman. Dalam Seni Religi, terdapat
                    beberapa kelas untuk menunjang tujuan dari Seni Religi itu
                    berdiri, diantaranya kelas hadrah, kelas vokal, dan kelas
                    ratoh jaroe. Disetiap kelas Seni Religi memiliki pengertian,
                    tujuan, sasaran, target, dan pola latihan masing-masing.
                  </p>
                </div>

                {/* Kelas Hadrah */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-blue-100 flex items-center justify-center p-6">
                      <div className="text-center">
                        <img
                          src="https://senireligi.wordpress.com/wp-content/uploads/2024/11/img_9883.jpg?strip=info&w=2000"
                          alt="Kelas Hadrah"
                          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                        />
                        <h3 className="text-2xl font-bold text-blue-800">
                          Kelas Hadrah
                        </h3>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <p className="text-gray-700 mb-4">
                        Kelas hadrah merupakan kelas yang bergerak dalam
                        kesenian islam terutama kesenian musik. Kelas hadrah
                        memiliki tujuan untuk memperkenalkan Seni Religi UNS
                        khususnya dalam bidang kesenian musik dan untuk
                        mengembangkan bakat anggota.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Kelas hadrah terbagi menjadi dua, kelas hadrah putra dan
                        kelas hadrah putri. Dalam setiap kelas hadrah memiliki
                        nama masing-masing. Kelas hadrah putra memiliki nama{" "}
                        <strong>"Khalilurrahman"</strong> dan kelas hadrah putri
                        memiliki nama <strong>"As-Salwa"</strong>. Walaupun
                        kelas hadrah terbagi dua, kedua kelas mendapatkan
                        pemerataan dalam latihan masing-masing.
                      </p>
                      <p className="text-gray-700">
                        Di setiap latihan kelas hadrah akan dipandu oleh pelatih
                        atau orang yang sudah mahir, jadi sudah pasti di setiap
                        latihan akan tersampaikan ilmu secara maksimal. Hasil
                        akhir dari latihan kelas hadrah akan mendapatakan
                        kesempatan tampil di setiap event Seni Religi atau event
                        dari luar Seni Religi, bahkan jika sudah mahir akan
                        mendapatkan kesempatan untuk ikut delegasi lomba
                        internal maupun eksternal. Tentunya jika beruntung anda
                        akan mendapatkan benefit lebih dari kelas Hadrah ini
                        hehe.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kelas Vokal */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex flex-row-reverse">
                    <div className="md:w-1/3 bg-indigo-100 flex items-center justify-center p-6">
                      <div className="text-center">
                        <img
                          src="https://senireligi.wordpress.com/wp-content/uploads/2024/11/img_0876.jpg?w=2046"
                          alt="Kelas Vokal"
                          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                        />
                        <h3 className="text-2xl font-bold text-indigo-800">
                          Kelas Vokal
                        </h3>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <p className="text-gray-700 mb-4">
                        Kelas vokal merupakan kelas yang bergerak dalam kesenian
                        islam terutama kesenian tarik suara. Kelas vokal
                        memiliki tujuan ini adalah memperkenalkan Seni Religi
                        UNS khususnya di bidang vokal dan untuk mengembangkan
                        bakat anggota. Sasaran dari kelas vokal adalah pengurus
                        dan anggota Seni Religi putra dan putri.
                      </p>
                      <p className="text-gray-700">
                        Kelas vokal memiliki pola latihan tersendiri di setiap
                        minggunya jadi dijamin tidak akan bosan dengan latihan
                        yang diberikan. Dalam latihan kelas vokal akan dipandu
                        oleh pelatih atau orang yang sudah mahir. Jika sudah
                        mahir dalam kelas vokal, maka akan mendapatkan
                        kesempatan tampil disetiap event Seni Religi atau event
                        eksternal Seni Religi, bahkan juga akan mendapatakan
                        kesempatan ikut delegasi lomba internal maupun
                        eksternal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kelas Ratoh Jaroe */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-green-100 flex items-center justify-center p-6">
                      <div className="text-center">
                        <img
                          src="https://senireligi.wordpress.com/wp-content/uploads/2024/11/img_1016-1.jpg?strip=info&w=2000"
                          alt="Kelas Ratoh Jaroe"
                          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                        />
                        <h3 className="text-2xl font-bold text-green-800">
                          Kelas Ratoh Jaroe
                        </h3>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <p className="text-gray-700 mb-4">
                        Kelas ratoh jaroe merupakan kelas yang bergerak dalam
                        kesenian islam terutama kesenian tari. Tujuan kelas
                        ratoh jaroe adalah memperkenalkan Seni Religi di kampus
                        UNS khususnya tari ratoh jaroe dan untuk mengembangkan
                        bakat anggota. Sasaran kelas ratoh jaroe adalah pengurus
                        dan anggota Seni Religi putri.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Kelas ratoh jaroe memiliki pola latihan yang luar biasa
                        disetiap latihannya. Pola latihan dari kelas ratoh jaroe
                        ini memiliki target yaitu mengajarkan gerakan dasar
                        Ratoh Jaroe dan membentuk grub untuk mengembangkan
                        variasi gerakan. Jadi disetiap penampilan ratoh jaroe
                        akan membawakan variasi yang berbeda dan tidak perlu
                        khawatir tentang latihan yang membosankan.
                      </p>
                      <p className="text-gray-700">
                        Selain latihan ratoh jaroe, adapun latihan untuk
                        pengiring ratoh jaroe. Pengiring ratoh jaroe biasanya
                        diisi oleh laki-laki namun dibeberapa kesempatan ada
                        juga perempuan. Tentunya dalam setiap latihan kelas
                        ratoh jaroe akan dipandu oleh pelatih atau orang yang
                        sudah mahir. Jika sudah mahir, maka akan mendapatkan
                        kesempatan tampil disetiap event Seni Religi atau event
                        eksternal Seni Religi, bahkan juga akan mendapatakan
                        kesempatan ikut delegasi lomba internal maupun
                        eksternal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "galeri" && (
            <section className="py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 border-b pb-4 relative">
                <span className="relative z-10">Galeri Kegiatan</span>
                <span className="absolute left-0 bottom-0 w-32 h-1 bg-blue-600"></span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {galeri.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={index}
                    className="relative bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.title}
                        className="w-full h-64 object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Teks hanya muncul saat hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h3 className="text-2xl font-bold text-blue-50 text-center">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Berita;
