import { useNavigate } from "react-router-dom";
import InputField from "../forms/InputField.jsx";
import ProgressBar from "../atoms/ProgressBar.jsx";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { updateOnboardingProgress } from "../../config/firebase";
import { toast } from "react-toastify";

export default function Onboarding() {
  const totalSteps = 5;
  const currentStep = 1;
  const navigate = useNavigate();
  const { currentUser, userProfile, setUserProfile } = useAuth();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    profilePicture: userProfile?.profilePicture || null,
  });
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        username: userProfile.username || "",
        profilePicture: userProfile.profilePicture || null,
      }));
    }
  }, [userProfile]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error(
        "Unable to access camera. Please try uploading a file instead."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL("image/jpeg");
      setFormData((prev) => ({
        ...prev,
        profilePicture: imageData,
      }));

      stopCamera();
    }
  };

  const handleNext = async () => {
    if (!formData.username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    setLoading(true);
    try {
      await updateOnboardingProgress(currentUser.uid, 2, {
        username: formData.username,
        profilePicture: formData.profilePicture,
      });

      // Update local state
      setUserProfile((prev) => ({
        ...prev,
        username: formData.username,
        profilePicture: formData.profilePicture,
        onboardingStep: 2,
      }));

      toast.success("Progress saved!");
      navigate("/onboarding-step-2");
    } catch (error) {
      console.error("Error saving onboarding progress:", error);
      toast.error("Failed to save progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-y-8 lg:gap-y-16 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="font-bold text-2xl lg:text-3xl text-gray-900">
        Basic Info
      </h2>
      <div className="w-full max-w-2xl p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-start items-start gap-y-6 lg:gap-y-8">
        <div className="w-full flex flex-col gap-y-4">
          <InputField
            label="Username or Nickname"
            type="text"
            name="username"
            placeholder="Enter your username or nickname"
            value={formData.username}
            onChange={onChange}
            required={true}
          />
          <div className="w-full flex flex-col justify-start items-start pb-4">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Profile Picture
            </p>
            <div className="w-full flex flex-col justify-center items-center gap-y-4">
              {formData.profilePicture ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                  <p className="text-sm text-gray-600">
                    {userProfile?.profilePicture
                      ? "Profile picture from Google account"
                      : "Profile picture uploaded"}
                  </p>
                  <button
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, profilePicture: null }))
                    }
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={startCamera}
                    className="px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                  >
                    Take a Picture
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Upload file
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Take a Picture</h3>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg mb-4"
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3">
              <button
                onClick={capturePhoto}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
