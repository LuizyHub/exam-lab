import React, { useState } from 'react';
import parse from 'html-react-parser';

export const DataHandle = () => {
  // const [content, setContent] = useState(''); //question
  // const [isImageUrl, setImageUrl] = useState([]); //image-url

  // const [isImageId, setImageId] = useState([]); // 이미지의 ID를 저장하는 상태 변수 -> 이 상태를 전역(외부 컴포넌트)을 두어야한다.
  // const [isData, setData] = useState();
  // const [isData, setData] = useState({
  //   content: '',
  //   imageUrl: [],
  //   // isData: null
  // });
  // 이미지 추적 후 여기에 html로 저장이 될 수는 함수
  const handleContent = (elementRef, elementImage) => {//, elementImage
    // const updatedImageUrls = [...elementImage];
    // alert('check1');
    if (!elementRef || !elementRef.current) {
      console.error("Editor ref is not initialized.");
      return;
    }

    // content를 저장하는 부분
    const inputContent = elementRef.current.innerHTML;
    // setContent(inputContent);
    // setData(prevState => ({
    //   ...prevState,
    //   content: inputContent
    // }));

    // 이미지 추적
    const parsedContent = parse(inputContent);
    let hasImages = false;
    // const updatedImageIds = [...isImageId]; // 새로운 이미지 ID 배열
    // const updatedImageUrls = [...isImageUrl]; // 새로운 이미지 URL 배열
    let updatedImageUrls = [...elementImage]; //-> 이것도 전역(외부 컴포넌트)으로 돌리고 저장할 수 있게, isData.imageUrl-> elementImageUrl로 이미지 매개변수를 둘 것
    //------------------------------여기 Pick 관찰
    React.Children.forEach(parsedContent, child => {
      if (child.type === 'img') {
        hasImages = true;
        const imageUrl = child.props.src;
        // const imageId = child.props.id; // 이미지에 고유 아이디가 있다

        // 이미지가 배열에 없는 경우에만 추가합니다.
        /**
        if (!updatedImageIds.includes(imageId)) {
          updatedImageIds.push(imageId);
        }
         */

        if (!updatedImageUrls.includes(imageUrl)) {
          updatedImageUrls.push(imageUrl);
        }
        // console.log('이미지 imageUrl', imageUrl);
        // setImageUrl(imageUrl);
      }
    });

    //----> 외부로 빼야함.
    // 이미지가 포함되지 않은 경우에는 imageIds와 imageUrls를 비웁니다.
    if (!hasImages && (elementImage.length > 0)) {//isImageId.length > 0 || 
      console.log('이미지가 포함되지 않았습니다. 이미지 ID와 URL을 초기화합니다.');
      // setImageId([]);
      // setImageUrl([]);
      // setData(prevState => ({
      //   ...prevState,
      //   imageUrl: []
      // }));
      updatedImageUrls = [];
    } else {
      // setImageId(updatedImageIds); // 새로운 이미지 ID 배열로 업데이트합니다.
      // setImageUrl(updatedImageUrls); // 새로운 이미지 URL 배열로 업데이트합니다.
      // setData(prevState => ({
      //   ...prevState,
      //   imageUrl: updatedImageUrls
      // }));
    }

    //이미지 정규식으로 추출 및 추적
    // --------------------------------------------------------- 이미지 태그의 id를 추출하는 정규 표현식
    /**
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
    // console.log('이미지의 ID:', isImageId);
 */
    // ---------------------------------------------------------------- 이미지 태그의 url로 추출하는 정규 표현식
    // 이미지 태그의 src를 추출하는 정규 표현식
    // const imgSrcRegex = /<img.*?src="(.*?)".*?>/g;

    // // inputContent에서 이미지 태그의 src를 추출하여 배열에 저장
    // const imageUrlsInContent = [];
    // let urlMatch;
    // while ((urlMatch = imgSrcRegex.exec(inputContent)) !== null) {
    //   imageUrlsInContent.push(urlMatch[1]);
    // }

    // 이미지가 삭제되었는지 확인하고, 해당 URL이 없는 경우 배열에서 제거합니다.
    // const remainingImageUrls = updatedImageUrls.filter(url => {
    //   return imageUrlsInContent.includes(url);
    // });
    // setImageUrl(remainingImageUrls);
    // setData(prevState => ({
    //   ...prevState,
    //   imageUrl: remainingImageUrls
    // }));
    // console.log('이미지의 Url:', elementImage);

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
    // setData(data);
    return updatedImageUrls; //무쓸모
  };

  return { handleContent }//handleContentType, contentType, content, isImageUrl, 
}
