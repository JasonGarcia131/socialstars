import React from 'react'
import InputFile from './InputFile';

const Bio = () => {
    return (
        <section className='h-[260px] bg-yellow-300 text-center p-4 md:w-1/3'>
            <div className='w-[130px] h-[130px] rounded-full bg-green-500 mx-auto'>
                <p>image</p>
            </div>
            <InputFile
                label="Edit Profile Picture"
                imageKey="profilePicture"
                userId={1}
                id="editProfilePicture"
                setUserInfo={()=>null}
                theme="light"

            />
            <div>
                <p>bio</p>
            </div>
            <div>
                <p>posts</p>
            </div>
        </section>
    )
}

export default Bio