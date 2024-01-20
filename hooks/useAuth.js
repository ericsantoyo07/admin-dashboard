import { supabase } from "@/database/supabase";
import { useEffect, useState } from "react";

function useAuth() {

    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(_event)
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])


    return { session }

}

export { useAuth }