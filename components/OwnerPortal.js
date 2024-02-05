
import { supabase } from "@/database/supabase";
import { useEffect, useState } from "react";
import Articles from "@/components/Articles";
import Invitations from "@/components/Invitations";
const TAB_OPTIONS = {
    INVITAIONS: 'invitations',
    ARTICLES: 'articles',
}
export default function OwnerPortal() {

    const [selectedTab, setSelectedTab] = useState(TAB_OPTIONS.INVITAIONS);
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h1>Owner Portal</h1>
                <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
            </div>
            {/* add divs to change between tabs with style */}
            <div style={{ display: 'flex' }}>
                <button
                    style={{ backgroundColor: selectedTab === TAB_OPTIONS.INVITAIONS ? 'red' : 'white' }}
                    onClick={() => setSelectedTab(TAB_OPTIONS.INVITAIONS)}>Invitations</button>
                <button
                    style={{ backgroundColor: selectedTab === TAB_OPTIONS.ARTICLES ? 'red' : 'white' }}
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

