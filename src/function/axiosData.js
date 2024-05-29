import axios from 'axios';

export const sendPostData = async (PAGE_ID, elementUrlIn, elementUrlOut, elementUrlOutDes, elementQuestions, elementOptions, elementCommentAnswers, elementCommentary, elementTags) => {
  //** DON'T MOVE THIS LINE */
  const URL = `/api/v1/exams/${PAGE_ID}/questions`;
  const TYPE = 'application/json';
  //** DON'T MOVE THIS LINE */

  const formData = new FormData();

  //questionImage : new blob형식에 맞는 *객체* 생성
  const questionImagesTextIn = [];

  elementUrlIn.forEach(image => {
    const questionImage = {
      url: "",
      description: "설명",
      attribute: "examlab-image-inline"
    };
    questionImagesTextIn.push(questionImage);
  });

  //questionImagesTextOut : new blob형식에 맞는 *객체* 생성
  const questionImagesTextOut = [];

  elementUrlOut.forEach(image => {
    const questionImage = {
      url: "",
      description: elementUrlOutDes,
      attribute: "examlab-image-right"
    };
    questionImagesTextOut.push(questionImage);
  });

  //new blob 생성
  const questionUploadInfo = new Blob([JSON.stringify({
    type: "객관식",
    question: elementQuestions,
    options: elementOptions,
    questionImagesTextIn: questionImagesTextIn, //from IN SCOPE
    questionImagesTextOut: questionImagesTextOut, //from IN SCOPE
    answers: [elementCommentAnswers],
    //카테고리 영역 수정 보완 필요
    tags: elementTags ,
    commentary: elementCommentary
    //해답지 이미지 여역
    // commentaryImagesTextIn: [{ url: "", description: "설명", attribute: "속성" }],
    // commentaryImagesTextOut: [{ url: "", description: "설명", attribute: "속성" }]
  })], {
    type: TYPE
  });
  //formData : questionUploadInfo
  formData.append('questionUploadInfo', questionUploadInfo);

  elementUrlIn.forEach((image) => {
    console.log(image.name);
    formData.append('questionImagesIn', image);
  });
  //formData : questionImagesOut
  elementUrlOut.forEach((image) => {
    console.log(image.name);
    formData.append('questionImagesOut', image);
  });
  //server에 post 요청
  try {
    const response = await axios.post(URL, formData);
    console.log(response.data.message);
    console.log(response.data.message.id);
    console.log(response.data);
    const message = response.data.message;
    // handleSetId(message.id);
    // handleSetId 호출 후에 ID 값을 가져옴
    // setID(message.id);
    // setResQuestion(message.question);
    // setResOption(message.options);
    // // setResOption(prevOption => [...prevOption, ...message.option]);
    // setResUrlIn(message.question_images_in.map(image => image.url));
    // // console.log(message.question_images_in[0].url);
    // setResUrlOut(message.question_images_out.map(image => image.url));
    // setResUrlOutDes(message.question_images_out[0].description);
    return message.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendDeleteData = async (UUID) => {
  console.log("삭제");
  const URL = `/api/v1/questions/${UUID}`
  try {
    const response = await axios.delete(URL);
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
}
//if insert params that Object.question or options.. about Object useState
export const sendPutData = async (UUID, elementQuestions, elementOptions, elementCommentAnswers, elementCommentary, isSelectedTags) => {
  console.log("수정");
  const URL = `/api/v1/questions`

  //이미지 수정 불가
  const requestData = {
    id: UUID,
    question: elementQuestions,
    options: elementOptions,
    // questionImagesTextIn: [],
    // questionImagesTextOut: [],
    answers: [elementCommentAnswers],
    commentary: elementCommentary,
    tags:  isSelectedTags ,
  };

  try {
    const response = await axios.put(URL, requestData);
    console.log(response.data.message);
    console.log(response.data);
    return response;
  } catch (error) {
    // 오류 처리
    console.log(error);
  }
}

export const getData = async (PAGE_ID) => {
  try {
    console.log("가져오기");
    const URL = `/api/v1/exams/${PAGE_ID}/questions?count=0`;

    const response = await axios.get(URL);
    const res = response.data;
    console.log(res);
    console.log(res.size);
    return res;
    // res.questions.forEach((questions, index) => {
    //   console.log(`Question ${index + 1}:`);
    // });
  } catch (error) {
    // 오류 처리
    console.log(error);
  }
}


export const getTagsData = async (PAGE_ID) => {
  try {
    console.log("가져오기");
    const URL = `/api/v1/exams/${PAGE_ID}`;

    const response = await axios.get(URL);
    const res = response.data;
    console.log(res);
    console.log(res.size);
    return res;
    // res.questions.forEach((questions, index) => {
    //   console.log(`Question ${index + 1}:`);
    // });
  } catch (error) {
    // 오류 처리
    console.log(error);
  }
}
