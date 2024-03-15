import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill 스타일을 가져옵니다.

export default function EditTestReactQuill() {
  const editorRef = useRef(null);
  const editorRef1 = useRef(null);
  const [selectedEditor, setSelectedEditor] = useState(editorRef1); // 선택된 에디터 상태 값
  const [isEnable, setEnable] = useState(true);


  // 첫 번째 에디터 선택 핸들러
  const handleFirstEditorSelect = () => {
    setSelectedEditor(editorRef);
  };

  // 두 번째 에디터 선택 핸들러
  const handleSecondEditorSelect = () => {
    setSelectedEditor(editorRef1);
  };

  const handleEditorSelect = () => {
    setEnable(!isEnable);
    if (isEnable) {
      setSelectedEditor(editorRef);
    } else {
      setSelectedEditor(editorRef1);
    }
  }

  useEffect(() => {
    // 첫 번째 에디터 초기화
    if (editorRef.current) {
      new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: true
        }
      });
    }

    // 두 번째 에디터 툴바가 없는 에디터
    if (editorRef1.current) {
      new Quill(editorRef1.current, {
        theme: 'snow',
        modules: {
          toolbar: false
        }
      });
    }
  }, []);

  return (
    <div>
      <div>
        {/* 첫 번째 에디터 선택 버튼 */}
        <button onClick={handleFirstEditorSelect}>Select First Editor</button>
        {/* 두 번째 에디터 선택 버튼 */}
        <button onClick={handleSecondEditorSelect}>Select Second Editor</button>
        <button onClick={handleEditorSelect}>Enable</button>
      </div>
      {/* 에디터들 */}
      <div style={{ display: selectedEditor === editorRef ? 'block' : 'none', marginBottom: '20px', width: '500px', height: '50px' }}>
        <div ref={editorRef}></div>
      </div>
      <div style={{ display: selectedEditor === editorRef1 ? 'block' : 'none', marginBottom: '20px', width: '500px', height: '50px' }}>
        <div ref={editorRef1}></div>
      </div>
    </div>
  );
};

// export default MyComponent;
