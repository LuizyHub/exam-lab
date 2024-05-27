import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImage } from '../function/useImage';
import { handleData } from '../function/handleData';

import EditorTool from '../components/EditorTool';
import { handleOnInput, handleDragOver, handleCopy, handleCut, handlePaste, handleKeyDown, handleKeyUp } from '../function/eventHandle';
import { Editor } from './Editor';
import { sendPostData, sendDeleteData, sendPutData } from '../function/axiosData';

export default function EditorExam({ examId, handleExamDelete, isTag  }) {

  //Commentary Ctrl
  const [isCommentHide, setCommentHide] = useState(false);
  const handleCommentHide = () => {
    setCommentHide(!isCommentHide);
  };

  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImage();
  const { handleFileObject, handleIdContent, imageReplace } = handleData();

  //DOM으로 접근
  const imageSelectorRef1 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef2 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef3 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조

  //*editorRef{N}은 이후에 해당 컴포넌트(contentEditable)가 생성되면 함께 생성이 되어야 한다.
  const editorRef1 = useRef(null); //questions
  const editorRef2 = useRef(null);  //Out image
  const editorRefDescription = useRef(null); //Out image description
  const editorRef3 = useRef(null);  //Options
  const editorRef4 = useRef(null);  //Answers
  const editorRef5 = useRef(null);  //Commentary

  //**  PRIMARY KEY : DON'T MOVE THIS LINE*/
  let UUID = "";
  //**  PRIMARY KEY : DON'T MOVE THIS LINE*/

  //editor UX초기 값 제공 HTML
  const optionsInit = '①<br>';//②<br>③<br>④
  const imageInit = '<>';

  const [isUrlOut, setUrlOut] = useState([]);
  const [isUrlOutId, setUrlOutId] = useState([]);
  const [isUrlOutDes, setUrlOutDes] = useState();
  const [isUrlIn, setUrlIn] = useState([]);
  const [isUrlInId, setUrlInId] = useState([]);
  const [isData, setData] = useState({//단일로 수정
    question: '',
    options: [],
  });
  const [isSelectedTags, setSelectedTags] = useState({});

  //Answers state
  const [isCommentAnswers, setCommentAnswers] = useState([]);
  const [isCommentary, setCommentary] = useState();

  const handleButtonClick = (key, item) => {
      setSelectedTags(prevSelectedTags => {
        const newSelectedTags = { ...prevSelectedTags };
        if (newSelectedTags[key] && newSelectedTags[key].includes(item)) {
          // 이미 선택된 항목이면 해제
          newSelectedTags[key] = newSelectedTags[key].filter(tag => tag !== item);
          if (newSelectedTags[key].length === 0) {
            delete newSelectedTags[key];
          }
        } else {
          // 선택되지 않은 항목이면 추가
          if (!newSelectedTags[key]) {
            newSelectedTags[key] = [];
          }
          newSelectedTags[key].push(item);
        }
        return newSelectedTags;
      });
    };

  // 버튼 스타일 설정 함수
    const getButtonStyle = (key, item) => {
      return isSelectedTags[key] && isSelectedTags[key].includes(item)
        ? { backgroundColor: 'lightblue' }
        : {};
    };

  return (

    <div className='editor_out_line'>
      <div className='questionArea'>
        <div>
        

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
          <Editor
            editorRef={editorRef1}
            contentEditable={true}
            onDragOver={(e) => e.preventDefault()}
            onCopy={(e) => { handleCopy(e); }}
            onCut={(e) => { handleCut(e); }}
            onPaste={(e) => { handlePaste(e); }}

            onInput={() => {
              const isResQuestion = editorRef1.current.innerHTML;
              const imageReplaceResult = imageReplace(isResQuestion);
              // console.log(imageReplaceResult);
              setData(
                prevState => ({
                  ...prevState,
                  question: imageReplaceResult
                }));
              const resultEdit = handleFileObject(editorRef1, isUrlInId, isUrlIn);
              const resultId = handleIdContent(editorRef1, isUrlInId)
              setUrlIn(resultEdit);
              setUrlInId(resultId);
            }}

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
              console.log(result);
              //blob : 로컬 이미지 가져온 url값을 저장하고 해당 이미지를 생성해서 렌더링하기 수행한다
              setUrlOutId(prevState => [...prevState, result.name])
            }}
          />
          <div
          // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
          >

            <Editor
              editorRef={editorRef2}
              contentEditable={false}
              readOnly={true}
              onDragOver={(e) => e.preventDefault()}
              onCopy={handleCopy}
              onCut={handleCut}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // 기본 동작 막기

                  // 생성된 문자열을 현재 포커스된 위치에 삽입합니다.
                  const selection = window.getSelection();
                  const range = selection.getRangeAt(0);
                  const textNode = document.createTextNode(imageInit);
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
              onInput={() => {
                const isImage = editorRef2.current.innerHTML;
                console.log(isImage);

                const resultEdit = handleFileObject(editorRef2, isUrlOutId, isUrlOut);
                const resultId = handleIdContent(editorRef2, isUrlOutId)
                console.log(resultEdit);
                setUrlOut(resultEdit);
                setUrlOutId(resultId);
              }}
            // style={{ display: 'flex' }}
            />
          </div>
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
          <Editor
            editorRef={editorRef3}
            contentEditable={true}
            onDragOver={(e) => e.preventDefault()}
            onCopy={handleCopy}
            onCut={handleCut}
            onPaste={handlePaste}
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
                const newOption = String.fromCharCode(0x245F + brCount);

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
            dangerouslySetInnerHTML={{ __html: optionsInit }}
            onInput={() => {
              const answers = editorRef3.current.innerHTML;


              const optionsInitArray = answers.split('<br>').map(item => item.trim());

              const splitOptionsArray = optionsInitArray.flatMap(option => option.split('<div>').map(text => text.trim()));

              // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));

              setData(prevState => ({ ...prevState, options: splitOptionsArray }));

              const optionsArray = splitOptionsArray.filter(option => option !== '');

              setData(prevState => ({ ...prevState, options: optionsArray }));
            }}
          />


        </div >
      </div>
      {/* -------------------------아래부터 답안 등록 -------------- */}
      <div id='CommentaryArea' style={{ display: isCommentHide ? 'none' : 'block' }} >

        <EditorTool
          editorRef={editorRef4}
          contentType={'선택지'}
          // handleContentType={handleContentType1}
          handleToolClick={handleToolClick}
          // imageSelectorRef={imageSelectorRef1}
          handleImgToolClick={handleImgToolClick}
          isImageSize={isImageSize}
          handleImgSize={handleImgSize}
        />

        <Editor
          editorRef={editorRef4}
          contentEditable={true}
          onDragOver={(e) => e.preventDefault()}
          onCopy={handleCopy}
          onCut={handleCut}
          onPaste={handlePaste}
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
              const newOption = String.fromCharCode(0x245F + brCount);

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
          onInput={() => {
            const answers = editorRef4.current.innerHTML;
            setCommentAnswers(answers);
          }}

        />

        <EditorTool
          editorRef={editorRef5}
          contentType={'선택지'}
          // handleContentType={handleContentType1}
          handleToolClick={handleToolClick}
          // imageSelectorRef={imageSelectorRef1}
          handleImgToolClick={handleImgToolClick}
          isImageSize={isImageSize}
          handleImgSize={handleImgSize}
        />

        <Editor
          editorRef={editorRef5}
          contentEditable={true}
          onDragOver={(e) => e.preventDefault()}
          onCopy={handleCopy}
          onCut={handleCut}
          onPaste={handlePaste}
          onInput={() => {
            const Commentary = editorRef5.current.innerHTML;
            setCommentary(Commentary);
          }}
        // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

      </div>

    <div className='editor_out_line'>
      <div>
        {Object.entries(isTag).map(([key, array]) => (
          <div key={key}>
            <strong>{key}:</strong>
            {array.map((item, index) => (
              <button
                key={`${key}-${index}`}
                style={getButtonStyle(key, item)}
                onClick={() => handleButtonClick(key, item)}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>

      {/*------------------ 버튼 영역---------------------- */}

      <div className='server-button'>
        <button type='submit' onClick={() => {
          sendPostData(examId, isUrlIn, isUrlOut, isUrlOutDes, isData.question, isData.options, isCommentAnswers, isCommentary,isSelectedTags)
            .then((id) => {
              console.log(id)
              console.log(typeof (id))
              UUID = id;
            });
          console.log('Selected Tags:', isSelectedTags);
        }}>생성</button>

        <button onClick={() => {
          sendDeleteData(UUID);
          handleExamDelete(examId);
          // getData();//get이 내부로 들어가야하나?
        }}>삭제</button>

        {/* UUID가 필요한가? 제거하고 실행 해볼 것 */}
        <button onClick={() => {
          sendPutData(UUID, isData.question, isData.options, isCommentAnswers, isCommentary);
          // getData();//get이 내부로 들어가야하나?
        }}>수정</button>

        <button onClick={() => {
          console.log("test");
          handleCommentHide();
        }}>답안</button>

        {/* <button onClick={() => {
          console.log("\n저장된 QUESTION_ID 값 : " + UUID
            + "\n저장된 EXAM_ID 값 : " + examId);
          console.log(
            "저장된 API question 값 : " + isData.question
            + "\n저장된 imageIn 값 : " + isUrlIn[0]
            // + "\n저장된 imageIn name : " + isUrlIn[0].name
            + "\n저장된 isUrlInId name : " + isUrlInId[0]
            + "\n저장된 imageOut 값 : " + isUrlOut
            + "\n저장된 imageIn 값 : " + isUrlIn
            + "\n저장된 API options 값 : " + isData.options
            + "\n저장된 API isUrlIn 값 : " + isData.isUrlIn
            + "\n저장된 API isUrlOutDes 값 : " + isUrlOutDes
            + "\n저장된 API isUrlOutDes 값 : " + isUrlOutDes
          );
          isUrlIn.forEach((image) => { console.log("In" + image) })
          isUrlOut.forEach((image) => { console.log("Out" + image) })
          // isResUrlOut.forEach((image) => { console.log("ResOut" + image) })
          console.log(
            "저장된 Answer 값 : " + isCommentAnswers
            + "\n저장된 Commentary 값 : " + isCommentary
          );
        }}>확인</button> */}
      </div>
    </div>
  );
}
