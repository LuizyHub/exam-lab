import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImageSize } from '../function/imageHandle';
import { DataHandle } from '../function/dataHandle';
import formData from "../function/formData"

import EditorTool from '../components/EditorTool';
// import Editor from '../components/Editor';
export default function EditorExam({ type }) {
  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImageSize();
  const { handleContent } = DataHandle();
  const [contentType1, setContentType1] = useState('type');
  const [contentType2, setContentType2] = useState('type');
  const [contentType3, setContentType3] = useState('type');

  const imageSelectorRef1 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef2 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef3 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const editorRef1 = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함
  const editorRef2 = useRef(null);
  const editorRef3 = useRef(null);

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
      <select value={contentType1} onChange={handleContentType1}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select>

      <EditorTool
        editorRef={editorRef1}
        contentType={contentType1}
        handleContentType={handleContentType1}
        handleToolClick={handleToolClick}
        imageSelectorRef={imageSelectorRef1}
        handleImgToolClick={handleImgToolClick}
        isImageSize={isImageSize}
        handleImgSize={handleImgSize}
        handleContent={() => { handleContent(editorRef1) }}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef1}
        onChange={(e) => { handleImageSelect(e, editorRef1) }}
      />
      <div
        className="editor"
        contentEditable="true"
        ref={editorRef1}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />
      {/* ------------------------------------------------------------------------ */}
      <select value={contentType2} onChange={handleContentType2}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select>

      <EditorTool
        editorRef={editorRef2}
        contentType={contentType2}
        handleContentType={handleContentType2}
        handleToolClick={handleToolClick}
        imageSelectorRef={imageSelectorRef2}
        handleImgToolClick={handleImgToolClick}
        isImageSize={isImageSize}
        handleImgSize={handleImgSize}
        handleContent={() => { handleContent(editorRef2) }}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef2}
        onChange={(e) => { handleImageSelect(e, editorRef2) }}
      />
      <div
        className="editor"
        contentEditable="true"
        ref={editorRef2}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />
      {/* ------------------------------------------------------------------------ */}
      <select value={contentType3} onChange={handleContentType3}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select>

      <EditorTool
        editorRef={editorRef3}
        contentType={contentType3}
        handleContentType={handleContentType3}
        handleToolClick={handleToolClick}
        imageSelectorRef={imageSelectorRef3}
        handleImgToolClick={handleImgToolClick}
        isImageSize={isImageSize}
        handleImgSize={handleImgSize}
        handleContent={() => { handleContent(editorRef3) }}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef3}
        onChange={(e) => { handleImageSelect(e, editorRef3) }}
      />
      <div
        className="editor"
        contentEditable="true"
        ref={editorRef3}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      <button type='submit' onClick={() => { formData(contentType1, contentType2, contentType3); }}>생성</button>
    </div>
  );
}
