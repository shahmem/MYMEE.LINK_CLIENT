// Components/ShareButton.jsx
import { useState } from 'react';
import { FaShare, FaCopy, FaCheck } from 'react-icons/fa';

function ShareButton({ user, theme }) {
  const [copied, setCopied] = useState(false);
  
  // Generate the correct profile URL
  const profileUrl = `${window.location.origin}/${user.username}`;
  
  const handleShare = async () => {
    if (navigator.share) {
      // Use Web Share API if available
      try {
        await navigator.share({
          title: `${user.name}'s Profile`,
          text: user.bio || `Check out ${user.name}'s profile`,
          url: profileUrl
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      handleCopy();
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={handleShare}
        style={{ 
          background: theme.iconBg,
          color: theme.iconColor 
        }}
        className="p-2 rounded-full hover:scale-110 transition-transform"
        title="Share profile"
      >
        <FaShare size={20} />
      </button>
      
      <button
        onClick={handleCopy}
        style={{ 
          background: theme.iconBg,
          color: theme.iconColor 
        }}
        className="p-2 rounded-full hover:scale-110 transition-transform"
        title="Copy link"
      >
        {copied ? <FaCheck size={20} /> : <FaCopy size={20} />}
      </button>
    </div>
  );
}

export default ShareButton;