import EditorExam from "../components/EditorExam"
import NavigationBar from "../components/NavigationBar";
import AttributeManager from "../components/AttributeManager"
import AICreate from "../components/AICreate";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoginController } from "../function/useLoginController";
import styled from 'styled-components';
import { getData, getTagsData } from "../function/axiosData";
import EditorEdit from "../components/EditorEdit";
import '../css/EditExam.css';
import AI_create_Icon from'../img/AI_create_icon.svg';
import create_Icon from '../img/Create_icon.svg';
import hidden_Icon from '../img/Hidden_icon.svg';
import SideBar from "../components/SideBar";

// const EditExamPage = styled.div
//   `
//     display: flex;
//     flex-direction: column;
//     margin-left: 270px;
//     margin-right: 18%;
//     margin-top: 16px;
//     transition: margin-left 0.3s ease;
// `
//   ;

// 모든 모니터에 맞출 수 있게 코드 수정  
const EditExamPage = styled.div
  `
    display: flex;
    flex-direction: column;
    margin-left: 270px;
    margin-right: 18%;
    margin-top: 16px;
    transition: margin-left 0.3s ease;
    justify-content: center;
    align-items: center;
`
  ;

export default function EditExam() {
  const location = useLocation();
  // 선택된 시험의 examId와 examTitle을 받아, AttributeManager 컴포넌트에게 props로 전달
  const [examTitle, setExamTitle] = useState('');
  const [examId, setExamId] = useState('');
  const [isObject, setObject] = useState([]); //EditorEdit List
  const [isTag, setTag] = useState([]);
  const [isExistingExam, setExistingExam] = useState(true);

  const [isSize, setSize] = useState(100);
  const [isDeleteIndex, setDeleteIndex] = useState();
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
      if (examId) {
        getData(examId).then((object) => {
          setObject(object.questions);
        }).catch((error) => {
          console.error('아직 등록된 문제가 없습니다.', error);
        });

        getTagsData(examId).then((object) => {
          setTag(object.tags);
        }).catch((error) => {
          console.error("tag가 없습니다.", error);
        });
      }
  }, [examId]); // examId가 설정될 때 데이터를 가져옵니다.

  useEffect(() => { 
        //별개의 useEffect 커스텀 컴포넌트로 뺄지 고민 중
    //스크롤 따라오는 sideBar 함수
    const handleScroll = () => {
      const sidebar = document.getElementById('side-bar');
      if (sidebar) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const buttonHeight = sidebar.clientHeight;
        const initialPosition = 230; // 초기 위치
        let destination = scrollY / 10 + initialPosition;

        // 스크롤 위치에 따라서 속도 감소
        const distanceToBottom = documentHeight - scrollY - windowHeight;
        const maxSpeed = 0.1; // 최대 속도
        const minSpeed = 0.001; // 최소 속도
        const easing = minSpeed + (maxSpeed - minSpeed) * (1 - Math.exp(-distanceToBottom / 500)); // 거리에 따라 속도 감소

        const currentTop = parseFloat(sidebar.style.top) || initialPosition;
        const difference = destination - currentTop;

        // 사이드 바가 화면을 넘어가지 않도록 제어
        const maxHeight = windowHeight - buttonHeight;
        // const adjustedDestination = Math.min(destination, maxHeight);

        sidebar.style.top = `${Math.min(currentTop + difference * easing, maxHeight)}px`;
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
  };
  })
  
  const [isExamCreate, setExamCreate] = useState([]); //EditorExam List
  const [isGetExam, setExam] = useState([]);

  const handleExamCreate = () => {
    // 새로운 컴포넌트를 생성하여 상태에 추가
     if (examId) { // examId가 설정된 경우에만 컴포넌트 생성
      setExamCreate([...isExamCreate, <EditorExam key={isExamCreate.length} examId={examId} handleExamDelete={handleExamDelete} isTag={isTag} />]);
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    } else {
      console.error('examId is not set'); // examId가 설정되지 않은 경우의 오류 로그
    }
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

  const toggleExamVisibility = () => {
      setExistingExam((prevState) => !prevState); // 상태를 반전시킵니다.
    };

  return (
  <EditExamPage>
      <div className="edit-exam">

        <div id="side-bar">
          <button onClick={() => {
            handleExamCreate();
            console.log(examId);
          }}>
            <img src={create_Icon} alt="Create" />
          </button>
          <button onClick={() => setModalOpen(true)}>
            <img src={AI_create_Icon} alt="AI Create" />
          </button>
          <button onClick={toggleExamVisibility}>
            <img src={hidden_Icon} alt="Hide" />  
          </button>
        </div>

        <SideBar />
        <NavigationBar />
        <div></div>
        <AttributeManager examId={examId} setExamId={setExamId} ></AttributeManager>
        <div className="editor-edit">
          <div className="title">문제등록</div>
          <hr />
          {isExistingExam && <div>
          
              {/* 기존문제 가져오기 */}
              {/* isObject의 상태에 따라 EditorEdit 컴포넌트를 렌더링 */}
              <div>
                {isObject.map((object, index) => (
                  <div
                    key={index}
                    className="editor-out-line"
                  >
                    <EditorEdit object={object} index={index} isObject={isObject} handleEditDelete={handleEditDelete} isTag={isTag} />
                  </div>
                ))}
              </div>
            </div>
          }
          {/* 문제 템플릿 추가하기 */}
          <div className="editor-exam">
            {isExamCreate.map((component, index) => (
              <div className="editor-exam-out-line" key={index}>
                {component}
              </div>
            ))}
          </div>
          {/* <div className="editor-out-line"> */}
            <AICreate examId={examId} modalOpen={modalOpen} setModalOpen={setModalOpen} isTag={isTag} />
          {/* </div> */}
        </div>
      </div>
    </EditExamPage>
  )
}
