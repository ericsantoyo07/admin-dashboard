import { useEffect, useState } from "react"
import styles from '../styles/Article.module.css'
import { PlusCircle } from "lucide-react";

export default function TagsManager({ tags, setTags, suggestedTags, setEdited }) {


    const [tagInput, setTagInput] = useState('');
    const [hasInputFocus, setHasInputFocus] = useState(false);

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
        setEdited(true);
        setTagInput('');
    }




    return (
        <div className={styles.tags_manager}>

            <div className={styles.tag_adder}>
                <div className={styles.tag_input_container}>
                    <input type="text" value={tagInput}
                        onFocus={() => setHasInputFocus(true)}
                        // onBlur={() => setHasInputFocus(false)}
                        onChange={(e) => { setTagInput(e.target.value); setHasInputFocus(true) }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addTag({
                                    text: tagInput,
                                    type: 'other',
                                    id: null
                                })
                            }
                        }}
                        className={styles.tag_input}
                    />

                    <PlusCircle size={30} onClick={() => {
                        addTag({
                            text: tagInput,
                            type: 'other',
                            id: null
                        })
                    }} />

                </div>

                {
                    tagInput != '' && filteredSuggestedTags()?.length !== 0 && hasInputFocus &&
                    <div className={styles.suggested_tags} onMouseLeave={() => setHasInputFocus(false)}>
                        {

                            filteredSuggestedTags().map((tag, index) => {
                                return (
                                    <div key={index} className={styles.tag_suggestion} onClick={() => {
                                        setHasInputFocus(true);
                                        addTag(tag);
                                        setHasInputFocus(false);
                                    }}>
                                        {tag.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>

            <div className={styles.tags}>
                {
                    tags.map((tag, index) => {
                        return (
                            <div key={index} className={styles.tag}>
                                <p>
                                    {tag.text}
                                </p>
                                <button onClick={() => {
                                    setTags(tags.filter((t, i) => i !== index)); // remove the tag at index
                                    setEdited(true);
                                }}>X</button>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}