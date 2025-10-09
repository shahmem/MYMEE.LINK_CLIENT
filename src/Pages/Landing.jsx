import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Link2,
  Smartphone,
  Palette,
  TrendingUp,
  Check,
  ArrowRight,
  QrCode,
  Download,
  X,
  ChevronRight,
} from "lucide-react";
import Navbar from "../Components/Common/Navbar";
import QRCode from "qrcode";

export default function Landing() {
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrText, setQrText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const canvasRef = useRef(null);

  const features = [
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "One Link, Infinite Possibilities",
      description: "Share all your important links in one beautiful place",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Design",
      description:
        "Perfectly optimized for mobile devices and all screen sizes",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Customizable Themes",
      description: "Personalize your page with colors, backgrounds, and fonts",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Performance",
      description: "Monitor clicks and engagement with built-in analytics",
    },
  ];

  const benefits = [
    "Unlimited links",
    "Custom social icons",
    "WhatsApp verification",
    "Real-time preview",
    "Mobile responsive",
    "Easy to use",
  ];

  const generateQR = async () => {
    if (!qrText.trim()) return;

    try {
      const dataUrl = await QRCode.toDataURL(qrText, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000",
          light: "#ffffff",
        },
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = qrDataUrl;
    link.click();
  };

  useEffect(() => {
    if (qrText.trim()) {
      generateQR();
    } else {
      setQrDataUrl("");
    }
  }, [qrText]);

  return (
    <div
      style={{ fontFamily: "'poppins', sans-serif" }}
      className="min-h-screen bg-[#fffffa]"
    >
      {/* Navbar */}
      <Navbar />

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-[#00000038] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
            <button
              onClick={() => {
                setShowQRModal(false);
                setQrText("");
                setQrDataUrl("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Generate QR Code
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter URL or Text
                </label>
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="https://mymee.link/yourname"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {qrDataUrl && (
                <div className="space-y-4">
                  <div className="flex justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="w-64 h-64 rounded-lg shadow-lg"
                    />
                  </div>

                  <button
                    onClick={downloadQR}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Download QR Code
                  </button>
                </div>
              )}

              {!qrDataUrl && qrText && (
                <div className="text-center text-gray-400 py-8">
                  Generating QR code...
                </div>
              )}

              {!qrText && (
                <div className="text-center text-gray-400 py-8">
                  Enter a URL or text to generate QR code
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="min-h-screen bg-[#fffffc] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Waitlist Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 border border-gray-300 rounded-full mb-8 mt-4 lg:mt-12 md:mt-8 sm:mb-8 bg-white shadow-sm">
          <span className="text-gray-700 text-sm sm:text-base">
            All Your Links. One Mymee!
          </span>
          <span className="text-lime-600 font-semibold text-sm sm:text-base">
            Join Waitlist
          </span>
          <svg 
            className="w-4 h-4 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
          All your links,
          <br />
          one smart profile.
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          Create your personalized link in bio page in seconds.
          <br className="hidden sm:block" />
          Share everything that matters in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Get Started Button */}
          <button
            onClick={()=>{navigate('/signup')}}
            className="w-full sm:w-auto bg-linear-to-b  from-lime-500 to-lime-300 hover:bg-lime-500 text-white  px-8 py-3 rounded-xl transition-colors shadow-sm text-sm sm:text-base"
          >
            Get Started
          </button>

          {/* QR Code Button */}
          <button
            onClick={()=>{setShowQRModal}}
            className="w-full sm:w-auto bg-white border-2 border-lime-500 text-lime-600 hover:bg-lime-50 font-semibold px-8 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-base sm:text-lg"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" 
              />
            </svg>
            QR Code
          </button>
        </div>
      </div>
    </div>
      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link2 className="w-8 h-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold">Mymee.link</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Mymee.link. All rights reserved.
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
