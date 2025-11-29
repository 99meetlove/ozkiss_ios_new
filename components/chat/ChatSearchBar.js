"use client";

export default function ChatSearchBar({ value, onChange, onCancel }) {
  return (
    <div className="chat-search-bar">
      <input
        className="chat-search-input"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value.length > 0 && (
        <button className="chat-search-cancel" onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>
  );
}
