import React, {useState} from "react";
import axios from 'axios';
import "../css/SelectQuestion.css";

function PraQuestionPage() {
    const [questions, setQuestions] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");

    const fetchData = () => {
        // 요청할 URL 설정
        // const URL = "/api/v1/exams/2/questions?tags_category=상황&includes=고속도로&count=1";
        const URL = "/api/v1/exams/2/questions?count=1";

        // API 호출
        axios.get(URL)
            .then((response) => {
                // 데이터 받아오기 성공 시 상태 업데이트
                console.log(response.data); // 데이터 확인
                setQuestions(response.data.questions);
            })
            .catch((error) => {
                // 오류 처리
                console.log(error);
            });
    };


    const addQuestion = () => {
        // 요청할 URL 설정
        const URL = "/api/v1/exams/3/questions";

        // FormData 객체 생성
        const formData = new FormData();

        const questionUploadInfo = new Blob([JSON.stringify({
            type: "객관식",
            question: "다음 중 총중량 1.5톤 피견인 승용자동차를 4.5톤 화물자동차로 견인하는 경우 필요한 운전면허에 해당하지 않은 것은?",
            options: ["① 제1종 대형면허 및 소형견인차면허", "② 제1종 보통면허 및 대형견인차면허", "③ 제1종 보통면허 및 소형견인차면허", "④ 제2종 보통면허 및 대형견인차면허"],
            // questionImagesTextIn: [{ url: "", description: "설명", attribute: "속성" }, { url: "", description: "설명", attribute: "속성" }],
            // questionImagesTextOut: [{ url: "", description: "설명", attribute: "속성" }],
            answers: ["4"],
            tags:{"category":["화물"]},
            commentary: "도로교통법 시행규칙 별표18 총중량 750킬로그램을 초과하는 3톤 이하의 피견인 자동차를 견인하기 위해서는 견인 하는 자동차를 운전할 수 있는 면허와 소형견인차면허 또는 대형견인차면허를 가지고 있어야 한다."
            // commentaryImagesTextIn: [{ url: "", description: "설명", attribute: "속성" }],
            // commentaryImagesTextOut: [{ url: "", description: "설명", attribute: "속성" }]
        })], {
            type: 'application/json'
        });

        formData.append('questionUploadInfo', questionUploadInfo);
        // 파일 데이터 추가
        // formData.append('questionImagesIn', questionImagesIn[0], imageName1);
        // formData.append('questionImagesIn', questionImagesIn[1]);
        // formData.append('questionImagesOut', questionImagesOut[0]);
        // formData.append('commentaryImagesIn', commentaryImagesIn[0]);
        // formData.append('commentaryImagesOut', commentaryImagesOut[1]);
        // API 호출
        axios.post(URL, formData, {
            headers: {
            }
        })
            .then((response) => {
                // 응답 받은 메시지 상태 업데이트
                setResponseMessage(response.data.message);
            })
            .catch((error) => {
                // 오류 처리
                console.log(error);
            });
    };

    return (
        <div>
            <button onClick={fetchData}>데이터 가져오기</button>
            {questions && (
                <div>
                    <h3>결과값:</h3>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <h4>{question.question}</h4>
                            <p>{question.type}</p>
                            <p>{question.commentary}</p>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={addQuestion}>문제 추가하기</button>
            {responseMessage && (
                <div>
                    <h3>응답 메시지:</h3>
                    <p>{responseMessage}</p>
                </div>
            )}
        </div>
    );
}

export default PraQuestionPage;
