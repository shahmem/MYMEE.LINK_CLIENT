// Components/PublicProfile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicScreen from "./Common/PublicScreen"; // Import your existing PublicScreen component
import api from "../api/axios";

// Default theme in case none is loaded
const defaultTheme = {
  name: "custom",
  bgColor: "#ffffff",
  bgImage: "",
  bgVideo: "",
  nameColor: "#000000",
  bioColor: "rgba(0,0,0,0.40)",
  iconColor: "#000000",
  iconBg: "#ffffff32",
  linkColor: "#000000",
  linkRadius: "24px",
  linkBg: "#ffffff72",
  headerColor: "#000000",
  fontStyle: "Arial, sans-serif",
};

function PublicProfile() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch public profile data
        const response = await api.get(`/api/public/${username}`);
        setProfileData(response.data);

      } catch (err) {
        console.error("Error fetching public profile:", err);
        
        if (err.response?.status === 404) {
          setError("Profile not found");
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPublicProfile();
    }
  }, [username]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  // No data state
  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">No profile data available</p>
      </div>
    );
  }

  const { user, links, socialLinks, theme, position } = profileData;
  const finalTheme = theme && Object.keys(theme).length > 0 ? theme : defaultTheme;

  return (
    <div 
      className="min-h-screen w-full"
      style={{ fontFamily: finalTheme.fontStyle }}
    >
      <PublicScreen 
        links={links || []}
        user={user}
        socialLinks={socialLinks || []}
        theme={finalTheme}
        position={position || 'top'}
      />
    </div>
  );
}

export default PublicProfile;