import styled from "styled-components";

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

const ModalTitile = styled.h3`
    text-align: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    
`;

const FileName = styled.p`
    border: 1px solid #EBEDEF;
    background-color:  #F5F5F7;
    border-radius: 6px;
    width: 200px;
    font-size: 13px;
    color: #6B6E72;
    padding: 5px;
`;

const FileUpLoad = styled.label`
  position: relative;
  display: inline-flex;
  border-radius: 8px;
  background-color: #EDFAFA;
  color: #24ABA8;
  padding: 8px;
  margin-left: 5px;
  font-size: 14px;
`;

const FileDelete = styled.button`
  position: relative;
  display: inline-block;
  border-radius: 8px;
  border: none;
  background-color: #EDFAFA;
  color: #24ABA8;
  padding: 8px;
  margin-left: 5px;
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  margin-top: 10px;
  margin-right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const LoadingMessage = styled.h3`
    text-align: center;
`;

const AICreateButton = styled.button`
    padding: 10px 20px;
    background-color: #5BB6B4;
    color: white;
    border: none;
    border-radius: 5px;
    margin-right: 20px;
    align-items: center;
`;

export function AIModal({ fileName, handleFileDelete, handleFileUpload, handleCreateAIQButtonClick, loading, setModalOpen, fileInputRef }) {
    return (
        <ModalBackground>
            <ModalContent>
            <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
                <ModalTitile>AI 문제 자동 생성</ModalTitile>
                <hr style={{color: '#EBEDEF'}}/>
                {/* 파일 이름 표시 */}
                {fileName &&
                    <div>
                        {loading && <LoadingMessage>AI 문제 생성중 </LoadingMessage>}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FileName>{fileName}</FileName>
                            <FileDelete onClick={handleFileDelete}> 파일 삭제 </FileDelete>
                        </div>
                        <AICreateButton onClick={handleCreateAIQButtonClick} disabled={loading}>
                            {loading ? '문제 생성 중...' : '문제 생성'}
                        </AICreateButton>
                    </div>
                }
                {!fileName && !loading &&
                    <>
                        <FileName>선택한 파일이 없습니다.</FileName>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <FileUpLoad htmlFor="input-file"> 파일 선택 </FileUpLoad>
                            <input
                                type="file"
                                accept=".pdf,.txt,.md"
                                onChange={handleFileUpload}
                                ref={fileInputRef}
                                id="input-file"
                                style={{display:"none"}}
                            />
                        </div>
                    </>
                }
            </ModalContent>
        </ModalBackground>
    );
}
