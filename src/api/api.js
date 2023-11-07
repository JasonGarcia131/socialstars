import axios from "./axios"
const LOGIN_URL = '/auth'

export const loginUser = async ({ user, pwd }) => {

        const response = await axios.post(LOGIN_URL,
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        if(response.status == 200) {
            const accessToken = response?.data?.accessToken;
            return accessToken;
        }
       
        throw new Error (error?.message)

}

export const getProfile = async ({ params }) => {
    try {
        const UserInfo = await axios.get(`http://localhost:3500/users/${params.userId}`)
        return UserInfo
    } catch (e) {
        return e
    }
}