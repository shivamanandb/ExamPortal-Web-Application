import toast from "react-hot-toast"
import { endpoints } from "../api"
import { apiConnector } from "../apiConnector"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { getUserDetails } from "./profileAPI"

const {SIGNUP_API, LOGIN_API} = endpoints

export function signup(
    username,
    password,
    firstName,
    lastName,
    email,
    phone
) {
    return async() => {
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                username,
                password,
                firstName,
                lastName,
                email,
                phone,
            })
      
            //console.log("SIGNUP API RESPONSE............", response)
      
            if (!response.data.success) {
              throw new Error(response.data.message)
            }
          } catch (error) {
            //console.log("SIGNUP API ERROR............", error)
          }
    }
}

export function login(username, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    // const {user} = useSelector((state) => state.profile)
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, JSON.stringify(
        {
          username,
          password,
        }
      ),{'Content-Type': 'application/json'})

      //console.log("LOGIN API RESPONSE............", response)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      response.data.token && dispatch(getUserDetails(response.data.token, navigate))
        
      // const userImage = response.data?.user?.image
      //   ? response.data.user.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      // dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      // //console.log("User: ", user)
    } catch (error) {
      //console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
