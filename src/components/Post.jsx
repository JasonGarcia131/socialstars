import React from 'react'
import { useSearchParams } from 'react-router-dom';

 const Post = ({ username, content, handleDelete, date, editMode, id, isPrivate, isPublic, toggleEditDelete, profilePicture }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    // Converts db date to month/day/year format
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate() + 1;
    const year = newDate.getFullYear();
    const dateOfPost = `${month}/${day}/${year}`;
    const boxShadow = searchParams.get("theme") === 'shadow' ? 'shadow-gray-800' : "";

    return (
        <div className='md:max-w-lg mb-6 m-auto'>
            <article className={`w-full h-[140px] flex flex-col justify-between border-4 p-2 shadow-xl ${boxShadow}`}>
                <div className='flex justify-between'>
                    <div className={`w-[70px] h-[70px] rounded-full bg-[length:70px_70px]`}>
                        <img className='w-[70px] h-[70px] rounded-full' src={profilePicture}/>
                    </div>
                    <p className='flex-1 mx-2'>{username}</p>
                    <div>{dateOfPost}</div>
                </div>
                <div className='overflow-scroll'>{content}</div>
            </article>
            {
                !isPublic &&
                <div className='flex justify-between'>
                    <p onClick={() => toggleEditDelete()}>...</p>
                    <button onClick={() => handleDelete(id)} className={editMode ? "block w-[80px] mt-2 border rounded-full bg-pink-950 text-white" : "hidden"}>Delete</button>
                    <p>{isPrivate ? "Private" : "Public"}</p>
                </div>
            }
        </div>
    )
}

export default Post;