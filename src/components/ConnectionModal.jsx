import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { sendUserConnectionRequest } from "../utils/firebaseData";
import { toast } from "react-toastify";

export default function ConnectionModal({
  isOpen,
  onClose,
  partner,
  onSuccess,
}) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !partner) return null;

  const handleConnect = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const success = await sendUserConnectionRequest(
        currentUser.uid,
        partner.uid
      );
      if (success) {
        toast.success("Request sent! 🎉");
        navigate("/dashboard");
        onSuccess?.();
        onClose?.();
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-xl px-6 sm:px-8 py-8 w-full max-w-md mx-4 transform transition-all">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Connect with {partner.fullName || partner.name}?
          </h2>

          <p className="text-gray-600 mb-6">
            Send a connection request to {partner.fullName || partner.name}.
            They'll be able to see your profile and you can start working
            together on your goals.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
