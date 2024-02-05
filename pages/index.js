import OwnerPortal from "@/components/OwnerPortal";
import { Page } from "@/components/Page";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/database/supabase";

export default function Dashboard() {

  const { role } = useAuth();

  return (
    <Page>
      {role === 'owner' && <OwnerPortal />}
      {role === 'manager' && <h1>Manager Portal</h1>}
      {role === 'guest' && <h1>Not permitted</h1>}

      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>

    </Page>
  )
}
