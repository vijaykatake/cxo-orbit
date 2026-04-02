import { useEffect, useState, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import Sidebar from "../components/Sidebar"; // ✅ ADD THIS
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

window.JSZip = jszip;
pdfMake.vfs = pdfFonts.vfs;

export default function News() {
  const [news, setNews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const tableRef = useRef();
  const token = localStorage.getItem("adminToken");

  // =========================
  // FETCH NEWS
  // =========================
  const fetchNews = async () => {
    try {
      const res = await axios.get("/api/cms/news", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // =========================
  // INIT DATATABLE
  // =========================
  useEffect(() => {
    if (news.length > 0) {
      if ($.fn.DataTable.isDataTable("#newsTable")) {
        $("#newsTable").DataTable().destroy();
      }

      setTimeout(() => {
        $("#newsTable").DataTable({
          dom: "Bfrtip",
          buttons: ["copy", "excel", "pdf", "print"],
        });
      }, 100);
    }
  }, [news]);

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;

    try {
      await axios.delete(`/api/cms/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // OPEN MODAL
  // =========================
  const openAddModal = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ SIDEBAR */}
      <Sidebar />

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 p-6">
        {/* TOP BAR */}
        <div className="flex justify-end mb-4">
          <button
            onClick={openAddModal}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <table id="newsTable" className="display w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Info</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {news.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.info}</td>
                  <td>{item.date?.split("T")[0]}</td>
                  <td>{item.venue}</td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
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

        {/* MODAL */}
        {modalOpen && (
          <NewsModal
            data={editData}
            onClose={() => setModalOpen(false)}
            fetchNews={fetchNews}
          />
        )}
      </div>
    </div>
  );
}

// =========================
// MODAL COMPONENT
// =========================
function NewsModal({ data, onClose, fetchNews }) {
  const [title, setTitle] = useState(data ? data.title : "");
  const [description, setDescription] = useState(data ? data.description : "");

  const token = localStorage.getItem("adminToken");

  const isEdit = !!data;

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(
          `/api/cms/news/${data.id}`,
          {
            title,
            description,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } else {
        await axios.post(
          "/api/cms/news",
          {
            title,
            description,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }

      fetchNews();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {isEdit ? `Edit: ${data.title}` : "Add News"}
          </h2>
          <button onClick={onClose}>✖</button>
        </div>

        {/* FORM */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ACTION */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
