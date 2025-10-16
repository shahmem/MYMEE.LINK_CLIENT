import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FiEye } from "react-icons/fi";
import axios from "axios";

function LinkPanel({ links, setLinks, user }) {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", url: "", icon: null });

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setItems(links);
  }, [links]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    try {
      const res = await axios.put(`${apiBase}/api/links/reorder/${user._id}`, {
        links: reordered.map((item, index) => ({ id: item._id, order: index })),
      });
      setItems(res.data.links);
      setLinks(res.data.links);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (link) => {
    setEditingId(link._id);
    setEditData({ title: link.title, url: link.url, icon: null });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setEditData((prev) => ({ ...prev, icon: files[0] }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("url", editData.url);
    formData.append("linkId", id);
    if (editData.icon) formData.append("icon", editData.icon);

    try {
      const res = await axios.put(`${apiBase}/api/links/edit/${user._id}`, formData);
      setItems((prev) => prev.map((l) => (l._id === id ? res.data.link : l)));
      setLinks((prev) => prev.map((l) => (l._id === id ? res.data.link : l)));

      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBase}/api/links/${user._id}`, {
        data: { linkId: id },
      });
      setItems((prev) => prev.filter((l) => l._id !== id));
      setLinks((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setEditingId(null);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            <h2 className="text-left py-4 font-bold text-lg text-gray-600">LINKS</h2>
            {items.map((link, index) => (
              <Draggable
                key={link._id}
                draggableId={link._id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-white shadow p-3 rounded-sm"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleEditClick(link)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          className="p-0.5 h-14 w-14 object-contain object-center rounded-full"
                          src={`${apiBase}/uploads/${link.icon}`}
                          alt="icon"
                        />
                        <div className="text-left px-3">
                          <h4 className="font-semibold text-sm capitalize">
                            {link.title}
                          </h4>
                          <p className="text-xs text-gray-600 truncate block">
                            {link.url}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {" "}
                        <div className="flex items-center gap-1 text-gray-600">
                          {" "}
                          <FiEye /> 0{" "}
                        </div>{" "}
                        <span
                          {...provided.dragHandleProps}
                          className="cursor-grab text-gray-500"
                        >
                          {" "}
                          <svg
                            width="14"
                            height="19"
                            viewBox="0 0 14 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <circle
                              cx="2.5"
                              cy="2.5"
                              r="2.5"
                              fill="#CFCED3"
                            ></circle>{" "}
                            <circle
                              cx="2.5"
                              cy="9.5"
                              r="2.5"
                              fill="#CFCED3"
                            ></circle>{" "}
                            <circle
                              cx="2.5"
                              cy="16.5"
                              r="2.5"
                              fill="#CFCED3"
                            ></circle>{" "}
                            <circle
                              cx="10.6328"
                              cy="2.5"
                              r="2.5"
                              fill="#CFCED3"
                            ></circle>{" "}
                            <circle
                              cx="10.6328"
                              cy="9.5"
                              r="2.5"
                              fill="#CFCED3"
                            ></circle>{" "}
                            <circle
                              cx="10.6328"
                              cy="16.5"
                              r="2.5"
                              fill="#CFCED3"
                            ></circle>{" "}
                          </svg>{" "}
                        </span>{" "}
                      </div>
                    </div>

                    {editingId === link._id && (
                      <div
                        onClick={handleOverlayClick}
                        className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[#11111148] z-40"
                      >
                        <div className=" bg-white space-y-2 w-96">
                          <div className="p-5 mt-3 flex gap-2.5">
                            <div className="flex w-xs flex-col gap-2.5">
                              <input
                                type="text"
                                name="title"
                                value={editData.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                                className="w-full px-3 py-2 outline-none focus:bg-gray-200 rounded bg-gray-100 text-sm"
                              />
                              <input
                                type="url"
                                name="url"
                                value={editData.url}
                                onChange={handleInputChange}
                                placeholder="URL"
                                className="w-full px-3 py-2 outline-none bg-gray-100 focus:bg-gray-200 rounded text-sm"
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <label className="w-20 rounded-md overflow-hidden border border-gray-300 flex-shrink-0 cursor-pointer">
                                <img
                                  src={
                                    editData.icon
                                      ? URL.createObjectURL(editData.icon)
                                      : `${apiBase}/uploads/${link.icon}`
                                  }
                                  alt="icon"
                                  className="w-full h-full object-cover"
                                />
                                <input
                                  type="file"
                                  name="icon"
                                  accept="image/*"
                                  onChange={handleInputChange}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                          <div className="flex p-2">
                            <button
                              onClick={() => handleDelete(link._id)}
                              className="px-4 py-3 text-red-600 font-semibold text-sm bg-gray-50 hover:bg-gray-100 "
                            >
                              Delete
                            </button>
                          </div>
                          <button
                            onClick={() => handleSave(link._id)}
                            className="w-full text-center py-3 text-sm font-medium 
                         bg-gradient-to-r from-green-500 to-teal-600 
                         hover:from-green-600 hover:to-teal-700
                         transition-all duration-300 text-white"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default LinkPanel;
