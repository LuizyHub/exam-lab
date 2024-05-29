import { useState, useRef } from "react";
import { sendDeleteData, sendPutData } from "../function/axiosData";
import { Editor } from "./Editor";
import EditorTool from "./EditorTool";
import '../css/EditorEdit.css'
//파일위치 항상 확인
export default function EditorEdit({ object, index, isObject, handleEditDelete }) {
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
      sendPutData(object.id, question, [options], answers, commentary);
    } else {
      console.log("참조가 아직 설정되지 않았습니다.");
    }

    handleStateChange(index);

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

  const replacedQuestion = `<b>${index + 1}. ${question}</b>`

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

        <EditorTool />
        <Editor
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`}
          editorRef={optionsRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: replacedOptions }}
        />
        <EditorTool />
        <Editor
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`}
          editorRef={answersRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: replacedAnswer }}
        />
        <EditorTool />
        <Editor
          className={`editor ${isContentEditable[index] ? 'editorMode' : ''}`}
          editorRef={commentaryRef}
          contentEditable={isContentEditable[index]}
          dangerouslySetInnerHTML={{ __html: object.commentary }}
        />
        <div className='server-button'>
         <button 
            onClick={() => { handleStateChange(index) }}
            style={{ display: isEditing[index] ? 'none' : 'inline-block' }} // 편집 모드 버튼 표시/숨기기
          >
            편집 모드
          </button>
          <button 
            onClick={() => { handleEdit(index); console.log(isEditing[index])}} 
            style={{ display: isEditing[index] ? 'inline-block' : 'none' }} // 수정 버튼 표시/숨기기
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