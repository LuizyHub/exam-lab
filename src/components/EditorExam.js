import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImageSize } from '../function/imageHandle';
import { DataHandle } from '../function/dataHandle';
import formData from "../function/formData"

import EditorTool from '../components/EditorTool';
// import Editor from '../components/Editor';

export default function EditorExam({ type }) {
  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImageSize();
  const { handleContent, imageReplace } = DataHandle();
  const { sendData } = formData();
  const [contentType1, setContentType1] = useState('type');
  const [contentType2, setContentType2] = useState('type');
  const [contentType3, setContentType3] = useState('type');

  const imageSelectorRef1 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef2 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef3 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조

  //*editorRefN은 이후에 해당 컴포넌트(contentEditable)가 생성되면 함께 생성이 되어야 한다.
  const editorRef1 = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함
  const editorRef2 = useRef(null);
  const editorRef3 = useRef(null);

  const [isUrlOut, setUrlOut] = useState([]);
  const [isUrlIn, setUrlIn] = useState([]);
  const [isData, setData] = useState({
    question: '',
    options: '',
    imageUrlOut: [],
    imageUrlIn: [],

  });

  const handleContentType1 = (e) => {
    const contentType = e.currentTarget.value;
    setContentType1(contentType);
  }

  const handleContentType2 = (e) => {
    const contentType = e.currentTarget.value;
    setContentType2(contentType);
  }

  const handleContentType3 = (e) => {
    const contentType = e.currentTarget.value;
    setContentType3(contentType);
  }

  return (
    <div>
      <select value={contentType1} onChange={handleContentType1}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select>

      <EditorTool
        editorRef={editorRef1}
        contentType={contentType1}
        handleContentType={handleContentType1}
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
          setUrlIn(prevState => [...prevState, result]);

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

          // 새로운 이미지 객체 생성
          const newImageObject = {
            url: '',
            description: '', // 이미지 설명
            attribute: '' // 이미지 속성
          };

          setData(prevState => ({
            ...prevState,
            imageUrlIn: [...prevState.imageUrlIn, newImageObject]
          }));

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
          //왜 계속 존재하는것인가.. 초기화 했는데
          const resultEdit = handleContent(editorRef1, isUrlIn);
          setUrlIn(resultEdit);

        }}

        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      {/* ------------------------------------------------------------------------ */}

      <select value={contentType2} onChange={handleContentType2}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select>

      <EditorTool
        editorRef={editorRef2}
        contentType={contentType2}
        handleContentType={handleContentType2}
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
          handleImageSelect(e, editorRef2);
          const file = e.target.files[0];
          const fileUrl = URL.createObjectURL(file);
          setUrlOut(prevState => [...prevState, fileUrl]);
          console.log(file.name);
        }}
      />
      <div
        className="editor"
        contentEditable="true"
        ref={editorRef2}

        onInput={() => {
          const result = handleContent(editorRef2, isUrlOut);
          setUrlOut(result);
          console.log(result);

          // return (<img src={isData.imageUrlOut} />)
          // const test = "test"
          // setData(
          //   prevState => ({
          //     ...prevState,
          //     imageUrlOut: [
          //       {
          //         // ...prevState.imageUrlOut[0], // 이전 상태의 imageUrlOut 배열의 첫 번째 요소를 복제
          //         url: 'test' // 새로운 URL 값으로 업데이트
          //       },
          //       // ...prevState.imageUrlOut.slice(1) // 나머지 요소는 이전 상태에서 그대로 유지
          //     ]
          //   }));
          // console.log(result);
          // const result = handleContent(editorRef2, isData.imageUrlOut);
          // setData(
          //   prevState => ({
          //     ...prevState,
          //     imageUrlOut: result
          //   }));
          // console.log(result);
        }}

        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      {/* ------------------------------------------------------------------------ */}

      <select value={contentType3} onChange={handleContentType3}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select>

      <EditorTool
        editorRef={editorRef3}
        contentType={contentType3}
        handleContentType={handleContentType3}
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


        onInput={() => {
          // console.log(e.target.textContent);
          const isOptions = editorRef3.current.innerHTML;
          setData(
            prevState => ({
              ...prevState,
              options: isOptions
            }));
        }}


        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      <button type='submit' onClick={() => {
        // imgButtonRef.current.click();
        console.log(
          "저장된 API question 값 : " + isData.question
          + "\n저장된 imageIn 값 : " + isUrlIn
          + "\n저장된 imageOut 값 : " + isUrlOut
          + "\n저장된 API options 값 : " + isData.options
        );
        console.log("저장된 imageUrlIn 객체 값 : ", isData.imageUrlIn);
        // const URL = 'http://localhost:3001/sample'
        const URL = 'exam-lab.store/api/v1/3/question'
        sendData(URL, isData, "TestImage", isUrlIn)

        // formData(question, imageIn, imageOut, option);//contentType1, contentType2, contentType3
        // const result = handleContent(editorRef2, isData.imageUrlOut);
        // setData(
        //   prevState => ({
        //     ...prevState,
        //     imageUrlOut: result
        //   }));
        // console.log(result);
      }}>생성</button>
    </div>
  );
}
