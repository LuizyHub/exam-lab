// import { useRef } from "react";
import EditorExam from "../components/EditorExam"
import AttributeManager from "../components/AttributeManager"
import { useState } from "react";
import { useLoginController } from "../function/useLoginController";
// import { useDataHandle } from "../..//dataHandle";

import { useRecoilState } from "recoil";
import {
  IDState,
  ResQuestionState,
  ResOptionState,
  ResUrlInState,
  ResUrlOutState,
  ResUrlOutDesState,
} from '../function/recoilView';
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

  //recoil
  const [ID, setID] = useRecoilState(IDState);
  const [isResQuestion, setResQuestion] = useRecoilState(ResQuestionState);
  const [isResOption, setResOption] = useRecoilState(ResOptionState);
  const [isResUrlIn, setResUrlIn] = useRecoilState(ResUrlInState);
  const [isResUrlOut, setResUrlOut] = useRecoilState(ResUrlOutState);
  const [isResUrlOutDes, setResUrlOutDes] = useRecoilState(ResUrlOutDesState);


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
      <div style={{ marginBottom: '40px' }}>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleAutoLogin() }}>logIn</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLogout() }}>logOut</button>
        <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => { handleLoginState() }}>logState</button>
      </div>
      <button>시험지 생성</button>
      <AttributeManager></AttributeManager>
      {/* AttributeManager 저장하기가 되어야 EditorExam이 활성화 */}


      {/* <div>
        <h1>View</h1>
        <p>{isCreate.length + 1}</p>
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

      <button
        onClick={() => { handleCreate(); console.log(isCreate.length); }}
      >생성</button>
      {isCreate.map((component, index) => (
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
