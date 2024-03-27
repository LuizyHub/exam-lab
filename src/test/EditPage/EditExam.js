import React, { useState, useEffect, useRef } from 'react';
import { isElement } from 'react-dom/test-utils';

export default function EditExam() {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일들을 저장할 배열 상태-> 이부분 수정 필요 정확히 역할은?
  const [imageUrl, setImageUrl] = useState([]); //이미지 url값을 저장.. 배열로
  const [isImageSize, setImageSize] = useState(50); //이미지 크기 값 저장
  // 여기서 우리가 style로 직접 주게된다면 style들을 저장하거나 해당 요소들을 확인 할 수 있는 코드를 작성해야한다.
  const imageSelectorRef = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const editorRef = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함
  // 객체로 저장
  const [editorState, setEditorState] = useState({
    type: '',
    content: '',
    imageUrl: []
  });

  // const { contentOBJ, imageFilesOBJ, imageUrlOBJ } = editorState;

  //---------------------------------------------------------------------- Tool Click area
  const focusEditor = () => {
    editorRef.current.focus({ preventScroll: true });
  };

  //execCommand를 기준으로 생성된 코드
  function setStyle(style) {
    document.execCommand(style);
    focusEditor();
  }

  const handleToolClick = (e) => {
    const element = e.currentTarget.name;
    //객체 저장
    console.log(element);
    setStyle(element);
    focusEditor();
  }
  //contentType
  const handleContentType = (e) => { //여기서 setContentType이 적용이 되기 때문에 
    //----------------------------------------------------------------------------------------------------------- content를 저장하는 부분
    const contentType = e.currentTarget.value;
    setContentType(contentType);
    // setEditorState({ ...editorState, type: contentType });
    // console.log(editorState);
  }

  const handleImgToolClick = () => {//imageSelectorRef와 유사하게 작명이 필요하다. 즉, ref를 통해서 동작하는 fn명은 유사할 필요가 있다.
    // 파일 선택 input을 클릭합니다.
    imageSelectorRef.current.click();
  }


  //---------------------------------------------------------------------- save data area
  //여기에 html로 저장이 될 수 있게 코드를 작성
  //이 코드가 납득이 안된다..
  const handleContent = () => {
    //----------------------------------------------------------------------------------------------------------- content를 저장하는 부분
    const inputContent = editorRef.current.innerHTML; //여기에는 html의 입력란을 제외한 html이 값이 들어간다.
    setContent(inputContent);
    // setEditorState({ ...editorState, content: inputContent }); //객체에 배열값을 저장하는 코드
    // console.log("Updated editorState:", editorState); // editorState 값을 확인
    console.log(contentType, content, imageUrl);
  };

  //어떤 동작을 해도 데이터를 저장하는 코드
  useEffect(() => {
    handleContent();
  }, [content, contentType, imageUrl]);

  //---------------------------------------------------------------------- image uploading area


  // 에디터가 업데이트될 때 이미지 삽입
  /** 
  왜 useEffect를 사용해야 하는건가? -> 렌더링 문제 때문에 그렇다. 더 명확한 답이 필요하다.
  useEffect(() => {
    if (editorRef.current && imageFiles.length > 0) {
      const file = imageFiles[imageFiles.length - 1];
      insertImageData(file, 300);//이미지 크기를 인자로 전달 그리고 조절
    }
  }, [imageFiles]);
*/
  // 이미지 선택 핸들러
  const handleImageSelect = (e) => {
    const files = e.target.files;
    if (!!files && files.length > 0) {
      const file = files[0];
      // 이미지 크기 제한
      const maxSizeInBytes = 1e6; // 1MB
      if (file.size > maxSizeInBytes) {
        alert('이미지 크기가 너무 큽니다. 1MB보다 작은 파일을 선택해주세요.');
        return;
      }
      // 이미지 포맷 확인
      if (!file.name.toLowerCase().endsWith('.png')) {
        alert('이미지 형식은 PNG만 지원합니다.');
        return;
      }

      // 이미지 파일을 읽어들임
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;
        //--------------------------------------------------------------------------------------------- 이미지 URL 배열에 추가
        setImageUrl([...imageUrl, imageDataUrl]);
        // 이미지 삽입
        insertImageData(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삽입 함수
  const insertImageData = (imageDataUrl) => {
    const imgElement = document.createElement('img');
    imgElement.src = imageDataUrl;
    // 이미지 크기를 조절
    imgElement.style.maxWidth = '50%';
    imgElement.style.height = 'auto';
    // 에디터에 이미지 삽입
    if (editorRef.current) {
      editorRef.current.appendChild(imgElement);
    } else {
      console.error("Editor reference is null.");
    }
  };

  //----------------------------------------------------클릭된 이미지 확인 하는 코드
  const handleImageCheck = (imgElement, size) => {
    // const queryImage = document.querySelector('img');
    // console.log(queryImage);
    //해당 이미지가 생성되어 있는 요소이기에 addEventlistener로 접근해야한다.
    imgElement.addEventListener('click', () => {
      console.log(imgElement);
      let currentSize = parseInt(imgElement.style.maxWidth);
      currentSize = size; // 예시로 10% 감소시킵니다.
      imgElement.style.maxWidth = `${currentSize}%`;
    });
  };

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
        <button name='bold' onClick={handleToolClick} style={{ marginRight: '5px' }}><b>B</b></button>
        <button name='italic' onClick={handleToolClick} style={{ marginRight: '5px' }}><i>I</i></button>
        <button name='underline' onClick={handleToolClick} style={{ marginRight: '5px' }}><u>U</u></button>
        <button name='strikeThrough' onClick={handleToolClick} style={{ marginRight: '5px' }}><s>S</s></button>
        <button onClick={handleImgToolClick} style={{ marginRight: '5px' }}>IMG</button>

        <input type='number' value={isImageSize} onChange={(e) => {
          const Image = document.querySelector('img');
          const value = parseInt(e.target.value); //이벤트로 가져온 value
          setImageSize(value); //아직 딜레이가 있음 이걸 해결 해야함
          console.log(value)
          Image.style.maxWidth = `${isImageSize}%`;
          console.log(Image);
        }} style={{ width: '60px' }} />
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
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />
      <button onClick={handleContent}>저장</button>

      <div>
        <p>Content in useState(include HTML tag):</p>
        {content}
      </div>
    </div>
  );
}
