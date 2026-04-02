import Sidebar from "../components/Sidebar";

export default function News() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold">News CMS</h1>
          <p className="text-gray-500 mt-2">Create and manage news articles.</p>
        </div>
      </div>
    </div>
  );
}
