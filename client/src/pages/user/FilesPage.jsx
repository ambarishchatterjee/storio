import { useEffect, useState } from "react";
import axios from "axios";
import { Trash, UploadCloud, FolderPlus } from "lucide-react";
import { getImage } from "../../api/api";

const API = "http://localhost:8001/api"; // Update as needed
const token = JSON.parse(localStorage.getItem("user"))?.token;

export default function FilesPage() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState("");

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get(`${API}/allfiles`, headers);

      setFolders(data.folders || []); // fallback to empty array
      setFiles(data.files || []);
    } catch (err) {
      console.error("Error fetching dashboard:", err.message);
      setFolders([]); // fallback in case of error
      setFiles([]);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    await axios.post(`${API}/folders`, { name: folderName }, headers);
    setFolderName("");
    fetchDashboard();
  };

  const handleFileUpload = async () => {
    if (!fileUpload || !selectedFolder) return;

    const formData = new FormData();
    formData.append("file", fileUpload);
    formData.append("folderId", selectedFolder);

    await axios.post(`${API}/files`, formData, {
      headers: {
        ...headers.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    setFileUpload(null);
    fetchDashboard();
  };

  const deleteFolder = async (id) => {
    await axios.delete(`${API}/folders/${id}`, headers);
    fetchDashboard();
  };

  const deleteFile = async (id) => {
    await axios.delete(`${API}/files/${id}`, headers);
    fetchDashboard();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h3 className="font-bold text-lg">Create Folder</h3>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            onClick={handleCreateFolder}
            className="bg-purple-600 text-white px-4 py-2 rounded mt-2 hover:bg-purple-700"
          >
            <FolderPlus className="inline-block mr-2" size={16} />
            Create
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow space-y-3">
          <h3 className="font-bold text-lg">Upload File</h3>
          <select
            name="folderId"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Folder</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setFileUpload(e.target.files[0])}
          />

          <button
            onClick={handleFileUpload}
            disabled={!fileUpload || !selectedFolder}
            className={`px-4 py-2 rounded mt-2 text-white ${
              !fileUpload || !selectedFolder
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <UploadCloud className="inline-block mr-2" size={16} />
            Upload
          </button>
        </div>
      </div>

      {/* Folders */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Folders</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {folders?.map((folder) => (
            <div
              key={folder._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <span>{folder.name}</span>
              <button onClick={() => deleteFolder(folder._id)}>
                <Trash className="text-red-500 hover:text-red-700" size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Files */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files?.map((file) => (
            <div
              key={file._id}
              className="bg-white p-4 rounded shadow space-y-2"
            >
              {/* ✅ Thumbnail Preview */}
              {file.mimetype && file.mimetype.startsWith("image/") ? (
                <img
                  src={`${getImage(file.path)}`}
                  alt={file.filename}
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded text-gray-500 text-sm">
                  {file.mimetype?.split("/")[1]?.toUpperCase() || "FILE"}
                </div>
              )}

              {/* ✅ File Info */}
              <p className="font-medium truncate">{file.filename}</p>
              <p className="text-sm text-gray-600">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>

              <a
                href={`${getImage(file.path)}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Preview
              </a>
              <button
                onClick={() => deleteFile(file._id)}
                className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <Trash size={14} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
