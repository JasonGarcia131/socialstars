import React, { useEffect } from 'react';
import { useLoaderData, defer, Await, useNavigate, useSearchParams } from 'react-router-dom';
import { getProfile } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';
import { ClipLoader } from "react-spinners";
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

  useEffect(() => {
  }, [searchParams])


  const navigate = useNavigate();

  const decode = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined

  const { userId } = decode?.UserInfo;

  const ProfileData = () => {
    const themeClass = searchParams.get("theme") === "shadow" ? 'bg-black text-white' : "";
    return (
      <Await resolve={loaderData.UserInfo}>
        {
          (UserInfo) => {
            const { bio, horoscopeSign, profilePicture, username, _id } = UserInfo.data;
            if (_id !== userId) return navigate(`/profile/${userId}`)
            return (
              <div className={`${themeClass}`}>
                <Header id={_id} isPublic={false} horoscopeSign={horoscopeSign} />
                <div className='md:flex md:flex-row mb-10'>
                  <Bio id={_id} profilePicture={profilePicture} bio={bio} username={username} isPublic={false}/>
                  <PostTextBox id={_id} />
                </div>
                <Posts id={_id} profilePicture={profilePicture} username={username} isPublic={false}/>
                <Nav/>
              </div>
            )
          }
        }
      </Await>
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
          <ProfileData />
        </React.Suspense>
      </ThemeContext.Provider>
    </div>
  )
}

export default Profile