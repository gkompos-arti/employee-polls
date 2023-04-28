import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestionAnswer, saveQuestion} from '../utils/api';
import { addAnswerUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";

function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        }).then((question) => dispatch(addQuestion(question))).then(() => dispatch(hideLoading()));
    };
}

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addAnswerQuestion(author, qid, answer){
    return {
        type: ADD_ANSWER_QUESTION,
        author,
        qid,
        answer,
    }
}

export function handleAddAnswer(questionId, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestionAnswer(authedUser, questionId, answer)
            .then(() => {
                dispatch(addAnswerQuestion(authedUser, questionId, answer));
                dispatch(addAnswerUser(authedUser, questionId, answer));
            });
    };
}
  