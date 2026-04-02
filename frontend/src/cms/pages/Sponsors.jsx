import Sidebar from "../components/Sidebar";

export default function Events() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold">Sponsors (CMS)</h1>
        </div>
      </div>
    </div>
  );
}
