import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";

const pht = [
  "Ketua",
  "Wakil Ketua",
  "Kepala Sekretaris Umum",
  "Kepala Bendahara Umum",
  "Kepala Bidang Rumah Tangga",
  "Kepala Bidang Dakwah",
  "Kepala Bidang Informasi dan Komunikasi",
  "Kepala Bidang Pengembangan Sumber Daya Manusia",
];

const EkstrakurikulerAdmin = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExtracurricular, setSelectedExtracurricular] = useState(null);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState(pht[0]);
  const [newImage, setNewImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("pengurus");
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    visi: "",
    misi: [""],
    id: null,
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://senireligiuns-api.vercel.app/api/visi-misi")
      .then((response) => {
        const { visi, misi, id } = response.data || {};
        setFormData({ visi: visi || "", misi: misi || [""], id: id || null });
      })
      .catch((error) =>
        console.error("Kesalahan mengambil Visi & Misi:", error)
      )
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch extracurriculars from backend
  useEffect(() => {
    setIsLoading(true);
    fetch("https://senireligiuns-api.vercel.app/api/extracurriculars")
      .then((response) => response.json())
      .then((data) => setExtracurriculars(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleVisiChange = (e) => {
    setFormData((prev) => ({ ...prev, visi: e.target.value }));
  };

  const handleMisiChange = (index, value) => {
    const updatedMisi = [...formData.misi];
    updatedMisi[index] = value;
    setFormData((prev) => ({ ...prev, misi: updatedMisi }));
  };

  const handleAddMisi = () => {
    setFormData((prev) => ({ ...prev, misi: [...prev.misi, ""] }));
  };

  const handleRemoveMisi = (index) => {
    const updatedMisi = formData.misi.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, misi: updatedMisi }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id === null) {
      alert("ID tidak ditemukan!");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(
        `https://senireligiuns-api.vercel.app/api/visi-misi/${formData.id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Kesalahan memperbarui Visi & Misi:", error);
      alert("Gagal memperbarui Visi & Misi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create extracurricular
  const handleCreateExtracurricular = () => {
    if (!newName) {
      alert("Nama Pengurus harus diisi!");
      return;
    }
    
    setIsCreating(true);
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("description", newRole);
    if (newImage) formData.append("image", newImage);

    fetch("https://senireligiuns-api.vercel.app/api/extracurriculars", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setExtracurriculars([...extracurriculars, data]);
        setNewName("");
        setNewRole(pht[0]);
        setNewImage(null);
        setPreviewImage(null);
      })
      .catch(error => {
        console.error("Error creating:", error);
        alert("Gagal menambahkan pengurus.");
      })
      .finally(() => setIsCreating(false));
  };

  // Handle update extracurricular
  const handleUpdateExtracurricular = () => {
    if (!selectedExtracurricular.name) {
      alert("Nama Pengurus harus diisi!");
      return;
    }
    
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("name", selectedExtracurricular.name);
    formData.append("description", selectedExtracurricular.description);
    if (selectedExtracurricular.newImage)
      formData.append("image", selectedExtracurricular.newImage);

    fetch(
      `https://senireligiuns-api.vercel.app/api/extracurriculars/${selectedExtracurricular.id}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setExtracurriculars(
          extracurriculars.map((item) => (item.id === data.id ? data : item))
        );
        closeModal();
      })
      .catch(error => {
        console.error("Error updating:", error);
        alert("Gagal memperbarui pengurus.");
      })
      .finally(() => setIsUpdating(false));
  };

  // Handle delete extracurricular
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengurus ini?")) {
      setIsDeleting(true);
      fetch(`https://senireligiuns-api.vercel.app/api/extracurriculars/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setExtracurriculars(extracurriculars.filter((item) => item.id !== id));
        })
        .catch(error => {
          console.error("Error deleting:", error);
        })
        .finally(() => setIsDeleting(false));
    }
  };

  const openModal = (item) => {
    setSelectedExtracurricular({...item, newImage: null});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExtracurricular(null);
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedExtracurricular({
          ...selectedExtracurricular,
          newImage: file,
          previewImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedExtracurricular({
        ...selectedExtracurricular,
        newImage: null,
        previewImage: null
      });
    }
  };

  if (isLoading || isCreating || isUpdating || isDeleting) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Struktur Organisasi
        </h2>
        
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("pengurus")}
              className={`${
                activeTab === "pengurus" 
                  ? "border-b-2 border-blue-600 text-blue-700" 
                  : "text-gray-600"
              } flex items-center px-6 py-4 font-medium`}
            >
              Pengurus Harian Tetap
            </button>
            <button
              onClick={() => setActiveTab("visi-misi")}
              className={`${
                activeTab === "visi-misi" 
                  ? "border-b-2 border-blue-600 text-blue-700" 
                  : "text-gray-600"
              } flex items-center px-6 py-4 font-medium`}
            >
              Visi & Misi
            </button>
          </div>
        </div>

        {/* Pengurus Harian Tab Content */}
        {activeTab === "pengurus" && (
          <>
            {/* Add new extracurricular form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                Tambah Pengurus Harian Tetap
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateExtracurricular();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Nama Pengurus
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="text"
                        placeholder="Masukkan Nama Pengurus"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Jabatan Pengurus
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {pht.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Foto Pengurus
                  </label>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="file"
                        onChange={handleNewImageChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    {previewImage && (
                      <div className="mt-2 md:mt-0">
                        <div className="w-32 h-32 rounded-lg border overflow-hidden">
                          <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                  >
                    Tambah Pengurus
                  </button>
                </div>
              </form>
            </div>

            {/* Extracurriculars Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                Daftar Pengurus Harian Tetap
              </h3>
              
              {extracurriculars.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Belum ada data pengurus
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {extracurriculars.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{item.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium text-gray-900">
                              {item.description}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => openModal(item)}
                              className="px-3 py-2 bg-amber-500 text-white rounded-lg mr-2"
                            > Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-3 py-2 bg-red-600 text-white rounded-lg"
                            > Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Visi Misi Tab Content */}
        {activeTab === "visi-misi" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              Kelola Visi & Misi
            </h3>
            
            {/* Formulir Visi */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Visi</label>
              <textarea
                value={formData.visi}
                onChange={handleVisiChange}
                rows="3"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan visi organisasi"
              ></textarea>
            </div>

            {/* Tabel Misi */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-gray-700 font-medium">Misi</label>
                <button
                  type="button"
                  onClick={handleAddMisi}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                >
                  Tambah Misi
                </button>
              </div>
              
              {formData.misi.length === 0 ? (
                <div className="text-center py-10 text-gray-500 border rounded-lg">
                  Belum ada data misi
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.misi.map((misi, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={misi}
                        onChange={(e) => handleMisiChange(index, e.target.value)}
                        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Misi ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMisi(index)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-300"
                        title="Hapus misi"
                      >
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tombol Submit */}
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
            >
              Simpan Perubahan
            </button>
          </div>
        )}
        
        {/* Modal for editing extracurricular */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">
                  Edit Pengurus Harian Tetap
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateExtracurricular();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Nama Pengurus
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="text"
                        value={selectedExtracurricular.name}
                        onChange={(e) =>
                          setSelectedExtracurricular({
                            ...selectedExtracurricular,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Jabatan Pengurus
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <select
                        value={selectedExtracurricular.description}
                        onChange={(e) =>
                          setSelectedExtracurricular({
                            ...selectedExtracurricular,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {pht.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Foto Pengurus
                  </label>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="file"
                        onChange={handleEditImageChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-lg border overflow-hidden">
                        {selectedExtracurricular.previewImage ? (
                          <img 
                            src={selectedExtracurricular.previewImage} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : selectedExtracurricular.image ? (
                          <img 
                            src={selectedExtracurricular.image} 
                            alt={selectedExtracurricular.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
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

export default EkstrakurikulerAdmin;