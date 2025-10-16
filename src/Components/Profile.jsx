import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Profile = ({ user, setUser }) => {
  const apiBase = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState(null); // file object
  const [preview, setPreview] = useState(""); // image URL
// console.log(user);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setPreview(user.img || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!user?._id) return alert("User ID not found!");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (img instanceof File) formData.append("img", img);

      const res = await axios.put(
        `${apiBase}/api/profile/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser(res.data.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto pt-4 bg-white shadow rounded">
      <p className="text-lg text-left px-4 font-semibold mb-4">Profile</p>
      <div className="flex gap-2 p-4">
        <div className="flex flex-1 flex-col gap-3">
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:outline-none text-sm bg-gray-100 px-3 py-2 rounded"
          />
          <input
            type="text"
            value={bio}
            placeholder="bio"
            onChange={(e) => setBio(e.target.value)}
            className="w-full focus:outline-none text-sm bg-gray-100 px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            id="profileImageInput"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="profileImageInput" className="cursor-pointer">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            ) : (
              <img
                src={`${apiBase}/uploads/${user.profileImage}`}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            )}
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2.5 max-w-md 
             text-white text-sm font-medium   
             bg-gradient-to-r from-[#be00af] via-[#4500c5] to-[#0087d4]
             bg-[length:200%_200%] bg-left
             hover:bg-right
             transition-all duration-700 ease-in-out cursor-pointer"
      >
        Save
      </button>
    </div>
  );
};

export default Profile;
