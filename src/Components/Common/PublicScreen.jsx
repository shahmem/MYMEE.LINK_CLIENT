import img from "../../assets/mymee/Mymee icon grey.png";
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
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052] "
      />
    ),
    contact: (
      <FaAddressBook
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    call: (
      <FaPhoneAlt
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),

    facebook: (
      <FaFacebookF
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    twitter: (
      <FaTwitter
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    youtube: (
      <FaYoutube
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    whatsapp: (
      <FaWhatsapp
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    tiktok: (
      <FaTiktok
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    spotify: (
      <FaSpotify
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    github: (
      <FaGithub
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    behance: (
      <FaBehance
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    dribbble: (
      <FaDribbble
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    discord: (
      <FaDiscord
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    reddit: (
      <FaReddit
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    linkedin: (
      <FaLinkedin
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    clubhouse: (
      <SiClubhouse
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    telegram: (
      <FaTelegram
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    twitch: (
      <FaTwitch
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    pinterest: (
      <FaPinterest
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    amazon: (
      <FaAmazon
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    flipkart: (
      <SiFlipkart
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    snapchat: (
      <FaSnapchatGhost
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    music: (
      <FaMusic
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    podcast: (
      <FaPodcast
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    googleplay: (
      <SiGoogleplay
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
    instagram: (
      <FaInstagram
        size={32}
        style={{ color: theme.iconColor, background: theme.iconBg }}
        className="text-white p-1 rounded-full bg-[#00000052]"
      />
    ),
  };
  console.log("bgimage in public:",theme.bgImage);
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
        <div className="flex flex-col items-center text-center md:mt-8 mt-18 order-1">
          <img
            src={
              user.profileImage
                ? `${apiBase}/uploads/${user.profileImage}`
                : `${img}`
            }
            alt="profile"
            className="w-24 h-24 mb-2 rounded-full object-cover object-center border-2 border-gray-300 shadow"
          />
          <h2
            style={{ color: theme.nameColor }}
            className="font-semibold mt-3 text-xl"
          >
            {user.name}
          </h2>
          <h3 style={{ color: theme.bioColor }} className="font-medium">
            {user.bio}
          </h3>
        </div>
      )}
      <div className={` ${position === "top" ? "order-2" : "order-3"}`}>
        {socialLinks && (
          <div className="flex justify-center gap-2 py-3">
            {socialLinks.map((link, idx) => {
              const Icon = iconMap[link.icon.toLowerCase()];
              if (!Icon) return null;

              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" w-[32px] h-[32px] flex justify-center items-center hover:scale-110 transform transition-all"
                >
                  {Icon}
                </a>
              );
            })}
          </div>
        )}

      {user?.header && (
        <p
        style={{ color: theme.headerColor }}
        className="capitalize text-center my-2 font-semibold"
        >
          {user.header}
        </p>
      )}
      </div>
      <div
        className={`flex items-center flex-col gap-3 scrollbar-hide overflow-auto w-full p-4 overflow-x-hidden ${
          position === "top" ? "order-3" : "order-2"
        }`}
      >
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
              className="flex justify-center inset-0  bg-opacity-30 backdrop-blur-[4px] md:w-[13rem] w-[19rem] items-center  p-2.5 py-3 md:py-2 rounded-3xl shadow z-40 relative"
            >
              <img
                className="absolute p-0.5 left-1 md:h-9 md:w-9 h-12 w-12 object-contain object-center rounded-full"
                src={`${apiBase}/uploads/${link.icon}`}
                alt="img"
              />
              <div>
                <a
                  style={{ color: theme.linkColor }}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" font-semibold md:text-base text-lg"
                >
                  {link.title}
                </a>
              </div>
            </div>
          ))
        )}
        <div className="w-full flex opacity-50 justify-center absolute md:bottom-8  bottom-24">
          <img src={img} className=" w-[60px] md:w-[40px] p-1 border-2 border-gray-400 " alt="" />
          
        </div>
      </div>
    </div>
  );
}

export default PublicScreen;