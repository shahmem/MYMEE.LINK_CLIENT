// Signup.jsx
// Note: This component uses react-router-dom and axios which need to be installed
// npm install react-router-dom axios

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Check, X, Phone, User, Lock, UserCircle } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;

  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [usernameCheck, setUsernameCheck] = useState(null);
  const [whatsappCheck, setWhatsappCheck] = useState(null);
  const [devOTP, setDevOTP] = useState(""); // For development

  // Real-time username validation
  const checkUsername = async (username) => {
    if (username.length < 3) {
      setUsernameCheck({ available: false, message: "Too short" });
      return;
    }

    try {
      const res = await axios.post(`${apiBase}/api/auth/check-username`, {
        username,
      });
      setUsernameCheck(res.data);
    } catch (err) {
      setUsernameCheck({ available: false, message: "Error checking username" });
    }
  };

  // Real-time WhatsApp validation
  const checkWhatsApp = async (whatsapp) => {
    if (whatsapp.length < 10) {
      setWhatsappCheck({ available: false, message: "Invalid number" });
      return;
    }

    try {
      const res = await axios.post(`${apiBase}/api/auth/check-whatsapp`, {
        whatsapp,
      });
      setWhatsappCheck(res.data);
    } catch (err) {
      setWhatsappCheck({ available: false, message: "Error checking number" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    // Real-time validation
    if (name === "username" && value.length >= 3) {
      const timeoutId = setTimeout(() => checkUsername(value), 500);
      return () => clearTimeout(timeoutId);
    }

    if (name === "whatsapp" && value.length >= 10) {
      const timeoutId = setTimeout(() => checkWhatsApp(value), 500);
      return () => clearTimeout(timeoutId);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (usernameCheck && !usernameCheck.available)
      newErrors.username = usernameCheck.message;

    if (!formData.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required";
    if (whatsappCheck && !whatsappCheck.available)
      newErrors.whatsapp = whatsappCheck.message;

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/api/auth/send-otp`, {
        name: formData.name,
        username: formData.username,
        whatsapp: formData.whatsapp,
        password: formData.password,
      });

      if (res.data.devOTP) setDevOTP(res.data.devOTP);
      setStep(2);
      alert("OTP sent to your WhatsApp!");
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/api/auth/verify-otp`, {
        whatsapp: formData.whatsapp,
        otp,
      });

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Configure axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setErrors({ otp: err.response?.data?.message || "Invalid OTP" });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/api/auth/resend-otp`, {
        whatsapp: formData.whatsapp,
      });
      if (res.data.devOTP) setDevOTP(res.data.devOTP);
      alert("New OTP sent!");
    } catch (err) {
      alert("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join Mymee.link today</p>
        </div>

        {/* Step 1: Signup Form */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserCircle className="inline w-4 h-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="johndoe"
                />
                {usernameCheck && (
                  <span className="absolute right-3 top-3">
                    {usernameCheck.available ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                )}
              </div>
              {usernameCheck && !usernameCheck.available && (
                <p className="text-red-500 text-sm mt-1">
                  {usernameCheck.message}
                </p>
              )}
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                WhatsApp Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+919876543210"
                />
                {whatsappCheck && (
                  <span className="absolute right-3 top-3">
                    {whatsappCheck.available ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                )}
              </div>
              {whatsappCheck && !whatsappCheck.available && (
                <p className="text-red-500 text-sm mt-1">
                  {whatsappCheck.message}
                </p>
              )}
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm">{errors.submit}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign up with WhatsApp"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Verify OTP</h2>
              <p className="text-gray-600 text-sm">
                Enter the 6-digit code sent to
                <br />
                <span className="font-semibold">{formData.whatsapp}</span>
              </p>
              {devOTP && (
                <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded">
                  <p className="text-xs text-yellow-800">
                    Dev Mode OTP: <strong>{devOTP}</strong>
                  </p>
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setErrors({});
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000000"
                maxLength={6}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {errors.otp}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Verify & Create Account"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="text-sm text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
              <span className="mx-2 text-gray-400">|</span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 hover:underline"
              >
                Change Number
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}