import parse from 'html-react-parser';
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
  return itemElements;
}

//  parsedItem = parseTable(parsedItem); // 표 처리
//   parsedItem = parseBox(parsedItem); // <box> 태그 처리
//   parsedItem = parseHeaders(parsedItem); // 헤더 태그 처리
//   parsedItem = parseContent(parsedItem); // <content> 태그 처리
//   parsedItem = parseLineBreaks(parsedItem); // 줄 바꿈 처리
//   return parse(parsedItem);

 // <box> 태그를 처리하는 함수
 export const parseBox = (text) => {
  const regex = /<box>(.*?)<\/box>/gi;
  let parsedText = text;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const boxText = match[1];
    parsedText = parsedText.replace(match[0], `<div class="box">${boxText}</div>`);
  }
  return parsedText;
};

// <content> 태그를 처리하는 함수
export const parseContent = (text) => {
  const regex = /<content>(.*?)<\/content>/gi;
  let parsedText = text;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const contentText = match[1];
    parsedText = parsedText.replace(match[0], `<div class="content">${contentText}</div>`);
  }
  return parsedText;
};


// 줄 바꿈 문자를 처리하는 함수
export const parseLineBreaks = (text) => {
  const regex = /\/n/g;
  const parsedText = text.replace(regex, '\n');
  return parsedText;
};

// h1/h2/h3 태그를 처리하는 함수
export const parseHeaders = (text) => {
  const h1Regex = /<h1>(.*?)<\/h1>/g;
  const h2Regex = /<h2>(.*?)<\/h2>/g;
  const h3Regex = /<h3>(.*?)<\/h3>/g;

  let parsedText = text;
  parsedText = parsedText.replace(h1Regex, '<h1>$1</h1>');
  parsedText = parsedText.replace(h2Regex, '<h2>$1</h2>');
  parsedText = parsedText.replace(h3Regex, '<h3>$1</h3>');

  return parsedText;
};

  // 표를 처리하는 함수
  export const parseTable = (text) => {
    const regex = /<table>(.*?)<\/table>/g;
    let parsedText = text.replace(regex, (match) => {
      return `<table style="border-collapse: collapse; width: 100%;">${match}</table>`;
    });

    parsedText = parsedText.replace(/<thead>/g, '<thead style="background-color: #f2f2f2;">');
    parsedText = parsedText.replace(/<th>/g, '<th style="border: 1px solid #ddd; padding: 8px;">');
    parsedText = parsedText.replace(/<td>/g, '<td style="border: 1px solid #ddd; padding: 8px;">');

    return parsedText;
  };

