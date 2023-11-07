import React, { useEffect } from 'react';
import { Form, useLoaderData, useActionData, useNavigate, useLocation, redirect, Link } from 'react-router-dom';
import { loginUser } from '../api/api';
import useAuth from '../hooks/useAuth';

// This loader returns the message from the url when attempting to access private routes
export const loginLoader = ({ request }) => {
    return new URL(request.url).searchParams.get("message")
}

// Form action returns the access token.
export const loginAction = (setAuth) => async ({ request }) => {
    const formData = await request.formData();
    const user = formData.get("username");
    const pwd = formData.get("password");
    try {
        const accessToken = await loginUser({ user, pwd })
        await setAuth({ accessToken })
        return redirect('/dashboard')
    } catch (error) {
        return error?.message
    }
}

const Login = () => {
    // Destructures the useAuth hook to use global state variables
    const { persist, setPersist } = useAuth();

    const message = useLoaderData();
    const error = useActionData();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    // Gets the access token when the form is submitted and saves it to auth context.
    // persist value gets stored in local storage to keep user logged in on a trusted device.
    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    return (
        <div className='w-full h-screen bg-space-background'>
            <section className='w-[400px] h-[400px] absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300'>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
                <h1 className='text-[2rem] '>Login</h1>
                <Form method='POST' className='px-2 flex flex-col grow justify-evenly items-center mt-4  text-white' >
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        className='my-2 p-2 rounded-lg w-full text-black'
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className='my-2 p-2 rounded-lg w-full text-black'
                        required
                    />
                    <button className='w-[100px] border rounded-full my-2 bg-pink-950 '>Sign In</button>
                    <div className="persistCheck">
                        <input
                            type="checkbox"
                            id="persist"
                            name="persist"
                            onChange={togglePersist}
                        />
                        <label htmlFor="persist" className='m-2'>Trust This Device</label>
                    </div>
                </Form>
                <p>Or</p>
                <Link to='/register' className='underline'>Register</Link>
            </section>
        </div>

    )
}

export default Login;
