import { supabase } from "@/database/supabase";
import { AuthUI } from "./Auth";
import { useAuth } from "@/hooks/useAuth";
import { Children } from "react";

function Page({ children }) {


    const { session } = useAuth();

    if (!session) return <AuthUI />


    return (
        <div className="page">
            {children}
        </div>
    )
}

export {
    Page
}