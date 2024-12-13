import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../reducer";
import { FaPlus } from "react-icons/fa";
//import { Editor } from "@tinymce/tinymce-react";

export default function FillIn() {
    //const WYSIWYG_API = "lehjg5nxnh8e02b41ilh2zzu238vk5qtaklwma38tvtmifuo";
    const dispatch = useDispatch();
    const question = useSelector((state: any) => state.quizzesReducer.question);

    const addCorrectAnswer = () => {
        dispatch(setQuestion({
            ...question,
            fillInBlankAnswers: [...question.fillInBlankAnswers, { text: "", caseInsensitive: false }]
        }));
    };
    const removeCorrectAnswer = (index: number) => {
        dispatch(setQuestion({
            ...question,
            fillInBlankAnswers: question.fillInBlankAnswers.filter((_: any, i: number) => i !== index)
        }));
    };
    const updateCorrectAnswer = (index: number, updatedAnswer: any) => {
        const newfillInBlankAnswers = question.fillInBlankAnswers.map((answer: any, i: number) => i === index ? updatedAnswer : answer);
        dispatch(setQuestion({ ...question, fillInBlankAnswers: newfillInBlankAnswers }));
    };

    return (
        <div className="col-12 p-3">
            <div className="col-12 mb-3">
                <label>Question:</label>
          
                {/* <Editor
                    apiKey={WYSIWYG_API}
                    value={question.questionText}
                    onEditorChange={(newQuestionText, editor) => {
                        dispatch(setQuestion({ ...question, questionText: newQuestionText }))
                    }}
                /> */}

<           div className="row mb-3 ms-1">
               <textarea
                  
                    className="form-control mb-2"
                     cols={10}
                     value={question.questionText}
                 onChange={(e) =>
                     dispatch(setQuestion({ ...question, questionText: e.target.value }))

                 }
             />
         </div> 


            </div>
            <div className="col-12 mb-3">
                <label>Correct Answers:</label>
                {question.fillInBlankAnswers.map((answer: any, index: number) => (
                    <div key={index} className="row mb-2">
                        <div className="col-8">
                            <input
                                type="text"
                                value={answer.text}
                                className="form-control mb-2"
                                onChange={(e) => updateCorrectAnswer(index, { ...answer, text: e.target.value })}
                            />
                        </div>
                        <div className="col-2 d-flex align-items-center">
                            <label className="me-2">Case Insensitive:</label>
                            <input
                                type="checkbox"
                                checked={answer.caseInsensitive}
                                onChange={(e) => updateCorrectAnswer(index, { ...answer, caseInsensitive: e.target.checked })}
                            />
                        </div>
                        <div className="col-2 text-end">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeCorrectAnswer(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <div className="text-end">
                    <span
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={addCorrectAnswer}
                    >
                        <FaPlus /> Add Another Correct Answer
                    </span>
                </div>
            </div>
        </div>
    );
}