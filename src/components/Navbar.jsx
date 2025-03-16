import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCaretDown, FaCaretUp, FaBars, FaTimes, FaHome, FaUser, FaUsers, FaNewspaper, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    profil: false,
    layanan: false,
    berita: false,
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path, section) => {
    setIsSidebarOpen(false);

    // Special handling for Berita page tabs
    if (path === "/berita") {
      if (section === "#galeri") {
        navigate("/berita?tab=galeri");
        return;
      } else if (section === "#kelas") {
        navigate("/berita?tab=kelas");
        return;
      } else if (section === "#artikel") {
        navigate("/berita?tab=artikel");
        return;
      }
    }

    navigate(path);
    setTimeout(() => {
      const element = document.querySelector(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) return null;

  return (
    <nav className={`${scrolled ? 'bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 shadow-lg' : 'bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50'} text-gray-800 sticky top-0 z-50 transition-all duration-300`}>
      <div
        className={
          isAdminPage ? "mx-auto px-4 py-3" : "max-w-7xl mx-auto px-4 py-3"
        }
      >
        <div className="flex justify-between items-center">
          <Link
            to={isAdminPage ? "/admin" : "/"}
            className={`flex items-center hover:text-blue-700 transition duration-300 transform ${
              location.pathname.startsWith("/admin")
                ? "text-blue-700"
                : "text-gray-700"
            }`}
          >
            <img
              src="/assets/image/LOGO SR FIX.png"
              alt="School Logo"
              className="h-14 w-auto mr-3"
            />
            <div>
              {isAdminPage ? (
                <div className="text-2xl font-bold text-gray-700 tracking-wide">
                  Admin Dashboard
                </div>
              ) : (
                <>
                  <div className="text-xl font-bold">
                    Seni Religi
                  </div>
                </>
              )}
            </div>
          </Link>

          {/* Tombol untuk membuka sidebar di layar kecil */}
          {!isAdminPage && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-2xl text-gray-700 hover:text-blue-700 transition duration-300 hover:rotate-180 transform"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}

          {/* Menu Items untuk layar besar */}
          {!isAdminPage && (
            <div className="hidden md:flex space-x-5">
              <div className="group relative">
                <button
                  onClick={() => handleNavigation("/", "#home")}
                  className="flex items-center text-lg font-medium group-hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition duration-300"
                >
                  <FaHome className="mr-2 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" />
                  Beranda
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              </div>

              {/* Profil Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, profil: true }))
                }
                onMouseLeave={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, profil: false }))
                }
              >
                <button className="flex items-center text-lg font-medium group-hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition duration-300">
                  <FaUser className="mr-2 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" />
                  Profil
                  {isDropdownOpen.profil ? <FaCaretUp className="ml-1 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" /> : <FaCaretDown className="ml-1" />}
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                {isDropdownOpen.profil && (
                  <div className="absolute left-0 space-y-1 bg-white text-gray-700 w-60 p-4 rounded-lg shadow-xl transition duration-300 border-t-2 border-blue-600">
                    <button
                      onClick={() => handleNavigation("/profil", "#tentang")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Tentang
                    </button>
                    <button
                      onClick={() => handleNavigation("/profil", "#sejarah")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Sejarah
                    </button>
                    <button
                      onClick={() => handleNavigation("/profil", "#logo")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Logo
                    </button>
                  </div>
                )}
              </div>

              {/* Layanan Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, layanan: true }))
                }
                onMouseLeave={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, layanan: false }))
                }
              >
                <button className="flex items-center text-lg font-medium group-hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition duration-300">
                  <FaUsers className="mr-2 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" />
                  Kepengurusan
                  {isDropdownOpen.layanan ? <FaCaretUp className="ml-1 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" /> : <FaCaretDown className="ml-1" />}
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                {isDropdownOpen.layanan && (
                  <div className="absolute left-0 space-y-1 bg-white text-gray-700 w-60 p-4 rounded-lg shadow-xl transition duration-300 border-t-2 border-blue-600">
                    <button
                      onClick={() => handleNavigation("/layanan", "#struktur")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Struktur Organisasi
                    </button>
                    <button
                      onClick={() => handleNavigation("/layanan", "#pht")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Pengurus Harian
                    </button>
                    <button
                      onClick={() => handleNavigation("/layanan", "#divisi")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Divisi Staff
                    </button>
                  </div>
                )}
              </div>

              {/* Berita Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, berita: true }))
                }
                onMouseLeave={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, berita: false }))
                }
              >
                <button className="flex items-center text-lg font-medium group-hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition duration-300">
                  <FaNewspaper className="mr-2 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" />
                  Lainnya
                  {isDropdownOpen.berita ? <FaCaretUp className="ml-1 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" /> : <FaCaretDown className="ml-1" />}
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                {isDropdownOpen.berita && (
                  <div className="absolute left-0 space-y-1 bg-white text-gray-700 w-60 p-4 rounded-lg shadow-xl transition duration-300 border-t-2 border-blue-600">
                    <button
                      onClick={() => handleNavigation("/berita", "#artikel")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Artikel
                    </button>
                    <button
                      onClick={() => handleNavigation("/berita", "#kelas")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Kelas SR
                    </button>
                    <button
                      onClick={() => handleNavigation("/berita", "#galeri")}
                      className="block w-full text-left text-lg font-medium hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition duration-300"
                    >
                      Galeri
                    </button>
                  </div>
                )}
              </div>

              <div className="group relative">
                <button
                  onClick={() => handleNavigation("/kontak", "#kontak")}
                  className="flex items-center text-lg font-medium group-hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition duration-300"
                >
                  <FaEnvelope className="mr-2 group-hover:text-blue-700 hover:bg-blue-50 transition duration-100" />
                  Kontak
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Menu Items untuk layar kecil */}
      <div
        className={`md:hidden bg-gradient-to-br from-blue-900 to-blue-700 text-white w-[70%] max-w-sm h-screen fixed top-0 left-0 z-40 flex flex-col p-6 shadow-xl overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src="/assets/image/LOGO SR FIX.png"
              alt="School Logo"
              className="h-12 w-auto mr-3"
            />
            <div className="text-left">
              <div className="text-xl font-bold tracking-wide">Seni Religi</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-2">
          {/* Beranda */}
          <button
            onClick={() => handleNavigation("/", "#home")}
            className="flex items-center text-lg font-medium hover:bg-blue-800 hover:text-white p-3 rounded-lg w-full transition duration-300"
          >
            <FaHome className="mr-3" /> Beranda
          </button>

          {/* Profil */}
          <div className="mb-4">
            <button
              onClick={() =>
                setIsDropdownOpen((prev) => ({ ...prev, profil: !prev.profil }))
              }
              className="flex justify-between items-center text-lg font-medium w-full hover:bg-blue-800 hover:text-white p-3 rounded-lg transition duration-300"
            >
              <span className="flex items-center"><FaUser className="mr-3" /> Profil</span>
              {isDropdownOpen.profil ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            {isDropdownOpen.profil && (
              <div className="ml-6 mt-2">
                <button
                  onClick={() => handleNavigation("/profil", "#tentang")}
                  className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                >
                  Tentang
                </button>
                <button
                  onClick={() => handleNavigation("/profil", "#sejarah")}
                  className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                >
                  Sejarah
                </button>
                <button
                  onClick={() => handleNavigation("/profil", "#logo")}
                  className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                >
                  Logo
                </button>
              </div>
            )}
            {/* Kepengurusan */}
            <div className="mb-4">
              <button
                onClick={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, layanan: !prev.layanan }))
                }
                className="flex justify-between items-center text-lg font-medium w-full hover:bg-blue-800 hover:text-white p-3 rounded-lg transition duration-300"
              >
                <span className="flex items-center"><FaUsers className="mr-3" /> Kepengurusan</span>
                {isDropdownOpen.layanan ? <FaCaretUp /> : <FaCaretDown />}
              </button>
              {isDropdownOpen.layanan && (
                <div className="ml-6 mt-2">
                  <button
                    onClick={() => handleNavigation("/layanan", "#struktur")}
                    className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                  >
                    Struktur Organisasi
                  </button>
                  <button
                    onClick={() => handleNavigation("/layanan", "#pht")}
                    className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                  >
                    Pengurus Harian
                  </button>
                  <button
                    onClick={() => handleNavigation("/layanan", "#divisi")}
                    className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                  >
                    Divisi Staff
                  </button>
                </div>
              )}
            </div>

            {/* Lainnya */}
            <div className="mb-4">
              <button
                onClick={() =>
                  setIsDropdownOpen((prev) => ({ ...prev, berita: !prev.berita }))
                }
                className="flex justify-between items-center text-lg font-medium w-full hover:bg-blue-800 hover:text-white p-3 rounded-lg transition duration-300"
              >
                <span className="flex items-center"><FaNewspaper className="mr-3" /> Lainnya</span>
                {isDropdownOpen.berita ? <FaCaretUp /> : <FaCaretDown />}
              </button>
              {isDropdownOpen.berita && (
                <div className="ml-6 mt-2">
                  <button
                    onClick={() => handleNavigation("/berita", "#artikel")}
                    className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                  >
                    Artikel
                  </button>
                  <button
                    onClick={() => handleNavigation("/berita", "#kelas")}
                    className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                  >
                    Kelas SR
                  </button>
                  <button
                    onClick={() => handleNavigation("/berita", "#galeri")}
                    className="block text-lg font-medium hover:bg-blue-800 hover:text-white p-2 rounded-lg w-full transition duration-300"
                  >
                    Galeri
                  </button>
                </div>
              )}
            </div>

            {/* Kontak */}
            <button
              onClick={() => handleNavigation("/kontak", "#kontak")}
              className="flex items-center text-lg font-medium hover:bg-blue-800 hover:text-white p-3 rounded-lg w-full transition duration-300"
            >
              <FaEnvelope className="mr-3" /> Kontak
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;