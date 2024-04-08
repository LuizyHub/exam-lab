import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImageSize } from '../function/imageHandle';
import { useDataHandle } from '../function/dataHandle';

import EditorTool from '../components/EditorTool';
// import Editor from '../components/Editor';
export default function EditorExam({ type }) {
  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImageSize();
  const { handleContent } = useDataHandle();
  const [contentType1, setContentType1] = useState('type');
  const [contentType2, setContentType2] = useState('type');
  const [contentType3, setContentType3] = useState('type');
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

  const handleContentType1 = (e) => {
    const contentType = e.currentTarget.value;
    setContentType1(contentType);
  }

  const handleContentType2 = (e) => {
    const contentType = e.currentTarget.value;
    setContentType2(contentType);
  }

  const handleContentType3 = (e) => {
    const contentType = e.currentTarget.value;
    setContentType3(contentType);
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef}
        onChange={(e) => { handleImageSelect(e, editorRef) }}
      />

      <form onSubmit={(e) => {
        // e.preventDefault(); // 기본 동작 방지
        handleContent(e, editorRef, contentType1, contentType2, contentType3); // 저장 함수 호출
      }}>

        <select value={contentType1} onChange={handleContentType1}>
          <option value="type">Select</option>
          <option value="문제">문제</option>
          <option value="이미지">이미지</option>
          <option value="선택지">선택지</option>
        </select>

        <EditorTool
          editorRef={editorRef}
          contentType={contentType1}
          handleContentType={handleContentType1}
          handleToolClick={handleToolClick}
          imageSelectorRef={imageSelectorRef}
          handleImgToolClick={handleImgToolClick}
          isImageSize={isImageSize}
          handleImgSize={handleImgSize}
        />

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

        <select value={contentType2} onChange={handleContentType2}>
          <option value="type">Select</option>
          <option value="문제">문제</option>
          <option value="이미지">이미지</option>
          <option value="선택지">선택지</option>
        </select>

        <EditorTool
          editorRef={editorRef}
          contentType={contentType2}
          handleContentType={handleContentType2}
          handleToolClick={handleToolClick}
          imageSelectorRef={imageSelectorRef}
          handleImgToolClick={handleImgToolClick}
          isImageSize={isImageSize}
          handleImgSize={handleImgSize}
        />

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

        <select value={contentType3} onChange={handleContentType3}>
          <option value="type">Select</option>
          <option value="문제">문제</option>
          <option value="이미지">이미지</option>
          <option value="선택지">선택지</option>
        </select>

        <EditorTool
          editorRef={editorRef}
          contentType={contentType3}
          handleContentType={handleContentType3}
          handleToolClick={handleToolClick}
          imageSelectorRef={imageSelectorRef}
          handleImgToolClick={handleImgToolClick}
          isImageSize={isImageSize}
          handleImgSize={handleImgSize}
        />

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

        <button type='submit'>생성</button>
      </form>

    </div>
  );
}
