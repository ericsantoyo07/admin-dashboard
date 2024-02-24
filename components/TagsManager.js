import { useEffect, useState } from "react"
import styles from '../styles/Article.module.css'

export default function TagsManager({ tags, setTags, suggestedTags, setSuggestedTags }) {


    const [tagInput, setTagInput] = useState('');

    function filteredSuggestedTags() {
        return suggestedTags.filter(t => t.text.toLowerCase().includes(tagInput.toLowerCase()))
    }

    function addTag(tag) {

        if (tag.text === '') {
            return
        }

        if (tags.find(t => t.text === tag.text)) {
            return
        }
        setTags([...tags, tag]);
        setTagInput('');
    }




    return (
        <div className={styles.tags_manager}>

            <input type="text" value={tagInput} onChange={(e) => { setTagInput(e.target.value) }} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addTag({
                        text: tagInput,
                        type: 'other',
                        id: null
                    })
                }
            }} />
            <button onClick={() => {
                addTag({
                    text: tagInput,
                    type: 'other',
                    id: null
                })
            }
            }>Add</button>
            {
                tagInput != '' &&
                <div className={styles.suggested_tags}>
                    {

                        filteredSuggestedTags().map((tag, index) => {
                            return (
                                <div key={index} className={styles.tag_suggestion} onClick={() => {
                                    addTag(tag)
                                }}>
                                    {tag.text}
                                </div>
                            )
                        })
                    }
                </div>
            }

            <div className={styles.tags}>
                {
                    tags.map((tag, index) => {
                        return (
                            <div key={index} className={styles.tag}>
                                <p>
                                    {tag.text}
                                </p>
                                <button onClick={() => {
                                    setTags(tags.filter((t, i) => i !== index)) // remove the tag at index
                                }}>X</button>
                            </div>
                        )
                    })
                }

            </div>
            <h1>Tags Manager</h1>
        </div>
    )
}