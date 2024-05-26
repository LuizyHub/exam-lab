import React from 'react';


// out 이미지 렌더링 함수 수정
export function renderImages(item) {
  if (Array.isArray(item) && item.length > 0) {
    return item.map((item, index) => (
      <img
        key={index}
        src={item.url} // 이미지 객체에서 URL을 가져옵니다.
        className={item.attribute}
        alt={''}
      />
    ));
  } else {
    return null;
  }
};


//클래스 추가
// in 이미지 파싱 후 렌더링 함수 수정
export function parseImages(item, itemElements) {

  let parsedItem = item;

  // 이미지 URL 배열이 정의되었는지 확인합니다.
  if (Array.isArray(itemElements) && itemElements.length > 0) {
    // 이미지 URL 배열의 각 요소를 반복하여 이미지 태그를 생성하고 질문에 삽입합니다.
    itemElements.forEach((itemElementUrl) => {
      // 정규 표현식 리터럴을 사용하여 이미지 태그를 대체합니다.
      const regex = /src=\d+/g;
      parsedItem = parsedItem.replace(regex, `src="${itemElementUrl.url}" class="${itemElementUrl.attribute}"`);
    });
  }
  return parsedItem;

}

