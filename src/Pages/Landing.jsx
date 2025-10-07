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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Bio, One Link,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Unlimited Reach
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create a beautiful landing page for all your links. Perfect for
            Instagram, TikTok, Twitter, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/signup")}
              className="hidden px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl md:flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className=" hidden md:block px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg shadow-md border border-gray-200"
            >
              I Have an Account
            </button>
            <button
              onClick={() => setShowQRModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold md:text-lg shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              Generate QR Code
            </button>
          </div>
        </div>

        {/* Mock Phone Preview */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-3xl shadow-2xl">
              <div className="bg-white rounded-[22px] w-[280px] h-[560px] flex flex-col items-center gap-3 p-6 overflow-hidden">
                {/* Mock Profile */}
                <div className="flex flex-col items-center mt-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mb-3"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-40 bg-gray-100 rounded"></div>
                </div>

                {/* Mock Social Icons */}
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200"
                    ></div>
                  ))}
                </div>

                {/* Mock Links */}
                <div className="w-full space-y-3 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
              Free Forever
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to grow your online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Why Choose Mymee.link?
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Join thousands of creators, influencers, and businesses who
                  trust Mymee.link to connect with their audience.
                </p>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg shadow-lg"
                >
                  Start for Free
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <Check className="w-6 h-6 flex-shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your personalized link-in-bio page in minutes. No credit card
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Sign Up Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold text-lg"
            >
              Login to Your Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
      </footer>
    </div>
  );
}