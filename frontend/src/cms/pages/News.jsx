import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    info: "",
    date: "",
    venue: "",
    address: "",
    link: "",
    main_image: "",
    gallery: [],
  });

  const [editId, setEditId] = useState(null);

  // 🔥 LOAD DATA
  const fetchNews = async () => {
    try {
      const res = await api.get("/cms/news"); // ✅ FIXED
      setNewsList(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 HANDLE GALLERY
  const handleGallery = (e) => {
    const images = e.target.value.split(",");
    setForm({ ...form, gallery: images });
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    try {
      if (editId) {
        await api.put(`/cms/news/${editId}`, form); // ✅ FIXED
      } else {
        await api.post("/cms/news", form); // ✅ FIXED
      }

      setForm({
        title: "",
        info: "",
        date: "",
        venue: "",
        address: "",
        link: "",
        main_image: "",
        gallery: [],
      });

      setEditId(null);
      fetchNews();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/cms/news/${id}`); // ✅ FIXED
      fetchNews();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setForm({
      ...item,
      gallery: item.gallery?.map((g) => g.image_url) || [],
    });
    setEditId(item.id);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 grid grid-cols-2 gap-6">
        {/* LEFT → FORM */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">
            {editId ? "Edit News" : "Add News"}
          </h2>

          <div className="space-y-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded"
            />

            <textarea
              name="info"
              value={form.info}
              onChange={handleChange}
              placeholder="Info"
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Venue"
              className="w-full border p-2 rounded"
            />

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border p-2 rounded"
            />

            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Link (optional)"
              className="w-full border p-2 rounded"
            />

            <input
              name="main_image"
              value={form.main_image}
              onChange={handleChange}
              placeholder="Main Image URL"
              className="w-full border p-2 rounded"
            />

            <input
              onChange={handleGallery}
              placeholder="Gallery (comma separated URLs)"
              className="w-full border p-2 rounded"
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {editId ? "Update" : "Create"}
            </button>
          </div>
        </div>

        {/* RIGHT → TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">News List</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>Title</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {newsList.map((item) => (
                <tr key={item.id} className="border-b">
                  <td>{item.title}</td>
                  <td>{item.date?.split("T")[0]}</td>
                  <td>{item.venue}</td>

                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
