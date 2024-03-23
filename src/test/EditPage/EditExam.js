import React, { useState, useEffect, useRef } from 'react';

export default function EditExam() {
  const [content, setContent] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일들을 저장할 배열 상태
  const [imageUrl, setImageUrl] = useState([]);

  // 여기서 우리가 style로 직접 주게된다면 style들을 저장하거나 해당 요소들을 확인 할 수 있는 코드를 작성해야한다.
  const imageSelectorRef = useRef(null); // 파일 선택 input 요소에 대한 참조
  const editorRef = useRef(null); //정확히 useRef를 사용하는 이유를 모르겠다.

  //---------------------------------------------------------------------- Tool Click area
  const focusEditor = () => {
    editorRef.current.focus({ preventScroll: true });
  };

  // execCommand를 기준으로 생성된 코드
  function setStyle(style) {
    document.execCommand(style);
    focusEditor();
  }

  const handleToolClick = (e) => {
    const element = e.currentTarget.value;
    console.log(element);
    setStyle(element);
    focusEditor();
  }

  const handleImgToolClick = () => {
    // 파일 선택 input을 클릭합니다.
    imageSelectorRef.current.click();
  }

  //---------------------------------------------------------------------- save data area
  //여기에 html로 저장이 될 수 있게 코드를 작성
  const handleSave = () => {
    const inputContent = editorRef.current.innerHTML; //여기에는 html의 입력란을 제외한 html이 값이 들어간다.
    setContent(inputContent);
    console.log(`inputContent : ${inputContent}`); //inputContent는 일반 적으로 HTML을 제외하고 출력
    // console.log(imageFiles)
    console.log(imageUrl)
  };

  //---------------------------------------------------------------------- image uploading area
  // 에디터가 업데이트될 때 이미지 삽입
  useEffect(() => {
    if (editorRef.current && imageFiles.length > 0) {
      const file = imageFiles[imageFiles.length - 1];
      insertImageDate(file);
    }
  }, [editorRef.current, imageFiles]);


  const handleImageSelect = (e) => {
    const files = e.target.files;
    if (!!files && files.length > 0) {
      const file = files[0];//?
      // 이미지 파일 배열에 추가
      setImageFiles([...imageFiles, file]);

      handleSave();
    }
  };

  //이미지를 삽입하고 렌더링하는 함수
  const insertImageDate = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;
      // 이미지를 삽입합니다.
      const imgElement = document.createElement('img');
      imgElement.src = imageDataUrl;
      setImageUrl([...imageUrl, imgElement.src]);
      // editorRef가 null이 아닌 경우에만 이미지를 삽입합니다.
      if (editorRef.current) {
        editorRef.current.appendChild(imgElement);
      } else {
        console.error("Editor reference is null.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Test</h1>
      <div className="editor-menu" style={{ marginBottom: '10px' }}>
        <button value='bold' onClick={handleToolClick} style={{ marginRight: '5px' }}><b>B</b></button>
        <button value='italic' onClick={handleToolClick} style={{ marginRight: '5px' }}><i>I</i></button>
        <button value='underline' onClick={handleToolClick} style={{ marginRight: '5px' }}><u>U</u></button>
        <button value='strikeThrough' onClick={handleToolClick} style={{ marginRight: '5px' }}><s>S</s></button>
        <button value='insertOrderedList' onClick={handleToolClick} style={{ marginRight: '5px' }}>OL</button>
        <button value='insertUnorderedList' onClick={handleToolClick} style={{ marginRight: '5px' }}>UL</button>
        <button onClick={handleImgToolClick} style={{ marginRight: '5px' }}>IMG</button>
      </div>

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef}
        onChange={handleImageSelect}
      />

      <div
        className="editor"
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: content }} //content HTML문자열을 일반 문자열로 렌더링
        ref={editorRef}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px' }}
      />

      <button onClick={handleSave}>저장</button>
      <div>
        <p>Content in useState(include HTML tag):</p>
        {content}
      </div>
    </div>
  );
}
