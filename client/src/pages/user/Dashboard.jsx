import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

import { Cloud, Upload, Folder, ShieldCheck, FileText } from "lucide-react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Plans from "./PlansPage";
import { getImage } from "../../api/api";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user")).token;

        const res = await axios.get("http://localhost:8001/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        
        toast.success(res.message)
        setStats(res.data);
      } catch (err) {
        toast.error("Failed to load dashboard stats", err);
      }
    };

    fetchData();
  }, []);
  

  const { user } = useAuthContext();
  const userData = user.user;

  return (
    <div className="space-y-10 pb-10">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800">Welcome to Storio 👋</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Cloud />}
          title="Used Storage"
          value={`${(userData.usedStorage / (1024 * 1024 * 1024)).toFixed(2)} GB / ${(userData.storageLimit / (1024 * 1024 * 1024)).toFixed(2)} GB`}
        />
        <StatCard
          icon={<Upload className="text-green-500" />}
          title="Files Uploaded"
          value={stats?.filesCount || 0}
        />
        <StatCard
          icon={<Folder className="text-yellow-500" />}
          title="Folders Created"
          value={stats?.foldersCount || 0}
        />
      </div>

      <Plans/>




      {/* Recent Uploads */}
      <section className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
        <ul className="space-y-4">
          {(stats?.recentUploads || []).map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between border-b pb-2"
            >
                    
              <div className="flex items-center gap-3">
                {/* ✅ Thumbnail Preview */}
              {file.mimetype && file.mimetype.startsWith("image/") ? (
                <img
                  src={`${getImage(file.thumb)}`}
                  alt={file.filename}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <FileText size={64} />
               
                
              )}
                <div >
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(file.uploaded), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-600">{file.size}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// Stat Card
function StatCard({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow-sm rounded-lg">
      <div className="bg-gray-100 p-2 rounded-md">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// Plan Card
function PlanCard({ name, price, features, highlight }) {
  return (
    <div
      className={`border rounded-xl p-6 space-y-4 shadow-sm ${
        highlight
          ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{name}</h3>
        {highlight && (
          <span className="bg-white text-purple-600 px-2 py-1 text-xs rounded-md font-medium">
            Most Popular
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{price}</p>
      <ul className="space-y-2 text-sm">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ShieldCheck size={16} />
            {f}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 rounded-md font-semibold transition ${
          highlight
            ? "bg-white text-purple-600 hover:bg-gray-100"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {name === "Free" ? "Current Plan" : "Upgrade"}
      </button>
    </div>
  );
}
