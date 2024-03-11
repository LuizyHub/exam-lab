
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sub_Lab() {
  // const [data, setData] = useState([]);
  // const [limit, setLimit] = useState(5);
  // ; useEffect(() => {
  //   fetch('http://localhost:3001/sample')
  //     .then(res => res.json())
  //     .then((data) => {
  //       setData(data.slice(0, limit)); // slice를 통해서 10개의 아이템만 가져올 것 -> useEffect의 특징상 한번 호출하고 다시 re-render가 되지 않는다. 따라서 useEffect를 limit에 의존 시켜야한다.
  //       // map((data)=>{cons})
  //       console.log(data); //data 배열 값 확인
  //       console.log(data[0]); //data 배열 값 확인
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [limit]);

  return (
    <div>
      {/* <h2>Test</h2>
      <select onChange={(e) => { setLimit(e.target.value); }}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <Link to="/">back</Link>
      <ol>
        {data.map((data) => (
          <li key={data.id}><p>{data.question}</p>{data.options}</li>
        ))}
      </ol> */}
    </div >
  );
}
