// Components/ShareButton.jsx
import { Share } from "lucide-react";
import { useState } from "react";

function ShareButton({ user, theme }) {

  // Generate the correct profile URL
  const profileUrl = `${window.location.origin}/${user.username}`;

  const handleShare = async () => {
    if (navigator.share) {
      // Use Web Share API if available
      try {
        await navigator.share({
          title: `${user.name}'s Profile`,
          text: user.bio || `Check out ${user.name}'s profile`,
          url: profileUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying to clipboard
      handleCopy();
    }
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={handleShare}
        style={{
          background: theme.iconBg,
          color: theme.iconColor,
        }}
        className="p-2 rounded-full hover:scale-110 transition-transform"
        title="Share profile"
      >
        <Share size={16} />
      </button>
    </div>
  );
}

export default ShareButton;
