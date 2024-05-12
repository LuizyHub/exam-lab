import { useState, useRef } from "react";
import { sendDeleteData, sendPutData } from "../function/axiosData";
import { Editor } from "./Editor";

export default function EditorEdit({ object, index, isObject }) {
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
    if (questionRef.current && optionsRef.current && answersRef.current && commentaryRef.current) {
      const question = questionRef.current.innerText;
      const options = optionsRef.current.innerText;
      const answers = answersRef.current.innerText;
      const commentary = commentaryRef.current.innerText;

      console.log(question, options, answers, commentary);
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
  const replacedQuestion = object.question.replace(imgRegex, () => {
    imgIndex++;
    if (object.question_images_in && object.question_images_in.length > imgIndex - 1) {
      return `<img src='${object.question_images_in[imgIndex - 1].url}' style= "width:5%;" />`;
    }
    return ''; // 혹은 다른 값을 반환하여 이미지가 없는 경우를 처리할 수 있습니다.
  });
  console.log(replacedQuestion)

  return (
    <>
      <Editor
        editorRef={questionRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: replacedQuestion }}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} />
      <Editor />

      {Array.isArray(object.question_images_out) && object.question_images_out.length > 0 ? (
        <div style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}>
          {object.question_images_out.map((image, index) => (
            <img key={index} src={image.url} style={{ width: '30%' }} />
          ))}
        </div>
      ) : null}

      <Editor
        editorRef={optionsRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: object.options }}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} />
      <Editor editorRef={answersRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: object.answers }}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} />
      <Editor editorRef={commentaryRef}
        contentEditable={isContentEditable[index]}
        dangerouslySetInnerHTML={{ __html: object.commentary }}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }} />
      <button onClick={() => { handleStateChange(index) }}>편집모드</button>
      <button onClick={() => { handleEdit() }}>수정</button>
      <button onClick={() => { sendDeleteData(object.id) }}>삭제</button>
    </>
  )
}