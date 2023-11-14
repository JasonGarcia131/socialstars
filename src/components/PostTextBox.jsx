import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

//Try to refactor by using actions
// export const postAction = async ({ request, params }) => {
//     try {
//         const formData = await request.formData();
//         const id = params;
//         const urlParams = new URLSearchParams(window.location.search);
//         const postTheme = urlParams.get("theme");
//         const content = formData.get("content");
//         const privatePost = formData.get("private");
//         let isPrivate;
//         if (privatePost === 'private') isPrivate = true;

//         // await setAuth({ accessToken })
//         if (content.length === 0) return "Oops... please try again.";

//         if (content.length > 100) return "You've exceeded the number of words!";

//         const postResponse = await axios.post("http://localhost:3500/posts", { id, isPrivate, postTheme, content }, {
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true
//         })
//         console.log("post respones", postResponse)
//         return postResponse
//         //Sets the most recent post on the page.
//     } catch (error) {
//         return error?.response?.data
//     }
// }

import { useSearchParams } from 'react-router-dom';

const PostTextBox = ({ id, setPage, page}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = searchParams.get("theme");
    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState("");
    const [post, setPost] = useState({
        id: id,
        isPrivate: false,
        postTheme: theme,
        content: ""
    })

    const handleSubmit = async () => {
        if (post.content.length === 0) return setMessage("Oops... please try again.");

        if (post.length > 100) return setMessage("You've exceeded the number of words!");

        try {
            const response = await axiosPrivate.post(`/posts`, post);
            if(response.status == 201){
                setPage(prev=>({...prev, results: [response.data,...page.results]}))
            }
        } catch (e) {
            if (!e?.response) {
                setErrMsg("No Server Response");
            }
            else if (e.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
        }

    }

    return (
        <div className={`w-full my-6 px-2 md:m-auto md:max-w-md`}>
            <h1 className='text-2xl text-center'>{theme === "light" ? "Affirmations" : "Shadow Thoughts"}</h1>
            <textarea className='w-full h-[100px] border-4 my-2 text-black' placeholder="What's on your mind?" name="content" value={post.content} onChange={(e) => setPost((prevData) => ({ ...prevData, content: e.target.value }))} />
            <div className='flex justify-between'>
                <button className={`w-[80px] border rounded-full bg-pink-950 text-white ${!post.content ? 'opacity-30' : ' bg-pink-950'} `} onClick={() => handleSubmit()}>Submit</button>
                <div className='w-2/4 flex justify-around sm:w-[35%] sm:justify-between'>
                    <label htmlFor='private'>Private
                        <input
                            type='radio'
                            name="isPrivate"
                            value={post.isPrivate}
                            className='ml-2'
                            onChange={(e) => setPost((prevData) => ({ ...prevData, isPrivate: true }))}

                        />
                    </label>
                    <label htmlFor='public'>Public
                        <input
                            type='radio'
                            name='isPrivate'
                            value={post.isPrivate}
                            className='ml-2'
                            onChange={(e) => setPost((prevData) => ({ ...prevData, isPrivate: false }))}
                        />
                    </label>
                </div>
            </div>
            <p>{errMsg}</p>
        </div>
    )
}

export default PostTextBox;