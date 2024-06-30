import toast from "react-hot-toast"
import { quizzesEndPoints } from "../api"
import { apiConnector } from "../apiConnector"
import axios from "axios"


const {GET_QUIZZES_API, 
       ADD_QUIZ_API, 
       DELETE_QUIZ_API, 
       UPDATE_QUIZ_API, 
       GET_QUIZ_API, 
       GET_QUIZZES_BY_CATEGORY_API, 
       GET_ACTIVE_QUIZZES, 
       GET_ACTIVE_QUIZZES_BY_CATEGORY,
       GET_CATEGORY_QUIZZES} = quizzesEndPoints

export async function getAllQuizzes(instituteId, token) {
    let result = []
    try {

        const response = await apiConnector("GET", GET_QUIZZES_API + instituteId, null, {Authorization: `Bearer ${token}`})
        ////console.log("FETCH ALL QUIZZES API RESPONSE..........", response)
        result = response?.data

    } catch(error) {
        ////console.log("FETCH ALL QUIZZES API ERROR............", error)
    }
    return result
}

export async function addQuiz(data, token) {
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("POST", ADD_QUIZ_API, data, 
        {
            Authorization: `Bearer ${token}`
        })

        ////console.log("ADD QUIZ API RESPONSE..........", response)

        toast.success("Quiz Added Successfully")

    } catch(error) {

        ////console.log("ADD QUIZ API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)

}

export async function deleteQuiz(quizId, token) {
    
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("DELETE", DELETE_QUIZ_API+`${quizId}`, null, 
        {
            Authorization: `Bearer ${token}`
        })
        ////console.log("DELETE QUIZ API RESPONSE..........", response)
        toast.success("Quiz Deleted Successfully")

    } catch(error) {

        ////console.log("DELETE QUIZ API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
}

export async function getQuiz(quizId, token) {

    let res = []
    try {

        const response = await apiConnector("GET", GET_QUIZ_API + quizId, null, 
        {
            Authorization: `Bearer ${token}`
        })
        ////console.log("GET QUIZ API RESPONSE..........", response)
        res = response?.data

    } catch(error) {

        ////console.log("GET QUIZ API ERROR............", error)
        alert("Something went wrong")
    }
    return res
}

export async function updateQuiz(quizId, data, token, navigate) {

    data.qId = quizId
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("PUT", UPDATE_QUIZ_API, data, 
        {
            Authorization: `Bearer ${token}`
        })
        ////console.log("UPDATE QUIZ API RESPONSE..........", response)
        toast.success("Quiz Updated Successfully")
        navigate("/admin/quizzes")

    } catch(error) {

        ////console.log("UPDATE QUIZ API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
}

export async function getQuizzesOfCategory(cid, token) {
    let res = []
    try {

        const response = await apiConnector("GET", GET_QUIZZES_BY_CATEGORY_API + cid, null, 
        {
            Authorization: `Bearer ${token}`
        })
        ////console.log("GET QUIZZES API RESPONSE..........", response)
        res = response?.data

    } catch(error) {

        ////console.log("GET QUIZZES API ERROR............", error)
        alert("Something went wrong")
    }
    return res
}

export async function getActiveQuizzes(instituteId, token) {
    let res = []
    try {

        const response = await apiConnector("GET", GET_ACTIVE_QUIZZES + instituteId, null, 
        {
            Authorization: `Bearer ${token}`
        })
        ////console.log("GET ACTIVE QUIZZES API RESPONSE..........", response)
        res = response?.data

    } catch(error) {

        ////console.log("GET ACTIVE QUIZZES API ERROR............", error)
        alert("Something went wrong")
    }
    return res
}

export async function getActiveQuizzesByCategory(cid, token) {
    let res = []
    try {

        const response = await apiConnector("GET", GET_ACTIVE_QUIZZES_BY_CATEGORY + cid, null, 
        {
            Authorization: `Bearer ${token}`
        })
        ////console.log("GET ACTIVE QUIZZES BY CATEGORY API RESPONSE..........", response)
        res = response?.data
        ////console.log("Response here:", res)

    } catch(error) {

        ////console.log("GET ACTIVE QUIZZES BY CATEGORY API ERROR............", error)
        alert("Something went wrong")
    }
    return res
}

export async function categoryQuizzes(categoryId, token) {

    let res = []
    try {

        const response = await apiConnector("GET", GET_CATEGORY_QUIZZES + categoryId, null, 
        {
            Authorization: `Bearer ${token}`
        })
        ////console.log("GET QUIZZES API RESPONSE..........", response)
        res = response?.data

    } catch(error) {

        ////console.log("GET QUIZZES API ERROR............", error)
        alert("Something went wrong")
    }
    return res
}

export const getQuizResultsByInstitute = async (instituteId, token) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    try {
    //   const response = await axios.get(`${BASE_URL}/quiz/institute/${instituteId}/results`);
    const response = await apiConnector("GET", `${BASE_URL}/quiz/institute/${instituteId}/results`, null, 
        {
            Authorization: `Bearer ${token}`
        }
    )
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      throw error;
    }
  };
  
  export const getQuizResultsDetailed = async (quizId, token) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    try {
    //   const response = await axios.get(`${BASE_URL}/quiz/${quizId}/results-detailed`);
    const response = await apiConnector("GET", `${BASE_URL}/quiz/${quizId}/results-detailed`, null, {
        Authorization: `Bearer ${token}`
    })
      return response.data;
    } catch (error) {
      console.error('Error fetching detailed quiz results:', error);
      throw error;
    }
  };