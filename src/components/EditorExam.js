import React, { useRef, useEffect } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImageSize } from '../function/imageHandle';
import { useDataHandle } from '../function/dataHandle';

import EditorTool from '../components/EditorTool';
// import Editor from '../components/Editor';
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

  const handleClickOutside = (event) => {
    if (editorRef.current && !editorRef.current.contains(event.target)) {
      console.log('Clicked outside the editor');
    }
  };

  useEffect(() => {
    // 외부를 클릭할 때 발생하는 이벤트를 감지하고 처리하는 이벤트 리스너를 추가합니다.
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editorRef]);

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
        handleContent(e, editorRef); // 저장 함수 호출
      }}>

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

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

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

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

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

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

        <button type='submit'>저장</button>
      </form>

    </div>
  );
}
