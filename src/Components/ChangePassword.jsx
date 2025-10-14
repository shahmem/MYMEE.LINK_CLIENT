import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

function ChangePassword({ apiBase, user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPasswords, setShowNewPasswords] = useState({
    new: false,
    confirm: false,
  });

  // ✅ Step 1: Verify current password
  const handleVerifyPassword = async () => {
    if (!currentPassword.trim()) {
      setError("Please enter your current password.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 🔹 Call backend to verify current password
      const response = await axios.post(
        `${apiBase}/api/user/${user._id}/verify-password`,
        { currentPassword }
      );

      if (response.data.success) {
        setVerified(true);
        setSuccess("Password verified successfully!");
      } else {
        setError("Incorrect current password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid password.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPasswordData.newPassword.trim() || !newPasswordData.confirmPassword.trim()) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPasswordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.put(
        `${apiBase}/api/user/${user._id}/change-password`,
        {
          currentPassword,
          newPassword: newPasswordData.newPassword,
        }
      );

      setSuccess("Password changed successfully!");
      setNewPasswordData({ newPassword: "", confirmPassword: "" });
      setVerified(false);
      setCurrentPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-left mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaLock className="text-blue-600" size={18} />
        <h2 className="text-lG font-semibold text-gray-800">Change Password</h2>
      </div>

      {/* Step 1: Verify Current Password */}
      {!verified && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setError("");
                setSuccess("");
              }}
              placeholder="Enter your current password"
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-3">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-3">
              {success}
            </div>
          )}

          <button
            onClick={handleVerifyPassword}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Password"}
          </button>
        </div>
      )}

      {/* Step 2: Show New Password Fields After Verification */}
      {verified && (
        <form onSubmit={handleChangePassword} className="mt-6 space-y-5">
          <div className="flex items-center gap-2 mb-3">
            <FaCheckCircle className="text-green-600" />
            <span className="text-sm text-green-700">Current password verified</span>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPasswords.new ? "text" : "password"}
                name="newPassword"
                value={newPasswordData.newPassword}
                onChange={(e) =>
                  setNewPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowNewPasswords((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPasswords.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showNewPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={newPasswordData.confirmPassword}
                onChange={(e) =>
                  setNewPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowNewPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Error/Success Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ChangePassword;
