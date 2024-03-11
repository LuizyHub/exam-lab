const renderQuestionWithImages = (question, questionImages) => {
  // 유효한 이미지 배열인지 확인합니다.
  if (!Array.isArray(questionImages)) {
    return <div>No images available</div>;
  }

  // 정규 표현식을 사용하여 이미지 태그를 파싱합니다.
  const regex = /<img src=(\d+)>/g;

  // question을 정규 표현식으로 파싱하여 이미지 태그를 찾고, 각 이미지 태그를 적절한 URL로 교체합니다.
  const parsedQuestion = question.replace(regex, (match, imgUrlIndex) => {
    imgUrlIndex = parseInt(imgUrlIndex); // 이미지 URL 인덱스

    // 인덱스가 유효한지 확인합니다.
    if (!isNaN(imgUrlIndex) && imgUrlIndex >= 0 && imgUrlIndex < questionImages.length) {
      const imageUrl = questionImages[imgUrlIndex].url; // 이미지 URL을 가져옵니다.
      return `<img src="${imageUrl}" alt="Image ${imgUrlIndex}" />`;
    } else {
      return match; // 유효하지 않은 인덱스인 경우 원래의 이미지 태그를 반환합니다.
    }
  });

  // 파싱된 질문을 반환합니다.
  return <div>{parse(parsedQuestion)}</div>;
};
