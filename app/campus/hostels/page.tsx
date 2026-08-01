import { getHostels } from "@/lib/actions/hostel";
import HostelsList from "@/components/HostelsList";

export default async function HostelsPage() {
  const hostels = await getHostels();

  return <HostelsList hostels={hostels} />;
}
