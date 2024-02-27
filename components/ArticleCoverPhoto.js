import { addCoverPhoto, updateCoverPhotoUrl } from "@/database/functions";
import { supabase } from "@/database/supabase";
import { CircleDashed, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "../styles/Article.module.css";


export default function ArticleCoverPhoto({ newsId, cover_photo_url }) {
    const [file, setfile] = useState([]);
    const [url, setUrl] = useState(cover_photo_url);
    const [random, setRandom] = useState(1)
    const [loading, setLoading] = useState(false);


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
        const filepath = `${newsId}-${Date.now()}.${file.name.split('.').pop()}`
        let { data, error } = await addCoverPhoto(file, filepath);
        console.log(error);

        if (!data) return;



        const { data: urlData } = supabase
            .storage
            .from('cover_photos')
            .getPublicUrl(`${filepath}`)
        console.log('url', urlData);
        const { data: coverPhotoUpdateData, error: coverPhotoUpdateError } = await updateCoverPhotoUrl(newsId, urlData.publicUrl);
        setLoading(false);

        if (coverPhotoUpdateError) {
            alert('could not update cover photo');
        }

    }

    useEffect(() => {
        console.log(url)
    }, [url])




    const handleFileSelected = (e) => {
        if (e.target.files[0]) {
            setfile(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className={styles.article_cover_photo}>
            <div>
                <h3>Upload Cover Photo</h3>
            </div>
            <div className={styles.upload_content} >
                <input type="file" name="image" onChange={handleFileSelected} />
                {loading && <CircleDashed className={styles.loading_icon} size={27} />}
                <div className={styles.upload_button}><UploadIcon size={27} onClick={handleSubmit} type="submit" /></div>

            </div>
            {url && !loading && <img width={200} src={url} />}
        </div>
    );
}