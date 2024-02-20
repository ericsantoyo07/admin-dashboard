const { supabase } = require("./supabase");

async function getAllPlayers() {
    const { data, error } = await supabase.from('players').select('*');
    return { data, error }
}


async function getRoleOfUser(email) {
    const { data, error } = await supabase.from('roles').select('*').match({ email: email });
    return { data, error }
}


async function getAllUsers(includingOwner = false) {

    if (includingOwner) {
        const { data, error } = await supabase.from('roles').select('*');
        return { data, error }
    }

    else {
        const { data, error } = await supabase.from('roles').select('*').neq('role', 'owner');
        return { data, error }
    }
}

async function addNewManager(email) {
    const { data, error } = await supabase.from('roles').insert([{ email: email, role: 'manager' }]).select('*');
    return { data, error }
}

async function deleteManager(email) {
    const { data, error } = await supabase.from('roles').delete().match({ email: email }).select('*');
    return { data, error }
}

async function addNews(){
    const { data, error } = await supabase.from('news').insert([{ title: 'untitled', content: '' }]).select('*');
    return { data, error }
}

async function deleteNews(id) {
    const { data, error } = await supabase.from('news').delete().match({ id: id }).select('*');
    return { data, error }
}

async function getAllNews(){
    const { data, error } = await supabase.from('news').select('*');
    return { data, error }
}

async function updateNews(id, news){
    const { data, error } = await supabase.from('news').update(news).match({ id: id }).select('*');
    return { data, error }
}

async function addCoverPhoto(file, newsID){
    const extension = file.name.split('.').pop();
    const filename = `${newsID}.${extension}`;
    const { data, error } = await supabase.storage
    .from("cover_photos")
    .upload(filename, file, {
        upsert: true,
    });
    return { data, error }
}

async function updateCoverPhotoUrl(newsId, url) {
    const { data, error } = await supabase.from('news').update({ cover_photo_url: url }).match({ id: newsId }).select('*');
    return { data, error }
}

export {
    getAllPlayers,
    getRoleOfUser,
    getAllUsers,
    addNewManager,
    deleteManager,
    addNews,
    getAllNews,
    deleteNews,
    updateNews,
    addCoverPhoto,
    updateCoverPhotoUrl
}