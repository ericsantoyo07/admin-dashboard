const { supabase } = require("./supabase");

async function getAllPlayers() {
    const { data, error } = await supabase.from('players').select('*');
    return {data, error}
}


export {
    getAllPlayers
}