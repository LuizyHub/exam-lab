// import { useRef } from "react";
import EditorExam from "../components/EditorExam"
import AttributeManager from "../components/AttributeManager"
import { useState } from "react";
import { useLoginController } from "../function/useLoginController";
// import { useDataHandle } from "../..//dataHandle";

export default function EditExam() {

  //로그인 리모컨
  const { handleAutoLogin, handleLogout, handleLoginState } = useLoginController();

  const [isCreate, setCreate] = useState([]);

  const handleCreate = () => {
    // 새로운 컴포넌트를 생성하여 상태에 추가
    setCreate([...isCreate, <EditorExam key={isCreate.length} number={isCreate.length + 1} />]);
  };

  const handleDelete = (elementIndex) => {
    // 인덱스를 사용하여 삭제할 컴포넌트를 제외한 배열을 만듭니다.
    const deleteElement = isCreate.filter((_, index) => index !== elementIndex);
    // 변경된 배열을 상태에 적용합니다.
    setCreate(deleteElement);
  };

  return (
    <>
      <h1>Test</h1>
      <div style={{ marginBottom: '40px' }}>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleAutoLogin() }}>logIn</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLogout() }}>logOut</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLoginState() }}>logState</button>
      </div>
      <button>시험지 생성</button>
      <AttributeManager></AttributeManager>
      {/* AttributeManager 저장하기가 되어야 EditorExam이 활성화 */}

      <button
        onClick={() => { handleCreate(); console.log(isCreate.length); }}
      >생성</button>
      {isCreate.reverse().map((component, index) => (
        <div key={index} style={{ marginTop: '40px' }}>
          <div key={index} style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '700px' }}>
            <button style={{ marginLeft: '80%' }} onClick={() => handleDelete(index)}>템플릿 삭제</button>

            <div key={index}>{component}</div>

          </div>
        </div>
      ))}


    </>
  )
}
