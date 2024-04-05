import React, { useRef } from 'react';
import { handleToolClick, handleImgToolClick } from '../../function/toolHandle';
import { useImageSize } from '../../function/imageHandle';
import { useDataHandle } from '../../function/dataHandle';

export default function EditExam() {
  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImageSize();
  const { content, contentType, handleContent, handleContentType } = useDataHandle();

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
      <h1>Test</h1>
      <div className="editor-menu" style={{ marginBottom: '10px' }}>
        <select value={contentType} onChange={handleContentType}>
          <option value="">Type</option>
          <option value="문제">문제</option>
          <option value="이미지">이미지</option>
          <option value="선택지">선택지</option>
        </select>

        <button name='bold' onClick={(e) => { handleToolClick(e, editorRef) }} style={{ marginRight: '5px' }}><b>B</b></button>
        <button name='italic' onClick={(e) => { handleToolClick(e, editorRef) }} style={{ marginRight: '5px' }}><i>I</i></button>
        <button name='underline' onClick={(e) => { handleToolClick(e, editorRef) }} style={{ marginRight: '5px' }}><u>U</u></button>
        <button name='strikeThrough' onClick={(e) => { handleToolClick(e, editorRef) }} style={{ marginRight: '5px' }}><s>S</s></button>
        <button onClick={() => { handleImgToolClick(imageSelectorRef) }} style={{ marginRight: '5px' }}>IMG</button>

        <input type='number' value={isImageSize} onChange={(e) => { handleImgSize(e) }} style={{ width: '60px' }} />
      </div>

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
        <div
          className="editor"
          contentEditable="true"
          // dangerouslySetInnerHTML={{ __html: content }}
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />
        <button type='submit'>저장</button>
      </form>
      <div>
        <p>Content in useState(include HTML tag):</p>
        {content}
      </div>
    </div>
  );
}
