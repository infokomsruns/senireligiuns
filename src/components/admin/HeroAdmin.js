import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const HeroAdmin = () => {
  const [hero, setHero] = useState(null);
  const [newWelcomeMessage, setNewWelcomeMessage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Mulai loading
    fetch("http://localhost:5000/api/hero")
      .then((response) => response.json())
      .then((data) => {
        setHero(data);
        setNewWelcomeMessage(data.welcomeMessage || "");
        setNewDescription(data.description || "");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateHero = () => {
    const formData = new FormData();
    formData.append("welcomeMessage", newWelcomeMessage);
    formData.append("description", newDescription);
    if (newImage) formData.append("image", newImage); // Attach the new image if exists

    setIsUpdating(true);

    fetch(`http://localhost:5000/api/hero/${hero.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setHero(data);
        setNewWelcomeMessage("");
        setNewDescription("");
        setNewImage(null);
      })
      .catch((error) => {
        console.error("Error updating hero:", error);
      })
      .finally(() => setIsUpdating(false));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
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
          Admin - Edit Bagian Welcome
        </h2>

        {hero && (
          <div className="mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateHero();
              }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                Nama Instansi
              </label>
              <input
                type="text"
                placeholder="Nama Instansi"
                value={newWelcomeMessage}
                onChange={(e) => setNewWelcomeMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />

              <label className="block text-gray-700 font-medium">
                Deskripsi:
              </label>
              <textarea
                placeholder="Deskripsi"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
                required
              />

              <label className="block text-gray-700 font-medium">
                Unggah Gambar:
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
                Perbarui Hero
              </button>
            </form>
          </div>
        )}

        {hero && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Bagian Welcome Saat Ini
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-3xl font-bold">{hero.welcomeMessage}</h4>
              <p className="mt-4 text-xl">{hero.description}</p>
              {hero.image && (
                <img
                  src={hero.image}
                  alt="Hero"
                  className="mt-4 w-64 h-64 object-cover"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroAdmin;
