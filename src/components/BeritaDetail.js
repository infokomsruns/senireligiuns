import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import LoadingSpinner from "./LoadingSpinner"

const BeritaDetail = () => {
  const { id } = useParams();
  const [beritaDetail, setBeritaDetail] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  
  const [isBeritaLoading, setIsBeritaLoading] = useState(true);
  const [isOtherNewsLoading, setIsOtherNewsLoading] = useState(true);

  // Fetch berita detail
  useEffect(() => {
    const fetchBeritaDetail = () => {
      setIsBeritaLoading(true); // Set loading to true before fetching
      fetch(`http://localhost:5000/api/news/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setBeritaDetail(data);
          setIsBeritaLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching berita detail:", error);
          setIsBeritaLoading(false); // Set loading to false even if there's an error
        });
    };

    fetchBeritaDetail();
  }, [id]);

  // Fetch other news
  useEffect(() => {
    const fetchOtherNews = () => {
      setIsOtherNewsLoading(true); // Set loading to true before fetching
      fetch("http://localhost:5000/api/news")
        .then((response) => response.json())
        .then((data) => {
          setOtherNews(data);
          setIsOtherNewsLoading(false); // Set loading to false once data is fetched
        });
    };

    fetchOtherNews();
  }, []);

  if (isBeritaLoading || isOtherNewsLoading ) {
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
            <div className="text-gray-800 p-4">
              <h1 className="text-3xl font-bold">{beritaDetail.title}</h1>
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
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <AiOutlineCalendar className="text-blue-600" />
                  <span>{publishedDate}</span>
                </div>
              </div>

              <div
                className="text-lg text-gray-800 leading-relaxed quill-description"
                dangerouslySetInnerHTML={{ __html: beritaDetail.description }}
              />
            </div>
          </div>

          {/* Right Column: Daftar Berita & Pengumuman */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Daftar Berita Lain */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Berita Lainnya
            </h2>
            <div className="grid grid-cols-1">
              {shuffleArray(filteredOtherNews) // Acak urutan berita
                .slice(0, 3) // Ambil hanya 3 berita
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col mb-4"
                  >
                    {/* Gambar */}
                    <div className="w-full h-36 bg-gray-200">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Konten */}
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {truncateText(item.title, 80)}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(item.publishedAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <div className="mt-auto text-right">
                        <Link
                          to={`/berita/${item.id}`}
                          className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
                        >
                          Selengkapnya →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaDetail;
