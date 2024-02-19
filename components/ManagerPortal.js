import React from 'react'
import { supabase } from "@/database/supabase";

const ManagerPortal = () => {
  return (
      <div>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </div>
  )
}

export default ManagerPortal