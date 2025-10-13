// Components/Socials.jsx
import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
  FaSpotify,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaDiscord,
  FaReddit,
  FaLinkedin,
  FaTelegram,
  FaTwitch,
  FaPinterest,
  FaAmazon,
  FaSnapchatGhost,
  FaMusic,
  FaPodcast,
  FaInstagram,
  FaPhoneAlt,
  FaAddressBook,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiClubhouse, SiFlipkart, SiGoogleplay } from "react-icons/si";
import axios from "axios";
import SocialLinks from "./SocialLinks";

function Socials({
  apiBase,
  refreshSocialLinks,
  setSocialLinks,
  socialLinks,
  user,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Social platforms configuration
  const socialitems = [
    {
      name: "Email",
      key: "email",
      icon: <MdEmail size={24} className="text-red-500" />,
      placeholder: "example@gmail.com",
      buildUrl: (val) => `mailto:${val}`,
    },
    {
      name: "Save Contact",
      key: "contact",
      icon: <FaAddressBook size={24} className="text-blue-500" />,
      placeholder: "Enter phone number with country code",
      buildUrl: (val) => {
        // Create a vCard that can be downloaded/saved to contacts
        const phone = val.replace(/\s+/g, "");
        const name = user?.name || "Contact"; // Use user's name from props

        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=CELL:+${phone}
END:VCARD`;

        // Encode the vCard as a data URL
        return `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`;
      },
    },
    {
      name: "Call",
      key: "call",
      icon: <FaPhoneAlt size={20} className="text-green-600" />, // import FaPhoneAlt from react-icons/fa
      placeholder: "phone number with country code",
      buildUrl: (val) => `tel:+${val}`,
    },

    {
      name: "Facebook",
      key: "facebook",
      icon: <FaFacebookF size={24} className="text-blue-600" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://facebook.com/${val}`,
    },
    {
      name: "WhatsApp",
      key: "whatsapp",
      icon: <FaWhatsapp size={24} className="text-green-500" />,
      placeholder: "Enter phone with country code",
      buildUrl: (val) => `https://wa.me/${val}`,
    },
    {
      name: "Instagram",
      key: "instagram",
      icon: <FaInstagram size={24} className="text-pink-500" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://instagram.com/${val}`,
    },
    {
      name: "Twitter",
      key: "twitter",
      icon: <FaTwitter size={24} className="text-sky-400" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://twitter.com/${val}`,
    },
    {
      name: "YouTube",
      key: "youtube",
      icon: <FaYoutube size={24} className="text-red-600" />,
      placeholder: "Enter channel name",
      buildUrl: (val) => `https://youtube.com/${val}`,
    },
    {
      name: "TikTok",
      key: "tiktok",
      icon: <FaTiktok size={24} className="text-black" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://tiktok.com/@${val}`,
    },
    {
      name: "Spotify",
      key: "spotify",
      icon: <FaSpotify size={24} className="text-green-500" />,
      placeholder: "Enter artist/playlist",
      buildUrl: (val) => `https://open.spotify.com/${val}`,
    },
    {
      name: "GitHub",
      key: "github",
      icon: <FaGithub size={24} className="text-gray-800" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://github.com/${val}`,
    },
    {
      name: "Behance",
      key: "behance",
      icon: <FaBehance size={24} className="text-blue-600" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://www.behance.net/${val}`,
    },
    {
      name: "Dribbble",
      key: "dribbble",
      icon: <FaDribbble size={24} className="text-pink-500" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://dribbble.com/${val}`,
    },
    {
      name: "Discord",
      key: "discord",
      icon: <FaDiscord size={24} className="text-indigo-500" />,
      placeholder: "Enter invite code",
      buildUrl: (val) => `https://discord.gg/${val}`,
    },
    {
      name: "Reddit",
      key: "reddit",
      icon: <FaReddit size={24} className="text-orange-500" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://reddit.com/u/${val}`,
    },
    {
      name: "LinkedIn",
      key: "linkedin",
      icon: <FaLinkedin size={24} className="text-blue-700" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://linkedin.com/in/${val}`,
    },
    {
      name: "Clubhouse",
      key: "clubhouse",
      icon: <SiClubhouse size={24} className="text-yellow-600" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://clubhouse.com/@${val}`,
    },
    {
      name: "Telegram",
      key: "telegram",
      icon: <FaTelegram size={24} className="text-sky-500" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://t.me/${val}`,
    },
    {
      name: "Twitch",
      key: "twitch",
      icon: <FaTwitch size={24} className="text-purple-600" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://twitch.tv/${val}`,
    },
    {
      name: "Pinterest",
      key: "pinterest",
      icon: <FaPinterest size={24} className="text-red-500" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://pinterest.com/${val}`,
    },
    {
      name: "Amazon",
      key: "amazon",
      icon: <FaAmazon size={24} className="text-black" />,
      placeholder: "Enter shop/product link",
      buildUrl: (val) => `https://amazon.com/${val}`,
    },
    {
      name: "Flipkart",
      key: "flipkart",
      icon: <SiFlipkart size={24} className="text-yellow-400" />,
      placeholder: "Enter shop/product link",
      buildUrl: (val) => `https://flipkart.com/${val}`,
    },
    {
      name: "Snapchat",
      key: "snapchat",
      icon: <FaSnapchatGhost size={24} className="text-yellow-400" />,
      placeholder: "Enter username",
      buildUrl: (val) => `https://snapchat.com/add/${val}`,
    },
    {
      name: "Music",
      key: "music",
      icon: <FaMusic size={24} className="text-orange-600" />,
      placeholder: "Enter music link",
      buildUrl: (val) => `https://music.com/${val}`,
    },
    {
      name: "Podcast",
      key: "podcast",
      icon: <FaPodcast size={24} className="text-green-600" />,
      placeholder: "Enter podcast feed ID",
      buildUrl: (val) => `https://podcasts.google.com/feed/${val}`,
    },
    {
      name: "GooglePlay",
      key: "googleplay",
      icon: <SiGoogleplay size={24} className="text-green-500" />,
      placeholder: "Enter developer ID",
      buildUrl: (val) => `https://play.google.com/store/apps/dev?id=${val}`,
    },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;

    // If selected platform is "call" → allow only digits
    if (selectedPlatform.key === "call" || selectedPlatform.key === "contact") {
      if (/^\d*$/.test(value)) {
        setInputValue(value);
      }
    } else {
      // For other platforms → allow normal text
      setInputValue(value);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
      setSelected(null);
      setInputValue("");
    }
  };

  const handleAdd = async () => {
    if (!selected || !inputValue.trim()) {
      alert("Please enter a value");
      return;
    }

    const platform = socialitems.find((s) => s.key === selected);
    const url = platform.buildUrl(inputValue.replace(/\s+/g, ""));

    setLoading(true);
    try {
      await axios.post(`${apiBase}/api/sociallinks/${user._id}`, {
        title: platform.key,
        url,
        icon: platform.key,
      });

      setOpen(false);
      setSelected(null);
      setInputValue("");
      refreshSocialLinks();
    } catch (err) {
      console.error("Error saving social link:", err);
      alert(err.response?.data?.message || "Failed to add social link");
    } finally {
      setLoading(false);
    }
  };

  const selectedPlatform = socialitems.find((s) => s.key === selected);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="px-20 w-max py-2.5 mt-7 text-white bg-gradient-to-r from-blue-600 to-teal-500
             hover:from-blue-800 hover:to-teal-700 transition-all duration-300 font-semibold text-sm rounded shadow"
      >
        Add Socials +
      </button>

      {open && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-[#11111173] flex justify-center items-center z-50 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 w-80 space-y-4 max-h-[90vh] overflow-y-auto "
          >
            {!selected ? (
              <>
                <h2 className="text-lg font-semibold text-center">
                  Add Social Links
                </h2>
                <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {socialitems.map((social) => (
                    <button
                      key={social.key}
                      className="flex flex-col items-center justify-center gap-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded transition-all duration-200"
                      onClick={() => setSelected(social.key)}
                    >
                      {social.icon}
                      <span className="text-xs font-medium">{social.name}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-2 text-sm font-semibold text-red-500 hover:bg-gray-100 rounded transition-all duration-200"
                >
                  Close
                </button>
              </>
            ) : (
              <div className="space-y-5 ">
                <h2 className="inline-flex font-semibold text-center items-center">
                  Add {selectedPlatform.name} Link &nbsp;{" "}
                  {selectedPlatform.icon}
                </h2>
                <input
                  type="text"
                  value={inputValue}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                  onChange={handleInputChange}
                  placeholder={selectedPlatform.placeholder}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                  autoFocus
                />
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelected(null);
                      setInputValue("");
                    }}
                    disabled={loading}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={loading || !inputValue.trim()}
                    className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <SocialLinks
        apiBase={apiBase}
        socialitems={socialitems}
        setSocialLinks={setSocialLinks}
        socialLinks={socialLinks}
        user={user}
      />
    </div>
  );
}

export default Socials;
