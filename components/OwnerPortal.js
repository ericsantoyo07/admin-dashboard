
import { supabase } from "@/database/supabase";
import { useEffect, useState } from "react";
import Articles from "@/components/Articles";
import Invitations from "@/components/Invitations";
import styles from '@/styles/OwnerManagerPortal.module.css';
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";



const TAB_OPTIONS = {
    INVITAIONS: 'invitations',
    ARTICLES: 'articles',
}
export default function OwnerPortal() {

    const [selectedTab, setSelectedTab] = useState(TAB_OPTIONS.INVITAIONS);
    const { role, session } = useAuth();

    return (
        <div className={styles.owner_portal}>
            <div className={styles.nav_bar}>
                <div>
                    <h1>Owner Portal</h1>
                </div>
                {/* <button >Sign Out</button> */}
                <div className={styles.user_info}>

                    <p> {session?.user?.email}</p>
                    <LogOut size={30} onClick={() => supabase.auth.signOut()} />
                </div>
            </div>
            {/* add divs to change between tabs with style */}
            <div className={styles.tabs}>
                <button
                    style={{ backgroundColor: selectedTab === TAB_OPTIONS.INVITAIONS ? '#1E1F22' : '#2B2D31' }}
                    onClick={() => setSelectedTab(TAB_OPTIONS.INVITAIONS)}>Invitations</button>
                <button
                    style={{ backgroundColor: selectedTab === TAB_OPTIONS.ARTICLES ? '#1E1F22' : '#2B2D31' }}
                    onClick={() => setSelectedTab(TAB_OPTIONS.ARTICLES)}>Articles</button>
            </div>

            {
                selectedTab === TAB_OPTIONS.INVITAIONS && <Invitations />
            }
            {
                selectedTab === TAB_OPTIONS.ARTICLES && <Articles />
            }

        </div>
    )
}

