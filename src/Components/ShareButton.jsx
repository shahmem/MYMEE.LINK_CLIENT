// Components/ShareButton.jsx
import { useState } from "react";
import { Share2, Copy, Check, X, Upload } from "lucide-react";

function ShareButton({ user ,theme}) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate profile URL based on user's preferred format
  const getProfileUrl = () => {
    const username = user?.username;
    
    if (user?.urlFormat === "subdomain") {
      return `https://${username}.mymee.link`;
    } else {
      return `https://mymee.link/${username}`;
    }
  };

  const profileUrl = getProfileUrl();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.name}'s Profile`,
          text: `Check out my Mymee profile!`,
          url: profileUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Share Button - Positioned inside phone mockup */}
      <button
        onClick={handleShare}
        className="absolute top-5 left-3 backdrop-blur-md p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 z-10"
        title="Share Profile"
      >
        <Upload style={{ color: theme.linkColor}} className="w-4 h-4 " />

      </button>

      {/* Share Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Share Profile</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Profile Preview */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
              {user?.profileImage && (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${user.profileImage}`}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-500">@{user?.username}</p>
              </div>
            </div>

            {/* URL Display */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Profile Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Share via:</p>
              
              <a
                href={`https://twitter.com/intent/tweet?text=Check out my profile!&url=${encodeURIComponent(profileUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                  𝕏
                </div>
                <span className="font-medium text-gray-800">Share on Twitter</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  f
                </div>
                <span className="font-medium text-gray-800">Share on Facebook</span>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out my profile: ${profileUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ⟲
                </div>
                <span className="font-medium text-gray-800">Share on WhatsApp</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                  in
                </div>
                <span className="font-medium text-gray-800">Share on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareButton;