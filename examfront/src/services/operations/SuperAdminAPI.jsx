import { apiConnector } from "../apiConnector";
import { superAdminEndPoints } from "../api";

const { CREATE_NEW_ADMIN, GET_INSTITUTE_ADMIN_LIST, CREATE_INSTITUTE } = superAdminEndPoints;

export const getAdmins = async (token) => {
    try {
        const response = await apiConnector("GET", GET_INSTITUTE_ADMIN_LIST, null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        return response.data;
    } catch (error) {
        console.error('Fetch Admins Error:', error);
        throw error;
    }
};

export const createInstitute = async ({...name}, token) => {
    try {
    
        const response = await apiConnector("POST", CREATE_INSTITUTE, name, 
            {
                Authorization: `Bearer ${token}`
            }
        );
        return response.data; 
    } catch (error) {
        console.error('Create Institute Error:', error);
        throw error; 
    }
};

export const createAdmin = async ({...userData}, token) => {
    try {
        console.log("userData:", userData)
        const response = await apiConnector("POST", CREATE_NEW_ADMIN, userData,
            {
                Authorization: `Bearer ${token}`
            })
        return response.data;
    } catch (error) {
        console.error('Create Admin Error:', error);
        throw error;
    }
};

export const deleteAdmin = async (userId, token) => {
    try {
        
        const response = await apiConnector("POST", CREATE_NEW_ADMIN, null,
            {
                Authorization: `Bearer ${token}`
            })
        return response.data;
    } catch (error) {
        console.error('Create Admin Error:', error);
        throw error;
    }
};