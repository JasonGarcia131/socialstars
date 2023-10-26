import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='w-full h-screen bg-space-background'>
             <section className='w-[400px] h-[400px] flex flex-col justify-around absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] opacity-95 text-center text-slate-300'>
                <h1>Stars</h1>
                <br />
                <p>Your digital journal</p>
                <br />
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
                <br />
                <Link to="/about">About Stars</Link>
            </section>
        </div>
    )
}

export default Landing