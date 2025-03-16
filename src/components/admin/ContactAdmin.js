import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const ContactAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://senireligiuns-api.vercel.app/api/contacts");
      setMessages(response.data);
    } catch (error) {
      console.error("Kesalahan mengambil data pesan:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true); 
    try {
      await axios.delete(`https://senireligiuns-api.vercel.app/api/contacts/${id}`);
      fetchMessages(); 
    } catch (error) {
      console.error("Kesalahan menghapus data pesan:", error);
    } finally {
      setIsDeleting(false); 
    }
  };

  if (isLoading || isDeleting) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Kelola Pesan Kontak
      </h2>

      {/* Menampilkan Daftar Pesan dalam Bentuk Tabel */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Nama</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Email</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Telepon</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Pesan</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.message}</td>
                <td className="px-6 py-4">

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactAdmin;
