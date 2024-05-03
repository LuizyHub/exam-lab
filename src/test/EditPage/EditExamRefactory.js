import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EditorExam from "../../components/EditorExam";
import AttributeManager from "../../components/AttributeManager";
// import { useDataHandle } from "../..//dataHandle";

export default function EditExam() {

  const location = useLocation();

  // 선택된 시험의 examId와 examTitle을 받아, AttributeManager 컴포넌트에게 props로 전달
  const [examTitle, setExamTitle] = useState('');
  const [examId, setExamId] = useState('');

  console.log("Location:", location);
  console.log("Exam ID:", examId);
  console.log("Exam Title:", examTitle);

  // 컴포넌트가 로드될 때 실행되는 훅
  useEffect(() => {
    // location.state가 정의되어 있을 때만 examId와 examTitle을 설정합니다.
    if (location && location.state) {
      const { examId, examTitle } = location.state;
      setExamId(examId);
      setExamTitle(examTitle);
      console.log("Location:", location);
      console.log("Exam ID:", examId);
      console.log("Exam Title:", examTitle);

    }
  }, [location]);

  return (
    <>
      <AttributeManager examId={examId} />
      <h1>Test</h1>
      <EditorExam></EditorExam>
      {/* <EditorExam></EditorExam>
      <EditorExam></EditorExam> */}
    </>
  )
}
