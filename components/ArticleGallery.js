import { addCoverPhoto, addImage, getNewsById, updateCoverPhotoUrl, updatePhotos } from "@/database/functions";
import { supabase } from "@/database/supabase";
import { CircleDashed, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "../styles/Article.module.css";


export default function ArticleGallery({ newsId, photo_urls }) {

    const [images, setImages] = useState(photo_urls);
    const [file, setfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {

        if (newsId) {
            setLoading(true);
            getNewsById(newsId).then(({ data, error }) => {
                if (data) {
                    setImages(data.photos);
                    setCurrentImage(null);
                }
                setLoading(false);
            })
        }
        else {
            setLoading(false);
        }

    }, [shouldFetch, newsId])

    const handleFileSelected = (e) => {
        if (e.target.files[0]) {

            if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                alert('not an image');
                return;
            }
            else {
                setfile(e.target.files[0]);
                setCurrentImage(URL.createObjectURL(e.target.files[0]));
            }
        }
    };

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


        const filepath = `${newsId}-${Date.now()}.${file.name.split('.').pop()}`;
        let { data, error } = await addImage(file, filepath);
        console.log('error uploading image ', error);

        if (error) {
            alert('could not upload image');
            return;
        }
        else {
            setLoading(true);

            const { data: urlData } = supabase
                .storage
                .from('images')
                .getPublicUrl(`${filepath}`)
            console.log('url', urlData);

            await updatePhotos(newsId, [...images, urlData.publicUrl]);

            setShouldFetch(!shouldFetch);
        }


    }






    return (
        <div >
            {
                loading &&
                <div className={styles.loading}>
                    <CircleDashed size={64} />
                </div>
            }

            {
                !loading &&
                <div className={styles.mainContainer}>
                    <div className={styles.photoGallery}>

                        <div className={styles.coverPhotoContainer}>

                            <form onSubmit={handleSubmit} className={styles.coverPhotoForm}>
                                <label htmlFor="file" className={styles.coverPhotoLabel}>
                                    <input type="file" id="file" name="file" onChange={handleFileSelected} className={styles.coverPhotoInput} />
                                    {/* <UploadIcon size={24} /> */}
                                </label>
                            </form>
                            <div className={styles.coverPhotoSubmit}><UploadIcon size={27} onClick={handleSubmit} type="submit" />
                            </div>
                        </div>

                        {
                            currentImage &&
                            <div className={styles.currentImageContainer}>
                                <img src={currentImage} alt="current" className={styles.currentImage} />
                                <button onClick={() => {
                                    setCurrentImage(null);
                                    setfile(null);
                                }
                                } className={styles.deleteButton}>Delete</button>
                            </div>
                        }
                    </div>

                    <div className={styles.imageGalleryContainer}>

                        {
                            images.map((image, index) => {
                                return (

                                    <div key={index} className={styles.imageContainer}>

                                        <img src={image} alt="gallery" className={styles.image} />
                                        <button onClick={() => {
                                            let newImages = images.filter((img, i) => i !== index);
                                            setLoading(true);
                                            updatePhotos(newsId, newImages).then(() => {
                                                setShouldFetch(!shouldFetch);
                                            })
                                        }
                                        } className={styles.deletesButton}>Delete</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

        </div>
    );
}