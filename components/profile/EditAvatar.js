"use client";

import { supabase } from "@/utils/supabaseClient";

export default function EditAvatar({ avatar, onChange }) {
  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const filename = `avatar_${Date.now()}_${file.name}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filename, file);

    if (error) {
      alert("Upload failed");
      console.log(error);
      return;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filename);

    onChange(publicUrl);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {/* AVATAR */}
      <div className="relative">
        <img
          src={avatar || "/default-avatar.png"}
          className="w-32 h-32 rounded-full object-cover border shadow"
        />

        {/* SMALL EDIT BUTTON */}
        <label
          className="
            absolute bottom-1 right-1 bg-blue-600 text-white
            w-9 h-9 rounded-full flex items-center justify-center
            text-[18px] cursor-pointer shadow-lg
          "
        >
          ✏️
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={upload}
          />
        </label>
      </div>

      <div className="text-gray-500 text-[14px] mt-3">
        Tap to change your photo
      </div>
    </div>
  );
}
