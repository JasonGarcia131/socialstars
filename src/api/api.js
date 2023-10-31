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
    const accessToken = response?.data?.accessToken;
    return accessToken;

}

export const getProfile = async (params) => {
    console.log(params.userId)
    try{
        const UserInfo = await axios.get(`http://localhost:3500/users/${params.userId}`)
        return UserInfo
    }catch(e){
        return e
    }
}