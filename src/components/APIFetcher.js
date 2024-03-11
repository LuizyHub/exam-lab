import { useState, useEffect } from "react";
export default function APIFetcher(limit) {
  const [data, setData] = useState([]);
  // const random = Math.floor(Math.random() * limit);
  // console.log(random);
  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        setData(data.slice(0, limit));
        // console.log(data); //data 배열 값 확인
        // console.log(data[0]); //data 배열 값 확인
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [limit]);

  return data;
}