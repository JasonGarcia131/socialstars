import React, { useState } from 'react'
import { useLoaderData, defer, Await } from 'react-router-dom'
import { getProfile } from '../api/api'
import Header from '../components/Header'
import Bio from '../components/Bio'
import Nav from '../components/Nav'
import Posts from '../components/Posts'
import PostTextBox from '../components/PostTextBox'
import { ThemeContext } from '../context/ThemeContext'


export const profileLoader = async ({ params }) => {
  const userInfoPromise = getProfile(params);
  console.log(userInfoPromise)
  return defer({ UserInfo: userInfoPromise });
}

const Profile = () => {
  const loaderData = useLoaderData();
  const [theme, setTheme] = useState("light");
 
  const ProfileData = () => {
    return (
      <Await resolve={loaderData.UserInfo}>
        {
          (UserInfo) => {
            console.log("user info", UserInfo)
            const { bannerImageLight, bannerImageShadow, bio, horoscopeSign, profilePicture, username, _id } = UserInfo.data;
            return (
              <>
                <Header id={_id} bannerImageLight={bannerImageLight} bannerImageShadow={bannerImageShadow} />
                <div className='md:flex md:flex-row mb-10'>
                  <Bio id={_id} profilePicture={profilePicture} bio={bio} username={username} />
                  <PostTextBox />
                </div>
                <Posts id={_id} profilePicture={profilePicture} username={username} />
                <Nav setTheme={setTheme} />
              </>
            )
          }
        }
      </Await>
    )
  }
  
  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <ProfileData />
      </ThemeContext.Provider>
    </div>
  )
}

export default Profile