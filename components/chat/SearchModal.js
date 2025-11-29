"use client";

import { useState } from "react";

export default function SearchModal({ messages, onClose, onJump }) {
  const [keyword, setKeyword] = useState("");

  const results = messages
    .map((m, idx) => ({ m, idx }))
    .filter((x) =>
      x.m.content?.toLowerCase().includes(keyword.toLowerCase())
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[9998] flex items-center justify-center">
      <div className="bg-white rounded-xl p-5 w-[80%] max-h-[70%] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Search Chat</div>
          <button onClick={onClose}>✖</button>
        </div>

        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Search messages"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {results.length === 0 && (
          <div className="text-gray-400 text-center py-4">
            No results
          </div>
        )}

        {results.map((x) => (
          <div
            key={x.idx}
            className="p-3 border-b cursor-pointer"
            onClick={() => onJump(x.idx)}
          >
            {x.m.content}
          </div>
        ))}
      </div>
    </div>
  );
}
