import React, { useState, useEffect } from 'react';
import { useLoaderData, defer, Await, useSearchParams } from 'react-router-dom';
import { getProfile } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';
import { ClipLoader } from "react-spinners";
import Header from '../components/Header';
import Bio from '../components/Bio';
import Nav from '../components/Nav';
import Posts from '../components/Posts';

export const profileLoader = async ({ params }) => {
  const userInfoPromise = getProfile(params);
  return defer({ UserInfo: userInfoPromise });
}

const PublicProfile = () => {
  const loaderData = useLoaderData();
  const [theme, setTheme] = useState("light");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
  }, [searchParams])


  const ProfileData = () => {
    const themeClass = searchParams.get("theme") === "shadow" ? 'bg-black text-white' : "";
    return (
      <Await resolve={loaderData.UserInfo}>
        {
          (UserInfo) => {
            const {  bio, horoscopeSign, profilePicture, username, _id } = UserInfo.data;
            return (
              <div className={`${themeClass}`}>
                <Header id={_id} isPublic={true} horoscopeSign={horoscopeSign} />
                <div className='md:flex md:flex-row mb-10'>
                  <Bio id={_id} profilePicture={profilePicture} bio={bio} username={username} isPublic={true}/>
                </div>
                <Posts id={_id} profilePicture={profilePicture} username={username} isPublic={true} horoscopeSign={horoscopeSign}/>
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

export default PublicProfile