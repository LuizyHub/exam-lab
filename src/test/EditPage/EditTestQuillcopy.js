import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function EditTestSplit() {
  // 각 에디터 블록에 대한 참조를 생성합니다.
  const editorRef = useRef(null);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

  const [editorBoolean, setEditorBoolean] = useState(false);

  const handleEditorBoolean = () => {

    setEditorBoolean(!editorBoolean);
    console.log(editorBoolean)
  }

  useEffect(() => {

    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        }
      });
    }
  }, []);

  useEffect(() => {
    // 첫 번째 에디터 블록에 대한 Quill 인스턴스를 생성합니다.
    if (editorRef1.current) {
      const quill1 = new Quill(editorRef1.current, {
        theme: 'snow',
        modules: {
          toolbar: editorBoolean ? true : false // 툴바를 활성화합니다.
        }
      });

      // quill1의 내용이 변경될 때마다 실행될 콜백 함수를 등록합니다.
      quill1.on('text-change', function () {
        const html = editorRef1.current.querySelector('.ql-editor').innerHTML;
        if (editorRef.current) {
          editorRef.current.querySelector('.ql-editor').innerHTML = html;
        }
      });

      // 선택 변경 이벤트 리스너를 추가합니다.
      quill1.on('selection-change', function (range, oldRange, source) {
        if (range) {
          if (range.length == 0) {
            console.log('User cursor is at index', range.index);
          } else {
            const startIndex = range.index;
            const endIndex = range.index + range.length;
            console.log('User has selected text from', startIndex, 'to', endIndex);
          }
        } else {
          console.log('User cursor is not in the editor');
        }
      });

    }

    // 두 번째 에디터 블록에 대한 Quill 인스턴스를 생성합니다.
    if (editorRef2.current) {
      const quill2 = new Quill(editorRef2.current, {
        theme: 'snow',
        modules: {
          toolbar: false // 툴바를 활성화합니다.
        }
      });
    }
  }, [editorBoolean]);

  return (
    <div>
      <div id="toolbar"></div>
      <div>
        <div style={{ marginBottom: '40px' }}>
          <div ref={editorRef}></div>{/* style={{ display: 'none' } */}
        </div>
        <button onClick={handleEditorBoolean}>Edit</button>
        <div ref={editorRef1} style={{ height: '200px', marginBottom: '20px' }} ></div>
        <div ref={editorRef2} style={{ height: '200px' }}></div>
      </div>
    </div >
  );
}
