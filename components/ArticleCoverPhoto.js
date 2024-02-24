import { addCoverPhoto, updateCoverPhotoUrl } from "@/database/functions";
import { supabase } from "@/database/supabase";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "../styles/Article.module.css";


export default function ArticleCoverPhoto({ newsId, cover_photo_url, loading, setLoading }) {
    const [file, setfile] = useState([]);
    const [url, setUrl] = useState(cover_photo_url);
    const [random, setRandom] = useState(1)


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('no file selected');
            return;
        }

        const filename = `${file.name}`;

        if (!filename.match(/\.(jpg|jpeg|png|gif)$/i)) {
            alert('not an image');
            return;
        }
        setLoading(true);
        let { data, error } = await addCoverPhoto(file, newsId);
        setLoading(false);

        if (!data) return;


        const filepath = `${newsId}.${file.name.split('.').pop()}`

        setLoading(true);
        const { data: urlData } = supabase
            .storage
            .from('cover_photos')
            .getPublicUrl(`${filepath}`)
        console.log('url', urlData);
        const { data: coverPhotoUpdateData, error: coverPhotoUpdateError } = await updateCoverPhotoUrl(newsId, urlData.publicUrl);
        setLoading(false);
        setUrl(urlData.publicUrl);

        if (coverPhotoUpdateError) {
            alert('could not update cover photo');
        }

    }

    useEffect(() => {
        console.log(url)
    }, [url])




    const handleFileSelected = (e) => {
        setfile(e.target.files[0]);
    };

    return (
        <div className={styles.article_cover_photo}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <input type="file" name="image" onChange={handleFileSelected} />
                <UploadIcon onClick={handleSubmit} type="submit" />

            </div>
            {url && !loading && <img key={url+`${Math.random()}`} width={200} src={url} />}
        </div>
    );
}