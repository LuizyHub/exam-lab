import parse from 'html-react-parser';


// json데이터에서 <div class="box"> </div>를 처리
export const parseBox = (text) => {
    const regex = /<div class="box">(.*?)<\/div>/gs;
    const parsedText = text.replace(regex, (match, p1) => {
      // <div class="box"> 태그를 변환하여 스타일을 추가
      return `<div class="box" style="border: 1px solid black; padding: 10px;">${p1}</div>`;
    });
  
    return parse(parsedText);
  };
  
  
  //   표를 처리하는 함수
  //   export const parseTable = (text) => {
  //     const regex = /<table>(.*?)<\/table>/g;
  //     let parsedText = text.replace(regex, (match) => {
  //       return `<table style="border-collapse: collapse; width: 100%;">${match}</table>`;
  //     });
  
  //     parsedText = parsedText.replace(/<thead>/g, '<thead style="background-color: #f2f2f2;">');
  //     parsedText = parsedText.replace(/<th>/g, '<th style="border: 1px solid #ddd; padding: 8px;">');
  //     parsedText = parsedText.replace(/<td>/g, '<td style="border: 1px solid #ddd; padding: 8px;">');
  
  //     return parsedText;
  //   };
  