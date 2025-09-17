import { useState } from "react";
import { sendPasswordReset } from "../config/firebase";
import { toast } from "react-toastify";
import InputField from "./forms/InputField.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordReset(email);
      toast.success("Check your inbox for a reset link!");
    } catch (err) {
      toast.error("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password?</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we’ll send you a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
