import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SambutanAdmin = () => {
  const [headmasterMessage, setHeadmasterMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newHeadmasterName, setNewHeadmasterName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://senireligiuns-api.vercel.app/api/headmaster-message")
      .then((response) => response.json())
      .then((data) => {
        setHeadmasterMessage(data);
        setNewMessage(data.message || "");
        setNewDescription(data.description || "");
        setNewHeadmasterName(data.headmasterName || "");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateHeadmasterMessage = (e) => {
    e.preventDefault();
    if (headmasterMessage && headmasterMessage.id) {
      setIsUpdating(true); // Set updating state to true during the update
      const formData = new FormData();
      formData.append("message", newMessage);
      formData.append("description", newDescription);
      formData.append("headmasterName", newHeadmasterName);
      if (newImage) formData.append("image", newImage);

      fetch(
        `https://senireligiuns-api.vercel.app/api/headmaster-message/${headmasterMessage.id}`,
        {
          method: "PUT",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setHeadmasterMessage(data);
          setNewMessage("");
          setNewDescription("");
          setNewHeadmasterName("");
          setNewImage(null);
        })
        .catch((error) =>
          console.error("Error updating headmaster message:", error)
        )
        .finally(() => setIsUpdating(false)); // Set updating to false once the update completes
    }
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleTextChange = (value) => {
    setNewDescription(value);
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
          Admin - Kelola Tetang Seni Religi
        </h2>

        {headmasterMessage && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Update Tetang Seni Religi
            </h3>
            <form
              onSubmit={handleUpdateHeadmasterMessage}
              className="space-y-4"
            >
              <label className="block text-gray-600">Teks Singkat</label>
              <div>
                <ReactQuill
                  ref={quillRef}
                  value={newDescription}
                  onChange={handleTextChange}
                  theme="snow"
                  placeholder="Masukkan Teks Sejarah"
                />
              </div>

              <label className="block text-gray-600">Nama Instansi</label>
              <input
                type="text"
                placeholder="Nama Instansi"
                value={newHeadmasterName}
                onChange={(e) => setNewHeadmasterName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <label className="block text-gray-600">
                Gambar Instansi
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Perbarui Sambutan
              </button>
            </form>
          </div>
        )}

        {headmasterMessage && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Bagian Tetang Seni Religi Saat Ini
            </h3>
            <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                {headmasterMessage.image && (
                  <div className="flex flex-col items-center">
                    <img
                      src={headmasterMessage.image}
                      alt="Instansi"
                      className="w-40 h-40 object-cover rounded-full border-4 border-blue-500"
                    />
                    <p className="mt-4 text-xl font-bold text-gray-700 text-center">
                      {headmasterMessage.headmasterName}
                    </p>
                  </div>
                )}
                <div className="flex-1">
                  <div
                    className="mt-4 text-lg text-gray-800 leading-relaxed quill-description"
                    dangerouslySetInnerHTML={{
                      __html: headmasterMessage.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SambutanAdmin;
