import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import InputField from "../forms/InputField.jsx";
import ProgressBar from "../atoms/ProgressBar.jsx";
import logo from "../../assets/logo.svg"
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


useEffect(() => {
  if (videoRef.current && stream) {
    videoRef.current.srcObject = stream;
    videoRef.current.play().catch((err) =>
      console.error("Error playing video:", err)
    );
  }
}, [stream]);


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
      video: { width: { ideal: 640 }, height: { ideal: 480 } },
    });
    setStream(mediaStream); // set stream
    setShowCamera(true);
  } catch (error) {
    console.error("Error accessing camera:", error);
    toast.error("Unable to access camera. Please try uploading a file instead.");
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

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast.error("Camera not ready yet. Please try again.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");
    setFormData((prev) => ({ ...prev, profilePicture: imageData }));

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
    <main className="w-full min-h-screen flex flex-col justify-start items-center gap-y-8 lg:gap-y-10 bg-gradient-to-br from-blue-50 to-indigo-100" role="main" aria-labelledby="onboarding-basic-info-heading">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="fixed top-30 left-3/4 -translate-x-3/4 lg:left-20 lg:translate-x-0 z-50">
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-10 w-auto" />
        </Link>
      </div>


      <h2 id="onboarding-basic-info-heading" className="font-bold text-2xl lg:text-3xl text-gray-900">
        Basic Info
      </h2>

      <section className="w-9/10 sm:w-full max-w-2xl p-5 py-8 sm:p-6 lg:p-12 bg-white rounded-2xl shadow-xl flex flex-col justify-start items-start gap-y-10 lg:gap-y-8" aria-labelledby="basic-info-form">
        <h2 id="basic-info-form" className="sr-only">Basic info form</h2>
        <div className="w-full flex flex-col gap-y-6 sm:gap-y-4">
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
                    className="w-20 h-20 rounded-full object-cover border-1 border-gray-700"
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
                    className="px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Take a Picture
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
            className=" w-full sm:w-fit px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </section>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="camera-modal-title">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 id="camera-modal-title" className="text-lg font-semibold mb-4">Take a Picture</h2>
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
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
