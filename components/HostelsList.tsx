"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import type { Hostel } from "@/src/generated/prisma/client";

type HostelsListProps = { hostels: Hostel[] };

export default function HostelsList({ hostels }: HostelsListProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"Boys" | "Girls">("Boys");

  const filteredHostels = hostels.filter((hostel) =>
    hostel.name.toLowerCase().includes(search.toLowerCase())
  );

  const boysHostels = filteredHostels.filter((h) => h.type === "Boys" || !h.type);
  const girlsHostels = filteredHostels.filter((h) => h.type === "Girls");

  const displayedHostels = activeTab === "Boys" ? boysHostels : girlsHostels;

  return (
    <main className="min-h-screen bg-[#456be5] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[18px_18px]">
      {/* Hero Header */}
      <section className="rounded-b-[2.5rem] bg-white px-6 pb-12 pt-16 sm:px-10 lg:px-16 lg:pt-24 shadow-md">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#456be5]">
            Stay near campus
          </p>
          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#071333] sm:text-7xl">
            Find your
            <span className="mt-3 block normal-case tracking-[-0.04em] text-[#456be5]">
              next stay.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Browse student-friendly hostels near KSU UCE with contacts, prices, and directions.
          </p>
          <input
            type="search"
            placeholder="Search hostels..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="mt-8 w-full max-w-xl rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none transition focus:border-[#456be5] focus:ring-4 focus:ring-[#456be5]/15"
          />
        </div>
      </section>

      {/* Tabs & Listings Container */}
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16 lg:py-14 space-y-8">
        {/* Toggle Tabs */}
        <div className="rounded-2xl bg-white/10 p-1.5 flex gap-2 border border-white/10 max-w-md backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveTab("Boys")}
            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 touch-manipulation cursor-pointer ${
              activeTab === "Boys"
                ? "bg-white text-[#456be5] shadow-lg md:scale-[1.02]"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            Boys' Hostels ({boysHostels.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Girls")}
            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 touch-manipulation cursor-pointer ${
              activeTab === "Girls"
                ? "bg-white text-[#456be5] shadow-lg md:scale-[1.02]"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            Girls' Hostels ({girlsHostels.length})
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedHostels.map((hostel) => (
            <article
              key={hostel.id}
              className="overflow-hidden rounded-3xl border border-white/30 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"
            >
              <div className="relative h-52 w-full shrink-0">
                <Image
                  src={hostel.image}
                  alt={hostel.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.04em] text-[#071333]">
                    {hostel.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={18} className="text-[#456be5]" />
                    {hostel.distance}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-yellow-500">
                    <Star size={18} fill="currentColor" />
                    {hostel.rating}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={18} className="text-[#456be5]" />
                    {hostel.phone}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex gap-3">
                    <a
                      href={`tel:${hostel.phone}`}
                      className="flex-1 rounded-xl bg-[#071333] py-3 text-center text-sm font-bold text-white hover:bg-[#17244a] transition-colors"
                    >
                      Call
                    </a>
                    <a
                      href={hostel.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-[#456be5] py-3 text-center text-sm font-bold text-white hover:bg-[#3659c8] transition-colors"
                    >
                      Maps
                    </a>
                  </div>
                  <Link
                    href={`/campus/hostels/${hostel.id}`}
                    className="block w-full rounded-xl border border-[#456be5] py-3 text-center text-sm font-bold text-[#456be5] hover:bg-[#e8eeff] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {displayedHostels.length === 0 && (
            <div className="col-span-full rounded-3xl bg-white p-12 text-center border border-[#dce5ff]">
              <p className="text-slate-600 font-medium">
                No {activeTab === "Boys" ? "Boys'" : "Girls'"} hostels found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
