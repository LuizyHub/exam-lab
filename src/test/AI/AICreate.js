import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import EditorEdit from '../../components/EditorEdit';

//axiosData 함수에 있는 getData와 연동
export default function AICreate({ examId }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [fileName, setFileName] = useState(""); // 파일 이름 상태 추가
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const [isObject, setObject] = useState([]);//AI getObject가져오기

    useEffect(() => {
        if (examId) {
            axios.get(`/api/v1/exams/${examId}/file`)
                .then(response => {
                    console.log('파일 받아오기 성공', response.data);
                    if (response.data.message.exist === true) {
                        setFileName(response.data.message.file_title);
                    }
                })
                .catch(error => {
                    console.log('파일 받아오기 실패', error);
                })
        }
    }, [examId]);



    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.name.split('.').pop().toLowerCase();
            if (['pdf', 'txt', 'md'].includes(fileType)) {
                try {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append('file', file);

                    // 파일 업로드 요청 보내기
                    const fileResponse = await axios.post(`/api/v1/exams/${examId}/file`, formData);
                    console.log('파일 업로드 성공:', fileResponse.data);
                    setFileName(file.name);
                } catch (error) {
                    console.error('파일 업로드 실패:', error);
                    alert('파일 업로드에 실패했습니다.');
                } finally {
                    setLoading(false);
                }
            } else {
                alert('PDF, TXT, MD 파일만 허용됩니다.');
                // 파일이 잘못된 형식일 경우 input 요소를 비웁니다.
                fileInputRef.current.value = '';
                // 파일 이름 초기화
                setFileName("");
            }
        }
    }

    const handleFileDelete = async () => {
        try {
            setLoading(true);
            // 파일 삭제 요청 보내기
            const deleteResponse = await axios.delete(`/api/v1/exams/${examId}/file`);
            console.log('파일 삭제 성공:', deleteResponse.data);
            setFileName("");
        } catch (error) {
            console.error('파일 삭제 실패:', error);
            alert('파일 삭제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }
    //분리해야함
    const handleCreateAIQButtonClick = async () => {
        try {
            setLoading(true);
            // 문제 생성 요청 보내기
            const aiResponse = await axios.post(`/api/v1/exams/${examId}/ai`);
            console.log('문제 업로드 성공:', aiResponse.data);
            const object = aiResponse.data;
            setObject(object.questions);
        } catch (error) {
            console.error('문제 생성 실패:', error);
            alert('문제 생성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h3>AI</h3>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>파일을 업로드해주세요</h2>
                        {/* 파일 이름 표시 */}
                        {fileName && <p>파일 이름: {fileName}</p>}
                        <input
                            type="file"
                            accept=".pdf,.txt,.md"
                            onChange={handleFileUpload}
                            ref={fileInputRef}
                        />
                        <button onClick={handleFileUpload} > 파일 업로드 </button>
                        <button onClick={handleFileDelete}> 파일 삭제 </button>
                        <button onClick={handleCreateAIQButtonClick} disabled={loading}>
                            {loading ? '문제 생성 중...' : '문제 생성'}
                        </button>
                        <button onClick={() => setModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}
            <button onClick={() => setModalOpen(true)}>AI로 문제 생성하기</button>
            {isObject.map((object, index) => (
                <EditorEdit key={index} object={object} index={index} isObject={isObject} />
            ))}
        </div>
    );
}
