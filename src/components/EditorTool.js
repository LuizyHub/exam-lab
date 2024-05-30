// import { useEffect } from "react"
import bold_icon from "../img/bold_icon.svg";
import img_add_icon from "../img/img_add_icon.svg";
import italic_type_icon from"../img/italic_type_icon.svg";
import line_through_icon from "../img/line_through_icon.svg";
import underline_icon from "../img/underline_icon.svg";

export default function EditorTool({ editorRef, contentType, handleContentType, handleToolClick, imageSelectorRef, handleImgToolClick, isImageSize, handleImgSize, handleContent }) {

  // useEffect(() => {
  //   handleContent(editorRef)
  // })

  return (
    <div className="editor-Tool">
      {
        contentType === "type" ? (
          <>
          </>
        ) : contentType === "문제" ? (
          <>
            <p style={{color:"#24ABA8",fontWeight: "bold"}}>문제</p>
            <button
              name='bold'
              onClick={(e) => { handleToolClick(e, editorRef) }}
            >
              <img src={bold_icon} alt="Bold" />
            </button>
            <button
              name='italic'
              onClick={(e) => { handleToolClick(e, editorRef) }}
            >
              <img src={italic_type_icon} alt="Italic" />
            </button>
            <button
              name='underline'
              onClick={(e) => { handleToolClick(e, editorRef) }}
            >
              <img src={underline_icon} alt="Underline" />
            </button>
            <button
              name='strikeThrough'
              onClick={(e) => { handleToolClick(e, editorRef) }}
            >
              <img src={line_through_icon} alt="Strikethrough" />
            </button>
            <button
              onClick={() => { handleImgToolClick(imageSelectorRef) }}
            >
              <img src={img_add_icon} alt="Add Image" />
            </button>
          </>
        ) : contentType === "이미지" ? (
          <>
            <p style={{color:"#24ABA8",fontWeight: "bold"}}>이미지</p>
            <button onClick={() => { handleImgToolClick(imageSelectorRef) }}>
              <img src={img_add_icon} alt="Add Image" />
            </button>
          </>
        ) : contentType === "선택지" || "정답" || "해설지" ? (
          <>
            <p style={{color:"#24ABA8",fontWeight: "bold"}} >{contentType}</p>
            <button name='bold' onClick={(e) => { handleToolClick(e, editorRef) }} >
              <img src={bold_icon} alt="Bold" />
            </button>
            <button name='italic' onClick={(e) => { handleToolClick(e, editorRef) }} >
              <img src={italic_type_icon} alt="Italic" />
            </button>
            <button name='underline' onClick={(e) => { handleToolClick(e, editorRef) }} >
              <img src={underline_icon} alt="Underline" />
            </button>
            <button name='strikeThrough' onClick={(e) => { handleToolClick(e, editorRef) }} >
              <img src={line_through_icon} alt="Strikethrough" />
            </button>
          </>
        ) : null
      }
    </div>
  );
}