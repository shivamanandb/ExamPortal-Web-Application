import { instituteEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

const { DELETE_INSTITUTE_API, GET_INSTITUTE_API, GET_PARTICULAR_INSTITUTE_USER_API } = instituteEndPoints;

export async function deleteInstitute(userId, token) {

    try {
        console.log("userID: ", userId)
        await apiConnector("DELETE", DELETE_INSTITUTE_API + userId, null,
            {
                Authorization: `Bearer ${token}`
            }
        )

    } catch (error) {
        console.error('Fetch Admins Error:', error);
        throw error;
    }
}

export const fetchInstitute = async (instituteId) => {
    try {

        const response = await apiConnector("GET", GET_INSTITUTE_API + instituteId , null, null)
        return response.data;
    } catch (error) {
        console.error('Fetch Institute Error:', error);
        throw error;
    }
};

export const fetchStudents = async (instituteId, token) => {

    try {

        const response = await apiConnector("GET", GET_PARTICULAR_INSTITUTE_USER_API + instituteId , null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        return response.data;

    } catch (error) {
        console.error('Fetch Institute Student(s) Error:', error);
        throw error;
    }
}