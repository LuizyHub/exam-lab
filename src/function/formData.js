// import { DataHandle } from "./DataHandle"
export default function formData() {
  const sendData = (URL, data, fileName, urlIn, urlOut) => {
    const formData = new FormData("file")
    formData.append(fileName); //<- blob name
    formData.append(urlIn);
    //이거 안해봄.,...
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": 'multipart/form-data',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (res.ok) {
        alert("저장");
      }
    })
  }
  // if (elementType1 !== "type" && elementType2 !== "type" && elementType3 !== "type") {
  //   sendData(URL, isData);
  // } else {
  //   alert('아무 것도 선택 되지 않았습니다.')
  // }
  return { sendData }
}