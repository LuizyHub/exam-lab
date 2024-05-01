import React, { useState } from 'react';

export const useImage = () => {

  const [selectedImage, setSelectedImage] = useState(null); // 클릭된 이미지 정보를 저장할 상태 변수
  const [isImageSize, setImageSize] = useState(50); //이미지 크기 값 저장

  const handleImgSize = (e) => {
    const value = parseInt(e.currentTarget.value); //이벤트로 가져온 value
    if (selectedImage) {
      // 선택된 이미지가 있는 경우에만 이미지 크기 업데이트
      selectedImage.style.maxWidth = `${value}%`; // 선택된 이미지의 스타일 변경
    }

    setImageSize(value);
    console.log(value);
  }

  // 로컬 이미지 선택 및 규격 설정 핸들러, 이미지 파일명 확인이 가능하다.
  const handleImageSelect = (e, elementRef) => {
    const files = e.target.files;
    console.log(files[0].name);
    // console.log(typeof (files));
    if (!!files && files.length > 0) {
      const file = files[0];
      // 이미지 크기 제한
      const maxSizeInBytes = 1e6; // 1MB
      if (file.size > maxSizeInBytes) {
        alert('이미지 크기가 너무 큽니다. 1MB보다 작은 파일을 선택해주세요.');
        return;
      }
      // 이미지 포맷 확인
      if (!file.name.toLowerCase().endsWith('.png')) {
        alert('이미지 형식은 PNG만 지원합니다.');
        return;
      }
      // readImageData(file, elementRef);
      // insertImageConfig()
    }

    const fileUrl = URL.createObjectURL(files[0]);
    const fileName = files[0].name;
    // const imgTag = `<img src="${fileUrl}" alt="Uploaded Image" />`;
    // const result = elementRef.current.innerHTML += imgTag;
    insertImageConfig(elementRef, fileUrl, fileName)


    return files[0]; //항상 배열로 넘겨줘야함
  };

  // // 이미지를 렌더링하는 함수, 여기서 이미지 url을 알 수 있다.
  // const readImageData = (file, elementRef) => {
  //   // 이미지 파일을 읽어들임
  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     const imageDataUrl = e.target.result; //여기서 const여야 하는 이유는?우선 한번 이미지를렌더링 할 때 변경할 필요가 없기 때문이다.
  //     setUrl(imageDataUrl);

  //     // 이미지 삽입
  //     insertImageConfig(imageDataUrl, elementRef);//어떤 영역에 읽어 드릴지 정해야 해서 elementRef를 인자로 두어야 한다.
  //     console.log(`url : ${exportUrl}`)
  //   };
  //   reader.readAsDataURL(file, elementRef);

  // }

  //나중에 export

  // 이미지 삽입, 이미지 설정 함수
  const insertImageConfig = (elementRef, imageDataUrl, elementName) => {

    const imgElement = document.createElement('img');

    imgElement.setAttribute('id', elementName); // 이미지에 아이디 설정
    imgElement.src = imageDataUrl;

    // 초기 이미지 크기 값 설정
    imgElement.style.maxWidth = '30%';
    imgElement.style.height = 'auto';

    // 이미지 클릭 이벤트 핸들러 추가
    imgElement.onclick = (e) => {
      const imageSize = parseInt(e.target.style.maxWidth); // 클릭된 이미지의 크기 가져오기
      setImageSize(imageSize);
      setSelectedImage(e.target); // 클릭된 이미지 정보 저장
      // console.log(e.target);
    };
    console.log(imgElement);
    // 에디터에 이미지 DOM에 삽입 -> 여기를 해결...
    if (elementRef.current) {
      elementRef.current.appendChild(imgElement);
    } else {
      console.error("Editor reference is null.");
    }
    return imgElement
  }

  return { isImageSize, handleImgSize, handleImageSelect, insertImageConfig };//insertImageConfig사용하세요
}



