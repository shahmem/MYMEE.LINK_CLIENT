import React, { useState } from "react";
import DesignContent from "./DesignContent";
import StatsContent from "./StatsContent";
import LinksContent from "./LinksContent";
import LogoutButton from "./LogoutButton";
import Settings from "./Settings";

function Tabs({links, setLinks, refreshSocialLinks, setUser, user, socialLinks, setSocialLinks, setTheme, currentTheme, position, setPosition, onLogout  }) {
  const [activeTab, setActiveTab] = useState("links");

  const tabs = [
    { id: "links", label: "Links" },
    { id: "design", label: "Design" },
    { id: "stats", label: "Stats" },
    { id: "settings", label: "Settings" },
  ];
  return (
    <div className="px-16 py-12 h-screen overflow-auto w-full md:w-[55%] bg-gray-100">
      <div className="w-full h-auto max-w-lg mx-auto">
        <div className="flex border-b border-gray-300 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 text-center py-2 px-4 text-sm 
            transition-colors duration-300 ease-in-out
            ${
              activeTab === tab.id
                ? "text-black font-semibold"
                : "text-gray-600 hover:text-black  hover:font-semibold"
            }`}
            >
              {tab.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 
                transition-all duration-800 ease-in-out
                ${activeTab === tab.id ? "opacity-100" : "opacity-0"}
                `}
              />
            </button>
          ))}
        </div>

        <div className="p-4 text-center transition-opacity duration-300 ease-in-out">
          {activeTab === "links" && (
            <p>
              {" "}
              <LinksContent links={links} setLinks={setLinks} socialLinks={socialLinks} refreshSocialLinks={refreshSocialLinks}  setUser={setUser} user={user} setSocialLinks={setSocialLinks} />{" "}
            </p>
          )}
          {activeTab === "design" && (
            <p>
              {" "}
              <DesignContent user={user}   setUser={setUser} setTheme={setTheme} currentTheme={currentTheme} position={position} setPosition={setPosition} />
            </p>
          )}
          {activeTab === "stats" && (
            <p>
              {" "}
              <StatsContent />
            </p>
          )}
          {activeTab === "settings" && (
            <p>
              {" "}
              <Settings user={user} setUser={setUser}/>
            </p>
          )}
          <LogoutButton onLogout={onLogout} />
        </div>
      </div>
    </div>
  );
}

export default Tabs;
