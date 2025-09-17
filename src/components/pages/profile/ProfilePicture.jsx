import { useState } from "react";
import defaultUserIcon from "../../../assets/ui_user.svg";

export default function ProfilePicture({ userData, onUpdate, loading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // For now, we'll use a simple approach with base64
      // In a real app, you'd upload to Firebase Storage
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdate({ profilePicture: e.target.result });
        setSelectedFile(null);
        setPreview(null);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleRemovePicture = () => {
    onUpdate({ profilePicture: null });
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Profile Picture
      </h2>

      <div className="space-y-6">
        {/* Current profile picture */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
            <img
              src={preview || userData.profilePicture || defaultUserIcon}
              alt={userData.fullName || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Current profile picture
          </p>
        </div>

        {/* File upload */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload New Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Preview</h3>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Uploading..." : "Upload Picture"}
              </button>
            )}

            {userData.profilePicture && (
              <button
                onClick={handleRemovePicture}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Remove Picture
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Tips for a great profile picture:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use a clear, well-lit photo</li>
            <li>• Make sure your face is visible</li>
            <li>• Avoid group photos or busy backgrounds</li>
            <li>• Square images work best</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
