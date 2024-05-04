import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImage } from '../function/useImage';
import { handleData } from '../function/handleData';
import EditorTool from '../components/EditorTool';

import axios from 'axios';

export default function EditorExam({ number }) {
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
    options: [],//'①', '②', '③', '④'
  });

  const optionsInit = '①<br>②<br>③<br>④';

  const [ID, setID] = useState("");
  const [isResQuestion, setResQuestion] = useState("");
  const [isResOption, setResOption] = useState([]);
  const [isResUrlIn, setResUrlIn] = useState([]);
  const [isResUrlOut, setResUrlOut] = useState([]);

  const sendPostData = () => {

    const URL = '/api/v1/exams/11/questions'
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
        setID(message.id);
        setResQuestion(message.question);
        setResOption(message.options);
        // setResOption(prevOption => [...prevOption, ...message.option]);
        setResUrlIn(message.question_images_in.map(image => image.url));
        // console.log(message.question_images_in[0].url);
        setResUrlOut(message.question_images_out.map(image => image.url));
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
    // const URL = `/api/v1/questions/6f9a1418-a3c8-4c0b-91a3-7a461164dcf6`
    // console.log(ID)
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

  // //div이 생성되는 것 막는 함수
  // const handleInput = (e) => {
  //   const selection = window.getSelection();
  //   const range = selection.getRangeAt(0);
  //   if (e.inputType === 'insertFromPaste') {
  //     e.preventDefault(); // 붙여넣기 동작 막기
  //     const text = e.clipboardData.getData('text/plain');
  //     const div = document.createElement('div');
  //     div.textContent = text;
  //     range.insertNode(div);
  //     range.collapse(false);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   }
  // };


  //'①', '②', '③', '④' 번호 자동 생성
  const handleOption = (htmlContent, e) => {
    // 엔터 키 입력인지 확인
    if (e.nativeEvent.inputType === 'insertParagraph') {
      // 새로운 옵션 추가
      const newOption = String.fromCharCode(0x245F + htmlContent.querySelectorAll('br').length + 1);
      // 새로운 옵션을 현재 HTML 내용에 추가
      htmlContent.innerHTML += newOption;
    }
  }

  //이미지 마킹 실제 이미지로 전환
  const imgRegex = /<img[^>]*>/ig;
  let imgIndex = 0;
  const replacedQuestion = isResQuestion.replace(imgRegex, () => {
    // 이미지의 번호를 1부터 시작하여 증가시킵니다.
    imgIndex++;

    return `<img src='${isResUrlIn[imgIndex - 1]}' style= "width:5%;" />`;
  })

  // console.log(replacedQuestion)
  return (

    <div>
      {/* <select value={contentType1} onChange={handleContentType1}>
        <option value="type">Select</option>
        <option value="문제">문제</option>
        <option value="이미지">이미지</option>
        <option value="선택지">선택지</option>
      </select> */}

      <div>
        <h1>Show</h1>
        <p>{number}</p>
        <p dangerouslySetInnerHTML={{ __html: replacedQuestion }} />
        {/* {isResUrlIn.map((URL, index) => (
          <img key={index} src={URL} style={{ width: '25%' }} />
        ))} */}
        {isResUrlOut.map((URL, index) => (
          <img key={index} src={URL} style={{ width: '25%' }} />
        ))}
        {isResOption.map((options, index) => (
          <p key={index}
            dangerouslySetInnerHTML={{ __html: options }}></p>
        ))}
      </div>

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
          const isResQuestion = editorRef1.current.innerHTML;//
          const imageReplaceResult = imageReplace(isResQuestion);
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
          const isResQuestion = editorRef1.current.innerHTML;
          const imageReplaceResult = imageReplace(isResQuestion);
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // 기본 동작 막기
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // 기본 동작 막기
            const editor = e.target;
            const brCount = editor.querySelectorAll('br').length + 1;
            const newOption = String.fromCharCode(0x245F + brCount + 1);

            // 생성된 문자를 현재 포커스된 위치에 삽입합니다.
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const textNode = document.createTextNode(newOption);
            range.insertNode(textNode);

            // 새로운 줄을 만들기 위해 br 태그를 삽입합니다.
            const br = document.createElement('br');
            range.insertNode(br);

            // 커서를 새로운 줄의 시작 지점으로 이동시킵니다.
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);

            // 커서를 설정합니다.
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }}
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

        dangerouslySetInnerHTML={{ __html: optionsInit }}

        onInput={() => {
          const isOptions = editorRef3.current.innerHTML;


          const optionsInitArray = isOptions.split('<br>').map(item => item.trim());

          const splitOptionsArray = optionsInitArray.flatMap(option => option.split('<div>').map(text => text.trim()));

          // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));

          setData(prevState => ({ ...prevState, options: splitOptionsArray }));

          const optionsArray = splitOptionsArray.filter(option => option !== '');

          setData(prevState => ({ ...prevState, options: optionsArray }));

          // setData(prevState => ({ ...prevState, options: isOptions }));

          console.log(isOptions)
          // setData(prevState => ({ ...prevState, options: isOptions }));

          // // 줄 바꿈을 기준으로 배열을 분할하고, 필터링하여 빈 문자열을 제거합니다.
          // const optionsArray = optionsInitArray.split('\n').filter(option => option.trim() !== '');
          // const optionsArray = splitOptionsArray.filter(option => option.trim() !== '');

          // // <div>을 기준으로 분할하고, 각 요소를 trim하여 새로운 배열을 생성합니다.

          // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));
          // // console.log(isOptions);
          // setData(prevState => ({ ...prevState, options: optionsArray }));
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
        console.log(isResOption);
        console.log(isResUrlIn);
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
