import React, { useState } from "react";
import { Instagram, Facebook, Music } from "lucide-react";
import { useEffect } from "react";

export default function IconPosition({ position, setPosition }) {

  return (
    <div className=" max-w-md mx-auto pt-5 ">
      <div className="bg-white rounded p-8">
        <h2 className="text-lg text-left font-semibold mb-6">
          Position to display socials
        </h2>

        <div  className="flex justify-around">
          {/* Top Position Option */}
          <div onClick={() => setPosition("top")} className="flex flex-col items-center gap-3">
            <div className={`border-2 ${
                position === "top"
                  ? "border-blue-500 bg-gray-200"
                  : "border-gray-300 bg-gray-100"
              } rounded-lg p-6 md:w-40 w-32 bg-gray-200`}>
              <div className="flex justify-center items-center gap-3 mb-4">
                <Instagram className="w-4 h-4 text-gray-700" />
                <Facebook className="w-4 h-4 text-gray-700" />
                <Music className="w-4 h-4 text-gray-700" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-white rounded w-3/4"></div>
                <div className="h-3 bg-white rounded w-3/4"></div>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-medium">Top</span>
            </label>
          </div>

          {/* Bottom Position Option */}
          <div onClick={() => setPosition("bottom")} className="flex flex-col items-center gap-3">
            <div className={`border-2 ${
                position === "bottom"
                  ? "border-blue-500 bg-gray-200"
                  : "border-gray-300 bg-gray-100"
              } rounded-lg p-6 md:w-40 w-32 bg-gray-200`}>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-white rounded"></div>
                <div className="h-3 bg-white rounded w-3/4"></div>
              </div>
              <div className="flex justify-center gap-3">
                <Instagram className="w-4 h-4 text-gray-700" />
                <Facebook className="w-4 h-4 text-gray-700" />
                <Music className="w-4 h-4 text-gray-700" />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-medium">Bottom</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
