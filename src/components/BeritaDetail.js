import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineShareAlt } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const BeritaDetail = ({
  url: propUrl,
  text: propText,
  subject: propSubject,
  body: propBody,
}) => {
  const { id } = useParams();
  const [beritaDetail, setBeritaDetail] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [isBeritaLoading, setIsBeritaLoading] = useState(true);
  const [isOtherNewsLoading, setIsOtherNewsLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Jika props tidak diberikan, gunakan nilai default
  const defaultUrl = `https://senireligiuns.vercel.app/berita/${id}`;
  const shareUrl = propUrl || defaultUrl;
  const shareText =
    propText ||
    (beritaDetail
      ? beritaDetail.title
      : "Lihat berita menarik di Seni Religi UNS");
  const shareSubject = propSubject || "Berita dari Seni Religi UNS";
  const shareBody = propBody || "Baca berita menarik di Seni Religi UNS:";

  // Toggle tampilan share options
  const handleShareButtonClick = () => {
    setShowShareOptions((prev) => !prev);
  };

  // Event handler untuk masing-masing platform share
  const handleFacebookShare = () => {
    const shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(shareLink, "_blank", "noopener,noreferrer");
  };

  const handleTwitterShare = () => {
    const shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(shareLink, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppShare = () => {
    const shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText + " " + shareUrl
    )}`;
    window.open(shareLink, "_blank", "noopener,noreferrer");
  };

  const handleEmailShare = () => {
    const shareLink = `mailto:?subject=${encodeURIComponent(
      shareSubject
    )}&body=${encodeURIComponent(shareBody + " " + shareUrl)}`;
    window.location.href = shareLink;
  };

  // Fetch berita detail
  useEffect(() => {
    const fetchBeritaDetail = () => {
      setIsBeritaLoading(true);
      fetch(`https://senireligiuns-api.vercel.app/api/news/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setBeritaDetail(data);
          setIsBeritaLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching berita detail:", error);
          setIsBeritaLoading(false);
        });
    };

    fetchBeritaDetail();
  }, [id]);

  // Fetch other news
  useEffect(() => {
    const fetchOtherNews = () => {
      setIsOtherNewsLoading(true);
      fetch("https://senireligiuns-api.vercel.app/api/news")
        .then((response) => response.json())
        .then((data) => {
          setOtherNews(data);
          setIsOtherNewsLoading(false);
        });
    };

    fetchOtherNews();
  }, []);

  // Loading state
  if (isBeritaLoading || isOtherNewsLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  const publishedDate = new Date(beritaDetail.publishedAt).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // Filter out the current news from other news list
  const filteredOtherNews = otherNews.filter(
    (news) => news.id !== parseInt(id)
  );

  // Function to shuffle array for random order
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Berita Detail */}
          <div className="col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Title Section */}
            <div className="text-gray-800 p-6 border-b border-gray-100">
              <h1 className="text-3xl font-bold mb-4">{beritaDetail.title}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <AiOutlineCalendar className="text-blue-600" />
                    <span>{publishedDate}</span>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={handleShareButtonClick}
                    className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-full shadow-md"
                  >
                    <AiOutlineShareAlt size={18} />
                    <span>Bagikan</span>
                  </button>

                  {showShareOptions && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 w-56 transition-opacity duration-300">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={handleFacebookShare}
                          className="flex flex-col items-center justify-center gap-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          <FaFacebookF size={20} />
                        </button>
                        <button
                          onClick={handleTwitterShare}
                          className="flex flex-col items-center justify-center gap-1 p-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors"
                        >
                          <FaTwitter size={20} />
                        </button>
                        <button
                          onClick={handleWhatsAppShare}
                          className="flex flex-col items-center justify-center gap-1 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          <FaWhatsapp size={20} />
                        </button>
                        <button
                          onClick={handleEmailShare}
                          className="flex flex-col items-center justify-center gap-1 p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                          <FaEnvelope size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={beritaDetail.image}
                alt={beritaDetail.title}
                className="object-cover w-full h-[500px] transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div
                className="text-lg text-gray-800 leading-relaxed quill-description"
                dangerouslySetInnerHTML={{ __html: beritaDetail.description }}
              />

              {/* Tags Section */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    #SeniReligius
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    #Berita
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    #UNS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Daftar Berita & Pengumuman */}
          <div className="space-y-8">
            {/* Daftar Berita Lain */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Berita Lainnya
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {shuffleArray(filteredOtherNews)
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                    >
                      {/* Gambar */}
                      <div className="w-full h-36 bg-gray-200 rounded-t-lg overflow-hidden">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        )}
                      </div>

                      {/* Konten */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                          <Link to={`/berita/${item.id}`}>
                            {truncateText(item.title, 80)}
                          </Link>
                        </h3>
                        <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                          <AiOutlineCalendar className="text-blue-600" />
                          {new Date(item.publishedAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <div className="mt-auto text-right pt-2">
                          <Link
                            to={`/berita/${item.id}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
                          >
                            Selengkapnya
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/berita"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Lihat Semua Berita
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaDetail;
