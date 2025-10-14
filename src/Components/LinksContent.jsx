import React, { useState } from "react";
import axios from "axios";
import LinkPanel from "./LinkPanel";
import Socials from "./Socials";
import { FiMoreVertical } from "react-icons/fi";

function LinksContent({
  links,
  setLinks,
  refreshSocialLinks,
  user,
  setUser,
  setSocialLinks,
  socialLinks,
}) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [showForm, setShowForm] = useState(false);
  const [showHeaderForm, setShowHeaderForm] = useState(false);
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState(null);
  const [editingHeader, setEditingHeader] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowForm(false);
      setShowHeaderForm(false);
    }
  };

  const handleDeleteHeader = async () => {
    try {
      await axios.delete(`${apiBase}/api/user/${user._id}/header/delete`);
      setUser((prev) => ({ ...prev, header: "" }));
      setEditingHeader(false);
    } catch (err) {
      console.error("Failed to delete header:", err);
    }
  };
  const handleSave = async () => {
    try {
      const res = await axios.put(`${apiBase}/api/user/${user._id}/header`, {
        header,
      });

      setUser((prev) => ({ ...prev, header }));

      setShowHeaderForm(false);
    } catch (err) {
      console.error("Error saving header:", err);
    }
  };
  const handleFileChange = (e) => {
    setIcon(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", url);
    if (icon) formData.append("icon", icon);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/links/${user._id}`,
        formData
      );
      setShowForm(false);
      setLinks(data);
      console.log("Saved:", data);
      setTitle("");
      setUrl("");
      setIcon(null);
    } catch (err) {
      console.error(err.message);
      console.log("errorrrr");
    }
  };

  return (
    <div className="space-y-4 mt-8 relative">
      {showForm && (
        <div
          className="fixed inset-0 bg-[#0000002d] bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <form
            className="w-full max-w-md p-6 rounded-lg shadow-md bg-white space-y-3 relative"
            onSubmit={handleSubmit}
          >
            <div className=" flex justify-between mb-8">
              <p className="text-2xl font-bold">Add Link</p>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="mr-3 text-gray-500 hover:text-gray-700 text-xl font-extrabold"
              >
                ×
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 bg-gray-100 focus:bg-gray-200  py-2.5 rounded-md focus:outline-none  text-sm"
              required
            />
            <input
              type="text"
              placeholder="Enter URL"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 bg-gray-100 focus:bg-gray-200 py-2.5 rounded-md focus:outline-none  text-sm"
              required
            />

            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 py-4">
              <span className="text-gray-500">Upload Image (optional)</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button
              type="submit"
              className="w-full mt-5 py-2 text-white text-sm font-medium rounded-md 
                         bg-gradient-to-r from-green-500 to-teal-600 
                         hover:from-green-600 hover:to-teal-700
                         transition-all duration-300"
            >
              Save Link
            </button>
          </form>
        </div>
      )}
      {showHeaderForm && (
        <div
          className="fixed inset-0 bg-[#0000002d] bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="w-full max-w-md rounded-lg shadow-md bg-white relative">
            <div className="px-6 border-b border-gray-200 py-4 flex justify-between">
              <p className="text-xl font-bold">Add</p>
              <button
                onClick={() => setShowHeaderForm(false)}
                className="mr-3 text-gray-500 hover:text-gray-700 text-xl font-extrabold"
              >
                ×
              </button>
            </div>
            <div className="w-full p-6">
              <input
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
                placeholder="Enter Title"
                className="w-full px-3 bg-gray-100 focus:bg-gray-200  py-2.5 rounded-sm focus:outline-none  text-sm"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full py-3 mt-3 text-white text-sm font-medium
                         bg-gradient-to-r from-[#0084ff] to-[#00e1ff]"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="w-full py-2.5 max-w-md 
             text-white text-sm font-medium rounded-lg shadow 
             bg-gradient-to-r from-[#77006d] via-[#2a0077] to-[#0045ac]
             bg-[length:200%_200%] bg-left
             hover:bg-right
             transition-all duration-700 ease-in-out cursor-pointer"
      >
        + Add Link
      </button>
      <div className="px-0.5">
        <button
          onClick={() => setShowHeaderForm(true)}
          className="w-full py-1.5 max-w-md 
             text-gray-600 hover:text-gray-700 text-sm font-medium rounded-lg border border-gray-600 hover:border-gray-700 cursor-pointer shadow"
        >
          + Add Header
        </button>
      </div>
      {user?.header && (
        <div
          className="flex bg-white py-3 items-center w-full cursor-pointer"
          onClick={() => setEditingHeader(true)}
        >
          <h4 className=" flex-1 font-semibold capitalize">{user.header}</h4>
          <FiMoreVertical
            size={16}
            className="mr-4 cursor-pointer text-gray-600"
          />
        </div>
      )}

      {editingHeader && (
        <div
          onClick={(e) =>
            e.target === e.currentTarget && setEditingHeader(false)
          }
          className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[#11111148] z-30"
        >
          <div className="bg-white w-sm h-40 rounded flex flex-col justify-between items-center ">
            <div className="flex-1 flex items-center ">
              <p className="text-lg font-semibold">{user.header}</p>
            </div>
            <button
              onClick={handleDeleteHeader}
              className="flex- text-red-600 font-semibold bg-gray-50 py-3 hover:bg-gray-100 w-full"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <LinkPanel links={links} setLinks={setLinks} user={user} />
      <Socials
        user={user}
        apiBase={apiBase}
        socialLinks={socialLinks}
        refreshSocialLinks={refreshSocialLinks}
        setSocialLinks={setSocialLinks}
      />
    </div>
  );
}

export default LinksContent;
