import React, { useEffect, useState } from 'react'
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../api/axios';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
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

const LIMIT = 10;

const Posts = ({ id, username, profilePicture }) => {


    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const theme = useContext(ThemeContext);

    useEffect(()=>{
     setPaginatedPosts([]);
    },[theme]);

    // State variable for a single post
    const [post, setPost] = useState({
        id: id,
        postTheme: theme,
        content: "",
        isPrivate: false
    });

    //State variable for the pagination results
    const [page, setPage] = useState({
        next: {
            page: 1,
            limit: 0
        },
        previous: {
            page: 0,
            limit: 0
        },
    });

    const getPosts = async (nextPage) => {
        const controller = new AbortController();
        try {
            const response = await axios.get(`/posts/paginate/?id=${id}&page=${nextPage}&limit=${LIMIT}&theme=${theme}&public=false`, {
                signal: controller.signal
            });

            console.log(response?.data)
            controller.abort();

            setPage({
                next: response?.data?.next,
                previous: response?.data?.previous,
                total: response?.data?.total
            });

            setPaginatedPosts((prevData) => [...prevData, response?.data?.results]);

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
            const response = await axios.delete(`/posts/${id}`);
            if (response.status === 200) {
                const filteredPost = paginatedPosts.flat().filter(post => post._id !== response.data._id);
                setPaginatedPosts(filteredPost);
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

    //Infinite scroll pagination function
    const handleInfiniteScroll = (api, page) => {
        api(page.next?.page);
    }

    return (
        <div className='w-full px-2'>

            <InfiniteScroll
                dataLength={paginatedPosts.length}
                next={() => getPosts(page.next?.page)}
                hasMore={page.next}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
                scrollThreshold={.99}
            >
                {paginatedPosts.flat().map((post, index) => (

                    <Post key={index} username={username} profilePicture={profilePicture} content={post.content} handleDelete={handleDelete} toggleEditDelete={toggleEditDelete} editMode={editMode} theme={post.theme} date={post.createdAt} id={post._id} isPrivate={post.isPrivate} />

                ))}
            </InfiniteScroll>
        </div>
    )
}

export default Posts