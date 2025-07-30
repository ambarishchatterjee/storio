import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.token) {
      setToken(storedUser.token);
      fetchUsers(storedUser.token);
    }
  }, []);

  const fetchUsers = async (token) => {
    setLoading(true);
    const res = await fetch("http://localhost:8001/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  };

  const handleBanToggle = async (userId, isActive) => {
    await fetch(`http://localhost:8001/api/admin/ban/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchUsers(token);
  };

  const handlePlanChange = async (userId, newPlan) => {
    await fetch(`http://localhost:8001/api/admin/change-plan/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan: newPlan }),
    });
    fetchUsers(token);
  };

  const getPlanColor = (plan) => {
    if (plan === "free") return "bg-gray-200 text-gray-800";
    if (plan === "pro") return "bg-blue-100 text-blue-800";
    if (plan === "premium") return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-purple-100 text-gray-700 text-left text-sm uppercase">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Plan</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
                {console.log(users)}
                
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(
                        user.plan
                      )}`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {user.isActive ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-500 font-medium">Banned</span>
                    )}
                  </td>
                  <td className="py-3 px-6 space-x-2">
                    <button
                      onClick={() => handleBanToggle(user._id, user.isActive)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      {user.isActive ? "Ban" : "Unban"}
                    </button>
                    <select
                      value={user.plan}
                      onChange={(e) => handlePlanChange(user._id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="premium">Business</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
