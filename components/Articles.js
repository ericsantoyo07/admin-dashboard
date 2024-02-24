import { addNews, deleteNews, getAllNews, getAllSuggestionTags, updateNews } from "@/database/functions";
import { useEffect, useState } from "react"
import styles from "../styles/Article.module.css"
import { ArrowLeft, BookLockIcon, BookOpenIcon, CheckCircle, CircleDashed, EyeIcon, EyeOff, FilePenLine, Save, SaveAll, SaveIcon, Trash2, UserMinus } from "lucide-react";
import ArticleCoverPhoto from "./ArticleCoverPhoto";
import TagsManager from "./TagsManager";


function ListOfNews({ newsList, setNews, setShouldFetch }) {


    async function handleAddNews() {
        let { data, error } = await addNews();

        if (data && data[0]) {
            console.log('news data', data);
            setNews(data[0]);
            setShouldFetch(shouldFetch => !shouldFetch);
        }
        else {
            console.log('news error', error);
        }

    }

    async function handleNewsDeletion(id) {
        let { data, error } = await deleteNews(id);

        if (data) {
            console.log('news data', data);
            setShouldFetch(shouldFetch => !shouldFetch);
        }
        else {
            console.log('news error', error);
        }
    }

    return (
        <div className={styles.article_list}>
            <button className={styles.add_news} onClick={handleAddNews}>Add News</button>
            <div className={styles.articles}>
                {newsList.map((news, index) => {
                    return <div key={index} className={styles.article}>
                        <div className={styles.article_image}>
                            {
                                news.cover_photo_url ?
                                    <img src={news.cover_photo_url} /> : <img src="/defaultArticleImage.jpg" />
                            }
                        </div>

                        <div className={styles.article_main}>
                            <div className={styles.article_title}><h2>{news.title}</h2></div>

                            <div className={styles.article_buttons}>
                                <FilePenLine onClick={() => setNews({ ...news })} />
                                <Trash2 onClick={async () => { await handleNewsDeletion(news.id) }} />
                            </div>
                        </div>

                    </div>
                })}
            </div>

        </div>
    )
}

function EditNews({ news, setNews, setShouldFetch, suggestedTags }) {
    const [title, setTitle] = useState(news.title);
    const [content, setContent] = useState(news.content);
    const [tags, setTags] = useState(news.tags || []);
    const [published, setPublished] = useState(news.published);
    const [loading, setLoading] = useState(false);
    const [edited, setEdited] = useState(false);

    async function handleNewsUpdate() {

        if (!edited) {
            return;
        }

        let updated_at = Date.now();

        setLoading(true);
        let { data, error } = await updateNews(news.id, { title, content, tags, updated_at, published });
        setLoading(false);
        setEdited(false);

        if (data) {
            console.log('news data', data);
        }
        else {
            console.log('news error', error);
        }
    }

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircleDashed size={50} />
        </div>
    }

    return (
        <div className={styles.edit_article}>

            <ArrowLeft size={30} style={{ marginLeft: '10px', marginBottom: '10px' }} onClick={() => { setNews(null); setShouldFetch(shouldFetch => !shouldFetch) }} />
            <div className={styles.article_content}>
                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setEdited(true) }} className={styles.article_title_input} />
                <ArticleCoverPhoto newsId={news.id} cover_photo_url={news.cover_photo_url} setLoading={setLoading} loading={loading} />
                <TagsManager tags={tags} suggestedTags={suggestedTags} setTags={setTags} setEdited={setEdited} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '20px', padding: '10px' }}>


                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', border: '1px solid white', padding: '5px', borderRadius: '5px' }}>
                    <EyeIcon
                        onClick={() => {
                            setPublished(true);
                            setEdited(true);
                        }}
                        size={30} color={published ? 'white' : 'grey'} style={{ cursor: 'pointer', width: 'max-content' }} />
                    <EyeOff
                        onClick={() => {
                            setPublished(false);
                            setEdited(true);
                        }}
                        size={30} color={!published ? 'white' : 'grey'} style={{ cursor: 'pointer', width: 'max-content' }} />
                </div>


                <CheckCircle size={30}
                    aria-disabled={!edited}

                    color={edited ? 'white' : 'grey'}
                    style={{
                        cursor: 'pointer',
                    }} onClick={handleNewsUpdate} />
            </div>
        </div>
    )
}

export default function Articles() {

    const [news, setNews] = useState(null);
    const [newsList, setNewsList] = useState([]);
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);


    useEffect(() => {

        async function getSuggestedTags() {
            let { suggestions: data, error } = await getAllSuggestionTags();
            if (data) {
                console.log('suggested tags data', data);
                setSuggestedTags(data);
            }
            else {
                console.log('suggested tags error', error);
            }
        }

        getSuggestedTags();

    }, [])


    useEffect(() => {
        async function getNews() {
            let { data, error } = await getAllNews();

            if (data) {
                console.log('news data', data);
                setNewsList(data);
            }
            else {
                console.log('news error', error);
            }
        }
        getNews();
    }
        , [shouldFetch])



    return (
        <div className={styles.article_page}>
            {news && <EditNews news={news} setNews={setNews} setShouldFetch={setShouldFetch} suggestedTags={suggestedTags} />}
            {!news && <ListOfNews newsList={newsList} setNews={setNews} setShouldFetch={setShouldFetch} />}
        </div>
    )
}