import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faImages,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { getPaginationRowModel } from "@tanstack/react-table";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ================= DATE FORMAT
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
  const [globalFilter, setGlobalFilter] = useState("");
  const [editData, setEditData] = useState(null);
  const [galleryData, setGalleryData] = useState(null);
  // ================= PDF EXPORT
  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableData = news.map((n) => [
      n.title,
      n.info,
      formatDate(n.date),
      n.venue,
    ]);

    autoTable(doc, {
      head: [["Title", "Info", "Date", "Venue"]],
      body: tableData,
    });

    doc.save("news.pdf");
  };
  // ================= FETCH
  const fetchNews = async () => {
    const res = await api.get("/cms/news");
    setNews(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ================= EXPORT
  const exportToExcel = () => {
    const exportData = news.map((n) => ({
      Title: n.title,
      Info: n.info,
      Date: formatDate(n.date),
      Venue: n.venue,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "News");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), "news.xlsx");
  };

  // ================= DELETE
  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Confirm Delete",
      html: `Delete "<b>${title}</b>" ?`,
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    await api.delete(`/cms/news/${id}`);
    fetchNews();
  };

  // ================= ACTIONS
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

  // ================= TABLE COLUMNS
  const columns = useMemo(
    () => [
      { header: "Title", accessorKey: "title" },
      { header: "Info", accessorKey: "info" },
      {
        header: "Date",
        accessorKey: "date",
        cell: (info) => formatDate(info.getValue()),
        sortingFn: (rowA, rowB, columnId) => {
          return (
            new Date(rowB.getValue(columnId)) -
            new Date(rowA.getValue(columnId))
          );
        },
      },
      { header: "Venue", accessorKey: "venue" },
      {
        header: "Gallery",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <button
              onClick={() => openGallery(row.original)}
              className="text-blue-600 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faImages} /> Manage
            </button>
          </div>
        ),
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => openEdit(row.original)}
              className="text-blue-600"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>

            <button
              onClick={() => handleDelete(row.original.id, row.original.title)}
              className="text-red-600"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: news,
    columns,

    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* 🔥 PAGE HEADER */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mt-1">CRM / News</p>
        </div>

        {/* TOP */}
        <div className="flex justify-between items-center mb-4">
          {/* LEFT */}
          <button
            onClick={openAdd}
            className="bg-black text-white px-4 py-2 rounded flex gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Add News
          </button>
          {/* 🔍 SEARCH */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search news..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border px-3 py-2 rounded w-full max-w-sm"
            />
          </div>
          {/* RIGHT */}
          <div className="flex gap-2">
            <button
              onClick={exportToPDF}
              className="bg-red-600 text-white px-4 py-2 rounded flex gap-2"
            >
              PDF
            </button>

            <button
              onClick={exportToExcel}
              className="bg-green-600 text-white px-4 py-2 rounded flex gap-2"
            >
              <FontAwesomeIcon icon={faFileExcel} /> Excel
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className="p-2 border cursor-pointer text-center"
                      onClick={h.column.getToggleSortingHandler()}
                    >
                      {h.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getPaginationRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border">
                      {cell.column.columnDef.cell
                        ? cell.column.columnDef.cell(cell)
                        : cell.getValue()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded"
          >
            Previous
          </button>

          <span>Page {table.getState().pagination.pageIndex + 1}</span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
      {/* 🔥 ADD MODALS HERE */}
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
  const [saving, setSaving] = useState(false);
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
      setSaving(true); // 🔥 START LOADING

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
    } finally {
      setSaving(false); // 🔥 STOP LOADING
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
            disabled={saving}
            className={`px-4 py-2 rounded ${
              saving
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white"
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
/*Gallary Modal*/
function GalleryModal({ data, onClose }) {
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  // 🔥 SAFE FETCH (only when data exists)
  useEffect(() => {
    if (data?.id) {
      fetchGallery();
    }
  }, [data]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/cms/news/${data.id}/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error("Gallery fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setUploading(true); // 🔥 START

      await api.post(`/cms/news/${data.id}/gallery`, formData);

      setSelectedFiles([]);
      fetchGallery();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false); // 🔥 STOP
    }
  };
  const handleDeleteImage = async (id) => {
    const result = await Swal.fire({
      title: "Delete Image?",
      text: "This will permanently delete the image",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/cms/news/gallery/${id}`);
      fetchGallery(); // refresh after delete
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Gallery: {data?.title}</h2>

          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>
        {/* UPLOAD SECTION */}
        <div className="mb-4 flex gap-2 items-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setSelectedFiles([...e.target.files])}
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFiles.length || uploading}
            className={`px-3 py-1 rounded ${
              uploading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : selectedFiles.length
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {/* CONTENT */}
        <div className="grid grid-cols-3 gap-4">
          {loading && (
            <p className="col-span-3 text-center text-gray-400">Loading...</p>
          )}

          {!loading && images.length === 0 && (
            <p className="col-span-3 text-center text-gray-400">
              No images found
            </p>
          )}

          {images.map((img) => (
            <div
              key={img.id}
              className="border rounded overflow-hidden relative"
            >
              <img
                src={`${BASE_URL}${img.image_url}`}
                alt="gallery"
                className="w-full h-32 object-cover"
              />

              {/* 🔥 DELETE BUTTON */}
              <button
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
