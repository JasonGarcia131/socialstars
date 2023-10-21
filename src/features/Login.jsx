// import { useRef, useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import Loading from '../components/Loading';
// import useAuth from '../hooks/useAuth';


// import axios from '../api/axios';
// const LOGIN_URL = '/auth';

// const Login = () => {
//     const { setAuth, persist, setPersist } = useAuth();

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/home";

//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const [isLoading,setIsLoading] = useState(false);

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             const response = await axios.post(LOGIN_URL,
//                 JSON.stringify({ user, pwd }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );

//             setIsLoading(false);
//             const accessToken = response?.data?.accessToken;

//             setAuth({accessToken});
//             setUser('');
//             setPwd('');
//             navigate(from, { replace: true });
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 400) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             errRef.current.focus();
//         }
//     }

//     const togglePersist = () => {
//         setPersist(prev => !prev);
//     }

//     useEffect(() => {
//         localStorage.setItem("persist", persist);
//     }, [persist])

//     return (
//         isLoading ? (<Loading/>) : (
//         <section>
//             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     ref={userRef}
//                     autoComplete="off"
//                     onChange={(e) => setUser(e.target.value)}
//                     value={user}
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     onChange={(e) => setPwd(e.target.value)}
//                     value={pwd}
//                     required
//                 />
//                 <button>Sign In</button>
//                 <div className="persistCheck">
//                     <input
//                         type="checkbox"
//                         id="persist"
//                         onChange={togglePersist}
//                         checked={persist}
//                     />
//                     <label htmlFor="persist" className='trustDevice'>Trust This Device</label>
//                 </div>
//             </form>
//             <p>
//                 Need an Account?<br />
//                 <span className="line">
//                     <Link to="/register">Sign Up</Link>
//                 </span>
//             </p>
//         </section>
//     )

//     )
// }

// export default Login;

import React from 'react'
import { Form } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

export const loginLoader = ({request}) => {
return new URL(request.url).searchParams.get("message")
}

export const action = async ({request}) => {
    // const data = await request.formData().get("username");
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password")

    console.log(username, password)

    return null
}

const Login = () => {
    const message = useLoaderData();
    console.log(message);

    return (
        <section className='w-[400px] h-[400px] absolute top-0 left-0 bottom-0 right-0 m-auto bg-blue-300 opacity-95 text-center'>
        <h1 className='text-[2rem] color-white'>Login</h1>
        <Form method='POST' className='px-2 flex flex-col grow justify-evenly items-center mt-4' >
                {/* <div className='flex flex-col items-center'> */}
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        className='my-2 p-2 rounded-lg w-full'
                        required
                    />
                {/* </div> */}

                {/* <div className='flex flex-col items-center'> */}
                <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className='my-2 p-2 rounded-lg w-full'
                        required
                    />
                {/* </div> */}
               
                <button className=''>Sign In</button>
                {/* <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist" className='trustDevice'>Trust This Device</label>
                </div> */}
            </Form>
        </section>

    )
}

export default Login
