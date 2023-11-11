import React, { useEffect, useState } from 'react';
import { useLoaderData, defer, Await, useNavigate, useSearchParams } from 'react-router-dom';
import { getProfile } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';
import { ClipLoader } from "react-spinners";
import { useAsyncValue } from 'react-router-dom';
import Header from '../components/Header';
import Bio from '../components/Bio';
import Nav from '../components/Nav';
import Posts from '../components/Posts';
import PostTextBox from '../components/PostTextBox';
import useAuth from '../hooks/useAuth';
import jwt_decode from 'jwt-decode';

export const profileLoader = async ({ params }) => {
  const userInfoPromise = getProfile({ params });
  return defer({ UserInfo: userInfoPromise });
}

const Profile = () => {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const decode = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined
  const { userId } = decode?.UserInfo;
 
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
    results: []
  });

  useEffect(() => {
    setPage({
      next: {
        page: 1,
        limit: 0
      },
      previous: {
        page: 0,
        limit: 0
      },
      results: []
    });

  }, [searchParams]);

  const ProfileData = () => {
    const themeClass = searchParams.get("theme") === "shadow" ? 'bg-black text-white' : "";
    const resovledUser = useAsyncValue();
    const [profileData, setProfileData] = useState(resovledUser?.data);
    const { bio, horoscopeSign, profilePicture, username, _id } = profileData;
    if (_id !== userId) return navigate(`/profile/${userId}`)
    return (
      <div className={`${themeClass}`}>
        <Header id={_id} isPublic={false} horoscopeSign={horoscopeSign} />
        <div className='md:flex md:flex-row mb-10 md:border-b-4 '>
          <Bio id={_id} profilePicture={profilePicture} bio={bio} username={username} isPublic={false} setProfileData={setProfileData} />
          <PostTextBox id={_id} setPage={setPage} page={page} />
        </div>
        <Posts id={_id} profilePicture={profilePicture} username={username} isPublic={false} setPage={setPage} page={page} />
        <Nav />
      </div>
    )
  }

  return (
    <div>
      <ThemeContext.Provider value={searchParams.get("theme")}>
        <React.Suspense fallback={<div className="h-screen flex justify-center items-center align-center">
          <ClipLoader
            size={130}
            color="white"
          />
        </div>}>
          <Await resolve={loaderData.UserInfo}>
            <ProfileData />
          </Await>
        </React.Suspense>
      </ThemeContext.Provider>
    </div>
  )
}

export default Profile;