import GuestPortal from "@/components/GuestPortal";
import ManagerPortal from "@/components/ManagerPortal";
import OwnerPortal from "@/components/OwnerPortal";
import { Page } from "@/components/Page";
import { useAuth } from "@/hooks/useAuth";
import { CircleDashed } from "lucide-react";

export default function Dashboard() {

  const { role, session } = useAuth();

  if (!session || !role) return <Page>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <CircleDashed size={100} />
    </div>
  </Page>

  return (
    <Page>
      {role === 'owner' && <OwnerPortal />}
      {role === 'manager' && <ManagerPortal />}
      {role === 'guest' && <GuestPortal />}

    </Page>
  )
}
