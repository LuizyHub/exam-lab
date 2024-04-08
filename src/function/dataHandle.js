import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

export const useDataHandle = () => {
  const [content, setContent] = useState('');

  const [isImageUrl, setImageUrl] = useState([]); //이미지 url값을 저장.. 배열로
  const [isImageId, setImageId] = useState([]); // 이미지의 ID를 저장하는 상태 변수

  const dataImageIn = {
    "type": "객관식",
    "questionImagesTextIn": [
      { "url": "T", "description": "설명", "attribute": "속성" },
      { "url": "T", "description": "설명", "attribute": "속성" }
    ]
  };

  const dataQuestion = {
    "question": "다음 중 총중량 1.5톤 피견인 승용자동차를 4.5톤 화물자동차로 견인하는 경우 필요한 운전면허에 해당하지 않은 것은?"
  }

  const dataImageOut = {
    "questionImagesTextOut": [
      { "url": "", "description": "설명", "attribute": "속성" }
    ]
  }

  const dataOption = {
    "options": [
      "① 제1종 대형면허 및 소형견인차면허",
      "② 제1종 보통면허 및 대형견인차면허",
      "③ 제1종 보통면허 및 소형견인차면허",
      "④ 제2종 보통면허 및 대형견인차면허"
    ]
  }

  const data = {
    "answers": ["4"],
    "tagsMap": { "category": ["화물"] },
    "commentary": "도로교통법 시행규칙 별표18 총중량 750킬로그램을 초과하는 3톤 이하의 피견인 자동차를 견인하기 위해서는 견인 하는 자동차를 운전할 수 있는 면허와 소형견인차면허 또는 대형견인차면허를 가지고 있어야 한다.",
    "commentaryImagesTextIn": [
      { "url": "T", "description": "설명", "attribute": "속성" }
    ],
    "commentaryImagesTextOut": [
      { "url": "T", "description": "설명", "attribute": "속성" }
    ]
  }


  //이곳에서 data를 전송하고 전송하는 함수를 만들면된다.

  useEffect(() => {
    console.log(`Data push :  ${content}, ${isImageUrl}`);//${contentType},
  }, [content, isImageUrl])//contentType,


  // 이미지 추적 후 여기에 html로 저장이 될 수는 함수
  const handleContent = (e, elementRef, elementType1, elementType2, elementType3) => {
    e.preventDefault();
    // alert('check1');
    if (!elementRef || !elementRef.current) {
      console.error("Editor ref is not initialized.");
      return;
    }

    // content를 저장하는 부분
    const inputContent = elementRef.current.innerHTML;
    setContent(inputContent);

    // 이미지 추적
    const parsedContent = parse(inputContent);
    let hasImages = false;
    const updatedImageIds = [...isImageId]; // 새로운 이미지 ID 배열
    const updatedImageUrls = [...isImageUrl]; // 새로운 이미지 URL 배열

    React.Children.forEach(parsedContent, child => {
      if (child.type === 'img') {
        hasImages = true;
        const imageUrl = child.props.src;
        const imageId = child.props.id; // 이미지에 고유 아이디가 있다

        // 이미지가 배열에 없는 경우에만 추가합니다.
        if (!updatedImageIds.includes(imageId)) {
          updatedImageIds.push(imageId);
        }

        if (!updatedImageUrls.includes(imageUrl)) {
          updatedImageUrls.push(imageUrl);
        }
        // console.log('이미지 imageUrl', imageUrl);
      }
    });

    // 이미지가 포함되지 않은 경우에는 imageIds와 imageUrls를 비웁니다.
    if (!hasImages && (isImageId.length > 0 || isImageUrl.length > 0)) {
      console.log('이미지가 포함되지 않았습니다. 이미지 ID와 URL을 초기화합니다.');
      setImageId([]);
      setImageUrl([]);
    } else {
      setImageId(updatedImageIds); // 새로운 이미지 ID 배열로 업데이트합니다.
      setImageUrl(updatedImageUrls); // 새로운 이미지 URL 배열로 업데이트합니다.
    }

    //이미지 정규식으로 추출 및 추적
    // --------------------------------------------------------- 이미지 태그의 id를 추출하는 정규 표현식
    const imgIdRegex = /<img.*?id="(.*?)".*?>/g;

    // inputContent에서 이미지 태그의 id를 추출하여 배열에 저장
    const imageIdsInContent = [];
    let idMatch;
    while ((idMatch = imgIdRegex.exec(inputContent)) !== null) {
      imageIdsInContent.push(idMatch[1]);
    }

    // 이미지가 삭제되었는지 확인하고, 해당 아이디가 없는 경우 배열에서 제거합니다.
    const remainingImageIds = updatedImageIds.filter(id => {
      return imageIdsInContent.includes(id);
      // if (isImageUrl.includes(src)) {
      //   console.log(src);
      // }
    });

    setImageId(remainingImageIds);
    console.log('이미지의 ID:', isImageId);

    // ---------------------------------------------------------------- 이미지 태그의 url로 추출하는 정규 표현식
    // 이미지 태그의 src를 추출하는 정규 표현식
    const imgSrcRegex = /<img.*?src="(.*?)".*?>/g;

    // inputContent에서 이미지 태그의 src를 추출하여 배열에 저장
    const imageUrlsInContent = [];
    let urlMatch;
    while ((urlMatch = imgSrcRegex.exec(inputContent)) !== null) {
      imageUrlsInContent.push(urlMatch[1]);
    }

    // 이미지가 삭제되었는지 확인하고, 해당 URL이 없는 경우 배열에서 제거합니다.
    const remainingImageUrls = updatedImageUrls.filter(url => {
      return imageUrlsInContent.includes(url);
    });
    setImageUrl(remainingImageUrls);
    console.log('이미지의 Url:', isImageUrl);

    const URL = 'http://localhost:3001/sample'

    const sendData = (URL, data) => {
      alert('check');
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
      sendData(URL, data)
    } else {
      alert('아무 것도 선택 되지 않았습니다.')
    }

    // alert('check');
    // if (contentType === "type") {
    //   alert("선택되지 않았습니다.");
    // } else if (contentType !== "type" && contentType === '문제') {
    //   sendData(URL, dataQuestion);
    // } else if (contentType !== "type" && contentType === '이미지') {
    //   sendData(URL, dataImage);
    // } else if (contentType !== "type" && contentType === '선택지') {
    //   sendData(URL, dataOption);
    // }


  };

  return { handleContent }//handleContentType, contentType, content
}
