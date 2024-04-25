import React from 'react';
import parse from 'html-react-parser';

export const DataHandle = () => {
  // 이미지 추적 후 여기에 html로 저장이 될 수는 함수

  //이미지의 url만 저장되는 코드
  const handleContent = (elementRef, elementImage) => {
    //에러처리
    // if (!elementRef || !elementRef.current) {
    //   console.error("Editor ref is not initialized.");
    //   return;
    // }

    // content를 저장하는 부분
    const inputContent = elementRef.current.innerHTML;//매개변수로 빼기
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

    if (!hasImages && (elementImage.length > 0)) {//isImageId.length > 0 || 
      console.log('이미지가 포함되지 않았습니다. 이미지 ID와 URL을 초기화합니다.');
      updatedImageUrls = [];
    } else {
      console.log('이미지가 있습니다.')
      updatedImageUrls = updatedImageUrls.filter(url => newImageUrls.includes(url));
    }
    console.log(updatedImageUrls);
    return updatedImageUrls;
  };

  const imageReplace = (element) => {
    const imgRegex = /<img.*?src="(.*?)".*?>/g;
    const replaceElement = element.replace(imgRegex, '[blank]');
    return replaceElement
  }

  return { handleContent, imageReplace }
}
