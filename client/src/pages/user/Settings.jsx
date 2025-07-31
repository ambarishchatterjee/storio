import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getImage } from "../../api/api";
import toast from "react-hot-toast";

export default function Settings() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user?.user) {
      setFormData({
        ...formData,
        name: user.user.name,
        email: user.user.email,
        profileImage: user.user.profileImage || "",
      });
    }
    // eslint-disable-next-line
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8001/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        profileImage: formData.profileImage,
      }),
    });

    const data = await res.json();
    toast.success(data.message);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8001/api/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }),
    });

    const data = await res.json();
    toast.success(data.message);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings</h2>

      <form onSubmit={handleProfileUpdate} className="space-y-4 mb-10">
        <h3 className="text-xl font-semibold text-gray-700">Profile Info</h3>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Your Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full border rounded-lg p-2 bg-gray-100"
          placeholder="Your Email"
        />
        {formData.profileImage && (
          <div className="mb-4">
            <img
              src={getImage(formData.profileImage) }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}

        <input
          type="text"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Profile Image URL"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Update Profile
        </button>
      </form>

      <form onSubmit={handleChangePassword} className="space-y-4 mb-10">
        <h3 className="text-xl font-semibold text-gray-700">Change Password</h3>

        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Current Password"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="New Password"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Change Password
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Plan & Usage
        </h3>
        <p>
          <strong>Current Plan:</strong> {user?.user?.plan}
        </p>
        <p>
          <strong>Used Storage:</strong>{" "}
          {Math.max((user?.user?.usedStorage / (1024 * 1024 * 1024)).toFixed(2) || 0, 0)} GB
        </p>
        <p>
          <strong>Storage Limit:</strong>{" "}
          {(user?.user?.storageLimit / (1024 * 1024 * 1024)).toFixed(2)} GB
        </p>
      </div>
    </div>
  );
}
