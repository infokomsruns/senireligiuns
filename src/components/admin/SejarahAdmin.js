import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SejarahAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [newText, setNewText] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [newImage, setNewImage] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://senireligiuns-api.vercel.app/api/sejarah")
      .then((response) => response.json())
      .then((data) => {
        // Asumsikan data adalah array slide sejarah
        setSlides(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateSlide = () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("text", newText);
    formData.append("period", newPeriod);
    if (newImage) {
      formData.append("image", newImage);
    }
    fetch(`https://senireligiuns-api.vercel.app/api/sejarah/${editingSlide.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((updatedSlide) => {
        setSlides(
          slides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s))
        );
        closeModal();
      })
      .finally(() => setIsUpdating(false));
  };

  const handleAddSlide = () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("text", newText);
    formData.append("period", newPeriod);
    if (newImage) {
      formData.append("image", newImage);
    }
    fetch(`https://senireligiuns-api.vercel.app/api/sejarah`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((newSlide) => {
        setSlides([...slides, newSlide]);
        setNewText("");
        setNewPeriod("");
        setNewImage(null);
      })
      .finally(() => setIsUpdating(false));
  };

  const handleDeleteSlide = (id) => {
    setIsUpdating(true);
    fetch(`https://senireligiuns-api.vercel.app/api/sejarah/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setSlides(slides.filter((slide) => slide.id !== id));
      })
      .finally(() => setIsUpdating(false));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const openEditModal = (slide) => {
    setEditingSlide(slide);
    setNewText(slide.text);
    setNewPeriod(slide.period);
    setNewImage(null);
  };

  const closeModal = () => {
    setEditingSlide(null);
    setNewText("");
    setNewPeriod("");
    setNewImage(null);
  };

  if (isLoading || isUpdating) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Kelola Sejarah
        </h2>

        {/* Form untuk Menambah Slide */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Slide Sejarah
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSlide();
            }}
            className="space-y-4"
          >
            <label className="block text-gray-600">Periode</label>
            <input
              type="text"
              placeholder="Contoh: 2015 - 2017"
              value={newPeriod}
              onChange={(e) => setNewPeriod(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />

            <label className="block text-gray-600">Teks Sejarah</label>
            <ReactQuill
              ref={quillRef}
              value={newText}
              onChange={setNewText}
              theme="snow"
              placeholder="Masukkan teks sejarah"
            />

            <label className="block text-gray-600">Gambar</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Tambah Slide
            </button>
          </form>
        </div>

        {/* Daftar Slide Sejarah */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Daftar Slide Sejarah
          </h3>
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center"
            >
              <div className="w-32 h-32 overflow-hidden rounded mr-4">
                {slide.image && (
                  <img
                    src={slide.image}
                    alt={slide.period}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold">{slide.period}</h4>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: slide.text }}
                />
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => openEditModal(slide)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal untuk Mengedit Slide Sejarah */}
        {editingSlide && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Edit Slide Sejarah
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateSlide();
                }}
                className="space-y-4"
              >
                <label className="block text-gray-600">Periode</label>
                <input
                  type="text"
                  placeholder="Contoh: 2015 - 2017"
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />

                <label className="block text-gray-600">Teks Sejarah</label>
                <ReactQuill
                  value={newText}
                  onChange={(value, delta, source) => {
                    if (source === "user") {
                      setNewText(value);
                    }
                  }}
                  theme="snow"
                  placeholder="Masukkan teks sejarah"
                />

                <label className="block text-gray-600">Gambar</label>
                <input
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SejarahAdmin;
