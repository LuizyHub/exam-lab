// import { useEffect } from "react"

export default function EditorTool({ editorRef, contentType, handleContentType, handleToolClick, imageSelectorRef, handleImgToolClick, isImageSize, handleImgSize, handleContent }) {

  // useEffect(() => {
  //   handleContent(editorRef)
  // })

  return (

    <div className="editor-Tool"
    // style={{ marginBottom: '10px' }}
    >
      {/* <select value={contentType} onChange={handleContentType}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select> */}

      {
        contentType === "type" ? (
          <>
          </>
        ) : contentType === "문제" ? (
          <>
            <button
              name='bold'
              onClick={(e) => { handleToolClick(e, editorRef) }}

            ><b>B</b>
            </button>
            <button
              name='italic'
              onClick={(e) => { handleToolClick(e, editorRef) }}

            ><i>I</i>
            </button>
            <button
              name='underline' onClick={(e) => { handleToolClick(e, editorRef) }}

            ><u>U</u>
            </button>
            <button
              name='strikeThrough'
              onClick={(e) => { handleToolClick(e, editorRef) }}

            ><s>S</s>
            </button>
            <button
              onClick={() => { handleImgToolClick(imageSelectorRef) }}

            >IMG
            </button>
            {/* <input
              type='number'
              value={isImageSize}
              onChange={(e) => { handleImgSize(e) }}
              style={{ width: '60px' }}
            /> */}
            {/* <button onClick={() => { handleContent(editorRef) }}>저장</button> */}

          </>
        ) : contentType === "이미지" ? (
          <>
            <button onClick={() => { handleImgToolClick(imageSelectorRef) }} >IMG</button>
            {/* <input type='number' value={isImageSize} onChange={(e) => { handleImgSize(e) }} style={{ width: '60px' }} /> */}
            {/* <button onClick={() => { handleContent() }}>저장</button> */}

          </>
        ) : contentType === "선택지" ? (
          <>
            <button name='bold' onClick={(e) => { handleToolClick(e, editorRef) }} ><b>B</b></button>
            <button name='italic' onClick={(e) => { handleToolClick(e, editorRef) }} ><i>I</i></button>
            <button name='underline' onClick={(e) => { handleToolClick(e, editorRef) }} ><u>U</u></button>
            <button name='strikeThrough' onClick={(e) => { handleToolClick(e, editorRef) }} ><s>S</s></button>
            {/* <button onClick={() => { handleImgToolClick(imageSelectorRef) }} >IMG</button>
            <input type='number' value={isImageSize} onChange={(e) => { handleImgSize(e) }} style={{ width: '60px' }} /> */}
            {/* <button onClick={() => { handleContent(editorRef) }}>저장</button> */}
          </>
        ) : null
      }


    </div>
  )
}