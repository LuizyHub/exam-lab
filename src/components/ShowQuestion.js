import React from 'react';
import { parseImages, renderImages } from '../function/renderImages';
import { parseBox } from '../function/renderText';
import styled from 'styled-components';

const QuestionContent = styled.div`
  margin: 5px;
  width: 100%;
  height: 100%;
`;

const OutImage = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Option = styled.div`
  padding: 10px 0px;
  margin-top: 5px;
`;

const StyledOl = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none; 
`;


export default function ShowQuestion({ question, question_images_in, question_images_out, options }) {
  return (
    <QuestionContent>
      {/* 내부 이미지 렌더링 */}
      <div>{parseBox(parseImages(question, question_images_in))}</div>
      
       {/* 외부 이미지 렌더링 */}
       <OutImage>{renderImages(question_images_out)}</OutImage>

      {/* 옵션 */}
      <Option>
        <StyledOl>
          {options.map((option, optionIndex) => (
            <li key={optionIndex}>{String.fromCharCode(9312 + optionIndex)} {option}</li>
          ))}
        </StyledOl>
      </Option>
    </QuestionContent>
  );
}
