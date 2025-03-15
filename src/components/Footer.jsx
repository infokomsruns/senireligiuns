import React from "react";
import { FaYoutube, FaMapMarkerAlt, FaEnvelope, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Check if the current page is the admin page
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  
  if (isAdminPage || isLoginPage) return null;
  
  return (
    <footer className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Address Section */}
          <div className="space-y-6">
            <div className="flex items-center bg-blue-900/50 rounded-lg p-4 shadow-inner hover:bg-blue-800/50 transition duration-300">
              <img
                src="/assets/image/LOGO SR FIX.png"
                alt="SMP NEGERI 1 TAMANSARI"
                className="h-16 w-auto mr-4"
              />
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">SENI RELIGI</p>
                <p className="text-blue-200 text-sm">UNS Surakarta</p>
              </div>
            </div>
            
            <div className="bg-blue-900/50 rounded-lg p-4 shadow-inner hover:bg-blue-800/50 transition duration-300">
              <p className="flex items-start mb-3">
                <FaMapMarkerAlt className="mr-3 mt-1 text-blue-300 flex-shrink-0" />
                <span className="text-sm">
                  Universitas Negeri Sebelas Maret<br/>
                  Jl. Ir. Sutami No.36, Jebres, Kec. Jebres,<br/>
                  Kota Surakarta, Jawa Tengah 57126
                </span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-300 flex-shrink-0" />
                <span className="text-sm">senireligi@mail.uns.ac.id</span>
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:mx-auto">
            <h3 className="text-xl font-semibold mb-6 relative pb-2">
              <span className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">Tautan Cepat</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-400 rounded"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { text: "Beranda", href: "/" },
                { text: "Profil", href: "/profil" },
                { text: "Kepengurusan", href: "/layanan" },
                { text: "Lainnya", href: "/berita" },
                { text: "Kontak", href: "/kontak" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center transition duration-300"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    <span className="hover:text-blue-200 hover:translate-x-1 transition-all duration-300">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative pb-2">
              <span className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">Ikuti Kami</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-400 rounded"></span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://youtube.com/@senireligiuns3121"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-900/50 p-4 rounded-lg hover:bg-red-600 transition duration-300 group"
              >
                <FaYoutube className="text-2xl mr-2 group-hover:scale-125 transition duration-300" />
                <span className="text-sm">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/senireligi.uns"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-900/50 p-4 rounded-lg hover:bg-pink-600 transition duration-300 group"
              >
                <FaInstagram className="text-2xl mr-2 group-hover:scale-125 transition duration-300" />
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100012288273212&ref=ig_profile_ac"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-900/50 p-4 rounded-lg hover:bg-blue-600 transition duration-300 group"
              >
                <FaFacebook className="text-2xl mr-2 group-hover:scale-125 transition duration-300" />
                <span className="text-sm">Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@senireligiuns"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-900/50 p-4 rounded-lg hover:bg-gray-800 transition duration-300 group"
              >
                <FaTiktok className="text-2xl mr-2 group-hover:scale-125 transition duration-300" />
                <span className="text-sm">Tiktok</span>
              </a>
            </div>
            
          </div>
        </div>
      </div>

      {/* Decorative Line and Copyright */}
      <div className="mt-6 border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex md:justify-center items-center">
            <p className="text-center text-sm text-blue-200">
              &copy; {new Date().getFullYear()} Seni Religi Universitas Sebelas Maret. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;