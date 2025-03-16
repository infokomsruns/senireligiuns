import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const [headmasterMessage, setHeadmasterMessage] = useState([]);
  const [sejarah, setSejarah] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const logoParts = [
    {
      id: "circle",
      label: "Lingkaran",
      image: "/assets/image/lingkaran.png",
      description:
        "Lingkaran menyerupai bentuk rebana yang mempunyai makna Organisasi Kemahasiswaan Kerohanian Islam (OKI) Seni Religi (SR) bergerak dalam bidang kesenian. <br/>Warna hijau pada lingkaran melambangkan kedamaian dan ketenteraman.",
    },
    {
      id: "letter",
      label: "Huruf",
      image: "/assets/image/huruf.png",
      description:
        'Huruf "R" menunjukkan bahwa organisasi ini bergerak pada bidang religi. <br/>Warna biru pada huruf "R" melambangkan kedalaman ilmu agama yang dimiliki oleh anggotanya.',
    },
    {
      id: "star",
      label: "Bintang",
      image: "/assets/image/bintang.png",
      description:
        "Bintang berjumlah lima merupakan representasi dari Pancasila. <br/>Warna kuning pada bintang melambangkan keceriaan dan semangat yang selalu dimiliki anggotanya.",
    },
    {
      id: "flag",
      label: "Bendera",
      image: "/assets/image/bendera.png",
      description:
        "Warna merah putih melambangkan darah dan tulang yang menunjukkan rasa cinta anggota terhadap NKRI seperti menyatunya darah dan tulang dalam tubuh.",
    },
  ];

  useEffect(() => {
    Promise.all([
      fetch("https://senireligiuns-api.vercel.app/api/headmaster-message").then((res) =>
        res.json()
      ),
      fetch("https://senireligiuns-api.vercel.app/api/sejarah").then((res) => res.json()),
    ])
      .then(([headmasterData, sejarahData]) => {
        setHeadmasterMessage(headmasterData);
        const sortedSejarah = sejarahData.sort(
          (a, b) => parseInt(a.period) - parseInt(b.period)
        );
        setSejarah(sortedSejarah);
        setSelectedPart(logoParts[0]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Pastikan ada setidaknya satu slide
  const currentSejarah = sejarah[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === sejarah.length - 1 ? prev : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="font-sans">
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
              Profil Seni Religi
            </h1>
            <div className="w-32 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

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

      {/* Tentang Section with Modern Design */}
      <div
        id="tentang"
        className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 py-20 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4">
          <section>
            <div className="flex flex-col items-center justify-center mb-16">
              <h2 className="text-4xl font-bold text-center mb-3 text-gray-800 tracking-wide">
                Tentang Seni Religi
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image with Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative order-2 md:order-1"
              >
                <div className="absolute -left-4 -top-4 w-32 h-32 bg-blue-100 rounded-full opacity-70 z-0"></div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-100 rounded-full opacity-70 z-0"></div>

                <div className="relative group z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-100 opacity-50 rounded-lg transform rotate-3 scale-105 transition-transform duration-300 group-hover:rotate-0"></div>
                  <img
                    src={headmasterMessage.image}
                    alt="Seni Religi"
                    className="relative z-10 w-full h-auto object-cover rounded-lg shadow-xl transform transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Name Tag with Glass Effect */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white border-opacity-40">
                    <span className="text-blue-900 font-bold">
                      {headmasterMessage.headmasterName}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Text Content with Decorative Quote Styling */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative order-1 md:order-2"
              >
                <div className="absolute -right-2 -top-2 text-8xl text-indigo-100 font-serif z-0">
                  "
                </div>
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border-t-4 border-blue-500 relative z-10">
                  <div
                    className="text-lg leading-relaxed text-gray-700 quill-description"
                    dangerouslySetInnerHTML={{
                      __html: headmasterMessage.description,
                    }}
                  />
                  <div className="mt-6 flex items-center">
                    <div className="w-12 h-1 bg-blue-500 mr-3"></div>
                    <span className="text-blue-600 font-semibold">
                      Seni Religi UNS
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* Sejarah Section with Timeline-Inspired Design */}
      <div
        id="sejarah"
        className="bg-gradient-to-b from-white to-gray-50 py-20 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4">
          <section>
            <div className="flex flex-col items-center justify-center mb-16">
              <h2 className="text-4xl font-bold text-center mb-3 text-gray-800">
                Sejarah Seni Religi
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-600 hidden md:block transform md:-translate-x-1/2"></div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Slide Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex justify-center md:w-1/2 relative"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 transform rotate-3 rounded-lg"></div>
                    <img
                      src={currentSejarah.image}
                      alt={`Sejarah ${currentSejarah.period}`}
                      className="relative w-full h-auto object-cover rounded-lg shadow-xl z-10"
                    />
                  </div>
                </motion.div>

                {/* Slide Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="md:w-1/2 relative"
                >
                  <div className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-indigo-500">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {currentSejarah.period}
                    </h3>
                    <div
                      className="text-lg text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: currentSejarah.text }}
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="relative">
                    <button
                      onClick={handlePrev}
                      disabled={currentSlide === 0}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentSlide === sejarah.length - 1}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Logo Philosophy with Interactive 3D-like Design */}
      <div
        id="logo"
        className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 md:py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-4xl font-bold text-center mb-3 text-gray-800">
              Filosofi Logo
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          </div>

          <div className="flex flex-col items-center">
            {/* Main Logo with Animation */}
            <div className="relative mb-12">
              <motion.div
                className="absolute inset-0 bg-blue-100 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
              />
              <motion.img
                src="/assets/image/LOGO SR FIX.png"
                alt="Logo SR"
                className="relative h-64 w-auto drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                whileHover={{
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.5 },
                }}
              />
            </div>

            {/* Interactive Logo Parts Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-4xl">
              {logoParts.map((part, index) => (
                <motion.div
                  key={part.id}
                  className={`p-5 rounded-xl text-center cursor-pointer transition-all duration-300 shadow-lg ${
                    selectedPart?.id === part.id
                      ? "bg-blue-200 transform scale-105"
                      : "bg-white text-gray-800 hover:bg-blue-100 border border-blue-100"
                  }`}
                  onClick={() => setSelectedPart(part)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="font-bold text-lg block mb-1">
                    {part.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Detail Card with 3D Effect */}
            {selectedPart && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full transform perspective-1000"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Column */}
                  <div className="md:w-2/5 bg-blue-100 p-6 flex items-center justify-center">
                    <motion.img
                      className="h-48 w-auto drop-shadow-lg transform"
                      src={selectedPart.image}
                      alt={selectedPart.label}
                      initial={{ opacity: 0, rotateY: -15 }}
                      animate={{
                        opacity: 1,
                        rotateY: 0,
                        transition: { delay: 0.2, duration: 0.8 },
                      }}
                      exit={{ opacity: 0 }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 },
                      }}
                    />
                  </div>

                  {/* Content Column */}
                  <div className="md:w-3/5 p-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="text-3xl font-bold mb-3 text-gray-800 flex items-center">
                        {selectedPart.label}
                      </h3>
                      <div className="w-16 h-1 bg-blue-500 mb-6"></div>
                      <p
                        className="text-lg leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: selectedPart.description,
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
