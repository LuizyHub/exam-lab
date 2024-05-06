// import { useRef } from "react";
import EditorExam from "../components/EditorExam"
import EditorComment from "../components/EditorComment"
import AttributeManager from "../components/AttributeManager"
import { useState } from "react";
import { useLoginController } from "../function/useLoginController";
// import { useDataHandle } from "../..//dataHandle";

import { useRecoilState } from "recoil";
// import {
//   IDState,
//   ResQuestionState,
//   ResOptionState,
//   ResUrlInState,
//   ResUrlOutState,
//   ResUrlOutDesState,
// } from '../function/recoilView';
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

  const handleCommentCreate = () => {
    // 새로운 컴포넌트를 생성하여 상태에 추가
    console.log('click');
    setCommentCreate([...isCommentCreate, <EditorComment key={isCommentCreate.length} number={isCommentCreate.length + 1} />]);
  };

  const handleCommentDelete = (elementIndex) => {
    // 인덱스를 사용하여 삭제할 컴포넌트를 제외한 배열을 만듭니다.
    const deleteElement = isCommentCreate.filter((_, index) => index !== elementIndex);
    // 변경된 배열을 상태에 적용합니다.
    setCommentCreate(deleteElement);
  };

  //recoil
  // const [ID, setID] = useRecoilState(IDState);
  // const [isResQuestion, setResQuestion] = useRecoilState(ResQuestionState);
  // const [isResOption, setResOption] = useRecoilState(ResOptionState);
  // const [isResUrlIn, setResUrlIn] = useRecoilState(ResUrlInState);
  // const [isResUrlOut, setResUrlOut] = useRecoilState(ResUrlOutState);
  // const [isResUrlOutDes, setResUrlOutDes] = useRecoilState(ResUrlOutDesState);


  //이미지 마킹 실제 이미지로 전환
  // const imgRegex = /<img[^>]*>/ig;
  // let imgIndex = 0;
  // const replacedQuestion = isResQuestion.replace(imgRegex, () => {
  //   // 이미지의 번호를 1부터 시작하여 증가시킵니다.
  //   imgIndex++;

  //   return `<img src='${isResUrlIn[imgIndex - 1]}' style= "width:5%;" />`;
  // })

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
      {/* AttributeManager 저장하기가 되어야 EditorExam이 활성화 */}
      <div style={{ marginTop: '40px' }}>
        <button onClick={
          () => {
            handleSetType('true')
            // console.log(isType);
          }}>문제</button>

        <button onClick={
          () => {
            handleSetType('false')
            // console.log(isType);
          }}>답안</button>
        <a>{isType}</a>
      </div>

      <>
        {isType === 'true' && <h1>문제등록</h1>}
        {isType === 'false' && <h1>답안등록</h1>}
      </>

      {/* <div>
        <h1>View</h1>
        <p>{isExamCreate.length + 1}</p>
        <p dangerouslySetInnerHTML={{ __html: replacedQuestion }} /> */}
      {/* {isResUrlIn.map((URL, index) => (
          <img key={index} src={URL} style={{ width: '25%' }} />
        ))} */}
      {/* {isResUrlOut.map((URL, index) => (
          <img key={index} src={URL} style={{ width: '25%' }} />
        ))}
        <p dangerouslySetInnerHTML={{ __html: isResUrlOutDes }} />
        {isResOption.map((options, index) => (
          <p key={index}
            dangerouslySetInnerHTML={{ __html: options }}></p>
        ))}
      </div> */}



      {isExamCreate.map((component, index) => (
        <div key={index} style={{ marginTop: '40px' }}>
          <div key={index} style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '700px' }}>

            <button style={{ marginLeft: '80%' }} onClick={() => handleExamDelete(index)}>템플릿 삭제</button>

            <div key={index}>{component}</div>

          </div>
        </div>
      ))}

      {isCommentCreate.map((component, index) => (
        <div key={index} style={{ marginTop: '40px' }}>
          <div key={index} style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '700px' }}>

            <button style={{ marginLeft: '80%' }} onClick={() => handleCommentDelete(index)}>템플릿 삭제</button>

            <div key={index}>{component}</div>

          </div>
        </div>
      ))}
      {/* <button
        className="create-button" // 버튼에 클래스 추가
        onClick={() => {
          if (isType === 'true') {
            console.log('문제 등록 버튼을 클릭했습니다.');
            handleExamCreate();
          } else if (isType === 'false') {
            console.log('답안 등록 버튼을 클릭했습니다.');
            handleCommentCreate();
          } else {
            console.log('올바르지 않은 상태입니다. 기본적으로 문제 등록 상태로 설정합니다.');
            setType('true');
          }
        }}
      >{isType === 'true' ? '문제등록' : '답안등록'}</button> */}
      <button onClick={() => {
        handleExamCreate();
      }}>문제등록</button>
      <button onClick={() => {
        handleCommentCreate()
      }}>답안등록</button>
      {/* <footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '200px', backgroundColor: 'red' }}>
      </footer> */}
    </>
  )
}
