import { useState } from 'react';

export const useImage = () => {

  const [selectedImage, setSelectedImage] = useState(null); // 클릭된 이미지 정보를 저장할 상태 변수
  const [isImageSize, setImageSize] = useState(50); //이미지 크기 값 저장

  const handleImgSize = (e) => {//이미지 크기 조절이 안됨
    // const value = parseInt(e.currentTarget.value); //이벤트로 가져온 value
    // if (selectedImage) {
    //   // 선택된 이미지가 있는 경우에만 이미지 크기 업데이트
    //   selectedImage.style.maxWidth = `${value}%`; // 선택된 이미지의 스타일 변경
    // }

    // setImageSize(value);
    // console.log(value);
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
    insertOldImageConfig(elementRef, fileUrl, fileName)
    // insertImageConfig(elementRef, fileUrl, fileName)

    return files[0]; //항상 배열로 넘겨줘야함
  };

  // 이미지 삽입, 이미지 설정 함수
  const insertImageConfig = (elementRef, imageDataUrl, elementName) => {
    // 이미지 컨테이너 생성
    const container = document.createElement('div');
    container.style.position = 'relative'; // 상대 위치 설정
    const imgElement = document.createElement('img');
    const buttonElement = document.createElement('button'); // 버튼 엘리먼트 생성

    imgElement.setAttribute('id', elementName); // 이미지에 아이디 설정
    imgElement.src = imageDataUrl;

    imgElement.onload = () => {
      // 초기 이미지 크기 값 설정
      // 이미지가 로드된 후에 실행되는 코드

      // 가공된 너비와 높이 설정
      const customWidth = 100; // 가공된 너비
      const customHeight = 100; // 가공된 높이

      // 가공된 너비와 높이를 적용하여 div의 크기 설정
      container.style.width = customWidth + 'px'; // div의 너비를 가공된 너비로 설정
      container.style.height = customHeight + 'px'; // div의 높이를 가공된 높이로 설정
    };

    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';

    // 이미지 클릭 이벤트 핸들러 추가
    imgElement.onclick = (e) => {
      const imageSize = parseInt(e.target.style.maxWidth); // 클릭된 이미지의 크기 가져오기
      setImageSize(imageSize);
      setSelectedImage(e.target); // 클릭된 이미지 정보 저장
      // console.log(e.target);
    };
    console.log(imgElement);

    // 버튼 설정
    buttonElement.textContent = 'x'; // 버튼 텍스트 설정
    buttonElement.style.position = 'absolute'; // 절대 위치 설정
    // buttonElement.style.top = '50%'; // 상단을 기준으로 50% 위치
    // buttonElement.style.left = '50%'; // 왼쪽을 기준으로 50% 위치
    // buttonElement.style.transform = 'translate(-50%, -50%)'; // 가운데 정렬
    buttonElement.onclick = (e) => {
      // 버튼 클릭 시 이미지 삭제 로직 추가
      imgElement.remove();
      buttonElement.remove();
    };

    // 에디터에 이미지 DOM에 삽입 -> 여기를 해결...
    if (elementRef.current) {
      container.appendChild(imgElement);
      container.appendChild(buttonElement); // 버튼 삽입
      elementRef.current.appendChild(container); // 컨테이너 삽입
    } else {
      console.error("Editor reference is null.");
    }
    return imgElement
  }

  // 이미지 삽입, 이미지 설정 함수
  const insertOldImageConfig = (elementRef, imageDataUrl, elementName) => {

    const imgElement = document.createElement('img');
    const buttonElement = document.createElement('button'); // 버튼 엘리먼트 생성

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

    // 버튼 설정
    buttonElement.textContent = 'Delete'; // 버튼 텍스트 설정
    buttonElement.onclick = (e) => {
      // 버튼 클릭 시 이미지 삭제 로직 추가
      imgElement.remove();
      buttonElement.remove();
    };

    // 에디터에 이미지 DOM에 삽입 -> 여기를 해결...
    if (elementRef.current) {
      elementRef.current.appendChild(imgElement);
      // elementRef.current.appendChild(buttonElement); // 버튼 삽입
    } else {
      console.error("Editor reference is null.");
    }
    return imgElement
  }

  return { isImageSize, handleImgSize, handleImageSelect, insertImageConfig };//insertImageConfig사용하세요
}



