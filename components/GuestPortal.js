import React from 'react'
import { supabase } from "@/database/supabase";
import { Page } from './Page';

const GuestPortal = () => {
  return (
    <Page>
      <h3>
        Welcome to the Guest Portal
      </h3>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </Page>
  )
}

export default GuestPortal