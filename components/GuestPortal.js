import React from 'react'
import { supabase } from "@/database/supabase";

const GuestPortal = () => {
  return (
      <div>GuestPortal
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  )
}

export default GuestPortal