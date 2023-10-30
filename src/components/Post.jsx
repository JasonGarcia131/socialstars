import React from 'react'

const Post = ({ username, profilePicture, content, handleDelete, theme, date, editMode, id, isPrivate, toggleEditDelete }) => {

    const newDate = new Date(date);

    const month = newDate.getMonth() + 1;
    const day = newDate.getDate() + 1;
    const year = newDate.getFullYear();
    const dateOfPost = `${month}/${day}/${year}`;

    return (
        <div className='md:max-w-lg mb-6 m-auto'>
            <article className='w-full h-[140px] flex flex-col justify-between border-4 p-2'>
                <div className='flex justify-between'>
                    <div className='w-[70px] h-[70px] rounded-full bg-green-500'><img className='w-full h-[100%] rounded-full overflow-hidden' src={`${profilePicture}`} /></div>
                    <p className='flex-1 mx-2'>{username}</p>
                    <div>{dateOfPost}</div>
                </div>
                <div className='overflow-scroll'>{content}</div>
            </article>
            <div className='flex justify-between'>
                <p onClick={() => toggleEditDelete()}>...</p>
                <button onClick={() => handleDelete(id)} className={editMode ? "block" : "hidden"}>Delete</button>
                <p>{isPrivate ? "Private" : "Public"}</p>
            </div>
        </div>
    )
}

export default Post