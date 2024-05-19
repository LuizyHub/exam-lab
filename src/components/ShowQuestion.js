import React from "react";
import { parseImages, renderImages } from "../function/renderImages";
import styled from "styled-components";

const QuestionContent = styled.div`
    margin: 5px;
    margin-left: 20px;
    width: 100%;
    height: 100%;
`;

const Option = styled.div`
    padding: 10px 20px;
    margin-top: 5px;
`;

const StyledOl = styled.ol`
    padding: 0; 
    margin: 0; 
    
`;

const StyledLi = styled.li`
    margin-bottom: 6px;
`;

export default function ShowQuestion({ question, question_images_in, question_images_out, options }) {
    return (
        <QuestionContent>
            <div>{parseImages(question, question_images_in)}</div>

            {/* 이미지 렌더링 */}
            <div>{renderImages(question_images_out)}</div>

            {/* 옵션 */}
            <Option>
                <StyledOl>
                    {options.map((option, optionIndex) => (
                        <StyledLi key={optionIndex}>{option} </StyledLi>
                    ))}
                </StyledOl>
            </Option>
        </QuestionContent>
    );
}
