import React from "react";
import { parseImages, renderImages } from "../function/renderImages";
import '../css/ShowQuestion.css'

export default function ShowQuestion({ question, question_images_in, question_images_out, options }) {
    return (
        <div className="question-container">
            <div className="question-text">{parseImages(question, question_images_in)}</div>

            {/* 이미지 렌더링 */}
            <div className="image-container">{renderImages(question_images_out)}</div>

            {/* 4선지 */}
            <ol className="options-list">
                {options.map((option, optionIndex) => (
                    <li key={optionIndex} className="option-item">{option}</li>
                ))}
            </ol>
        </div>
    );
}
