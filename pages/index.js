import { Page } from "@/components/Page";
import { supabase } from "@/database/supabase";

export default function Dashboard() {
  return (
    <Page>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </Page>
  )
}
