import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
const PostTextBox = () => {
    const theme = useContext(ThemeContext);
    return (
        <div className='w-full my-6 px-2 md:m-auto md:max-w-md'>
            <h1 className='text-2xl text-center'>{theme === "light" ? "Affirmations" : "Shadow Thoughts"}</h1>
            <textarea className='w-full h-[100px] border-4 my-2' placeholder="What's on your mind?"/>
            <div className='flex justify-between'>
                <button>Submit</button>
                <div className='w-2/4 flex justify-around sm:w-[35%] sm:justify-between'>
                    <label htmlFor='private'>Private
                        <input
                            type='radio'
                            name='private'
                            value='private'
                            className='ml-2'
                        />
                    </label>
                    <label htmlFor='public'>Public
                        <input
                            type='radio'
                            name='public'
                            value='public'
                            className='ml-2'
                        />
                    </label>
                </div>

            </div>
        </div>
    )
}

export default PostTextBox