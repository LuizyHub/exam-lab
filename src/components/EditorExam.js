import React, { useRef, useState } from 'react';
import { handleToolClick, handleImgToolClick } from '../function/toolHandle';
import { useImage } from '../function/useImage';
import { handleData } from '../function/handleData';
import EditorTool from '../components/EditorTool';


import axios from 'axios';

export default function EditorExam({ number }) {

  //Commentary Ctrl
  const [isCommentHide, setCommentHide] = useState(false);
  const handleCommentHide = () => {
    setCommentHide(!isCommentHide);
  };


  //from import
  const { isImageSize, handleImgSize, handleImageSelect } = useImage();
  const { handleFileObject, handleIdContent, imageReplace } = handleData();
  // const { sendPostData } = formData();

  //DOM으로 접근
  const imageSelectorRef1 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef2 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조
  const imageSelectorRef3 = useRef(null); // 파일 선택 input 요소에 접근에 대한 참조

  //*editorRefN은 이후에 해당 컴포넌트(contentEditable)가 생성되면 함께 생성이 되어야 한다.
  const editorRef1 = useRef(null); //이미지를 appendChild할 때 dom의 위치를 참조하기 위함
  const editorRef2 = useRef(null);
  const editorRefDescription = useRef(null);
  const editorRef3 = useRef(null);
  const editorRef4 = useRef(null);
  const editorRef5 = useRef(null);


  //문제 state
  const [isUrlOut, setUrlOut] = useState([]);
  const [isUrlOutId, setUrlOutId] = useState([]);
  const [isUrlOutDes, setUrlOutDes] = useState();
  const [isUrlIn, setUrlIn] = useState([]);
  const [isUrlInId, setUrlInId] = useState([]);
  //단일로 수정
  const [isData, setData] = useState({
    question: '',
    options: [],//'①', '②', '③', '④'
  });

  //답안 state
  const [isCommentAnswers, setCommentAnswers] = useState([]);
  const [isCommentary, setCommentary] = useState();
  // 답안 image
  const [isCommentUrlOut, setCommentUrlOut] = useState([]);
  const [isCommentUrlOutId, setCommentUrlOutId] = useState([]);
  const [isCommentUrlOutDes, setCommentUrlOutDes] = useState();
  const [isCommentUrlIn, setCommentUrlIn] = useState([]);
  const [isCommentUrlInId, setCommentUrlInId] = useState([]);

  const optionsInit = '①<br>';//②<br>③<br>④
  const imageInit = '<>';

  // view
  const [ID, setID] = useState("");
  const [isResQuestion, setResQuestion] = useState("");
  const [isResOption, setResOption] = useState([]);
  const [isResUrlIn, setResUrlIn] = useState([]);
  const [isResUrlOut, setResUrlOut] = useState([]);
  const [isResUrlOutDes, setResUrlOutDes] = useState();

  const sendPostData = () => {

    const URL = '/api/v1/exams/5/questions'
    const formData = new FormData();

    const questionImagesTextIn = [];
    isUrlIn.forEach(image => {
      const questionImage = { url: "", description: "설명", attribute: "" };
      questionImagesTextIn.push(questionImage);
    });

    const questionImagesTextOut = [];
    isUrlOut.forEach(image => {
      const questionImage = { url: "", description: isUrlOutDes, attribute: "" };
      questionImagesTextOut.push(questionImage);
    });

    const questionUploadInfo = new Blob([JSON.stringify({
      type: "객관식",
      question: isData.question,
      options: isData.options,
      questionImagesTextIn: questionImagesTextIn,
      questionImagesTextOut: questionImagesTextOut,
      answers: [isCommentAnswers],
      tags: { "category": ["test"] },
      commentary: isCommentary
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
        setResUrlOutDes(message.question_images_out[0].description);
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

    // const questionImagesTextIn = [];
    // isUrlIn.forEach(image => {
    //   const questionImage = { url: image.url, description: "설명", attribute: "" };
    //   questionImagesTextIn.push(questionImage);
    // });

    // const questionImagesTextOut = [];
    // isUrlOut.forEach(image => {
    //   const questionImage = { url: image.url, description: isUrlOutDes, attribute: "" };
    //   questionImagesTextOut.push(questionImage);
    // });

    //이미지 수정 불가
    const requestData = {
      id: ID,
      question: isData.question,
      options: isData.options,
      // questionImagesTextIn: [],
      // questionImagesTextOut: [],
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

  // const getData = () => {
  //   console.log("가져오기");
  //   const URL = '/api/v1/exams/5/questions';

  //   axios.get(URL)
  //     .then((response) => {
  //       const res = response.data;
  //       console.log(res);
  //       console.log(res.id);
  //       // setID(res.id);
  //       console.log(res.questions);
  //       res.questions.forEach((questions, index) => {
  //         console.log(`Question ${index + 1}:`);
  //         console.log(questions.question);
  //         setResQuestion(questions.question);
  //         console.log(questions.options);
  //         setResOption(questions.options);
  //         // questions.question_images_in.forEach((image) => {
  //         //   console.log(image.url);
  //         //   setResUrlIn(prevent => [...prevent, image.url]);
  //         // });
  //         setResUrlIn(questions.question_images_in.map(image => image.url));
  //         // questions.question_images_out.forEach((image) => {
  //         //   console.log(image.url);
  //         //   setResUrlOut(prevent => [...prevent, image.url]);
  //         // });
  //         setResUrlOut(questions.question_images_out.map(image => image.url));

  //         console.log(questions.question_images_out[0].description);
  //         setResUrlOutDes(questions.question_images_out[0].description)
  //       });
  //     })
  //     .catch((error) => {
  //       // 오류 처리
  //       console.log(error);
  //     });
  // }


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
      <div>
        <div>
          <h3>문제등록</h3>
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
              console.log(result);
              //blob : 로컬 이미지 가져온 url값을 저장하고 해당 이미지를 생성해서 렌더링하기 수행한다
              setUrlOutId(prevState => [...prevState, result.name])
            }}
          />
          <div style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}>
            <div
              className="editor"
              contentEditable="true"
              ref={editorRef2}
              readOnly
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

              style={{ display: 'flex' }}
            />
            <div
              contentEditable={true}
              ref={editorRefDescription}
              dangerouslySetInnerHTML={{ __html: imageInit }}

              onInput={() => {
                const isOutImage = editorRefDescription.current.innerHTML;
                setUrlOutDes(isOutImage);
                console.log(isOutImage)
              }}
            // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
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
              const answers = editorRef3.current.innerHTML;


              const optionsInitArray = answers.split('<br>').map(item => item.trim());

              const splitOptionsArray = optionsInitArray.flatMap(option => option.split('<div>').map(text => text.trim()));

              // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));

              setData(prevState => ({ ...prevState, options: splitOptionsArray }));

              const optionsArray = splitOptionsArray.filter(option => option !== '');

              setData(prevState => ({ ...prevState, options: optionsArray }));

              // setData(prevState => ({ ...prevState, options: answers }));

              console.log(answers)
              // setData(prevState => ({ ...prevState, options: answers }));

              // // 줄 바꿈을 기준으로 배열을 분할하고, 필터링하여 빈 문자열을 제거합니다.
              // const optionsArray = optionsInitArray.split('\n').filter(option => option.trim() !== '');
              // const optionsArray = splitOptionsArray.filter(option => option.trim() !== '');

              // // <div>을 기준으로 분할하고, 각 요소를 trim하여 새로운 배열을 생성합니다.

              // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));
              // // console.log(answers);
              // setData(prevState => ({ ...prevState, options: optionsArray }));
            }}

            style={{
              padding: '16px 24px',
              border: '1px solid #D6D6D6',
              borderRadius: '4px',
              width: '600px',

            }}
          />

          <button onClick={() => {
            console.log("test");
            handleCommentHide();
          }}>답안등록</button>
        </div >
      </div>
      {/* -------------------------아래부터 답안 등록 -------------- */}
      <div id='CommentaryArea' style={{ display: isCommentHide ? 'block' : 'none' }} >

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
        {/* <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef3}
        onChange={(e) => { handleImageSelect(e, editorRef3) }}
      /> */}

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef5}
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

          // dangerouslySetInnerHTML={{ __html: optionsInit }}

          onInput={() => {
            const answers = editorRef5.current.innerHTML;
            console.log(answers);
            /** 
                        const optionsInitArray = answers.split('<br>').map(item => item.trim());
            
                        const splitOptionsArray = optionsInitArray.flatMap(option => option.split('<div>').map(text => text.trim()));
            
                        // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));
            
                        setData(prevState => ({ ...prevState, options: splitOptionsArray }));
            
                        const optionsArray = splitOptionsArray.filter(option => option !== '');
            
                        setData(prevState => ({ ...prevState, options: optionsArray }));
            
                        // setData(prevState => ({ ...prevState, options: answers }));
            
                        console.log(answers)
                        // setData(prevState => ({ ...prevState, options: answers }));
            
                        // // 줄 바꿈을 기준으로 배열을 분할하고, 필터링하여 빈 문자열을 제거합니다.
                        // const optionsArray = optionsInitArray.split('\n').filter(option => option.trim() !== '');
                        // const optionsArray = splitOptionsArray.filter(option => option.trim() !== '');
            
                        // // <div>을 기준으로 분할하고, 각 요소를 trim하여 새로운 배열을 생성합니다.
            
                        // const isOptionsArray = splitOptionsArray.map(text => text.replace('</div>', ''));
                        // // console.log(answers);
                        // setData(prevState => ({ ...prevState, options: optionsArray }));
                        */

            setCommentAnswers(answers);
          }}

          style={{
            padding: '16px 24px',
            border: '1px solid #D6D6D6',
            borderRadius: '4px',
            width: '600px',

          }}
        />


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

        {/* 이미지 파일 load */}
        {/* <input
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
        /> */}

        <div
          className="editor"
          contentEditable="true"
          ref={editorRef4}
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
            // 여기 있는 isResQuestion과 useState의 isResQuestion와는 다른 거임
            const Commentary = editorRef4.current.innerHTML;
            console.log(Commentary);
            setCommentary(Commentary);
            // const imageReplaceResult = imageReplace(Commentary);
            // console.log(imageReplaceResult);
            // setData(
            //   prevState => ({
            //     ...prevState,
            //     question: imageReplaceResult
            //   }));
            // const resultEdit = handleFileObject(editorRef1, isCommentUrlInId, isCommentUrlIn);
            // const resultId = handleIdContent(editorRef1, isCommentUrlInId)
            // console.log(resultEdit);
            // setCommentUrlIn(resultEdit);
            // setCommentUrlInId(resultId);
          }}

          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />

      </div>
      {/*------------------ 버튼 영역---------------------- */}
      <div>
        <button type='submit' onClick={() => {
          sendPostData();
          console.log(isResOption);
          console.log(isResUrlIn);
          // getData();//get이 내부로 들어가야하나?
        }}>생성</button>

        <button onClick={() => {
          sendDeleteData();
          // getData();//get이 내부로 들어가야하나?
        }
        }>삭제</button>

        <button onClick={() => {
          sendPutData();
          // getData();//get이 내부로 들어가야하나?
        }}>수정</button>

        <button onClick={() => {
          // getData();
          console.log(isUrlIn);
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
            + "\n저장된 API isResUrlOutDes 값 : " + isResUrlOutDes
          );
          isUrlIn.forEach((image) => { console.log("In" + image) })
          isUrlOut.forEach((image) => { console.log("Out" + image) })
          isResUrlOut.forEach((image) => { console.log("ResOut" + image) })
          console.log(ID);
          console.log(
            "저장된 Answer 값 : " + isCommentAnswers
            + "\n저장된 Commentary 값 : " + isCommentary
          );
        }}>확인</button>

      </div>
    </div>
  );
}
