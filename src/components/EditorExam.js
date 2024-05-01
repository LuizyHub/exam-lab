import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImageSize } from '../function/imageHandle';
import { DataHandle } from '../function/dataHandle';
import formData from "../function/formData"
import EditorTool from '../components/EditorTool';

import axios from 'axios';

export default function EditorExam({ type }) {
  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImageSize();
  const { handleContent, handleFileObject, handleIdContent, imageReplace } = DataHandle();
  // const { sendData } = formData();
  // const [contentType1, setContentType1] = useState('type');
  // const [contentType2, setContentType2] = useState('type');
  // const [contentType3, setContentType3] = useState('type');

  const imageSelectorRef1 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef2 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef3 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조

  //*editorRefN은 이후에 해당 컴포넌트(contentEditable)가 생성되면 함께 생성이 되어야 한다.
  const editorRef1 = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함
  const editorRef2 = useRef(null);
  const editorRef3 = useRef(null);

  const [isUrlOut, setUrlOut] = useState([]);
  const [isUrlIn, setUrlIn] = useState([]);
  const [isUrlInId, setUrlInId] = useState([]);
  const [isData, setData] = useState({
    question: '',
    options: [],
    imageUrlOut: [],
    imageUrlIn: [],
  });

  // const [isCurrentId, setCurrentId] = useState();
  let ID = "";

  const sendData = () => {
    // const URL = 'http://localhost:3001/sample'
    // const URL = 'exam-lab.store/api/v1/4/question'
    const URL = '/api/v1/exams/3/questions'
    const formData = new FormData();

    const questionUploadInfo = new Blob([JSON.stringify({
      type: "객관식",
      question: isData.question,
      options: isData.options,
      questionImagesTextIn: [{ url: "", description: "설명", attribute: "속성" }],
      questionImagesTextIn: [{ url: "", description: "설명", attribute: "속성" }],
      // questionImagesTextOut: [{ url: "", description: "설명", attribute: "속성" }],
      answers: ["0"],
      tags: { "category": ["test"] },
      commentary: ""
      // commentaryImagesTextIn: [{ url: "", description: "설명", attribute: "속성" }],
      // commentaryImagesTextOut: [{ url: "", description: "설명", attribute: "속성" }]
    })], {
      type: 'application/json'
    });
    formData.append('questionUploadInfo', questionUploadInfo);
    // formData.append('questionImagesIn', isUrlIn[0]);
    isUrlIn.forEach((image) => {
      console.log(image.name);
      formData.append('questionImagesIn', image);
    });



    // formData.append(`type`, '객관식');
    // formData.append('question', isData.question); // 질문
    // isData.options.forEach((option, index) => {
    //   formData.append(`options[${index}]`, option); // 선택지
    // });
    // formData.append(`questionImagesIn`, isUrlIn[0]);
    // isUrlIn.forEach((url) => {
    //   // const imageData = {
    //   //   url: "",
    //   //   description: "설명",
    //   //   attribute: "속성"
    //   // };
    //   //   // FormData에 해당 객체를 추가합니다.
    //   //   formData.append(`questionImagesIn`, JSON.stringify(imageData));
    //   formData.append(`questionImagesIn`, url);
    // });
    // isUrlOut.forEach((url, index) => {
    //   const imageData = {
    //     url: url,
    //     description: "",
    //     attribute: ""
    //   };
    //   // FormData에 해당 객체를 추가합니다.
    //   formData.append(`questionImagesIn[${index}]`, JSON.stringify(imageData));
    // });
    // formData.append(`answers[]`, '');

    // // tags 객체에 빈 배열 추가
    // formData.append(`tags[category][]`, '');

    // // commentary에 빈 문자열 추가
    // formData.append(`commentary`, '');

    // // commentaryImagesTextIn 배열에 빈 객체 추가
    // formData.append(`commentaryImagesTextIn[][url]`, '');
    // formData.append(`commentaryImagesTextIn[][description]`, '');
    // formData.append(`commentaryImagesTextIn[][attribute]`, '');

    // // commentaryImagesTextOut 배열에 빈 객체 추가
    // formData.append(`commentaryImagesTextOut[][url]`, '');
    // formData.append(`commentaryImagesTextOut[][description]`, '');
    // formData.append(`commentaryImagesTextOut[][attribute]`, '');
    // try {
    //   // axios를 사용하여 FormData를 서버로 전송
    //   const response = await axios.post(URL, formData, {
    //     headers: {
    //     }
    //   });

    //   console.log(response.data); // 서버에서 받은 응답 데이터
    //   alert("저장");
    // } catch (error) {
    //   // 요청이 실패했을 때 실행되는 코드
    //   console.error('에러 발생:', error);
    //   // 오류 처리 추가 가능
    // }


    // const file = new File([isUrlIn[0]], 'image.png', { type: 'image/png' });
    // formData.append('questionImagesIn', file);


    console.log([...formData.entries()]);
    axios.post(URL, formData, {
      headers: {
      }
    })
      .then((response) => {
        // 응답 받은 메시지 상태 업데이트
        console.log(response.data.message);
        // setCurrentId(response.data.message);
        console.log(typeof (response.data.message));
        const message = response.data.message;
        ID = message;
        // console.log(response.data.question);
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
      });
  };

  // const handleContentType1 = (e) => {
  //   const contentType = e.currentTarget.value;
  //   setContentType1(contentType);
  // }

  // const handleContentType2 = (e) => {
  //   const contentType = e.currentTarget.value;
  //   setContentType2(contentType);
  // }

  // const handleContentType3 = (e) => {
  //   const contentType = e.currentTarget.value;
  //   setContentType3(contentType);
  // }

  return (
    <div>
      {/* <select value={contentType1} onChange={handleContentType1}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select> */}

      <EditorTool
        editorRef={editorRef1}
        contentType={'문제'}
        // handleContentType={handleContentType1}
        handleToolClick={handleToolClick}
        imageSelectorRef={imageSelectorRef1}
        handleImgToolClick={handleImgToolClick}
        isImageSize={isImageSize}
        handleImgSize={handleImgSize}
      />

      {/* 이미지 파일 load */}
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef1}
        onChange={(e) => {

          //blob : 로컬 이미지 가져온 url값을 저장하고 해당 이미지를 생성해서 렌더링하기 수행한다
          const result = handleImageSelect(e, editorRef1);
          console.log(result);
          setUrlIn(prevState => [...prevState, result]);
          setUrlInId(prevState => [...prevState, result.name])
          //업로드 되면서 공백 없이 바로 question에 존재하는 html입력 값을 확인
          //-> 초기값ㄴ
          const isQuestion = editorRef1.current.innerHTML;//
          const imageReplaceResult = imageReplace(isQuestion);
          console.log(imageReplaceResult);
          setData(
            prevState => ({
              ...prevState,
              question: imageReplaceResult
            }));

          // 새로운 이미지 업로드가 되면 객체 생성
          // const newImageObject = {
          //   url: '',
          //   description: '', // 이미지 설명
          //   attribute: '' // 이미지 속성
          // };

          // setData(prevState => ({
          //   ...prevState,
          //   imageUrlIn: [...prevState.imageUrlIn, newImageObject]
          // }));

        }}
      />

      {/* contentEditable */}
      <div
        className="editor"
        contentEditable="true"
        ref={editorRef1}
        onDragOver={(e) => e.preventDefault()}
        onCopy={(e) => {
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
        }} // 이미지 복사 동작 막기
        onCut={(e) => {
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
        }} // 이미지 잘라내기 동작 막기
        onPaste={(e) => {
          // 에디터 내에서 이미지 잘라내기 동작 막기
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
          //외부 이미지 붙혀넣기 동작 막기
          const items = (e.clipboardData || e.originalEvent.clipboardData).items;
          let hasImage = false;
          for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image')) {
              hasImage = true;
              break;
            }
          }
          if (hasImage) {
            e.preventDefault();
          }
        }} // 이미지 붙여넣기 동작 막기


        onInput={() => { //이곳에서 type이 변경되면 변경된다는 것이 나와야함
          //==================================== setData
          const isQuestion = editorRef1.current.innerHTML;

          //해당 setData는 이미지가 업로드
          //isQuestion 부분이 한번 가공되고 저장이 되어야 함
          const imageReplaceResult = imageReplace(isQuestion);
          console.log(imageReplaceResult);
          setData(
            prevState => ({
              ...prevState,
              question: imageReplaceResult
            }));

          //==================================== setUrlIn
          const resultEdit = handleFileObject(editorRef1, isUrlInId, isUrlIn);
          const resultId = handleIdContent(editorRef1, isUrlInId)
          console.log(resultEdit);
          setUrlIn(resultEdit);
          setUrlInId(resultId);

          // const imageUrlInLength = resultEdit.length;

          // // imageUrlIn의 길이만큼 객체가 존재하지 않을 경우 새로운 객체를 추가
          // setData(prevState => ({
          //   ...prevState,
          //   imageUrlIn: imageUrlInLength > 0 ? prevState.imageUrlIn : Array.from({ length: imageUrlInLength }, () => ({}))
          // }));

        }}

        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      {/* ------------------------------------------------------------------------ */}

      {/* <select value={contentType2} onChange={handleContentType2}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select> */}

      <EditorTool
        editorRef={editorRef2}
        contentType={'이미지'}
        // handleContentType={handleContentType2}
        handleToolClick={handleToolClick}
        imageSelectorRef={imageSelectorRef2}
        handleImgToolClick={handleImgToolClick}
        isImageSize={isImageSize}
        handleImgSize={handleImgSize}
      />

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef2}
        onChange={(e) => {

          const result = handleImageSelect(e, editorRef2);
          setUrlOut(prevState => [...prevState, result]);

          const newImageObject = {
            url: '',
            description: '', // 이미지 설명
            attribute: '' // 이미지 속성
          };

          setData(prevState => ({
            ...prevState,
            imageUrlOut: [...prevState.imageUrlOut, newImageObject]
          }));
        }}
      />
      <div
        className="editor"
        contentEditable="true"
        ref={editorRef2}
        onDragOver={(e) => e.preventDefault()}
        onCopy={(e) => {
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
        }} // 이미지 복사 동작 막기
        onCut={(e) => {
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
        }} // 이미지 잘라내기 동작 막기
        onPaste={(e) => {
          // 에디터 내에서 이미지 잘라내기 동작 막기
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
          //외부 이미지 붙혀넣기 동작 막기
          const items = (e.clipboardData || e.originalEvent.clipboardData).items;
          let hasImage = false;
          for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image')) {
              hasImage = true;
              break;
            }
          }
          if (hasImage) {
            e.preventDefault();
          }
        }} // 이미지 붙여넣기 동작 막기

        onInput={() => {
          const result = handleContent(editorRef2, isUrlOut);
          setUrlOut(result);
          console.log(result);

          const resultEdit = handleContent(editorRef2, isUrlOut);
          setUrlIn(resultEdit);

          const imageUrlOutLength = resultEdit.length;

          // imageUrlIn의 길이만큼 객체가 존재하지 않을 경우 새로운 객체를 추가
          setData(prevState => ({
            ...prevState,
            imageUrlOut: imageUrlOutLength > 0 ? prevState.imageUrlOut : Array.from({ length: imageUrlOutLength }, () => ({}))
          }));
        }}

        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      {/* ------------------------------------------------------------------------ */}

      {/* <select value={contentType3} onChange={handleContentType3}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select> */}

      <EditorTool
        editorRef={editorRef3}
        contentType={'선택지'}
        // handleContentType={handleContentType3}
        handleToolClick={handleToolClick}
        imageSelectorRef={imageSelectorRef3}
        handleImgToolClick={handleImgToolClick}
        isImageSize={isImageSize}
        handleImgSize={handleImgSize}
      // handleContent={() => { handleContent(editorRef3) }}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef3}
        onChange={(e) => { handleImageSelect(e, editorRef3) }}
      />

      <div
        className="editor"
        contentEditable="true"
        ref={editorRef3}
        onDragOver={(e) => e.preventDefault()}
        onCopy={(e) => {
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
        }} // 이미지 복사 동작 막기
        onCut={(e) => {
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
        }} // 이미지 잘라내기 동작 막기
        onPaste={(e) => {
          // 에디터 내에서 이미지 잘라내기 동작 막기
          if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
          }
          //외부 이미지 붙혀넣기 동작 막기
          const items = (e.clipboardData || e.originalEvent.clipboardData).items;
          let hasImage = false;
          for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image')) {
              hasImage = true;
              break;
            }
          }
          if (hasImage) {
            e.preventDefault();
          }
        }} // 이미지 붙여넣기 동작 막기


        onInput={() => {
          const isOptions = editorRef3.current.innerHTML;

          // 줄 바꿈을 기준으로 배열을 분할하고, 필터링하여 빈 문자열을 제거합니다.
          const optionsArray = isOptions.split('\n').filter(option => option.trim() !== '');

          // <div>을 기준으로 분할하고, 각 요소를 trim하여 새로운 배열을 생성합니다.
          const splitOptionsArray = optionsArray.flatMap(option => option.split('<div>').map(text => text.trim()));
          const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));

          setData(prevState => ({ ...prevState, options: isOptionsArray }));
        }}

        style={{
          padding: '16px 24px',
          border: '1px solid #D6D6D6',
          borderRadius: '4px',
          width: '600px',

        }}
      />

      <button type='submit' onClick={() => {
        sendData();
      }}>생성</button>
      <button onClick={() => {
        console.log("삭제");
        console.log(isUrlIn);
        console.log(ID);
        const URL = `/api/v1/questions/${ID}`
        axios.delete(URL, {
          // 필요한 경우 헤더를 설정할 수 있습니다.
        })
          .then((response) => {
            // 응답 받은 메시지 상태 업데이트
            console.log(response.data.message);
          })
          .catch((error) => {
            // 오류 처리
            console.log(error);
          });
      }
      }>삭제</button>
      <button onClick={() => {
        console.log(isUrlIn);
        console.log(
          "저장된 API question 값 : " + isData.question
          + "\n저장된 imageIn 값 : " + isUrlIn[0]
          // + "\n저장된 imageIn name : " + isUrlIn[0].name
          + "\n저장된 isUrlInId name : " + isUrlInId[0]
          + "\n저장된 imageOut 값 : " + isUrlOut
          + "\n저장된 API options 값 : " + isData.options
        );
        console.log("저장된 imageUrlIn 객체 값 : ", isData.imageUrlIn);
        console.log("저장된 imageUrlOut 객체 값 : ", isData.imageUrlOut);
        isUrlInId.forEach((imageId) => { console.log(imageId) })

        console.log(ID);
      }}>확인</button>
    </div >
  );
}
