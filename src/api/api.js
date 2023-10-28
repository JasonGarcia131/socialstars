import axios from "./axios"
const LOGIN_URL = '/auth'

export async function loginUser({ user, pwd }) {

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