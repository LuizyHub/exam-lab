import React, { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';

export default function EditExam() {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('');
  // const [imageFiles, setImageFiles] = useState([]); // 이미지 파일들을 저장할 배열 상태-> 이부분 수정 필요 정확히 역할은?

  const [isImageUrl, setImageUrl] = useState([]); //이미지 url값을 저장.. 배열로
  const [isImageId, setImageId] = useState([]); // 이미지의 ID를 저장하는 상태 변수
  const [isImageSize, setImageSize] = useState(50); //이미지 크기 값 저장

  const [selectedImage, setSelectedImage] = useState(null); // 클릭된 이미지 정보를 저장할 상태 변수

  // 여기서 우리가 style로 직접 주게된다면 style들을 저장하거나 해당 요소들을 확인 할 수 있는 코드를 작성해야한다.
  const imageSelectorRef = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const editorRef = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함
  // 객체로 저장
  // const [editorState, setEditorState] = useState({
  //   type: '',
  //   content: '',
  //   isImageUrl: []
  // });

  //어떤 동작을 해도 데이터를 저장하는 코드
  useEffect(() => {
    handleContent();//저장만 되게 해야하는데 여기서 계속해서 이미지의 url을 확인하고 저장하고 있음
  }, [content, contentType]);


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

  //tool button ctrl
  const handleImgToolClick = () => {//imageSelectorRef와 유사하게 작명이 필요하다. 즉, ref를 통해서 동작하는 fn명은 유사할 필요가 있다.
    // 파일 선택 input을 클릭합니다.
    imageSelectorRef.current.click();
  }

  const handleImgSize = (e) => {
    const value = parseInt(e.currentTarget.value); //이벤트로 가져온 value
    if (selectedImage) {
      // 선택된 이미지가 있는 경우에만 이미지 크기 업데이트
      selectedImage.style.maxWidth = `${value}%`; // 선택된 이미지의 스타일 변경
    }

    setImageSize(value);
    console.log(value);
  }

  //---------------------------------------------------------------------- save data area
  // 이미지 추적 후 여기에 html로 저장이 될 수는 함수
  const handleContent = () => {
    // content를 저장하는 부분
    const inputContent = editorRef.current.innerHTML;
    setContent(inputContent);
    console.log(`Data push : ${contentType}, ${content}, ${isImageUrl}`);

    // 이미지 추적
    const parsedContent = parse(inputContent);
    let hasImages = false;
    const updatedImageIds = [...isImageId]; // 새로운 이미지 ID 배열
    const updatedImageUrls = [...isImageUrl]; // 새로운 이미지 URL 배열

    React.Children.forEach(parsedContent, child => {
      if (child.type === 'img') {
        hasImages = true;
        const imageUrl = child.props.src;
        const imageId = child.props.id; // 이미지에 고유 아이디가 있다

        // 이미지가 배열에 없는 경우에만 추가합니다.
        if (!updatedImageIds.includes(imageId)) {
          updatedImageIds.push(imageId);
        }

        if (!updatedImageUrls.includes(imageUrl)) {
          updatedImageUrls.push(imageUrl);
        }
        // console.log('이미지 imageUrl', imageUrl);
      }
    });

    // 이미지가 포함되지 않은 경우에는 imageIds와 imageUrls를 비웁니다.
    if (!hasImages && (isImageId.length > 0 || isImageUrl.length > 0)) {
      console.log('이미지가 포함되지 않았습니다. 이미지 ID와 URL을 초기화합니다.');
      setImageId([]);
      setImageUrl([]);
    } else {
      setImageId(updatedImageIds); // 새로운 이미지 ID 배열로 업데이트합니다.
      setImageUrl(updatedImageUrls); // 새로운 이미지 URL 배열로 업데이트합니다.
    }

    //이미지 정규식으로 추출 및 추적
    // --------------------------------------------------------- 이미지 태그의 id를 추출하는 정규 표현식
    const imgIdRegex = /<img.*?id="(.*?)".*?>/g;

    // inputContent에서 이미지 태그의 id를 추출하여 배열에 저장
    const imageIdsInContent = [];
    let idMatch;
    while ((idMatch = imgIdRegex.exec(inputContent)) !== null) {
      imageIdsInContent.push(idMatch[1]);
    }

    // 이미지가 삭제되었는지 확인하고, 해당 아이디가 없는 경우 배열에서 제거합니다.
    const remainingImageIds = updatedImageIds.filter(id => {
      return imageIdsInContent.includes(id);
      // if (isImageUrl.includes(src)) {
      //   console.log(src);
      // }
    });

    setImageId(remainingImageIds);
    console.log('이미지의 ID:', isImageId);

    // ---------------------------------------------------------------- 이미지 태그의 url로 추출하는 정규 표현식
    // 이미지 태그의 src를 추출하는 정규 표현식
    const imgSrcRegex = /<img.*?src="(.*?)".*?>/g;

    // inputContent에서 이미지 태그의 src를 추출하여 배열에 저장
    const imageUrlsInContent = [];
    let urlMatch;
    while ((urlMatch = imgSrcRegex.exec(inputContent)) !== null) {
      imageUrlsInContent.push(urlMatch[1]);
    }

    // 이미지가 삭제되었는지 확인하고, 해당 URL이 없는 경우 배열에서 제거합니다.
    const remainingImageUrls = updatedImageUrls.filter(url => {
      return imageUrlsInContent.includes(url);
    });

    setImageUrl(remainingImageUrls);
    console.log('이미지의 Url:', isImageUrl);

    // if (hasImages) {
    //   console.log('이미지가 포함되어 있습니다.');
    // } else {
    //   console.log('이미지가 포함되어 있지 않습니다.');
    // }
  };


  //---------------------------------------------------------------------- image uploading area

  // 로컬 이미지 선택 및 규격 설정 핸들러
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

      readImageData(file);

    }
  };

  // 이미지를 렌더링하는 함수
  const readImageData = (file) => {
    // 이미지 파일을 읽어들임
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;
      //--------------------------------------------------------------------------------------------- 이미지 URL 배열에 추가
      // setImageUrl([...isImageUrl, imageDataUrl]);
      // 이미지 삽입
      insertImageConfig(imageDataUrl);
    };
    reader.readAsDataURL(file);
  }

  // 고유한 아이디 생성 함수
  const generateUniqueId = () => {
    return 'img_' + Math.random().toString(36).slice(2, 11); // 랜덤한 문자열을 이용한 고유 아이디 생성
  };

  // 이미지 삽입, 이미지 설정 함수
  const insertImageConfig = (imageDataUrl) => {

    const imgElement = document.createElement('img');
    const imageId = generateUniqueId(); // 고유한 아이디 생성

    imgElement.setAttribute('id', imageId); // 이미지에 아이디 설정
    imgElement.src = imageDataUrl;

    // 초기 이미지 크기 값 설정
    const imageSize = imgElement.style.maxWidth = '50%';
    imgElement.style.height = 'auto';

    // 이미지 클릭 이벤트 핸들러 추가
    imgElement.onclick = (e) => {
      const imageSize = parseInt(e.target.style.maxWidth); // 클릭된 이미지의 크기 가져오기
      setImageSize(imageSize);
      setSelectedImage(e.target); // 클릭된 이미지 정보 저장
      console.log(e.target);
    };

    // 에디터에 이미지 DOM에 삽입
    if (editorRef.current) {
      editorRef.current.appendChild(imgElement);
    } else {
      console.error("Editor reference is null.");
    }

  }

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

        <input type='number' value={isImageSize} onChange={handleImgSize} style={{ width: '60px' }} />
      </div>

      <input
        type="file"
        accept="image/*"
        // style={{ display: 'none' }}
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
