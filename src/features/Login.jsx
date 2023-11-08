import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
// This loader returns the message from the url when attempting to access private routes
export const loginLoader = ({ request }) => {
    return new URL(request.url).searchParams.get("message")
}

// Form action returns the access token.
// export const loginAction = (setAuth) => async ({ request }) => {
//     const formData = await request.formData();
//     const user = formData.get("username");
//     const pwd = formData.get("password");
//     try {
//         const accessToken = await loginUser({ user, pwd })
//         await setAuth({ accessToken })
//         return redirect('/dashboard')
//     } catch (error) {
//         return error?.message
//     }
// }

const Login = () => {
    // Destructures the useAuth hook to use global state variables
    const { setAuth, persist, setPersist } = useAuth();
    const message = useLoaderData();


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setIsLoading(false);
            const accessToken = response?.data?.accessToken;

            setAuth({ accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        isLoading ? (<div className='w-full h-screen bg-space-background flex jusitfy-center items-center '><ClipLoader size={70} color='pink' className='mx-auto'/></div>) : (
            <div className='w-full h-screen bg-space-background'>
                <section className='w-[350px] h-[350px] absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {message && <p>{message}</p>}
                    <h1 className='text-[2rem] '>Login</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col grow justify-evenly items-center mt-4 text-white' >
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className='my-2 p-2 rounded-lg w-full text-black'
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className='my-2 p-2 rounded-lg w-full text-black'
                        />
                        <button className='w-[100px] border rounded-full my-2 bg-pink-950 '>Sign In</button>
                        <div>
                            <input
                                type="checkbox"
                                id="persist"
                                name="persist"
                                onChange={togglePersist}
                            />
                            <label htmlFor="persist" className='m-2'>Trust This Device</label>
                        </div>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register" className='underline' >Sign Up</Link>
                        </span>
                    </p>
                </section>
            </div>
        )
    )

}

export default Login;
