import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaUsersCog,
  FaBookOpen,
  FaInfoCircle,
  FaUserTie,
  FaNewspaper,
  FaImages,
  FaProjectDiagram,
  FaPhoneAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname.startsWith(path)
      ? "flex items-center py-2 px-4 rounded-lg bg-gray-500 text-white"
      : "flex items-center py-2 px-4 rounded-lg hover:bg-gray-400 text-gray-800 hover:text-white transition-all";
  };

  return (
    <div className="w-64 bg-gray-100 text-gray-700 min-h-screen p-6">
      <ul>
        <li>
          <Link to="/admin-hero" className={getLinkClass("/admin-hero")}>
            <FaHome className="mr-3" /> Welcome
          </Link>
        </li>
        <li>
          <Link to="/admin-alumni" className={getLinkClass("/admin-alumni")}>
            <FaCalendarAlt className="mr-3" /> Agenda
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        <li>
          <Link to="/admin-sambutan" className={getLinkClass("/admin-sambutan")}>
            <FaInfoCircle className="mr-3" /> Tentang
          </Link>
        </li>
        <li>
          <Link to="/admin-sejarah" className={getLinkClass("/admin-sejarah")}>
            <FaBookOpen className="mr-3" /> Sejarah
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        <li>
          <Link to="/admin-kalender" className={getLinkClass("/admin-kalender")}>
            <FaProjectDiagram className="mr-3" /> Struktur
          </Link>
        </li>
        <li>
          <Link to="/admin-ekskul" className={getLinkClass("/admin-ekskul")}>
            <FaUserTie className="mr-3" /> Pengurus Harian
          </Link>
        </li>
        <li>
          <Link to="/admin-sarana" className={getLinkClass("/admin-sarana")}>
            <FaUsersCog className="mr-3" /> Divisi Staff
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        <li>
          <Link to="/admin-berita" className={getLinkClass("/admin-berita")}>
            <FaNewspaper className="mr-3" /> Artikel
          </Link>
        </li>
        <li>
          <Link to="/admin-galeri" className={getLinkClass("/admin-galeri")}>
            <FaImages className="mr-3" /> Galeri
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        <li>
          <Link to="/admin-kontak" className={getLinkClass("/admin-kontak")}>
            <FaPhoneAlt className="mr-3" /> Kontak
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
