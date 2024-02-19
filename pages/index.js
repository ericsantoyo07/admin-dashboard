import GuestPortal from "@/components/GuestPortal";
import ManagerPortal from "@/components/ManagerPortal";
import OwnerPortal from "@/components/OwnerPortal";
import { Page } from "@/components/Page";
import { useAuth } from "@/hooks/useAuth";


export default function Dashboard() {

  const { role } = useAuth();

  return (
    <Page>
      {role === 'owner' && <OwnerPortal />}
      {role === 'manager' && <ManagerPortal />}
      {role === 'guest' && <GuestPortal />}

    </Page>
  )
}
