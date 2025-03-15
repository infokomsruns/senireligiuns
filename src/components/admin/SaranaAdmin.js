import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const SaranaAdmin = () => {
  const [sarana, setSarana] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSarana, setSelectedSarana] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const divisi_staff = [
    "Kepala Divisi Keaparatan Rumah Tangga",
    "Staff Divisi Keaparatan Rumah Tangga",
    "Kepala Divisi Kaderisasi Rumah Tangga",
    "Staff Divisi Kaderisasi Rumah Tangga",
    "Kepala Divisi Kajian Dakwah",
    "Staff Divisi Kajian Dakwah",
    "Kepala Divisi Event Dakwah",
    "Staff Divisi Event Dakwah",
    "Kepala Divisi Media Informasi dan Komunikasi",
    "Staff Divisi Media Informasi dan Komunikasi",
    "Kepala Divisi Humas Informasi dan Komunikasi",
    "Staff Divisi Humas Informasi dan Komunikasi",
    "Kepala Divisi Hadrah Pengembangan Sumber Daya Manusia",
    "Staff Divisi Hadrah Pengembangan Sumber Daya Manusia",
    "Kepala Divisi Vokal Pengembangan Sumber Daya Manusia",
    "Staff Divisi Vokal Pengembangan Sumber Daya Manusia",
    "Kepala Divisi Ratoh Jaroe Pengembangan Sumber Daya Manusia",
    "Staff Divisi Ratoh Jaroe Pengembangan Sumber Daya Manusia",
  ];

  // Fetch sarana from backend
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/sarana")
      .then((response) => response.json())
      .then((data) => setSarana(data))
      .finally(() => setIsLoading(false));
  }, []);

  // Handle create sarana
  const handleCreateSarana = () => {
    setIsCreating(true); // Mulai membuat sarana
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("description", newDescription);
    if (newImage) formData.append("image", newImage);

    fetch("http://localhost:5000/api/sarana", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSarana([...sarana, data]);
        setNewName("");
        setNewDescription("");
        setNewImage(null);
      })
      .finally(() => setIsCreating(false));
  };

  const handleEditDescriptionChange = (e) => {
    const newDesc = e.target.value;
    setSelectedSarana((prev) => ({ ...prev, description: newDesc }));
  };  

  // Handle update sarana
  const handleUpdateSarana = () => {
    setIsUpdating(true); 
    const formData = new FormData();
    formData.append("name", selectedSarana.name);
    formData.append("description", selectedSarana.description);
    if (selectedSarana.image instanceof File) {
      formData.append("image", selectedSarana.image);
    } else if (newImage) {
      formData.append("image", newImage);
    }

    fetch(`http://localhost:5000/api/sarana/${selectedSarana.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSarana(sarana.map((item) => (item.id === data.id ? data : item)));
        closeModal();
      })
      .finally(() => setIsUpdating(false)); // Selesai memperbarui sarana
  };

  // Handle delete sarana
  const handleDelete = (id) => {
    setIsDeleting(true); // Mulai menghapus sarana
    fetch(`http://localhost:5000/api/sarana/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSarana(sarana.filter((item) => item.id !== id));
      })
      .finally(() => setIsDeleting(false)); // Selesai menghapus sarana
  };

  const handleNewNameChange = (e) => {
    const value = e.target.value;
    if (value.length > 30) {
      setNameError("Nama maksimal 30 karakter");
    } else {
      setNameError(""); // Hapus error saat valid
    }
    setNewName(value);
  };

  const handleEditNameChange = (e) => {
    const value = e.target.value;
    if (value.length > 30) {
      setNameError("Nama maksimal 30 karakter");
    } else {
      setNameError(""); // Hapus error saat valid
    }
    setSelectedSarana({ ...selectedSarana, name: value });
  };

  const openModal = (item) => {
    setSelectedSarana(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSarana(null);
  };

  if (isLoading || isCreating || isUpdating || isDeleting) {
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
          Admin - Kelola Divisi Staff
        </h2>

        {/* Add new sarana form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Divisi Staff
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateSarana();
            }}
            className="space-y-4"
          >
            {/* Keterangan Nama */}
            <label className="block text-gray-700">Nama Divisi Staff</label>
            <input
              type="text"
              placeholder="Nama Divisi Staff"
              value={newName}
              onChange={handleNewNameChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            <label className="block text-gray-700">Jabatan</label>
            <select
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Pilih Jabatan</option>
              {divisi_staff.map((desc, index) => (
                <option key={index} value={desc}>
                  {desc}
                </option>
              ))}
            </select>

            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
              disabled={nameError !== ""}
            >
              Tambah Divisi Staff
            </button>
          </form>
        </div>

        {/* Divisi Staff Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Divisi Staff
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800">Nama</th>
                <th className="px-4 py-2 text-left text-gray-800">Gambar</th>
                <th className="px-4 py-2 text-left text-gray-800">Jabatan</th>
                <th className="px-4 py-2 text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sarana.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(item)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for editing sarana */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Edit Divisi Staff</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateSarana();
                }}
                className="space-y-4"
              >
                <label className="block text-gray-700">Nama Divisi Staff</label>
                <input
                  type="text"
                  value={selectedSarana?.name || ""}
                  onChange={handleEditNameChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-sm">{nameError}</p>
                )}

                <label className="block text-gray-700">Jabatan</label>
                <select
                  value={selectedSarana?.description || ""}
                  onChange={handleEditDescriptionChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Jabatan</option>
                  {divisi_staff.map((desc, index) => (
                    <option key={index} value={desc}>
                      {desc}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedSarana({
                      ...selectedSarana,
                      image: e.target.files[0],
                    })
                  }
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
                    disabled={nameError !== ""}
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

export default SaranaAdmin;
