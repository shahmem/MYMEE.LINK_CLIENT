import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaPalette } from "react-icons/fa";

function Themes({ user, currentTheme, setTheme }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [builtinThemes, setBuiltinThemes] = useState({});
  const [customTheme, setCustomTheme] = useState(null);
  const [uploading, setUploading] = useState(false);

  const bgColorRef = useRef(null);
  const linkColorRef = useRef(null);
  const bgImageInputRef = useRef(null);
  const bgVideoInputRef = useRef(null);
  const textColorRef = useRef(null);
  const borderColorRef = useRef(null);
  const nameColorRef = useRef(null);
  const shadowColorRef = useRef(null);
  const headerColorRef = useRef(null);
  const bioColorRef = useRef(null);
  const iconColorRef = useRef(null);
  const iconBgRef = useRef(null);

  const defaultCustomTheme = {
    name: "custom",
    bgType: "color",
    bgColor: "#ffffff",
    bgVideo: "",
    bgImage: "",
    nameColor: "#000000",
    bioColor: "rgba(0,0,0,0.40)",
    iconColor: "#000000",
    iconBg: "#ffffff32",
    linkColor: "#000000",
    linkBg: "#ffffff72",
    linkRadius: "24px",
    headerColor: "#000000",
    fontStyle: "Inter, sans-serif",
    // New fields
    linkTextColor: "#000000",
    linkBorderColor: "transparent",
    linkShadow: "none",
    linkHoverEffect: "scale",
    buttonStyle: "solid",
    nameSize: "28px",
    bioSize: "14px",
    linkSize: "16px",
  };

  const availableFonts = [
    "Inter, sans-serif",
    "Poppins, sans-serif",
    "EB Garamond, serif",
    "Teko, sans-serif",
    "Balsamiq Sans, cursive",
    "Kite One, sans-serif",
    "PT Sans, sans-serif",
    "Quicksand, sans-serif",
    "DM Sans, sans-serif",
  ];

  const bgPresets = ["#7C5DFF", "#FF3CA6", "#00A37B", "#FF2C41", "#000000"];
  const buttonPresets = [
    "#000000",
    "#000000",
    "#000000",
    "#ffffff",
    "#ffffff",
    "#ffffff",
  ];
console.log("bg img in theme (design tab):",customTheme.bgImage);

  useEffect(() => {
    const fetchBuiltinThemes = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/builtin`);
        setBuiltinThemes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBuiltinThemes();
  }, []);

  useEffect(() => {
    if (!user?._id) return;
    if (currentTheme?.name === "custom") setCustomTheme(currentTheme);
  }, [user, currentTheme]);

  const applyBuiltinTheme = async (themeName) => {
    if (!user?._id || !builtinThemes[themeName]) return;
    try {
      const res = await axios.post(
        `${apiBase}/api/user/theme/builtin/${user._id}`,
        {
          userId: user._id,
          themeName,
        }
      );
      if (res.data?.theme) setTheme(res.data.theme);
    } catch (err) {
      console.error(err);
    }
  };

  const updateCustomTheme = async (key, value) => {
    if (!user?._id) return;
    const newTheme = { ...customTheme, [key]: value };
    setCustomTheme(newTheme);
    setTheme(newTheme);
    try {
      await axios.post(`${apiBase}/api/user/theme/custom/${user._id}`, {
        ...newTheme,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Handle background image upload
  const handleBgImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("themebg", file);

      // Add other theme properties
      Object.keys(customTheme).forEach((key) => {
        if (key !== "bgImage") {
          formData.append(key, customTheme[key]);
        }
      });

      const response = await axios.post(
        `${apiBase}/api/user/theme/custom/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.theme) {
        const updatedTheme = { ...response.data.theme, bgType: "image" };
        setCustomTheme(updatedTheme);
        setTheme(updatedTheme);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  // Handle background video upload
  const handleBgVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file");
      return;
    }

    // Validate file size (20MB for video)
    if (file.size > 20 * 1024 * 1024) {
      alert("Video size should be less than 20MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("themebg", file);

      // Add other theme properties
      Object.keys(customTheme).forEach((key) => {
        if (key !== "bgVideo") {
          formData.append(key, customTheme[key]);
        }
      });

      const response = await axios.post(
        `${apiBase}/api/user/theme/custom/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.theme) {
        const updatedTheme = { ...response.data.theme, bgType: "video" };
        setCustomTheme(updatedTheme);
        setTheme(updatedTheme);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  // Remove background image/video
  const removeBgMedia = async () => {
    if (!user?._id) return;

    try {
      // Get the current background image/video path
      const bgImage = customTheme.bgImage;
      const bgVideo = customTheme.bgVideo;

      // Call backend to delete the file and update database
      const response = await axios.delete(
        `${apiBase}/api/user/theme/background/${user._id}`,
        {
          data: {
            bgImage: bgImage,
            bgVideo: bgVideo,
          },
        }
      );

      if (response.data.success) {
        // Update local state
        const updatedTheme = {
          ...customTheme,
          bgImage: "",
          bgVideo: "",
          bgType: "color",
        };

        setCustomTheme(updatedTheme);
        setTheme(updatedTheme);
      }
    } catch (err) {
      console.error("Failed to remove background media:", err);
      alert("Failed to remove background. Please try again.");
    }
  };

  const renderColorPickerIcon = (label, key, value, presets = [], ref) => (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-center gap-5">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => updateCustomTheme(key, e.target.value)}
          ref={ref}
          className="absolute w-10 h-10 opacity-0 cursor-pointer"
        />
        <button
          type="button"
          onClick={() => ref.current.click()}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition relative z-10"
        >
          <FaPalette className="text-gray-700 text-lg" />
        </button>
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => updateCustomTheme(key, preset)}
            style={{ backgroundColor: preset }}
            className="w-10 h-10 rounded-full border hidden border-gray-300"
          />
        ))}
      </div>
      <p className="text-xs text-left ">{label}</p>
    </div>
  );

  return (
    <div className="flex max-w-md mx-auto flex-col gap-6 pt-4">
      {/* Hidden file inputs */}
      <input
        ref={bgImageInputRef}
        type="file"
        accept="image/*"
        onChange={handleBgImageUpload}
        className="hidden"
      />
      <input
        ref={bgVideoInputRef}
        type="file"
        accept="video/*"
        onChange={handleBgVideoUpload}
        className="hidden"
      />

      {/* Builtin Themes */}
      <div className="grid grid-cols-2 bg-white p-8 gap-6 flex-wrap">
        {Object.keys(builtinThemes).map((themeName) => (
          <button
            key={themeName}
            onClick={() => applyBuiltinTheme(themeName)}
            className={`px-3 py-12 rounded-md font-semibold transition-transform hover:scale-105 ${
              currentTheme?.name === themeName
                ? "border-2 border-gray-800 bg-gray-300"
                : "border border-gray-300 bg-gray-100"
            }`}
          >
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </button>
        ))}
        <button
          onClick={() =>
            setCustomTheme(
              currentTheme?.name === "custom" ? customTheme : defaultCustomTheme
            ) ||
            setTheme(
              currentTheme?.name === "custom" ? customTheme : defaultCustomTheme
            )
          }
          className={`px-3 py-1 rounded-md font-semibold transition-transform hover:scale-105 ${
            currentTheme?.name === "custom"
              ? "border-2 border-gray-800 bg-gray-300"
              : "bg-gray-100"
          }`}
        >
          Custom
        </button>
      </div>

      {/* Custom Theme Panel */}
      {currentTheme?.name === "custom" && customTheme && (
        <div className="flex flex-col gap-4 p-6 rounded bg-white">
          {/* Background Section */}
          <div className="flex flex-col gap-6">
            <span className="font-semibold text-left text-sm">Background</span>
            <div className="flex justify-around gap-2">
              <button
                onClick={() => updateCustomTheme("bgType", "color")}
                disabled={uploading}
                className={`w-16 h-16 border rounded ${
                  customTheme.bgType === "color"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                } flex items-center justify-center hover:bg-gray-50 transition ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                🎨
              </button>
              <button
                onClick={() => bgImageInputRef.current?.click()}
                disabled={uploading}
                className={`w-16 h-16 border rounded ${
                  customTheme.bgType === "image"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                } flex items-center justify-center hover:bg-gray-50 transition relative ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {uploading && customTheme.bgType === "image" ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                ) : (
                  "🖼️"
                )}
              </button>
              <button
                onClick={() => bgVideoInputRef.current?.click()}
                disabled={uploading}
                className={`w-16 h-16 border rounded ${
                  customTheme.bgType === "video"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                } flex items-center justify-center hover:bg-gray-50 transition relative ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {uploading && customTheme.bgType === "video" ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                ) : (
                  "🎥"
                )}
              </button>
            </div>

            {/* Show uploaded media preview */}
            {(customTheme.bgImage || customTheme.bgVideo) && (
              <div className="relative inline-block">
                {customTheme.bgImage && (
                  <div className="w-full h-32 rounded border overflow-hidden">
                    <img
                      src={`${apiBase}${customTheme.bgImage}`}
                      alt="Background preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {customTheme.bgVideo && (
                  <div className="w-full h-32 rounded border overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="text-sm text-gray-600">
                      🎥 Video uploaded
                    </span>
                  </div>
                )}
                <button
                  onClick={removeBgMedia}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-md transition-colors"
                  type="button"
                  title="Remove media"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex gap-4">
              {/* Background Color Picker */}
              {renderColorPickerIcon(
                "Background Color",
                "bgColor",
                customTheme.bgColor,
                bgPresets,
                bgColorRef
              )}
              {renderColorPickerIcon(
                "Name Color",
                "nameColor",
                customTheme.nameColor,
                bgPresets,
                nameColorRef
              )}
              {renderColorPickerIcon(
                "Bio Color",
                "bioColor",
                customTheme.bioColor,
                bgPresets,
                bioColorRef
              )}
              {renderColorPickerIcon(
                "Header Color",
                "headerColor",
                customTheme.headerColor,
                bgPresets,
                headerColorRef
              )}
            </div>
          </div>

          {/* Button Section */}
          <div className="flex flex-col gap-6">
            <span className="font-semibold text-left mt-5">Button</span>

            {/* Button Style Selection - NEW */}
            {/* <div className="space-y-3">
              <p className="text-xs text-left">Button Style</p>
              <div className="flex gap-3">
                {["solid", "outline", "ghost"].map((style) => (
                  <button
                    key={style}
                    onClick={() => updateCustomTheme("buttonStyle", style)}
                    className={`px-4 py-2 text-sm rounded border transition ${
                      customTheme.buttonStyle === style
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Button Radius */}
            <div className="flex justify-around gap-4 mt-4">
              {["9999px", "8px", "0px"].map((radius) => (
                <button
                  key={radius}
                  onClick={() => updateCustomTheme("linkRadius", radius)}
                  style={{
                    backgroundColor: customTheme.linkBg,
                    borderRadius: radius,
                    color: "#fff",
                    border:
                      customTheme.linkRadius === radius
                        ? "2px solid #00aaff"
                        : "1px solid #00000025",
                  }}
                  className="w-24 h-12 focus:outline-none transition"
                />
              ))}
            </div>
            <div className="flex gap-3.5">
              {/* Button Color Picker */}
              {renderColorPickerIcon(
                "Button Color",
                "linkBg",
                customTheme.linkBg,
                buttonPresets,
                linkColorRef
              )}

              {/* Button Text Color - NEW */}
              {renderColorPickerIcon(
                "Button Text Color",
                "linkColor",
                customTheme.linkColor || "#000000",
                ["#000000", "#ffffff", "#0066cc"],
                textColorRef
              )}

              {/* Button Border Color - NEW */}
              {renderColorPickerIcon(
                "Button Border Color",
                "linkBorderColor",
                customTheme.linkBorderColor || "transparent",
                ["transparent", "#000000", "#0066cc"],
                borderColorRef
              )}

              {/* Button Hover Effect - NEW */}
              {/* <div className="space-y-3">
              <p className="text-xs text-left">Hover Effect</p>
              <div className="flex gap-3 flex-wrap">
                {["scale", "lift", "glow", "none"].map((effect) => (
                  <button
                    key={effect}
                    onClick={() => updateCustomTheme("linkHoverEffect", effect)}
                    className={`px-4 py-2 text-sm rounded border transition ${
                      customTheme.linkHoverEffect === effect
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {effect.charAt(0).toUpperCase() + effect.slice(1)}
                  </button>
                ))}
              </div>
            </div> */}

              {/* Button Shadow - NEW */}
              {/* <div className="space-y-3">
              <p className="text-xs text-left">Button Shadow</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { label: "None", value: "none" },
                  { label: "Small", value: "0 2px 4px rgba(0,0,0,0.1)" },
                  { label: "Medium", value: "0 4px 8px rgba(0,0,0,0.15)" },
                  { label: "Large", value: "0 8px 16px rgba(0,0,0,0.2)" },
                ].map((shadow) => (
                  <button
                    key={shadow.value}
                    onClick={() => updateCustomTheme("linkShadow", shadow.value)}
                    className={`px-4 py-2 text-sm rounded border transition ${
                      customTheme.linkShadow === shadow.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {shadow.label}
                  </button>
                ))}
              </div>
            </div> */}
            </div>
          </div>

          {/* Typography Section - NEW */}
          {/* <div className="flex flex-col gap-3">
            <span className="font-semibold text-left mt-5">Typography</span>

            {renderColorPickerIcon(
              "Header Color",
              "headerColor",
              customTheme.headerColor || "#000000",
              ["#000000", "#ffffff", "#0066cc"],
              headerColorRef
            )}

            {renderColorPickerIcon(
              "Bio Color",
              "bioColor",
              customTheme.bioColor || "rgba(0,0,0,0.40)",
              ["rgba(0,0,0,0.40)", "rgba(255,255,255,0.70)", "rgba(0,102,204,0.60)"],
              bioColorRef
            )}

            <div className="space-y-3">
              <p className="text-xs text-left">Name Size</p>
              <input
                type="range"
                min="20"
                max="48"
                value={parseInt(customTheme.nameSize) || 28}
                onChange={(e) => updateCustomTheme("nameSize", `${e.target.value}px`)}
                className="w-full"
              />
              <span className="text-xs text-gray-500">
                {customTheme.nameSize || "28px"}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-left">Bio Size</p>
              <input
                type="range"
                min="12"
                max="20"
                value={parseInt(customTheme.bioSize) || 14}
                onChange={(e) => updateCustomTheme("bioSize", `${e.target.value}px`)}
                className="w-full"
              />
              <span className="text-xs text-gray-500">
                {customTheme.bioSize || "14px"}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-left">Link Size</p>
              <input
                type="range"
                min="12"
                max="24"
                value={parseInt(customTheme.linkSize) || 16}
                onChange={(e) => updateCustomTheme("linkSize", `${e.target.value}px`)}
                className="w-full"
              />
              <span className="text-xs text-gray-500">
                {customTheme.linkSize || "16px"}
              </span>
            </div>
          </div> */}

          {/* Icon Section - NEW */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-left mt-5">Icons</span>
            <div className="flex  gap-2.5">
              {/* Icon Color - NEW */}
              {renderColorPickerIcon(
                "Icon Color",
                "iconColor",
                customTheme.iconColor || "#000000",
                ["#000000", "#ffffff", "#0066cc"],
                iconColorRef
              )}

              {/* Icon Background - NEW */}
              {renderColorPickerIcon(
                "Icon Background",
                "iconBg",
                customTheme.iconBg || "#ffffff32",
                ["#ffffff32", "#00000032", "rgba(0,102,204,0.20)"],
                iconBgRef
              )}
            </div>
          </div>

          {/* Font Section */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-left my-4">Font</span>
            <div className="grid grid-cols-3 gap-3 p-2.5">
              {availableFonts.map((font) => (
                <button
                  key={font}
                  onClick={() => updateCustomTheme("fontStyle", font)}
                  style={{ fontFamily: font }}
                  className={`border rounded px-2 py-1 text-sm ${
                    customTheme.fontStyle === font
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {font.split(",")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Themes;
