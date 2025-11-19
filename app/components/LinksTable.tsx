"use client";

import { useState } from "react";

export default function LinksTable({ links }: any) {
  const [data, setData] = useState(links);

  async function del(code: string) {
    const ok = confirm(`Delete link with code "${code}"?`);
    if (!ok) return;

    const res = await fetch(`/api/links/${code}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete link");
      return;
    }

    // Remove deleted item from state (no reload)
    setData((prev: any[]) => prev.filter((l) => l.code !== code));
  }

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Code</th>
          <th className="p-2">URL</th>
          <th className="p-2">Clicks</th>
          <th className="p-2">Last Clicked</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((l: any) => (
          <tr key={l.code} className="border-t">
            <td className="p-2">
              <a href={`/${l.code}`} className="text-blue-600 underline">
                {l.code}
              </a>
            </td>
            <td className="p-2 truncate max-w-xs">{l.url}</td>
            <td className="p-2">{l.totalClicks}</td>
            <td className="p-2">
              {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "—"}
            </td>
            <td className="p-2">
              <button
                onClick={() => del(l.code)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
