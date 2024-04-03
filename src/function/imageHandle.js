import React, { useState } from 'react';

export const useImageSize = () => {
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

  // 로컬 이미지 선택 및 규격 설정 핸들러
  const handleImageSelect = (e, elementRef) => {
    const files = e.target.files;
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
      readImageData(file, elementRef);
    }
  };

  // 이미지를 렌더링하는 함수
  const readImageData = (file, elementRef) => {
    // 이미지 파일을 읽어들임
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;
      // 이미지 삽입
      insertImageConfig(imageDataUrl, elementRef);
    };
    reader.readAsDataURL(file, elementRef);
  }

  //나중에 export
  // 고유한 아이디 생성 함수
  const generateUniqueId = () => {
    return 'img_' + Math.random().toString(36).slice(2, 11); // 랜덤한 문자열을 이용한 고유 아이디 생성
  };

  // 이미지 삽입, 이미지 설정 함수
  const insertImageConfig = (imageDataUrl, elementRef) => {

    const imgElement = document.createElement('img');
    const imageId = generateUniqueId(); // 고유한 아이디 생성

    imgElement.setAttribute('id', imageId); // 이미지에 아이디 설정
    imgElement.src = imageDataUrl;

    // 초기 이미지 크기 값 설정
    imgElement.style.maxWidth = '50%';
    imgElement.style.height = 'auto';

    // 이미지 클릭 이벤트 핸들러 추가
    imgElement.onclick = (e) => {
      const imageSize = parseInt(e.target.style.maxWidth); // 클릭된 이미지의 크기 가져오기
      setImageSize(imageSize);
      setSelectedImage(e.target); // 클릭된 이미지 정보 저장
      // console.log(e.target);
    };

    // 에디터에 이미지 DOM에 삽입
    if (elementRef.current) {
      elementRef.current.appendChild(imgElement);
    } else {
      console.error("Editor reference is null.");
    }

  }

  return { isImageSize, handleImgSize, handleImageSelect };
}



