import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImage } from '../function/useImage';
import { handleData } from '../function/handleData';

import EditorTool from '../components/EditorTool';
import { handleOnInput, handleDragOver, handleCopy, handleCut, handlePaste, handleKeyDown, handleKeyUp } from '../function/eventHandle';
import { Editor } from './Editor';
import { sendPostData, sendDeleteData, sendPutData } from '../function/axiosData';

export default function EditorExam({ examId, handleExamDelete }) {

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

  //Answers state
  const [isCommentAnswers, setCommentAnswers] = useState([]);
  const [isCommentary, setCommentary] = useState();

  //Answers image
  // const [isCommentUrlOut, setCommentUrlOut] = useState([]);
  // const [isCommentUrlOutId, setCommentUrlOutId] = useState([]);
  // const [isCommentUrlOutDes, setCommentUrlOutDes] = useState();
  // const [isCommentUrlIn, setCommentUrlIn] = useState([]);
  // const [isCommentUrlInId, setCommentUrlInId] = useState([]);

  // Only READ from response of POST
  // const [isResQuestion, setResQuestion] = useState("");
  // const [isResOption, setResOption] = useState([]);
  // const [isResUrlIn, setResUrlIn] = useState([]);
  // const [isResUrlOut, setResUrlOut] = useState([]);
  // const [isResUrlOutDes, setResUrlOutDes] = useState();


  //이미지 마킹 실제 이미지로 전환

  // const imgRegex = /<img[^>]*>/ig;
  // let imgIndex = 0;
  // const replacedQuestion = isResQuestion.replace(imgRegex, () => {
  //   // 이미지의 번호를 1부터 시작하여 증가시킵니다.
  //   imgIndex++;

  //   return `<img src='${isResUrlIn[imgIndex - 1]}' style= "width:5%;" />`;
  // })
  // console.log(replacedQuestion)



  return (

    <div className='editor_out_line'>
      <div className='questionArea'>
        <div>
          {/* <h3>문제등록</h3> */}
          {/* <select value={contentType1} onChange={handleContentType1}>
            <option value="type">Select</option>
            <option value="문제">문제</option>
            <option value="이미지">이미지</option>
            <option value="선택지">선택지</option>
          </select> */}

          {/* <div>
            <h1>View</h1>
            <p>{number}</p>
            <p dangerouslySetInnerHTML={{ __html: replacedQuestion }} />
            {isResUrlOut.map((URL, index) => (
              <img key={index} src={URL} id={'isResUrlOut'} style={{ width: '25%' }} />
            ))}
            <p dangerouslySetInnerHTML={{ __html: isResUrlOutDes }} />
            {isResOption.map((options, index) => (
              <p key={index}
                dangerouslySetInnerHTML={{ __html: options }}></p>
            ))}
          </div> */}

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

          // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
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

            {/* <Editor
              contentEditable={true}
              editorRef={editorRefDescription}
              dangerouslySetInnerHTML={{ __html: imageInit }}
              onInput={
                () => {
                  const isOutImage = editorRefDescription.current.innerHTML;
                  setUrlOutDes(isOutImage);
                  console.log(isOutImage)
                }
              }
            /> */}
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

              // setData(prevState => ({ ...prevState, options: answers }));

              // console.log(answers)
              // setData(prevState => ({ ...prevState, options: answers }));

              // // 줄 바꿈을 기준으로 배열을 분할하고, 필터링하여 빈 문자열을 제거합니다.
              // const optionsArray = optionsInitArray.split('\n').filter(option => option.trim() !== '');
              // const optionsArray = splitOptionsArray.filter(option => option.trim() !== '');

              // // <div>을 기준으로 분할하고, 각 요소를 trim하여 새로운 배열을 생성합니다.

              // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));
              // // console.log(answers);
              // setData(prevState => ({ ...prevState, options: optionsArray }));
            }}
          // style={{
          //   padding: '16px 24px',
          //   border: '1px solid #D6D6D6',
          //   borderRadius: '4px',
          //   width: '600px',
          // }}
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
        {/* <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef3}
        onChange={(e) => { handleImageSelect(e, editorRef3) }}
      /> */}

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
        // style={{
        //   padding: '16px 24px',
        //   border: '1px solid #D6D6D6',
        //   borderRadius: '4px',
        //   width: '600px',
        // }}
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

        {/* 이미지 파일 load */}
        {/* 
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={imageSelectorRef1}
          onChange={(e) => {
            //blob : 로컬 이미지 가져온 url값을 저장하고 해당 이미지를 생성해서 렌더링하기 수행한다
            const result = handleImageSelect(e, editorRef1);
            console.log(result);
            setCommentUrlIn(prevState => [...prevState, result]);
            setCommentUrlInId(prevState => [...prevState, result.name])
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
        */}

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

      {/*------------------ 버튼 영역---------------------- */}

      <div className='server-button'>
        <button type='submit' onClick={() => {
          sendPostData(examId, isUrlIn, isUrlOut, isUrlOutDes, isData.question, isData.options, isCommentAnswers, isCommentary)
            .then((id) => {
              console.log(id)
              console.log(typeof (id))
              UUID = id;
            });
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
