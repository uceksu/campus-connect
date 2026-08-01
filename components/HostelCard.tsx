import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Hostel = {
  id: string;
  name: string;
  image: string;
  distance: string;
  rating: string;
  phone: string;
};

export default function HostelCard({ hostel }: { hostel: Hostel }) {
  return (
    <Card className="overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <Image
        src={hostel.image}
        alt={hostel.name}
        width={500}
        height={300}
        className="w-full h-52 object-cover"
      />

      <CardContent className="p-6">
        <h2 className="text-2xl font-bold">{hostel.name}</h2>

        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <MapPin size={18} />
          {hostel.distance}
        </div>

        <div className="flex items-center gap-2 mt-2 text-yellow-500">
          <Star size={18} fill="currentColor" />
          {hostel.rating}
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <Phone size={18} />
          {hostel.phone}
        </div>

        <Link
          href={`/campus/hostels/${hostel.id}`}
          className="block mt-5 bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}