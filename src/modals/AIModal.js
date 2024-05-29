import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const images = [
  '/img/AI문제생성1.svg',
  '/img/AI문제생성2.svg',
  '/img/AI문제생성3.svg',
  '/img/AI문제생성4.svg',
  '/img/AI문제생성5.svg',
];

const LoadingMessage = styled.p`
    font-size: 21px;
    font-weight: 600;
    line-height: 25.06px;
    text-align: center;
    color: #24ABA8;
`;

const LoadingImage = styled.div`
  width: 350px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ $imageIndex }) => `url(${images[$imageIndex]})`};
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalTitle = styled.h3`
    text-align: center;
    font-size: 26px;
    margin-top: 10px;
`;

const ModalContent = styled.div`
    position: relative;
    background-color: white;
    padding: 20px;
    width: 707px;
    height: 346px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ContainerTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-left: 14px;
    margin-top: 30px;
    margin-bottom: 0px;
`;

const FileName = styled.p`
    display: flex;
    align-items: center;
    border: 1px solid #EBEDEF;
    background-color: #F5F5F7;
    border-radius: 6px;
    width: 531px;
    height: 20px;
    margin-left: 14px;
    font-size: 18px;
    color: #262626;
    padding: 20px;
`;

const NoneFileName = styled.p`
    display: flex;
    align-items: center;
    border: 1px solid #EBEDEF;
    background-color: #F5F5F7;
    border-radius: 6px;
    width: 531px;
    height: 20px;
    margin-left: 14px;
    font-size: 18px;
    color: #9A9DA0;
    padding: 20px;
`;

const FileUpLoad = styled.label`
    position: relative;
    border-radius: 8px;
    background-color: #EDFAFA;
    color: #24ABA8;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    width: 104px;
    height: 25px;
    margin-left: 10px;
    cursor: pointer;
`;

const FileDelete = styled.button`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: none;
    background-color: #EDFAFA;
    color: #24ABA8;
    padding: 0;
    width: 104px;
    height: 55px;
    margin-left: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`;

const DeleteImg = styled.img`
    width: 28px;
`;

const FileIntro = styled.p`
    color: #9A9DA0;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 3px;
    margin-left: 14px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 40px;
    cursor: pointer;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingText = styled.div`
    margin-left: 10px;
    font-size: 18px;
`;

const AICreateButton = styled.button`
    padding: 15px 20px;
    background-color: ${({ $loading }) => ($loading ? '#C0C0C0' : '#5BB6B4')};
    color: white;
    border: none;
    border-radius: 5px;
    margin-right: 20px;
    cursor: ${({ $loading, $disabled }) => ($loading || $disabled ? 'not-allowed' : 'pointer')};
    font-size: 18px;
    ${({ $disabled }) => $disabled && 'opacity: 0.5;'}
`;

// AIModal 컴포넌트
export function AIModal({ fileName, handleFileDelete, handleFileUpload, handleCreateAIQButtonClick, loading, setModalOpen, fileInputRef }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (loading) {
            setCurrentImageIndex(0);

            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    // 이미지 배열의 마지막 인덱스에 도달하면 더 이상 인덱스를 증가시키지 않음
                    if (prevIndex === images.length - 1) {
                        clearInterval(interval); // 타이머 제거
                        return prevIndex;
                    }
                    return prevIndex + 1;
                });
            }, 2500);

            return () => clearInterval(interval);
        }
    }, [loading]);

    return (
        <ModalBackground>
            <ModalContent>
                <CloseButton onClick={() => setModalOpen(false)}>&times;</CloseButton>
                <ModalTitle>AI 문제 자동 생성</ModalTitle>
                <hr style={{ color: '#EBEDEF' }} />
                {fileName && (
                    <div>
                       {loading && (
                            <LoadingContainer>
                                {/* 이미지 순차적으로 로딩 */}
                                <div>
                                    <LoadingMessage> {currentImageIndex + 1}번 문제 생성중 </LoadingMessage>
                                    <br/>
                                    <LoadingImage $imageIndex={currentImageIndex} />
                                </div>
                            </LoadingContainer>
                        )}
                    </div>
                )}
               {!loading && (
                    <div>
                        <ContainerTitle>선택한 파일</ContainerTitle>
                        {fileName && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FileName>{fileName}</FileName>
                                    <FileDelete onClick={handleFileDelete}>
                                        <DeleteImg src="/img/쓰레기통.png" alt="Delete Icon" />
                                    </FileDelete>
                                </div>
                         </div>
                        )}
                        {!fileName && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <NoneFileName>선택한 파일이 없습니다.</NoneFileName>
                                    <FileUpLoad htmlFor="input-file"> 파일 선택 </FileUpLoad>
                                    <input
                                        type="file"
                                        accept=".pdf,.txt,.md"
                                        onChange={handleFileUpload}
                                        ref={fileInputRef}
                                        id="input-file"
                                        style={{ display: "none" }}
                                    />
                                </div>
                        )}
                        <FileIntro>*.pdf / .txt / .md 파일만 가능합니다.</FileIntro>
                        <FileIntro>*총 5개의 문제가 자동 생성됩니다. </FileIntro>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AICreateButton
                        onClick={handleCreateAIQButtonClick}
                        $loading={loading}
                        $disabled={!fileName}
                        disabled={loading || !fileName}
                    >
                        {loading ? '문제 생성 중...' : '문제 생성하기'}
                    </AICreateButton>
                </div>
            </ModalContent>
        </ModalBackground>
    );
}