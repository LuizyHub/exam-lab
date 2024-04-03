import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

export const useDataHandle = () => {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('');
  // const [imageFiles, setImageFiles] = useState([]); // 이미지 파일들을 저장할 배열 상태-> 이부분 수정 필요 정확히 역할은?

  const [isImageUrl, setImageUrl] = useState([]); //이미지 url값을 저장.. 배열로
  const [isImageId, setImageId] = useState([]); // 이미지의 ID를 저장하는 상태 변수

  // useEffect(() => {
  //   handleContent();//저장만 되게 해야하는데 여기서 계속해서 이미지의 url을 확인하고 저장하고 있음
  // }, [content, contentType]);

  //contentType
  const handleContentType = (e) => { //여기서 setContentType이 적용이 되기 때문에 
    //----------------------------------------------------------------------------------------------------------- content를 저장하는 부분
    const contentType = e.currentTarget.value;
    setContentType(contentType);
    // setEditorState({ ...editorState, type: contentType });
    // console.log(editorState);
  }

  //---------------------------------------------------------------------- save data area
  // 이미지 추적 후 여기에 html로 저장이 될 수는 함수
  const handleContent = (elementRef) => {

    if (!elementRef || !elementRef.current) {
      console.error("Editor ref is not initialized.");
      return;
    }

    // content를 저장하는 부분
    const inputContent = elementRef.current.innerHTML;
    setContent(inputContent);
    console.log(`Data push : ${contentType}, ${content}, ${isImageUrl}`);

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

    // if (hasImages) {
    //   console.log('이미지가 포함되어 있습니다.');
    // } else {
    //   console.log('이미지가 포함되어 있지 않습니다.');
    // }
  };

  return { content, contentType, handleContent, handleContentType }
}
