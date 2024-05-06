// import { useRef } from "react";
import EditorExam from "../components/EditorExam"
import EditorComment from "../components/EditorComment"
import AttributeManager from "../components/AttributeManager"
import { useState } from "react";
import { useLoginController } from "../function/useLoginController";

export default function EditExam() {

  //로그인 리모컨
  const { handleAutoLogin, handleLogout, handleLoginState } = useLoginController();

  const [isExamCreate, setExamCreate] = useState([]);
  const [isCommentCreate, setCommentCreate] = useState([]);
  const [isType, setType] = useState('true');

  const handleSetType = (element) => {
    return setType(element);
  }

  const handleExamCreate = () => {
    // 새로운 컴포넌트를 생성하여 상태에 추가
    setExamCreate([...isExamCreate, <EditorExam key={isExamCreate.length} number={isExamCreate.length + 1} />]);
  };

  const handleExamDelete = (elementIndex) => {
    // 인덱스를 사용하여 삭제할 컴포넌트를 제외한 배열을 만듭니다.
    const deleteElement = isExamCreate.filter((_, index) => index !== elementIndex);
    // 변경된 배열을 상태에 적용합니다.
    setExamCreate(deleteElement);
  };

  return (
    <>
      <h1>Test</h1>
      {/* 리모컨 */}
      <div style={{ marginBottom: '40px' }}>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleAutoLogin() }}>logIn</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLogout() }}>logOut</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLoginState() }}>logState</button>
      </div>

      <button>시험지 생성</button>

      <AttributeManager></AttributeManager>

      {isExamCreate.map((component, index) => (
        <div key={index} style={{ marginTop: '40px' }}>
          <div key={index} style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '700px' }}>

            <button style={{ marginLeft: '80%' }} onClick={() => handleExamDelete(index)}>템플릿 삭제</button>

            <div key={index}>{component}</div>

          </div>
        </div>
      ))}

      <button onClick={() => {
        handleExamCreate();
      }}>문제추가</button>

    </>
  )
}
