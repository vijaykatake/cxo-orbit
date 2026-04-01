import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold">CMS Dashboard</h1>
        <p className="mt-4">Welcome Admin 👋</p>
      </div>
    </div>
  );
}
