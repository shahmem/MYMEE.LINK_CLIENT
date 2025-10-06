// Components/UsernameSettings.jsx
import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import axios from "axios";

function UsernameSettings({ user, setUser, apiBase }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [urlFormat, setUrlFormat] = useState(user?.urlFormat || "subdomain"); // 'subdomain' or 'path'

  // Generate URL based on format
  const getProfileUrl = (format) => {
    const username = user?.username || "yourusername";
    if (format === "subdomain") {
      return `${username}.mymee.link`;
    } else {
      return `mymee.link/${username}`;
    }
  };

  const checkUsername = async (username) => {
    if (username === user?.username) {
      setAvailable(true);
      return;
    }

    if (username.length < 3) {
      setAvailable(false);
      setError("Username must be at least 3 characters");
      return;
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
      setAvailable(false);
      setError("Only lowercase letters, numbers, and underscores");
      return;
    }

    setChecking(true);
    setError("");

    try {
      const res = await axios.post(`${apiBase}/api/auth/check-username`, {
        username,
      });
      setAvailable(res.data.available);
      if (!res.data.available) {
        setError(res.data.message);
      }
    } catch (err) {
      setAvailable(false);
      setError("Error checking username");
    } finally {
      setChecking(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase();
    setNewUsername(value);
    
    if (value.length >= 3) {
      const timeoutId = setTimeout(() => checkUsername(value), 500);
      return () => clearTimeout(timeoutId);
    } else {
      setAvailable(null);
      setError("");
    }
  };

  const handleSave = async () => {
    if (!available || (newUsername === user.username && urlFormat === user.urlFormat)) {
      return;
    }

    setSaving(true);
    try {
      const res = await axios.put(
        `${apiBase}/api/user/${user._id}/username`,
        { 
          username: newUsername,
          urlFormat: urlFormat
        }
      );
      
      setUser({ ...user, username: newUsername, urlFormat: urlFormat });
      setIsEditing(false);
      alert("Settings updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">My Username</h3>

      {!isEditing ? (
        <div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">Your profile URL:</p>
            <p className="font-mono text-blue-600 break-all">
              {getProfileUrl(user?.urlFormat || "subdomain")}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Change Username
          </button>
        </div>
      ) : (
        <div>
          {/* URL Format Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Preferred link
            </label>
            <p className="text-sm text-gray-500 mb-3">
              This is an aesthetic choice. Both links are usable.
            </p>

            <div className="space-y-2">
              {/* Subdomain Format */}
              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="urlFormat"
                  value="subdomain"
                  checked={urlFormat === "subdomain"}
                  onChange={(e) => setUrlFormat(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-mono text-sm text-gray-800">
                    {newUsername || user?.username || "yourusername"}.mymee.link
                  </p>
                </div>
              </label>

              {/* Path Format */}
              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="urlFormat"
                  value="path"
                  checked={urlFormat === "path"}
                  onChange={(e) => setUrlFormat(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-mono text-sm text-gray-800">
                    mymee.link/{newUsername || user?.username || "yourusername"}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  className="flex-1 px-3 py-2 focus:outline-none"
                  placeholder="yourusername"
                />
                <div className="px-3">
                  {checking && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                  {!checking && available === true && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {!checking && available === false && (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
            {available && !error && newUsername !== user?.username && (
              <p className="text-sm text-green-600 mt-1">
                Username is available!
              </p>
            )}
          </div>

          <p className="text-xs text-gray-500 mb-4">
            • 3-30 characters<br />
            • Only lowercase letters, numbers, and underscores<br />
            • Cannot be changed frequently
          </p>

          {/* Preview */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Preview:</p>
            <p className="font-mono text-sm text-blue-700 break-all">
              {getProfileUrl(urlFormat)}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!available || saving || (newUsername === user.username && urlFormat === user.urlFormat)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewUsername(user.username);
                setUrlFormat(user.urlFormat || "subdomain");
                setAvailable(null);
                setError("");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsernameSettings;