import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";

function SocialLinks({ apiBase, socialitems, setSocialLinks, socialLinks, user }) {
  const [editing, setEditing] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getIcon = (title) => {
    const platform = socialitems.find((s) => s.key === title);
    return platform ? platform.icon : null;
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(socialLinks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSocialLinks(items);

    try {
      await axios.put(`${apiBase}/api/sociallinks/reorder/${user._id}`, {
        links: items.map((link, idx) => ({
          _id: link._id,
          order: idx,
        })),
      });
    } catch (err) {
      console.error(err);
    }
  };

const handleSave = async () => {
  if (!editing) return;

  try {
    const updatedUrl =
      editing.url.split("/").slice(0, -1).join("/") + "/" + inputValue.replace(/\s+/g, "");

    const res = await axios.put(`${apiBase}/api/sociallinks/${user._id}`, {
      id: editing._id,   
      url: updatedUrl,   
    });

    // Instant state update
    setSocialLinks((prev) =>
      prev.map((l) =>
        l._id === editing._id ? { ...l, url: res.data.link.url } : l
      )
    );

    setEditing(null);
    setInputValue("");
  } catch (err) {
    console.error(err);
  }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBase}/api/sociallinks/${user._id}`, {
        data: { linkId: id },
      });

      setSocialLinks((prev) => prev.filter((l) => l._id !== id));

      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="socials">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {socialLinks.map((link, index) => (
                <Draggable key={link._id} draggableId={link._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-between items-center p-4 shadow bg-white rounded cursor-pointer"
                      onClick={() => {
                        setEditing(link);
                        setInputValue(link.url.split("/").pop()); 
                      }}
                    >
                      <div className="flex items-center gap-5">
                        <span>{getIcon(link.title)}</span>
                        <span className="capitalize">{link.title}</span>
                      </div>
                      <span
                        {...provided.dragHandleProps}
                        className="cursor-grab text-gray-500"
                      >
                        ⋮⋮
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {/* Edit modal */}
      {editing && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setEditing(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 w-80 space-y-4"
          >
            <h2 className="font-semibold text-center">Edit {editing.title}</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => handleDelete(editing._id)}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialLinks;
