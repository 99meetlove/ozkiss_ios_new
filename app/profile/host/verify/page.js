"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function HostVerifyPage() {
  const [host, setHost] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [loading, setLoading] = useState(false);

  const host_id =
    typeof window !== "undefined"
      ? localStorage.getItem("host_id")
      : null;

  // Load host info
  const loadHost = async () => {
    if (!host_id) return;

    const res = await fetch("/api/host/get", {
      method: "POST",
      body: JSON.stringify({ host_id }),
    });

    const json = await res.json();
    setHost(json.host);

    setIdFront(json.host.id_front);
    setIdBack(json.host.id_back);
    setSelfie(json.host.selfie);
  };

  useEffect(() => {
    loadHost();
  }, []);

  // Upload function
  const upload = async (file, path) => {
    const filename = `${host_id}_${path}_${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("host_verification")
      .upload(filename, file);

    if (error) {
      alert("Upload failed");
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("host_verification")
      .getPublicUrl(filename);

    return publicUrl;
  };

  // Submit for admin review
  const submit = async () => {
    if (!idFront || !idBack || !selfie) {
      alert("Please upload all required documents");
      return;
    }

    setLoading(true);

    await fetch("/api/host/verify/submit", {
      method: "POST",
      body: JSON.stringify({
        host_id,
        id_front: idFront,
        id_back: idBack,
        selfie,
      }),
    });

    setLoading(false);
    alert("Submitted for review!");
    loadHost();
  };

  if (!host) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 pb-24">
      <div className="text-[26px] font-bold mb-6">
        Host Verification
      </div>

      {/* STATUS */}
      <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100 mb-6">
        <div className="text-[16px] font-medium">Status:</div>
        <div
          className={`text-[18px] font-semibold mt-1 ${
            host.verify_status === "verified"
              ? "text-green-600"
              : host.verify_status === "rejected"
              ? "text-red-600"
              : "text-orange-500"
          }`}
        >
          {host.verify_status === "verified" && "Verified"}
          {host.verify_status === "pending" && "Pending Review"}
          {host.verify_status === "rejected" && "Rejected"}
          {!host.verify_status && "Not Submitted"}
        </div>

        {host.verify_status === "rejected" && (
          <div className="text-[14px] text-red-600 mt-2">
            {host.rejection_reason || "Please re-submit."}
          </div>
        )}
      </div>

      {/* UPLOAD SECTIONS */}
      <div className="flex flex-col gap-6">

        {/* ID FRONT */}
        <UploadBlock
          label="ID Front"
          value={idFront}
          onChange={setIdFront}
          upload={(file) => upload(file, "front")}
        />

        {/* ID BACK */}
        <UploadBlock
          label="ID Back"
          value={idBack}
          onChange={setIdBack}
          upload={(file) => upload(file, "back")}
        />

        {/* SELFIE */}
        <UploadBlock
          label="Verification Selfie"
          value={selfie}
          onChange={setSelfie}
          upload={(file) => upload(file, "selfie")}
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full mt-10 py-4 bg-blue-600 text-white text-[17px] rounded-2xl active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit for Review"}
      </button>
    </div>
  );
}

// Sub component for upload blocks
function UploadBlock({ label, value, onChange, upload }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-[16px] font-medium mb-2">{label}</div>

      {value ? (
        <img
          src={value}
          className="w-full h-48 object-cover rounded-xl mb-3 border"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}

      <label className="px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer inline-block">
        Upload
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const url = await upload(e.target.files[0]);
            if (url) onChange(url);
          }}
        />
      </label>
    </div>
  );
}
