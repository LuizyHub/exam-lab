import React, { useState, useEffect, useRef } from 'react';

export default function EditExam() {
  const [content, setContent] = useState('');
  const [isString, setString] = useState(''); //HTML로 받은 값을 문자열로 전환해서 저장하는 상태
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일들을 저장할 배열 상태

  // 여기서 우리가 style로 직접 주게된다면 style들을 저장하거나 해당 요소들을 확인 할 수 있는 코드를 작성해야한다.
  const imageSelectorRef = useRef(null); // 파일 선택 input 요소에 대한 참조
  const editorRef = useRef(null); //정확히 useRef를 사용하는 이유를 모르겠다.
  // const editorRef = React.createRef();

  //Document.execCommand()를 대체할 수 있는 코드를 찾아 수정해야한다.
  //이미지 압축 라이브러리를 찾아봐야한다.
  //이미지가 중복되는 경우 추가가 되지 않는다. 이에 맞는 로직을 새로 다시 구현해야한다.

  /**
  // contentEditable 요소에서 내용이 변경될 때 호출되는 함수
  const handleChange = (e) => {
    // HTML 내용 저장
    setHtmlContent(e.target.innerHTML);
    // 인라인 스타일 저장
    const computedStyle = window.getComputedStyle(e.target);
    const styleObject = {
      padding: computedStyle.padding,
      border: computedStyle.border,
      borderRadius: computedStyle.borderRadius,
      // 필요한 다른 스타일 속성들도 필요에 따라 추가할 수 있습니다.
    };
    setInlineStyle(styleObject);
  }; 
  */

  // 일반적인 target을 사용하면 e.target이 잘 감지되지 않을 때가 있다. 
  // 이유는 virtualDOM에 의한 이벤트 버블링이나 캡처링 단계에서 이벤트 타겟이 예상과 다를 수 있다.
  // 해결할 수 있는 방법을 여러가지이지만 currentTarge.value 를 사용했다. 
  const handleToolClick = (e) => {
    const element = e.currentTarget.value;
    console.log(element);
    setStyle(element);
    focusEditor();
  }

  //여기에 html로 저장이 될 수 있게 코드를 작성
  const handleSave = () => {
    const inputContent = editorRef.current.innerHTML; //여기에는 html 값이 들어간다.
    const stringContent = editorRef.current.outerHTML;
    setContent(inputContent);
    setString(stringContent);
    // console.log(content); //일반 적으로 HTML을 제외하고 출력
    console.log(`inputContent : ${inputContent}\nstringContent : ${stringContent}`); //inputContent는 일반 적으로 HTML을 제외하고 출력
    /** 
     * //아래와 같이 확인을 하면 DOM에 직접 적으로 접근을 하기 때문에 react에서 권장하는 방법이 아니다. 따라서 useRef를 통해서 
     * 참조로 접근을 해야한다.
    const elementBOM = document.querySelector('.editor');
    console.log(elementBOM.innerHTML); 
    */
    console.log(inputContent) //HTML의 모든 코드 저장 //현재 저장이 가능
  };

  // image uploading area
  // 에디터가 업데이트될 때 이미지 삽입
  useEffect(() => {
    if (editorRef.current && imageFiles.length > 0) {
      const file = imageFiles[imageFiles.length - 1];
      insertImageDate(file);
      console.log(imageFiles);
    }
  }, [editorRef.current, imageFiles]);

  const handleUploadImageClick = () => {
    // 파일 선택 input을 클릭합니다.
    imageSelectorRef.current.click();
  }

  const handleImageSelect = (e) => {
    const files = e.target.files;
    if (!!files && files.length > 0) {
      const file = files[0];
      // 이미지 파일 배열에 추가
      setImageFiles([...imageFiles, file]);
      // 이미지 파일 삽입 함수 호출
      // insertImageDate(file);
      // 이미지가 삽입된 후에 handleSave 호출 -> 
      //이부분을 통해서 값이 저정됨을 알 수 있다. 
      //하지만 값의 저장이 이미지를 로드해서 값이 저장된다는 단점이 있다 이를 해결 하기 위해선 어떻게 해야할까?
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
      // editorRef가 null이 아닌 경우에만 이미지를 삽입합니다.
      if (editorRef.current) {
        editorRef.current.appendChild(imgElement);
      } else {
        console.error("Editor reference is null.");
      }
    };
    reader.readAsDataURL(file);
  };

  const focusEditor = () => {
    editorRef.current.focus({ preventScroll: true });
  };

  /* 아직 각 스타일을 적용 미적용이 불가능 한다. */
  function setStyle(command) {
    // CSS 스타일을 직접 설정하도록 변경
    const editor = editorRef.current;
    switch (command) {
      case 'bold':
        editor.style.fontWeight = 'bold';
        break;
      case 'italic':
        editor.style.fontStyle = 'italic';
        break;
      case 'underline':
        editor.style.textDecoration = 'underline';
        break;
      case 'strikeThrough':
        document.execCommand('strikeThrough');
        break;
      case 'insertOrderedList':
        document.execCommand('insertOrderedList');
        break;
      case 'insertUnorderedList':
        document.execCommand('insertUnorderedList');
        break;
      default:
        break;
    }
    focusEditor();
  }

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
        <button onClick={handleUploadImageClick} style={{ marginRight: '5px' }}>IMG</button>
      </div>
      {/* 파일을 */}
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
        dangerouslySetInnerHTML={{ __html: content }}
        // onChange={handleChange} // 내용이 변경될 때 handleChange 함수 호출
        ref={editorRef}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px' }}
      />
      <button onClick={handleSave}>저장</button>
      <div>
        <p>Content in useState(include HTML tag):</p>
        {isString}
      </div>
    </div>
  );
}
