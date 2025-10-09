// Pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  Check,
  X,
  Phone,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;

  const [signupMethod, setSignupMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // WhatsApp Signup Data
  const [whatsappData, setWhatsappData] = useState({
    username: "",
    whatsapp: "",
    password: "",
  });

  // Email Signup Data
  const [emailData, setEmailData] = useState({
    email: "",
    otp: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [usernameCheck, setUsernameCheck] = useState(null);
  const [whatsappCheck, setWhatsappCheck] = useState(null);
  const [devOTP, setDevOTP] = useState("");
  const [otpValue, setOtpValue] = useState("");

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
      setUsernameCheck({
        available: false,
        message: "Error checking username",
      });
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

  // Handle WhatsApp form changes
  const handleWhatsAppChange = (e) => {
    const { name, value } = e.target;
    setWhatsappData({ ...whatsappData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    if (name === "username" && value.length >= 3) {
      setTimeout(() => checkUsername(value), 500);
    }

    if (name === "whatsapp" && value.length >= 10) {
      setTimeout(() => checkWhatsApp(value), 500);
    }
  };

  // Handle Email form changes
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    if (name === "username" && value.length >= 3) {
      setTimeout(() => checkUsername(value), 500);
    }
  };

  // WhatsApp Signup Flow
  const validateWhatsAppForm = () => {
    const newErrors = {};
    if (!whatsappData.username.trim())
      newErrors.username = "Username is required";
    if (usernameCheck && !usernameCheck.available)
      newErrors.username = usernameCheck.message;
    if (!whatsappData.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required";
    if (whatsappCheck && !whatsappCheck.available)
      newErrors.whatsapp = whatsappCheck.message;
    if (whatsappData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateWhatsAppForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${apiBase}/api/auth/send-otp`,
        whatsappData
      );
      if (res.data.devOTP) setDevOTP(res.data.devOTP);
      setOtpSent(true);
      alert("OTP sent to your WhatsApp!");
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      await handleSendOTP();
      return;
    }

    if (!otpValue || otpValue.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/api/auth/verify-otp`, {
        whatsapp: whatsappData.whatsapp,
        otp: otpValue,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setErrors({ otp: err.response?.data?.message || "Invalid OTP" });
    } finally {
      setLoading(false);
    }
  };

  // Email Signup Flow
  const validateEmailForm = () => {
    const newErrors = {};
    if (!emailData.email.trim()) newErrors.email = "Email is required";
    if (!emailData.username.trim()) newErrors.username = "Username is required";
    if (usernameCheck && !usernameCheck.available)
      newErrors.username = usernameCheck.message;
    if (emailData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendEmailOTP = async () => {
    if (!validateEmailForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/api/auth/send-email-otp`, {
        email: emailData.email,
      });

      if (res.data.devOTP) setDevOTP(res.data.devOTP);
      setOtpSent(true);
      alert("OTP sent to your email!");
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      await handleSendEmailOTP();
      return;
    }

    if (!otpValue || otpValue.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const verifyRes = await axios.post(
        `${apiBase}/api/auth/verify-email-otp`,
        {
          email: emailData.email,
          otp: otpValue,
        }
      );

      // ✅ FIX: Include otpValue in the request
      const signupPayload = {
        ...emailData,
        otp: otpValue, // Add the actual OTP value
      };

      console.log("pre-data", signupPayload);

      const res = await axios.post(
        `${apiBase}/api/auth/complete-email-signup`,
        signupPayload // Send the complete data with OTP
      );

      console.log("post-data", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

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
      if (signupMethod === "whatsapp") {
        const res = await axios.post(`${apiBase}/api/auth/resend-otp`, {
          whatsapp: whatsappData.whatsapp,
        });
        if (res.data.devOTP) setDevOTP(res.data.devOTP);
      } else {
        const res = await axios.post(`${apiBase}/api/auth/resend-email-otp`, {
          email: emailData.email,
        });
        if (res.data.devOTP) setDevOTP(res.data.devOTP);
      }
      alert("New OTP sent!");
    } catch (err) {
      alert("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const switchSignupMethod = () => {
    setSignupMethod(signupMethod === "whatsapp" ? "email" : "whatsapp");
    setOtpSent(false);
    setErrors({});
    setUsernameCheck(null);
    setWhatsappCheck(null);
    setOtpValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join <span className="font-semibold">Mymee.link</span> today
          </p>
        </div>

        {/* WhatsApp Signup Form */}
        {signupMethod === "whatsapp" && (
          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                WhatsApp Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="whatsapp"
                  value={whatsappData.whatsapp}
                  onChange={handleWhatsAppChange}
                  disabled={otpSent}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
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
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={whatsappData.username}
                  onChange={handleWhatsAppChange}
                  disabled={otpSent}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
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
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={whatsappData.password}
                  onChange={handleWhatsAppChange}
                  disabled={otpSent}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 disabled:bg-gray-100"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* OTP Section - Shows after OTP is sent */}
            {otpSent && (
              <div className="pt-4 ">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => {
                      setOtpValue(
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      );
                      setErrors({ ...errors, otp: "" });
                    }}
                    className="w-full px-4 py-1 border border-gray-300 rounded-lg text-lg tracking-widest  focus:border-transparent"
                    placeholder="000000"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-blue-600 right-4 top-5 hover:underline"
                  >
                    Resend OTP
                  </button>
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      {errors.otp}
                    </p>
                  )}
                </div>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpValue("");
                    }}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Change Number
                  </button>
                </div>
              </div>
            )}

            {errors.submit && (
              <p className="text-red-500 text-sm">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : otpSent ? (
                "Verify & Create Account"
              ) : (
                "Send OTP"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={switchSignupMethod}
                className="text-blue-600 text-sm hover:underline font-medium"
              >
                Sign up with Email instead
              </button>
            </div>

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

        {/* Email Signup Form */}
        {signupMethod === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={emailData.email}
                onChange={handleEmailChange}
                disabled={otpSent}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={emailData.username.toLowerCase()}
                  onChange={handleEmailChange}
                  disabled={otpSent}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
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
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={emailData.password}
                  onChange={handleEmailChange}
                  disabled={otpSent}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 disabled:bg-gray-100"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* OTP Section - Shows after OTP is sent */}
            {otpSent && (
              <div className="pt-4 ">
                <div className="relative ">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => {
                      setOtpValue(
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      );
                      setErrors({ ...errors, otp: "" });
                    }}
                    className="w-full px-4 py-1 border border-gray-300 rounded-lg text-lg tracking-widest  focus:border-transparent"
                    placeholder="000000"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="absolute right-4 top-10 text-sm text-blue-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      {errors.otp}
                    </p>
                  )}
                </div>
              </div>
            )}

            {errors.submit && (
              <p className="text-red-500 text-sm">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : otpSent ? (
                "Verify & Create Account"
              ) : (
                "Send OTP"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={switchSignupMethod}
                className="text-green-600 text-sm hover:underline font-medium"
              >
                Sign up with WhatsApp instead
              </button>
            </div>

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
      </div>
    </div>
  );
}
