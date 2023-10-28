import React from 'react'
import Post from './Post'


// const POSTS = [
//     {
//         author: {
//             _id: "123",
//             username: "jayswitch131",
//             profilePicture: "picture",
//         },
//         content: "post",
//         theme: "light",
//         createdAt: "date"
//     }
// ]

const POSTS = [1,1,1,1,1,1,1,1,1,1]

const Posts = () => {

    const mappedPosts = POSTS.map((post, index)=>(
        <Post/>
    ))
    return (
        <div className='w-full px-2'>
            {mappedPosts}
        </div>
    )
}

export default Posts