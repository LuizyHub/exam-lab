// import { DataHandle } from "./DataHandle"
export default function formData({ elementType1, elementType2, elementType3 }) {

  // const content = sessionStorage.getItem('content') || ''; // 세션 스토리지에서 content 값을 가져옵니다.
  // const isImageUrl = sessionStorage.getItem('isImageUrl') ? JSON.parse(sessionStorage.getItem('isImageUrl')) : []; // 세션 스토리지에서 isImageUrl 값을 가져와 JSON 파싱합니다.
  const isData = sessionStorage.getItem('Data') || '';

  // const { content, isImageUrl } = DataHandle();

  // const myData = {
  //   question: content,
  //   commentaryImagesTextIn: [
  //     { url: 'Null', description: 'Null', attribute: 'Null' }
  //   ],
  //   questionImagesTextOut: [
  //     { url: isImageUrl[0], description: '', attribute: '' }
  //   ]
  // }


  const URL = 'http://localhost:3001/sample'

  const sendData = (URL, data) => {
    // alert('check');
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data
      }),
    }).then(res => {
      if (res.ok) {
        alert("저장");
      }
    })
  }
  if (elementType1 !== "type" && elementType2 !== "type" && elementType3 !== "type") {
    sendData(URL, isData);
  } else {
    alert('아무 것도 선택 되지 않았습니다.')
  }

}