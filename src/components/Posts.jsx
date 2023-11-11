import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ClipLoader } from "react-spinners";
import { ThemeContext } from '../context/ThemeContext';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

// Limits the amount of posts to be fecthed
const LIMIT = 10;
const Posts = ({ id, username, isPublic, profilePicture, setPage, page }) => {
    const axiosPrivate = useAxiosPrivate();
    const [editMode, setEditMode] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const theme = useContext(ThemeContext);

    const getPosts = async (nextPage) => {
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get(`/posts/paginate/?id=${id}&page=${nextPage}&limit=${LIMIT}&theme=${theme}&public=${isPublic}`, {
                signal: controller.signal
            })
            controller.abort();
            setPage((prevPost) => ({
                next: response?.data?.next,
                previous: response?.data?.previous,
                total: response?.data?.total,
                results: [...prevPost.results, response?.data?.results]
            }));

        } catch (e) {
            if (!e?.response) {
                setErrMsg("No Server Response");
            }
            else if (e.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    
    //Toggles delete button to hide or show
    const toggleEditDelete = () => {
        setEditMode(!editMode)
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/posts/${id}`);
            if (response.status === 200) {
                // Filters out the deleted post so we dont refetch;
                const filteredPost = page.results.filter(post => post._id !== response.data._id);
                setPage((prev) => ({ ...prev, results: filteredPost }));
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
        <div className={`w-full px-2`}>
            <p className='text-red-500 font-bold mb-2 text-center'>{errMsg}</p>
            <InfiniteScroll
                dataLength={page.results.length}
                next={() => getPosts(page.next?.page)}
                hasMore={page.next}
                loader={<div className='w-full text-center'><ClipLoader size={70} color='pink' /></div>
                }
                scrollableTarget="scrollableDiv"
                scrollThreshold={.80}
                endMessage="End of thread"
                className={`mb-20`}
            >
                {page.results.flat().map((post, index) => (
                    <Post key={index} username={username} profilePicture={profilePicture} content={post.content} handleDelete={handleDelete} toggleEditDelete={toggleEditDelete} editMode={editMode} date={post.createdAt} id={post._id} isPrivate={post.isPrivate} isPublic={isPublic} />
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default Posts;