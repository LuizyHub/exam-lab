// import { useRef } from "react";
import EditorExam from "../components/EditorExam"
import AttributeManager from "../components/AttributeManager"
import { useState } from "react";
// import { useDataHandle } from "../..//dataHandle";

export default function EditExam() {
  const [isCreate, setCreate] = useState([]);
  const handleCreate = () => {
    // 새로운 컴포넌트를 생성하여 상태에 추가
    setCreate([...isCreate, <EditorExam key={isCreate.length} />]);
  };

  return (
    <>
      <h1>Test</h1>
      <AttributeManager></AttributeManager>
      {/* AttributeManager 저장하기가 되어야 EditorExam이 활성화 */}

      <div style={{ marginTop: '40px', padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '700px' }}>
        {isCreate.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </div>

      <button
        onClick={handleCreate}
      >생성</button>


      {/* <EditorExam></EditorExam>
      <EditorExam></EditorExam> */}
    </>
  )
}
