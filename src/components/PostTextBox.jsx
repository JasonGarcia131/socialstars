import React from 'react'

const PostTextBox = () => {
    let theme = {
        light: true
    }
    return (
        <div className='my-6'>
            <h1 className='text-2xl'>{theme.light ? "Affirmations" : "Shadow Thoughts"}</h1>
            {/* <input
            type='textbox'
            placeholder="What's on your mind?"
            className='w-full h-[100px] m-2 border border-solid'
        /> */}
            <textarea className='w-full h-[100px] border-4 my-2'/>
            <div className='flex justify-between'>
                <button>Submit</button>
                <div className='w-1/2 flex justify-between'>
                    <label htmlFor='light'>Private
                        <input
                            type='checkbox'
                            value='private'
                            className='ml-2'
                        />
                    </label>
                    <label htmlFor='light'>Public
                        <input
                            type='checkbox'
                            value='private'
                            className='ml-2'
                        />
                    </label>
                </div>

            </div>

        </div>
    )
}

export default PostTextBox