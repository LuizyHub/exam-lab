import { useState } from "react";
export default function SelectExam() {
  const [examType, setExamType] = useState(); //시험지 종류
  const [checkType, setCheckType] = useState([]); //체크박스 리스트
  const [select, setSelect] = useState(20);// 문제 문항 수 select 값

  //체크박스 중복 불가
  function setCheckType_Fn(e) {
    const value = e.target.value;
    if (e.target.checked) {
      console.log(e.target.value);
      setCheckType((prevCheckType) => [...prevCheckType, value]);
    } else if (!e.target.checked) {
      setCheckType((prevCheckType) => prevCheckType.filter(item => item !== value)); // item이 e.target.value처럼 target이 되었는지 확인
    }
  }

  return (
    <form action="" onSubmit={(e) => {
      e.preventDefault();
      const format_info = {
        '시험 종류': examType,
        'tagType': checkType,
        'limit': select,
      }
      console.log(format_info);
    }}>
      <input type="button" value={"운전면허url"} onClick={(e) => {
        setExamType(e.target.value);
        console.log(e.target.value);
      }} />
      {/* Jsx로 객체를 받아 와서 변경 가능 */}
      <input type="checkbox" value={"1종 보통"} onChange={setCheckType_Fn} />1종 보통

      <input type="checkbox" value={"2종 보통"} onChange={setCheckType_Fn} />2종 보통

      <input type="checkbox" value={"대형"} onChange={setCheckType_Fn} />대형

      <input type="checkbox" value={"특수"} onChange={setCheckType_Fn} />특수

      <input type="checkbox" value={"소형"} onChange={setCheckType_Fn} />소형

      <input type="checkbox" value={"원동기"} onChange={setCheckType_Fn} />원동기

      <select onChange={(e) => { setSelect(e.target.value) }}>
        <option value={20}>20</option>
        <option value={15}>15</option>
        <option value={10}>10</option>
        <option value={5}>5</option>
      </select>

      <input type="submit"></input>
    </form>
  )
}
