import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const navigate = useNavigate();

  const [hero, setHero] = useState([]);
  const [news, setNews] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigation = (path, section) => {
    navigate(path);
    setTimeout(() => {
      const element = document.querySelector(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    Promise.all([
      fetch("https://senireligiuns-api.vercel.app/api/hero").then((res) => res.json()),
      fetch("https://senireligiuns-api.vercel.app/api/news").then((res) => res.json()),
      fetch("https://senireligiuns-api.vercel.app/api/alumni").then((res) => res.json()),
    ])
      .then(([heroData, newsData, alumniData]) => {
        setHero(heroData);
        setNews(newsData);
        setAlumni(alumniData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-blue-100 to-blue-50 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Gradient Background */}
      <div
        id="home"
        className="relative bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50"
      >
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center min-h-screen py-16 px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-gray-800 text-center md:text-left md:w-1/2 p-4 z-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
              Selamat Datang di Website {hero.welcomeMessage}
            </h1>
            <p className="mt-6 text-2xl font-light text-gray-600">
              {hero.description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => handleNavigation("/profil", "#sambbutan")}
                className="px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
              >
                Profil Kami
              </button>
            </div>
          </motion.div>

          {/* Image Section with Float Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 flex justify-center relative z-10"
          >
            <motion.img
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              src={hero.image}
              alt="Seni Religi UNS"
              className="rounded-2xl shadow-2xl w-4/5 md:w-4/5 object-cover border-4 border-white"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-100 rounded-full opacity-50 z-0"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 z-0"></div>
          </motion.div>
        </div>
      </div>

      {/* News Section with Card Design */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto p-4">
          <section className="mb-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-2 text-gray-800">
                Artikel Terbaru
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto"></div>
            </div>

            {/* News Cards with Hover Effects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {news
                .sort(
                  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
                )
                .slice(0, 3)
                .map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Image with overlay */}
                    <div className="w-full h-56 bg-gray-200 relative overflow-hidden">
                      {item.image && (
                        <>
                          <img
                            src={item.image}
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

            {/* View all button */}
            <div className="text-center mt-12">
              <Link
                to="/berita"
                className="inline-flex items-center px-6 py-3 border border-blue-300 text-blue-700 bg-blue-50 rounded-full hover:bg-blue-700 hover:text-white transition duration-300"
              >
                Lihat Semua Artikel
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Agenda Section with Modern Card Design */}
      <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto text-center px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-2 text-gray-800">
              Agenda Kami
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
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
        </div>
      </div>
    </div>
  );
};

export default Home;
