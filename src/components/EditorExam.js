import React, { useRef } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImageSize } from '../function/imageHandle';
import { useDataHandle } from '../function/dataHandle';

import EditorTool from '../components/EditorTool';
import Editor from '../components/Editor';
export default function EditorExam({ type }) {
  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImageSize();
  const { contentType, handleContent, handleContentType } = useDataHandle();

  const imageSelectorRef = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const editorRef = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함

  /** 
  // 객체로 저장
  const [editorState, setEditorState] = useState({
    type: '',
    content: '',
    isImageUrl: []
  });
  */

  return (
    <div>
      <select value={contentType} onChange={handleContentType}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select>

      <EditorTool
        editorRef={editorRef}
        contentType={contentType}
        handleContentType={handleContentType}
        handleToolClick={handleToolClick}
        imageSelectorRef={imageSelectorRef}
        handleImgToolClick={handleImgToolClick}
        isImageSize={isImageSize}
        handleImgSize={handleImgSize}
      />
      <Editor
        editorRef={editorRef}
        // contentType={contentType}
        imageSelectorRef={imageSelectorRef}
        handleImageSelect={handleImageSelect}
        handleContent={handleContent}
      ></Editor>
      {/* <div>
        <p>Content in useState(include HTML tag):</p>
        {content}
      </div> */}
    </div>
  );
}
