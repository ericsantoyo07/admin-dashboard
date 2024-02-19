
import { supabase } from "@/database/supabase";
import { useEffect, useState } from "react";
import Articles from "@/components/Articles";
import Invitations from "@/components/Invitations";
import styles from '@/styles/OwnerPortal.module.css';
import { LogOut } from "lucide-react";



const TAB_OPTIONS = {
    INVITAIONS: 'invitations',
    ARTICLES: 'articles',
}
export default function OwnerPortal() {

    const [selectedTab, setSelectedTab] = useState(TAB_OPTIONS.INVITAIONS);
    return (
        <div>
            <div className={styles.nav_bar}>
                <h1>Owner Portal</h1>
                {/* <button >Sign Out</button> */}
                <LogOut size={30} onClick={() => supabase.auth.signOut()} />
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

