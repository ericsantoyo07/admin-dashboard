import { addNews, deleteNews, getAllNews, getAllSuggestionTags, updateNews } from "@/database/functions";
import { useEffect, useState } from "react"
import styles from "../styles/Article.module.css"
import { ArrowLeft, FilePenLine, Trash2, UserMinus } from "lucide-react";
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

    async function handleNewsUpdate() {
        let updated_at = Date.now();
        let { data, error } = await updateNews(news.id, { title, content, tags, updated_at });

        if (data) {
            console.log('news data', data);
        }
        else {
            console.log('news error', error);
        }
    }

    return (
        <div>
            {/* {
                JSON.stringify({ news: news || null })
            }
            <button onClick={() => { setNews(null); setShouldFetch(shouldFetch => !shouldFetch) }}>Close</button>
            <h1> {'HIIII'} {news.title}</h1>
            <p>{news.content}</p> */}
            <ArrowLeft onClick={() => { setNews(null); setShouldFetch(shouldFetch => !shouldFetch) }}/>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <ArticleCoverPhoto newsId={news.id} cover_photo_url={news.cover_photo_url} />
            <TagsManager tags={tags} suggestedTags={suggestedTags} setTags={setTags} />
            <button onClick={handleNewsUpdate}>Save</button>

        </div>
    )
}

export default function Articles() {

    const [news, setNews] = useState(null);
    const [newsList, setNewsList] = useState([]);
    const [suggestedTags, setSuggestedTags] = useState([]);  
    const [shouldFetch, setShouldFetch] = useState(true);
    

    useEffect(()=> {

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

    },[])


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