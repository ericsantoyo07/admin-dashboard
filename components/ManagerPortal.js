import React from 'react'
import { supabase } from "@/database/supabase";
import { LogOut } from 'lucide-react';
import styles from '@/styles/OwnerManagerPortal.module.css';
import Articles from './Articles';
import { useAuth } from '@/hooks/useAuth';

const ManagerPortal = () => {

  const { role, session } = useAuth();
  return (
    <div className={styles.owner_portal}>
      <div className={styles.nav_bar}>
        <div>
          <h1>Manager Portal</h1>
        </div>
        {/* <button >Sign Out</button> */}
        <div className={styles.user_info}>

          <p> {session?.user?.email}</p>
          <LogOut size={30} onClick={() => supabase.auth.signOut()} />
        </div>
      </div>
      <Articles />
    </div>
  )
}

export default ManagerPortal