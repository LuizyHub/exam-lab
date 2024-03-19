import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill 스타일을 가져옵니다.

export default function EditTestReactQuill() {
  const editorAbleRef = useRef(null);
  const editorEnableRef1 = useRef(null);
  const [selectedEditor, setSelectedEditor] = useState(editorEnableRef1); // 선택된 에디터 상태 값
  const [isEnable, setEnable] = useState(true);

  const handleEditorSelect = () => {
    setEnable(!isEnable);
    if (isEnable) {
      setSelectedEditor(editorAbleRef);
    } else {
      setSelectedEditor(editorEnableRef1);
    }
  }

  const handleEditorAdd = () => {
    console.log('Add');
  }

  useEffect(() => {
    // 툴바 비활성화
    if (editorEnableRef1.current) {
      const quill = new Quill(editorEnableRef1.current, {
        theme: 'snow',
        modules: {
          toolbar: false
        }
      });

      // quill.on('editor-change', (eventName, ...args) => {
      //   if (eventName === 'selection-change') {
      //     console.log('Quill Editor Clicked');
      //   }
      // });

    }
    // 툴바 활성화
    if (editorAbleRef.current) {
      new Quill(editorAbleRef.current, {
        theme: 'snow',
        modules: {
          toolbar: true
        }
      });
    }

  }, []);

  return (
    <div>
      <div>
        <button onClick={handleEditorSelect}>Enable</button>
        <button onClick={handleEditorAdd}>Add</button>
      </div>
      {/* 에디터들 */}
      <div style={{ display: selectedEditor === editorAbleRef ? 'block' : 'none', marginBottom: '20px', width: '500px', height: '50px' }}>
        <div ref={editorAbleRef}></div>
      </div>
      <div style={{ display: selectedEditor === editorEnableRef1 ? 'block' : 'none', marginBottom: '20px', width: '500px', height: '50px' }}>
        <div ref={editorEnableRef1}></div>
      </div>
    </div>
  );
};
