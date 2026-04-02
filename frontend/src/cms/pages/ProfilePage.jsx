import Sidebar from "../components/Sidebar";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold">Admin Profile</h1>

          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-2 rounded"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
