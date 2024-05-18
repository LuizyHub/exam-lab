import EditorExam from "../components/EditorExam"
import NavigationBar from "../components/NavigationBar";
import AttributeManager from "../components/AttributeManager"
import AICreate from "../components/AICreate";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoginController } from "../function/useLoginController";
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import styled from 'styled-components';
import { getData, sendDeleteData, sendPutData } from "../function/axiosData";
import EditorEdit from "../components/EditorEdit";
import '../css/EditExam.css';
// import { useDataHandle } from "../..//dataHandle";

const EditExamPage = styled.div
  `
    display: flex;
    flex-direction: column;
    margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '250px' : '60px'};
    transition: margin-left 0.3s ease;
`
  ;

export default function EditExam() {

  //로그인 리모컨
  const { handleAutoLogin, handleLogout, handleLoginState } = useLoginController();
  const isSidebarOpen = useRecoilValue(isVisibleState);

  const location = useLocation();
  // 선택된 시험의 examId와 examTitle을 받아, AttributeManager 컴포넌트에게 props로 전달
  const [examTitle, setExamTitle] = useState('');
  const [examId, setExamId] = useState('');
  //DON'T DELETED
  const [isObject, setObject] = useState([]); //EditorEdit List
  const [isSize, setSize] = useState(100);
  const [isDeleteIndex, setDeleteIndex] = useState();

  // 각 Editor의 contentEditable 상태를 관리하는 상태
  // console.log("Location:", location);
  // console.log("Exam ID:", examId);
  // console.log("Exam Title:", examTitle);

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
      });

    }

    //별개의 useEffect 커스텀 컴포넌트로 뺄지 고민 중
    const handleScroll = () => {
      const sidebar = document.getElementById('side-bar');
      if (sidebar) {
        const scrollY = window.scrollY;
        sidebar.style.top = `${scrollY / 10 + 230}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [location]);

  const [isExamCreate, setExamCreate] = useState([]); //EditorExam List
  const [isGetExam, setExam] = useState([]);

  const handleExamCreate = () => {
    // 새로운 컴포넌트를 생성하여 상태에 추가
    setExamCreate([...isExamCreate, <EditorExam key={isExamCreate.length} examId={examId} handleExamDelete={handleExamDelete} />]);
  };

  //아래 둘을 하나의 함수로 변경
  const handleExamDelete = (elementIndex) => {
    const deleteElement = isExamCreate.filter((_, index) => index !== elementIndex);
    setExamCreate(deleteElement);
  };

  const handleEditDelete = (elementIndex) => {
    const deleteElement = isObject.filter((_, index) => index !== elementIndex);
    setObject(deleteElement);
  };


  return (
    <EditExamPage $isSidebarOpen={isSidebarOpen}>

      <div className="edit-exam">

        <div id="side-bar">
          <button onClick={() => {
            handleExamCreate();
            console.log(examId);
          }}>문제추가</button>
        </div>

        <NavigationBar />
        <div></div>
        <AttributeManager examId={examId}></AttributeManager>

        {/* 기존문제 가져오기 */}
        <div className="editor-edit">
          <hr />
          <div className="title">문제등록</div>

          {/* isObject의 상태에 따라 EditorEdit 컴포넌트를 렌더링 */}
          <div>
            {isObject.map((object, index) => (
              <div
                key={index}
                className="editor-out-line"
              >
                <EditorEdit object={object} index={index} isObject={isObject} handleEditDelete={handleEditDelete} />
              </div>
            ))}
          </div>

          {/* 문제 템플릿 추가하기 */}
          <div className="editor-exam">
            {isExamCreate.map((component, index) => (
              <div className="editor-exam-out-line" key={index}>
                <div key={index}>{component}</div>
              </div>
            ))}
          </div>

          <AICreate examId={examId} />
        </div>
      </div>
    </EditExamPage>
  )
}
