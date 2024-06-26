import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { questionsEndPoints } from "../api";

const {GET_ALL_QUESTIONS_API,EVAL_QUIZ_API, GET_QUESTIONS_API, ADD_QUESTION_API, DELETE_QUESTION_API, GET_SINGLE_QUESTION_API, UPDATE_QUESTION_API} = questionsEndPoints

export async function getQuestionsOfQuiz(quizId, token) {

    let res = []
    const toastId = toast.loading("loading...")
    try {

        const response = await apiConnector("GET", GET_ALL_QUESTIONS_API + `${quizId}`, null, 
        {
            Authorization : `Bearer ${token}`
        })
        console.log("GET ALL QUESTIONS API RESPONSE..........", response)
        res = response?.data
        toast.success("Questions Fetched Successfully")

    } catch(error) {
        
        console.log("GET ALL QUESTIONS API ERROR..........", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
    return res
}

export async function getQuestionsOfQuizForTest(quizId, token) {

    let res = []
    try {

        const response = await apiConnector("GET", GET_QUESTIONS_API + `${quizId}`, null, 
        {
            Authorization : `Bearer ${token}`
        })
        console.log("GET QUESTIONS API RESPONSE..........", response)
        res = response?.data

    } catch(error) {
        
        console.log("GET ALL QUESTIONS API ERROR..........", error)
    }
    return res
}

export async function addQuestion(data, token) {
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("POST", ADD_QUESTION_API, data, 
        {
            Authorization: `Bearer ${token}`
        })

        console.log("ADD QUESTION API RESPONSE..........", response)

        toast.success("Question Added Successfully")

    } catch(error) {

        console.log("ADD QUESTION API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
}


export async function deleteQuestion(quesId, token) {
    try {

        const response = await apiConnector("DELETE", DELETE_QUESTION_API+`${quesId}`, null, 
        {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE QUESTION API RESPONSE..........", response)

    } catch(error) {

        console.log("DELETE QUESTION API ERROR............", error)
    }
}

export async function getQuestion(quesId, token) {

    let res = []
    try {

        const response = await apiConnector("GET", GET_SINGLE_QUESTION_API + quesId, null, 
        {
            Authorization: `Bearer ${token}`
        })
        console.log("GET QUIZ API RESPONSE..........", response)
        res = response?.data

    } catch(error) {

        console.log("GET QUIZ API ERROR............", error)
        alert("Something went wrong")
    }
    return res
}

export async function updateQuestion(quesId, data, token) {

    data.quesId = quesId
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("PUT", UPDATE_QUESTION_API, data, 
        {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE QUESTION API RESPONSE..........", response)
        toast.success("Question Updated Successfully")

    } catch(error) {

        console.log("UPDATE QUESTION API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
}

export async function evalQuizQuestions(questions, token) {
    let result = []
    try {

        const response = await apiConnector("POST", EVAL_QUIZ_API, questions, {Authorization: `Bearer ${token}`})
        console.log("FETCH EVALUATION API RESPONSE..........", response)
        result = response?.data

    } catch(error) {
        console.log("FETCH EVALUATION API ERROR............", error)
    }
    return result
}