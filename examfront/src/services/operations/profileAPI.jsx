import toast from "react-hot-toast";
import { profileEndPoints } from "../api";
import { setLoading, setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";
import { apiConnector } from "../apiConnector";
import { ACCOUNT_TYPE } from "../../utils/Constants";

const {GET_USER_DETAILS_API, DELETE_USER_API } = profileEndPoints;

export function getUserDetails(token, navigate) {
    
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
                Authorization: `Bearer ${token}`
            });

            console.log("GET USER DETAILS API RESPONSE..........", response);
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(setUser(response.data));

            if (!response.data) {
                throw new Error(response.data.message);
            }

            const user = response.data;

            if (user.authorities[0].authority === ACCOUNT_TYPE.NORMAL)
                navigate("/user/home");
            else if (user.authorities[0].authority === ACCOUNT_TYPE.ADMIN)
                navigate("/admin/home");
            else if (user.authorities[0].authority === ACCOUNT_TYPE.SUPER_USER)
                navigate("/super/home");

        } catch (error) {
            dispatch(logout(navigate));
            console.log("GET USER DETAILS API ERROR..............", error);
            toast.error("Could Not Get User Details");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export async function deleteUser(userId, token) {

    try {
        await apiConnector("DELETE", DELETE_USER_API + userId, null,
            {
                Authorization: `Bearer ${token}`
            }
        )

    } catch (error) {
        console.error('Fetch Admins Error:', error);
        throw error;
    }
}