import React from "react";
import { parseImages, renderImages } from "../function/renderImages";

export default function ShowQuestion({ question, question_images_in, question_images_out, options }) {
    return (
        <div>
            <div>{parseImages(question, question_images_in)}</div>

            {/* 이미지 렌더링 */}
            <div>{renderImages(question_images_out)}</div>

            {/* 4선지 */}
            <ol >
                {options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                ))}
            </ol>
        </div>
    );
}
