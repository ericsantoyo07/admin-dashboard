import { getRoleOfUser } from "@/database/functions";
import { supabase } from "@/database/supabase";
import { useEffect, useState } from "react";

function useAuth() {


    const [session, setSession] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(_event);
            console.log('we are in the useAuth hook', session);
            if (session && session.user) {
                // setting the email of the user in the state
                setEmail(session.user.email);
            }
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])


    useEffect(() => {

        if (email) {
            console.log('email', email);
            console.log('need to get the account role from the database');

            async function getRole() {
                const { data, error } = await getRoleOfUser(email);
                if(data[0] && data[0].role) setRole(data[0].role);
                else setRole('guest');
            }
            getRole();
        }
    }, [email])


    return { session, role}

}

export { useAuth }