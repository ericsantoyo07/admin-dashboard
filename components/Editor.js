// You can use this code in a separate component that's imported in your pages.
import '@mdxeditor/editor/style.css';
import React, { useState } from 'react';
const { MDXEditor, codeBlockPlugin, headingsPlugin, listsPlugin, linkPlugin, quotePlugin, markdownShortcutPlugin, useCodeBlockEditorContext } = await import('@mdxeditor/editor')
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { BlockTypeSelect, CreateLink, linkDialogPlugin } from '@mdxeditor/editor';





const PlainTextCodeEditorDescriptor = {
    match: () => true,
    priority: 0,
    Editor: (props) => {
        const cb = useCodeBlockEditorContext()
        return (
            <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
                <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
            </div>
        )
    }
}

function Editor({ markdown, setMarkdown, setEdited }) {

    let currentMarkdown = markdown ? markdown : "";

    return (
        <MDXEditor
            markdown={currentMarkdown}
            contentEditableClassName="prose"
            className="dark-theme dark-editor"
            onChange={(value) => { setMarkdown(value); setEdited(true) }}
            height={400}
            plugins={[
                codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),
                linkDialogPlugin(),
                toolbarPlugin({
                    toolbarContents: () => (<>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <CreateLink />
                        <BlockTypeSelect />
                    </>)
                })
            ]}
        />
    )


}

export default Editor