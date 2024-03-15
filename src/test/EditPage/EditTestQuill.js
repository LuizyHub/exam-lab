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

  // useEffect(() => {
  //   let quill1;

  //   if (editorRef1.current) {
  //     const quill1 = new Quill(editorRef1.current, {
  //       theme: 'snow',
  //       modules: {
  //         toolbar: editorBoolean ? toolbarOptions : false // 툴바를 활성화 또는 비활성화합니다.
  //       }
  //     });

  //     // 새로운 Quill 인스턴스 생성
  //     quill1 = new Quill(editorRef1.current, {
  //       theme: 'snow',
  //       modules: {
  //         toolbar: editorBoolean ? true : false // 툴바를 활성화합니다.
  //       }
  //     });

  //     // 클리업 함수 반환
  //     return () => {
  //       if (quill1) {
  //         quill1.off('text-change');
  //         quill1.off('selection-change');
  //         quill1 = null;
  //       }
  //     };
  //   }
  // }, [editorBoolean]);

  useEffect(() => {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ];

    if (editorRef1.current) {
      const quill1 = new Quill(editorRef1.current, {
        theme: 'snow',
        modules: {
          toolbar: editorBoolean ? toolbarOptions : false // 툴바를 활성화 또는 비활성화합니다.
        }
      });

      // 클린업 함수 반환
      return () => {
        quill1.off('text-change');
        quill1.off('selection-change');
      };
    }
  }, [editorBoolean]);


  // // 두 번째 에디터 블록에 대한 Quill 인스턴스를 생성합니다.
  // if (editorRef2.current) {
  //   const quill2 = new Quill(editorRef2.current, {
  //     theme: 'snow',
  //     modules: {
  //       toolbar: false // 툴바를 활성화합니다.
  //     }
  //   });
  // }

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
