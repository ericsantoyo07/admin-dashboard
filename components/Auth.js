import { supabase } from "@/database/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";


function AuthUI() {




    return (

        <div className="auth">
            <Auth
                supabaseClient={supabase}
                theme='default'
                providers={[]}
                appearance={{ theme: ThemeSupa }}
            />
        </div>
    )
}


export {
    AuthUI
}