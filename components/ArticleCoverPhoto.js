import { addCoverPhoto, updateCoverPhotoUrl } from "@/database/functions";
import { supabase } from "@/database/supabase";
import { useState } from "react";


export default function ArticleCoverPhoto({ newsId, cover_photo_url }) {
    const [file, setfile] = useState([]);
    const [url, setUrl] = useState(cover_photo_url);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const filename = `${file.name}`;

        if (!filename.match(/\.(jpg|jpeg|png|gif)$/i)) {
            alert('not an image');
            return;
        }
        setIsLoading(true);
        let { data, error } = await addCoverPhoto(file, newsId);
        setIsLoading(false);

        if (!data) return;


        const filepath = `${newsId}.${file.name.split('.').pop()}`

        setIsLoading(true);
        const { data: urlData } = supabase
            .storage
            .from('cover_photos')
            .getPublicUrl(`${filepath}`)
        console.log('url', urlData);
        const { data: coverPhotoUpdateData, error: coverPhotoUpdateError } = await updateCoverPhotoUrl(newsId, urlData.publicUrl);
        setIsLoading(false);
        setUrl(urlData.publicUrl);

        if (coverPhotoUpdateError) {
            alert('could not update cover photo');
        }

    }




    const handleFileSelected = (e) => {
        setfile(e.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" onChange={handleFileSelected} />
            <button type="submit">Upload image</button>
            { isLoading && <p>loading...</p>}
            {url && !isLoading && <img width={200} src={url} />}
        </form>
    );
}