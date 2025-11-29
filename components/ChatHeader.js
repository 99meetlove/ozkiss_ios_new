"use client";

export default function ChatHeader({ partner }) {
  if (!partner) return null;

  const formatLastSeen = (time) => {
    const diff = (Date.now() - new Date(time)) / 1000;

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

    return "yesterday";
  };

  return (
    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
      <div>
        <div className="font-semibold text-black">
          {partner.display_name || "User"}
        </div>
        <div className="text-sm text-gray-500">
          {partner.is_online ? (
            <span className="text-green-500">● Online</span>
          ) : (
            <>Last seen {formatLastSeen(partner.last_seen)}</>
          )}
        </div>
      </div>
    </div>
  );
}
