"use client";

import { useState } from "react";

export default function LinkForm() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function createLink(e: any) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ url, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error);
      setLoading(false);
      return;
    }

    setMsg("Link created!");
    window.location.reload();
  }

  return (
    <form onSubmit={createLink} className="space-y-3">
      <input
        className="w-full p-2 border rounded"
        placeholder="Long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Short code (6-8 chars)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      {msg && <p className="text-red-500">{msg}</p>}

      <button
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
