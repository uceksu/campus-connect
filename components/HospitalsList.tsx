"use client";

import { useState } from "react";
import Link from "next/link";

type Hospital = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

type HospitalsListProps = {
  hospitals: Hospital[];
};

export default function HospitalsList({ hospitals }: HospitalsListProps) {
  const [query, setQuery] = useState("");

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-5xl font-bold text-center mb-6">Hospitals Near Campus</h1>

      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border px-4 py-3 rounded-xl shadow-sm"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="rounded-3xl border bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{hospital.name}</h2>
            <p className="text-gray-600 mb-3">{hospital.address}</p>
            <p className="text-gray-600">{hospital.phone}</p>
            <Link
              href={`/campus/hospitals/${hospital.id}`}
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
