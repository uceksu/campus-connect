import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type Hospital = {
  id: string;
  name: string;
  image: string;
  phone: string;
  address: string;
  emergencyContact?: string;
};

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <Card className="overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <Image
        src={hospital.image}
        alt={hospital.name}
        width={500}
        height={300}
        className="w-full h-52 object-cover"
      />

      <CardContent className="p-6">
        <h2 className="text-2xl font-bold">{hospital.name}</h2>
        <p className="mt-3 text-gray-600">{hospital.address}</p>
        <p className="mt-2 text-gray-600">Phone: {hospital.phone}</p>

        <Link
          href={`/campus/hospitals/${hospital.id}`}
          className="block mt-5 bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
