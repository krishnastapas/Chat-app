import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import Editor from 'quill-editor-math'
import 'quill-editor-math/dist/index.css'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';




function EditorContainer({ content="", handleContent }) {
    const [editorState, setEditorState] = useState(content)


    const handleEditorChange = (value) => {
        console.log(value)
        setEditorState(value);
        handleContent(value)

    }
   
    return (
        <div style={{}}>
           <Editor initialValue={editorState}  onChange={handleEditorChange}/>         
        </div>
    )
}

export default EditorContainer


