import { useState, useRef } from "react";
import { sendDeleteData, sendPutData } from "../function/axiosData";
import { Editor } from "./Editor";
import EditorTool from "./EditorTool";
//파일위치 항상 확인
export default function EditorEdit({ object, index, isObject, handleEditDelete }) {
  //Axios Get useState
  const [isContentEditable, setContentEditable] = useState(Array(isObject.length).fill(false));
  // contentEditable 상태를 변경하는 함수
  const handleStateChange = (index) => {
    const updatedEditorState = [...isContentEditable]; // 이전 상태 복사
    updatedEditorState[index] = true; // 클릭된 Editor의 상태를 true로 변경
    setContentEditable(updatedEditorState); // 변경된 상태 업데이트
  };

  const [questionContent, setQuestionContent] = useState('');
  const [optionsContent, setOptionsContent] = useState('');
  const [answersContent, setAnswersContent] = useState('');
  const [commentaryContent, setCommentaryContent] = useState('');

  const questionRef = useRef(null);
  const optionsRef = useRef(null);
  const answersRef = useRef(null);
  const commentaryRef = useRef(null);

  const handleEdit = () => {
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
      {/* <Editor
        editorRef={questionRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: replacedQuestion }}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} />
      <Editor /> */}

      <div
        className="editor"
        ref={questionRef}
        dangerouslySetInnerHTML={{ __html: replacedQuestion }}
      >
      </div>

      {Array.isArray(object.question_images_out) && object.question_images_out.length > 0 ? (
        <div
          className="editor"
        // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        >
          {object.question_images_out.map((image, index) => (
            <img key={index} src={image.url} className="examlab-image-right" style={{ width: '20%' }} />
          ))}
        </div>
      ) : null}

      <EditorTool />
      <Editor
        editorRef={optionsRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: replacedOptions }}
      // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} 
      />
      <EditorTool />
      <Editor
        editorRef={answersRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: replacedAnswer }}
      // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} 
      />
      <EditorTool />
      <Editor
        editorRef={commentaryRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: object.commentary }}
      // style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} 
      />
      <button onClick={() => { handleStateChange(index) }}>편집모드</button>
      <button onClick={() => { handleEdit() }}>수정</button>
      <button onClick={() => {
        sendDeleteData(object.id);
        handleEditDelete(index);
      }}>삭제</button>
    </>
  )
}