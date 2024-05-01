// import { useRef } from "react";
import EditorExam from "../components/EditorExam"
import AttributeManager from "../components/AttributeManager"
// import { useDataHandle } from "../..//dataHandle";
export default function EditExam() {
  return (
    <>
      <h1>Test</h1>
      <AttributeManager></AttributeManager>
      {/* AttributeManager 저장하기가 되어야 EditorExam이 활성화 */}
      <EditorExam></EditorExam>
      {/* <EditorExam></EditorExam>
      <EditorExam></EditorExam> */}
    </>
  )
}
