import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='w-full h-screen bg-space-background'>
            <section className='w-[400px] h-[400px] absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] opacity-95 text-center text-slate-300'>
                <h1 className='text-6xl'>Stars</h1>
                <br/>
                <p className='italic'>Your digital journal</p>
                <br/>
                <div className='flex flex-col'>
                    <Link to="/login" className='text-2xl mb-4 underline'>Login</Link>
                    <Link to="/register" className='text-2xl mb-4 underline'>Register</Link>
                    <Link to="/about" className='text-2xl underline'>About Stars</Link>
                </div>
            </section>
        </div>
    )
}

export default Landing