import { useState, useRef } from "react";
import { sendDeleteData, sendPutData } from "../function/axiosData";
import { Editor } from "./Editor";
import EditorTool from "./EditorTool";
import '../css/EditorEdit.css'
//파일위치 항상 확인
export default function EditorEdit({ object, index, isObject, handleEditDelete, isTag }) {
  //Axios Get useState
  const [isContentEditable, setContentEditable] = useState(Array(isObject.length).fill(false));
  const [isEditing, setIsEditing] = useState(Array(isObject.length).fill(false)); // 추가된 상태 변수
  const handleStateChange = (index) => {
    const updatedEditorState = [...isContentEditable];
    updatedEditorState[index] = !updatedEditorState[index]; // 클릭 시 편집 모드를 토글
    setContentEditable(updatedEditorState);

    const updatedEditingState = [...isEditing];
    updatedEditingState[index] = !updatedEditingState[index]; // 클릭 시 편집 상태를 토글
    setIsEditing(updatedEditingState);
  };

  const [questionContent, setQuestionContent] = useState('');
  const [optionsContent, setOptionsContent] = useState('');
  const [answersContent, setAnswersContent] = useState('');
  const [commentaryContent, setCommentaryContent] = useState('');

  const questionRef = useRef(null);
  const optionsRef = useRef(null);
  const answersRef = useRef(null);
  const commentaryRef = useRef(null);
  const [isSelectedTags, setSelectedTags] = useState(() => {
    const initialTags = {};
    if (object.tags) {
      Object.entries(object.tags).forEach(([key, tags]) => {
        initialTags[key] = tags;
      });
    }
    return initialTags;
  });

  const handleEdit = (index) => {
    // 참조가 null인지 확인하고, null이 아닐 때만 innerText를 가져옵니다.
    if (optionsRef.current && answersRef.current && commentaryRef.current) {
      const question = questionRef.current.innerText;
      const options = optionsRef.current.innerText;
      const answers = answersRef.current.innerText;
      const commentary = commentaryRef.current.innerText;

      console.log(options, answers, commentary);
      console.log(object.id);
      //options가 foreach로 각 배열들을 인식 할 수 있게 해야한다.
      sendPutData(object.id, question, [options], answers, commentary, isSelectedTags);
    } else {
      console.log("참조가 아직 설정되지 않았습니다.");
    }

    handleStateChange(index);

  };

    // 버튼 스타일 설정 함수
    const getButtonStyle = (key, item) => {
      return isSelectedTags[key] && isSelectedTags[key].includes(item)
        ? { backgroundColor: '#D9F1F1', color: '#24ABA8' }
        : {};
    };

    
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


  //이미지 마킹 실제 이미지로 전환 ->현재 중복이 되어 있는 코드이기에 검토 필요

  const imgRegex = /<img[^>]*>/ig;
  let imgIndex = 0;
  const question = object.question.replace(imgRegex, () => {
    imgIndex++;
    if (object.question_images_in && object.question_images_in.length > imgIndex - 1) {
      return `<img src='${object.question_images_in[imgIndex - 1].url}' style= "width:5%;" />`;
    }
    return '';
  });

  const replacedQuestion = `<b>${question}</b>`

  const replacedOptions = object.options.map((option, index) => {
    const specialCharacter = option.includes(String.fromCharCode(9312 + index)) ? '' : String.fromCharCode(9312 + index); // 9312은 ①의 유니코드 코드 포인트
    return `${specialCharacter} ${option}`;
  }).join('<br>');

  const replacedAnswer = object.answers.map(answer => answer + 1);

  return (
    <>
      <div className="editor-edit">

        {/* <div
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`}
          ref={questionRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: replacedQuestion }}
        >
        </div> */}
        <p>문제</p>
        <Editor
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`} 
          editorRef={questionRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: replacedQuestion }}
        />
        
        {Array.isArray(object.question_images_out) && object.question_images_out.length > 0 ? (
          <div
            className="editor"
          >
            {object.question_images_out.map((image, index) => (
              <img 
               key={index} 
               src={image.url} 
               className="examlab-image-right" 
                style={{ width: '20%' }}
              />
            ))}
          </div>
        ) : null}

        {/* <EditorTool /> */}
        <p>선택지</p>
        <Editor
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`}
          editorRef={optionsRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: replacedOptions }}
        />
        {/* <EditorTool /> */}
        <p>정답</p>
        <Editor
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`}
          editorRef={answersRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: replacedAnswer }}
        />
        {/* <EditorTool /> */}
        <p>해설지</p>
        <Editor
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`}
          editorRef={commentaryRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: object.commentary }}
        />

          {/* 태그 선택 영역 */}
          <div className='tags-container' style={{ display: isEditing[index] ? 'flex' : 'none' }}>
            {Object.entries(isTag).map(([key, array]) => (
              <div key={key} id='tags-container'>
                <div id='key-container'>
                  <p id='key'>
                    {key}
                  </p>
                </div>
                <div id='value-container'>
                  {array.map((item, index) => (
                    <button
                      id='value'
                      key={`${key}-${index}`}
                      style={getButtonStyle(key, item)}
                      onClick={() => handleButtonClick(key, item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className='server-button'>
         <button 
            onClick={() => { handleStateChange(index) }}
            style={{ display: isEditing[index] ? 'none' : 'flex' }} // 편집 모드 버튼 표시/숨기기
          >
            편집 모드
          </button>
          <button 
            onClick={() => { handleEdit(index); console.log(object)}} 
            style={{ display: isEditing[index] ? 'flex' : 'none' }} // 수정 버튼 표시/숨기기
          >
            수정
          </button>

          <button onClick={() => {
            sendDeleteData(object.id);
            handleEditDelete(index);
          }}>삭제</button>
        </div>
      </div>
    </>
  )
}