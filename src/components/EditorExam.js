import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImage } from '../function/useImage';
import { handleData } from '../function/handleData';
import EditorTool from '../components/EditorTool';

import axios from 'axios';

export default function EditorExam() {
  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImage();
  const { handleFileObject, handleIdContent, imageReplace } = handleData();
  // const { sendPostData } = formData();

  const imageSelectorRef1 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef2 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef3 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조

  //*editorRefN은 이후에 해당 컴포넌트(contentEditable)가 생성되면 함께 생성이 되어야 한다.
  const editorRef1 = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함
  const editorRef2 = useRef(null);
  const editorRef3 = useRef(null);

  const [isUrlOut, setUrlOut] = useState([]);
  const [isUrlOutId, setUrlOutId] = useState([]);
  const [isUrlIn, setUrlIn] = useState([]);
  const [isUrlInId, setUrlInId] = useState([]);
  //단일로 수정
  const [isData, setData] = useState({
    question: '',
    options: [],
  });

  const [ID, setID] = useState("");

  const sendPostData = () => {

    const URL = '/api/v1/exams/3/questions'
    const formData = new FormData();

    const questionImagesTextIn = [];
    isUrlIn.forEach(image => {
      const questionImage = { url: "", description: "설명", attribute: "속성" };
      questionImagesTextIn.push(questionImage);
    });

    const questionImagesTextOut = [];
    isUrlOut.forEach(image => {
      const questionImage = { url: "", description: "설명", attribute: "속성" };
      questionImagesTextOut.push(questionImage);
    });

    const questionUploadInfo = new Blob([JSON.stringify({
      type: "객관식",
      question: isData.question,
      options: isData.options,
      questionImagesTextIn: questionImagesTextIn,
      questionImagesTextOut: questionImagesTextOut,
      answers: ["0"],
      tags: { "category": ["test"] },
      commentary: ""
      //해답지
      // commentaryImagesTextIn: [{ url: "", description: "설명", attribute: "속성" }],
      // commentaryImagesTextOut: [{ url: "", description: "설명", attribute: "속성" }]
    })], {
      type: 'application/json'
    });
    formData.append('questionUploadInfo', questionUploadInfo);

    isUrlIn.forEach((image) => {
      console.log(image.name);
      formData.append('questionImagesIn', image);
    });
    //questionImagesOut
    isUrlOut.forEach((image) => {
      console.log(image.name);
      formData.append('questionImagesOut', image);
    });

    console.log([...formData.entries()]);

    axios.post(URL, formData)
      .then((response) => {
        console.log(response.data.message);
        console.log(response.data);
        const message = response.data.message;
        setID(message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendDeleteData = () => {
    console.log("삭제");
    console.log(isUrlIn);
    console.log(ID);
    const URL = `/api/v1/questions/${ID}`
    // const URL = `/api/v1/questions/671eb7d7-2cc6-446d-8790-83cb0bd8cddc`
    axios.delete(URL, {
    })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const sendPutData = () => {
    console.log("수정");
    const URL = `/api/v1/questions`
    console.log(ID)
    const requestData = {
      id: ID,
      question: isData.question,
      options: isData.options,
      answers: ["0"],
      commentary: "",
      tags: { "category": ["test"] },
    };

    axios.put(URL, requestData)
      .then((response) => {
        console.log(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
      });
  }

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
          const isQuestion = editorRef1.current.innerHTML;//
          const imageReplaceResult = imageReplace(isQuestion);
          console.log(imageReplaceResult);
          setData(
            prevState => ({
              ...prevState,
              question: imageReplaceResult
            }));
        }}
      />

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


        onInput={() => {
          const isQuestion = editorRef1.current.innerHTML;
          const imageReplaceResult = imageReplace(isQuestion);
          console.log(imageReplaceResult);
          setData(
            prevState => ({
              ...prevState,
              question: imageReplaceResult
            }));
          const resultEdit = handleFileObject(editorRef1, isUrlInId, isUrlIn);
          const resultId = handleIdContent(editorRef1, isUrlInId)
          console.log(resultEdit);
          setUrlIn(resultEdit);
          setUrlInId(resultId);
        }}

        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      {/* ------------------------------------------------------------------------ */}

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
          //blob : 로컬 이미지 가져온 url값을 저장하고 해당 이미지를 생성해서 렌더링하기 수행한다
          setUrlOutId(prevState => [...prevState, result.name])
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
          const resultEdit = handleFileObject(editorRef2, isUrlOutId, isUrlOut);
          const resultId = handleIdContent(editorRef2, isUrlOutId)
          console.log(resultEdit);
          setUrlOut(resultEdit);
          setUrlOutId(resultId);
        }}

        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      {/* ------------------------------------------------------------------------ */}

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
        sendPostData();
      }}>생성</button>
      <button onClick={() => {
        sendDeleteData();
      }
      }>삭제</button>
      <button onClick={() => {
        sendPutData();
      }}>수정</button>

      <button onClick={() => {
        console.log(isUrlIn);
        console.log(
          "저장된 API question 값 : " + isData.question
          + "\n저장된 imageIn 값 : " + isUrlIn[0]
          // + "\n저장된 imageIn name : " + isUrlIn[0].name
          + "\n저장된 isUrlInId name : " + isUrlInId[0]
          + "\n저장된 imageOut 값 : " + isUrlOut
          + "\n저장된 API options 값 : " + isData.options
          + "\n저장된 API isUrlIn 값 : " + isData.isUrlIn
        );
        isUrlInId.forEach((imageId) => { console.log(imageId) })
        console.log(ID);
      }}>확인</button>
    </div >
  );
}
