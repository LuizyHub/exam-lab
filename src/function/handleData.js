import React from 'react';
import parse from 'html-react-parser';


export const handleData = () => {

  // 이미지 추적 후 여기에 html로 저장이 될 수는 함수

  //이미지의 url만 저장되는 코드
  //여기에 매개변수로 setData를 가지고 와서 추가 삭제하는 방식?
  const handleContent = (elementRef, elementImage) => {
    //에러처리
    // if (!elementRef || !elementRef.current) {
    //   console.error("Editor ref is not initialized.");
    //   return;
    // }

    // content를 저장하는 부분
    const inputContent = elementRef.current.innerHTML;//매개변수로 빼기
    console.log(inputContent);
    const parsedContent = parse(inputContent);
    let hasImages = false;
    let updatedImageUrls = [...elementImage]; //
    let newImageUrls = []; //새로운 이미지
    // 이미지 추적
    React.Children.forEach(parsedContent, child => {
      //이미지를 추가하는 코드
      if (child.type === 'img') {
        hasImages = true;
        const imageUrl = child.props.src;
        if (!newImageUrls.includes(imageUrl)) {
          newImageUrls.push(imageUrl);
        }
      }
    });

    if (!hasImages && (elementImage.length > 0)) {
      console.log('이미지가 포함되지 않았습니다. 이미지 ID와 URL을 초기화합니다.');
      updatedImageUrls = [];
    } else {
      console.log('이미지가 있습니다.')
      updatedImageUrls = updatedImageUrls.filter(url => newImageUrls.includes(url));
    }
    console.log(updatedImageUrls);
    return updatedImageUrls;
  };

  const handleIdContent = (elementRef, elementImageId) => {
    const inputContent = elementRef.current.innerHTML;
    const parsedContent = parse(inputContent);
    let hasImages = false;
    let updatedImageIds = [...elementImageId]; //
    let newImageIds = []; // 새로운 이미지 ID 배열
    // 이미지 추적
    React.Children.forEach(parsedContent, child => {
      // 이미지를 추가하는 코드
      if (child.type === 'img') {
        hasImages = true;
        const imageId = child.props.id; // 이미지의 ID 추출
        if (!newImageIds.includes(imageId)) {
          newImageIds.push(imageId);
        }
      }
    });

    if (!hasImages && (elementImageId.length > 0)) {
      console.log('이미지가 포함되지 않았습니다. 이미지 ID를 초기화합니다.');
      updatedImageIds = [];
    } else {
      console.log('이미지가 있습니다.')
      // 이전에 저장된 이미지 ID 배열과 새로운 이미지 ID 배열을 비교하여 유지해야 할 이미지 ID를 업데이트합니다.
      updatedImageIds = updatedImageIds.filter(id => newImageIds.includes(id));
    }
    // console.log(updatedImageIds);
    return updatedImageIds;
  };

  const handleFileObject = (elementRef, idArray, fileArray) => {
    const inputContent = elementRef.current.innerHTML;
    const parsedContent = parse(inputContent);
    const existingIds = new Set();

    // innerHTML에 존재하는 이미지의 id들을 저장합니다.
    React.Children.forEach(parsedContent, child => {
      if (child.type === 'img') {
        existingIds.add(child.props.id);
      }
    });

    // isUrlIn에 존재하는 파일 객체들 중에서 innerHTML에 존재하는 id만 필터링합니다.
    const filteredFiles = fileArray.filter(file => existingIds.has(file.name));

    // isUrlInId 배열에 있는 id들 중에서 innerHTML에 존재하는 id와 일치하는 파일 객체들만 반환합니다.
    const matchedFiles = filteredFiles.filter(file => idArray.includes(file.name));

    return matchedFiles;
  };

  const imageReplace = (element) => {
    const imgRegex = /<img.*?src="(.*?)".*?>/g;
    let i = 1;
    const replaceElement = element.replace(imgRegex, () => {
      const imgTagWithNumber = `<img${i}>`;
      i++;
      return imgTagWithNumber;
    });
    return replaceElement
  }

  return { handleContent, handleFileObject, handleIdContent, imageReplace }
}
