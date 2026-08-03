"use client";

import { Download } from "lucide-react";

type Props = {
  data: any[];
  filename: string;
};

export default function ExportCSVButton({ data, filename }: Props) {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    // Extract headers from the first object
    const headers = Object.keys(data[0]);
    
    // Convert data to CSV format
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            let value = row[fieldName];
            // Format dates or objects if any
            if (value instanceof Date) value = value.toISOString();
            if (value === null || value === undefined) value = "";
            // Escape quotes and wrap in quotes for CSV safety
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={!data || data.length === 0}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download size={16} />
      Export CSV
    </button>
  );
}
