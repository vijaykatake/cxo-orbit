import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config/api";
import { Link } from "react-router-dom";

export default function CMSPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(`${API.cms}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPages(res.data.data || res.data);
    } catch (err) {
      console.error("CMS Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">CMS Pages</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Slug</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {pages.map((page) => (
            <tr key={page.slug} className="border-t">
              <td className="p-2">{page.slug}</td>
              <td className="p-2">{page.title}</td>
              <td className="p-2">
                <Link to={`/cms/pages/${page.slug}`} className="text-blue-600">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
