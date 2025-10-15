// Pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../Components/Tabs";
import LiveScreen from "../Components/LiveScreen";
import api from "../api/axios"; // Import configured axios
import Navbar from "../Components/Navbar";

// ✅ Define your default custom theme
const defaultCustomTheme = {
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

function Dashboard() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [theme, setTheme] = useState(defaultCustomTheme);
  const [socialLinks, setSocialLinks] = useState([]);
  const [user, setUser] = useState(null);
  const [position, setPosition] = useState("top");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user data from /api/auth/me endpoint
        const userRes = await api.get("/api/auth/me");
        const fetchedUser = userRes.data.user;
        setUser(fetchedUser);

        // Fetch user's theme
        const themeRes = await api.get(`/api/user/${fetchedUser._id}/theme`);
        const fetchedTheme = themeRes.data;
        setTheme(
          fetchedTheme && Object.keys(fetchedTheme).length > 0
            ? fetchedTheme
            : defaultCustomTheme
        );

        // Fetch links
        const linksRes = await api.get(`/api/links/${fetchedUser._id}`);
        setLinks(linksRes.data);

        // Fetch social links
        const socialRes = await api.get(`/api/sociallinks/${fetchedUser._id}`);
        setSocialLinks(socialRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to load data");
        setTheme(defaultCustomTheme);

        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  // Refresh social links dynamically
  const refreshSocialLinks = async () => {
    if (!user?._id) return;
    try {
      const res = await api.get(`/api/sociallinks/${user._id}`);
      setSocialLinks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!theme) return null;

  return (
    <div className=" h-screen">
      <Navbar onLogout={handleLogout}/>
      <div className="flex overflow-auto md:flex-row flex-col">
        <LiveScreen
          links={links}
          socialLinks={socialLinks}
          user={user}
          theme={theme}
          position={position}
        />

        <Tabs
          links={links}
          setLinks={setLinks}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          refreshSocialLinks={refreshSocialLinks}
          user={user}
          setUser={setUser}
          currentTheme={theme}
          setTheme={setTheme}
          position={position}
          setPosition={setPosition}
        />
      </div>
    </div>
  );
}

export default Dashboard;
