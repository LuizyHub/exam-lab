import EditorExam from "../components/EditorExam"
import AttributeManager from "../components/AttributeManager"
import AICreate from "../test/AI/AICreate";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoginController } from "../function/useLoginController";
import { getData, sendDeleteData, sendPutData } from "../function/axiosData";
import EditorEdit from "../components/EditorEdit";
// import { useDataHandle } from "../..//dataHandle";

export default function EditExam() {

  //로그인 리모컨
  const { handleAutoLogin, handleLogout, handleLoginState } = useLoginController();
  const location = useLocation();
  // 선택된 시험의 examId와 examTitle을 받아, AttributeManager 컴포넌트에게 props로 전달
  const [examTitle, setExamTitle] = useState('');
  const [examId, setExamId] = useState('');
  //DON'T DELETED
  const [isObject, setObject] = useState([]);
  const [isSize, setSize] = useState(100);
  //Axios Get useState
  // const [isGetId, setId] = useState([]);
  // const [isGetQuestion, setQuestion] = useState([]);
  // const [isGetQuestion_images_in, setQuestion_images_in] = useState([]);
  // const [isGetQuestion_images_out, setQuestion_images_out] = useState([]);
  // const [isGetOptions, setOptions] = useState([]);
  // const [isGetAnswers, setAnswers] = useState([]);
  // const [isGetCommentary, setCommentary] = useState([]);
  // const [isGetCommentary_images_in, setCommentary_images_in] = useState([]);
  // const [isGetCommentary_images_out, setCommentary_images_out] = useState([]);
  // const [isGetTags, setTags] = useState([]);
  // const [isGetType, setType] = useState([]);


  // 각 Editor의 contentEditable 상태를 관리하는 상태
  console.log("Location:", location);
  console.log("Exam ID:", examId);
  console.log("Exam Title:", examTitle);

  useEffect(() => {
    // location.state가 정의되어 있을 때만 examId와 examTitle을 설정합니다.
    if (location && location.state) {
      const { examId, examTitle } = location.state;
      setExamId(examId);
      setExamTitle(examTitle);
      // console.log("Location:", location);
      // console.log("Exam ID:", examId);
      // console.log("Exam Title:", examTitle);

      getData(examId).then((object) => {
        setObject(object.questions);
        // setSize(object.size)
      }).catch((error) => {
        console.error('아직 등록된 문제가 없습니다.', error);
        // 예외 발생 시 적절한 처리를 수행합니다. 예를 들어, 사용자에게 오류 메시지를 표시하거나 다시 시도할 수 있도록 재시도 로직을 추가할 수 있습니다.
      });

    }
  }, [location]);//useEffect로 가지고 왔기 때문에 새로고침이 발생해야하기에 의존성 uesEffect가 다시 렌더링이 되어야 한다.

  const [isExamCreate, setExamCreate] = useState([]);
  const [isGetExam, setExam] = useState([]);
  const handleExamCreate = () => {
    // 새로운 컴포넌트를 생성하여 상태에 추가
    setExamCreate([...isExamCreate, <EditorExam key={isExamCreate.length} examId={examId} />]);
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
      {/* <div style={{ marginBottom: '40px' }}>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleAutoLogin() }}>logIn</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLogout() }}>logOut</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLoginState() }}>logState</button>
      </div> */}

      <button>시험지 생성</button>

      <AttributeManager examId={examId}></AttributeManager>

      {/* 기존문제 가져오기 */}
      {/* {isObject.map((object, index) => (
        <div key={index}>
          <EditorEdit object={object} index={index} isObject={isObject}></EditorEdit>
        </div>
      ))} */}

      {/* isObject의 상태에 따라 EditorEdit 컴포넌트를 렌더링 */}
      {isObject.map((object, index) => (
        <div key={index}>
          <EditorEdit object={object} index={index} isObject={isObject} />
        </div>
      ))}

      {/* 문제 템플릿 추가하기 */}
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
        console.log(examId);
      }}>문제추가</button>
      {/* <button onClick={() => {
        getData(examId).then((id) => { console.log(id) })
      }}>GetAxios</button> */}
      <AICreate examId={examId} />
    </>
  )
}
