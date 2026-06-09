"use client";
import { useState } from "react";
export function UploadField({ name = "media_url" }: { name?: string }) {
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMsg("Uploading...");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) setMsg(json.error || "Upload failed");
    else {
      setUrl(json.url);
      setMsg("Upload complete");
    }
  }
  return (
    <div className="grid gap-2">
      <input type="hidden" name={name} value={url} />
      <input
        className="block w-full text-sm text-white/70 file:mr-3 file:rounded-xl file:border-0 file:bg-gold file:px-3 file:py-2 file:font-bold file:text-black"
        type="file"
        accept="image/*,video/*"
        onChange={upload}
      />
      {url && (
        <input
          className="rounded-2xl px-4 py-3 text-slate-950"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name={name}
        />
      )}
      <p className="text-xs text-white/50">
        {msg || "Upload image/video to Supabase Storage or paste URL below."}
      </p>
    </div>
  );
}
