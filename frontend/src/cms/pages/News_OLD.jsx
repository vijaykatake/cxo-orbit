import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import $ from "jquery";

import Sidebar from "../components/Sidebar";

// DataTables
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import jszip from "jszip";
window.JSZip = jszip;

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const formatDate = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, "0");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default function News() {
  const [news, setNews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryModal, setGalleryModal] = useState(false);

  const [editData, setEditData] = useState(null);
  const [galleryData, setGalleryData] = useState([]);

  // ================= FETCH
  const fetchNews = async () => {
    try {
      const res = await api.get("/cms/news");
      setNews(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ================= DATATABLE (UPDATED UI)
  useEffect(() => {
    const table = $("#newsTable");

    // 🔥 destroy ONLY DataTable instance (safe)
    if ($.fn.DataTable.isDataTable(table)) {
      table.DataTable().destroy(false);
    }

    // 🔥 reinitialize AFTER React render
    requestAnimationFrame(() => {
      table.DataTable({
        dom: "<'flex justify-between items-center mb-4'Bf>rt<'flex justify-between items-center mt-4'lip>",
        buttons: ["copy", "excel", "print"],
      });
    });
  }, [news]);

  // ================= DELETE
  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Confirm Delete",
      html: `Are you sure you want to delete <b>"${title}"</b> news?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/cms/news/${id}`);

      await Swal.fire({
        title: "Deleted!",
        text: "News has been deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchNews();
    } catch (err) {
      console.error("Delete error:", err);

      Swal.fire({
        title: "Error",
        text: "Failed to delete news",
        icon: "error",
      });
    }
  };

  // ================= MODALS
  const openAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditData(item);
    setModalOpen(true);
  };

  const openGallery = (item) => {
    setGalleryData(item);
    setGalleryModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* TOP */}
        <div className="flex justify-end mb-4">
          <button
            onClick={openAdd}
            className="bg-black text-white px-4 py-2 rounded flex gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New
          </button>
        </div>

        {/* TABLE (UPDATED UI) */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
          <table id="newsTable" className="display w-full text-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Info</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Gallery</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {news.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.info}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.venue}</td>

                  <td>
                    <button
                      onClick={() => openGallery(item)}
                      className="text-blue-600 flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faImages} />
                      Manage
                    </button>
                  </td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-600"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="text-red-600"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODALS */}
        {modalOpen && (
          <NewsModal
            key={editData?.id || "new"}
            data={editData}
            onClose={() => setModalOpen(false)}
            fetchNews={fetchNews}
          />
        )}

        {galleryModal && (
          <GalleryModal
            data={galleryData}
            onClose={() => setGalleryModal(false)}
            fetchNews={fetchNews}
          />
        )}
      </div>
    </div>
  );
}
// ================= NEWS MODAL
function NewsModal({ data, onClose, fetchNews }) {
  const [form, setForm] = useState({
    title: data?.title || "",
    info: data?.info || "",
    date: data?.date ? data.date.split("T")[0] : "",
    venue: data?.venue || "",
    address: data?.address || "",
    link: data?.link || "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    // reset first
    setImagePreview(null);

    if (data?.main_image) {
      setTimeout(() => {
        setImagePreview(`${BASE_URL}${data.main_image}`);
      }, 50);
    }
  }, [data]);
  const isEdit = !!data;
  const [errors, setErrors] = useState({});
  const validate = () => {
    let err = {};

    if (!form.title) err.title = "Title is required";
    if (!form.info) err.info = "Info is required";
    if (!form.date) err.date = "Date is required";
    if (!form.venue) err.venue = "Venue is required";
    if (!form.address) err.address = "Address is required";

    if (!isEdit && !selectedFile) {
      err.image = "Image is required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // ✅ clear error for that field
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("info", form.info);
      formData.append("date", form.date);
      formData.append("venue", form.venue);
      formData.append("address", form.address);
      formData.append("link", form.link);

      if (selectedFile) {
        formData.append("main_image", selectedFile);
      }
      if (isEdit) {
        await api.put(`/cms/news/${data.id}`, formData);
      } else {
        await api.post("/cms/news", formData);
      }
      fetchNews();
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-full max-w-lg rounded space-y-3">
        <h2 className="font-bold">
          {isEdit ? `Edit: ${data.title}` : "Add News"}
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        <textarea
          name="info"
          value={form.info}
          onChange={handleChange}
          placeholder="Info"
          className="w-full border p-2 rounded"
        />
        {errors.info && <p className="text-red-500 text-sm">{errors.info}</p>}
        <div>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {form.date && (
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDate(form.date)}
            </p>
          )}
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <input
          name="venue"
          value={form.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="w-full border p-2 rounded"
        />
        {errors.venue && <p className="text-red-500 text-sm">{errors.venue}</p>}
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          rows={3}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link"
          className="w-full border p-2 rounded"
        />

        {/* IMAGE */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-40 object-cover rounded border"
          />
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
