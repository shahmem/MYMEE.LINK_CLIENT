import img from "../../assets/mymee-logo.png";
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
import ShareButton from "../ShareButton";
import { useLocation } from "react-router-dom";

function PublicScreen({ links, user, socialLinks, theme, position }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");
  const iconMap = {
    email: (
      <MdEmail
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052] "
      />
    ),
    contact: (
      <FaAddressBook
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    call: (
      <FaPhoneAlt
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),

    facebook: (
      <FaFacebookF
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    twitter: (
      <FaTwitter
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    youtube: (
      <FaYoutube
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    whatsapp: (
      <FaWhatsapp
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    tiktok: (
      <FaTiktok
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    spotify: (
      <FaSpotify
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    github: (
      <FaGithub
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    behance: (
      <FaBehance
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    dribbble: (
      <FaDribbble
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    discord: (
      <FaDiscord
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    reddit: (
      <FaReddit
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    linkedin: (
      <FaLinkedin
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    clubhouse: (
      <SiClubhouse
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    telegram: (
      <FaTelegram
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    twitch: (
      <FaTwitch
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    pinterest: (
      <FaPinterest
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    amazon: (
      <FaAmazon
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    flipkart: (
      <SiFlipkart
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    snapchat: (
      <FaSnapchatGhost
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    music: (
      <FaMusic
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    podcast: (
      <FaPodcast
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    googleplay: (
      <SiGoogleplay
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    instagram: (
      <FaInstagram
        size={24}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
  };
  // console.log(theme);

  const apiBase = import.meta.env.VITE_API_URL;

  return (
    <div
      className={`flex flex-col items-center  gap-3 p-4 ${
        isDashboard ? "rounded-2xl h-full" : " h-screen"
      }  relative w-full `}
      style={{
        background: theme.bgImage
          ? `url(${apiBase}${theme.bgImage}) center/cover no-repeat`
          : theme.bgColor,
      }}
    >
      {user && <ShareButton user={user} theme={theme} />}
      {user && (
        <div className="flex flex-col items-center text-center  mt-10 order-1">
          <img
            src={
              user.profileImage
                ? `${apiBase}/uploads/${user.profileImage}`
                : `${img}`
            }
            alt="profile"
            className="w-20 h-20 mb-2 rounded-full object-cover object-center border-2 border-gray-300 shadow"
          />
          <h2 style={{ color: theme.nameColor }} className="font-semibold">
            {user.name}
          </h2>
          <h3
            style={{ color: theme.bioColor }}
            className="font-semibold text-sm"
          >
            {user.bio}
          </h3>
        </div>
      )}
      <div className={position === "top" ? "order-2" : "order-3"}>
        {socialLinks && (
          <div className="flex justify-center gap-1 py-3">
            {socialLinks.map((link, idx) => {
              const Icon = iconMap[link.icon.toLowerCase()];
              if (!Icon) return null;

              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" w-[30px] h-[30px] flex justify-center items-center hover:scale-110 transform transition-all"
                >
                  {Icon}
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div
        className={`flex items-center flex-col gap-2.5 w-full ${
          position === "top" ? "order-3" : "order-2"
        }`}
      >
        {user?.header && (
          <p
            style={{ color: theme.headerColor }}
            className="capitalize text-sm my-2 font-semibold"
          >
            {user.header}
          </p>
        )}
        {links.length === 0 ? (
          <p className="text-gray-600 text-center">No links added yet.</p>
        ) : (
          links.map((link) => (
            <div
              key={link._id}
              style={{
                background: theme.linkBg,
                borderRadius: theme.linkRadius,
              }}
              className="flex justify-center inset-0 bg-[#00000052] bg-opacity-30 backdrop-blur-sm w-[16rem] items-center  p-2 py-4 rounded-3xl shadow relative"
            >
              <img
                className="absolute p-0.5 left-0.5 h-9 w-9 object-contain object-center rounded-full"
                src={`${apiBase}/uploads/${link.icon}`}
                alt="img"
              />
              <div>
                <a
                  style={{ color: theme.linkColor }}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold text-xs"
                >
                  {link.title}
                </a>
              </div>
            </div>
          ))
        )}
        <div className="w-full flex justify-center absolute bottom-12">
        <img src={img} className="opacity-25 w-[120px] " alt="" />

        </div>
      </div>
    </div>
  );
}

export default PublicScreen;
