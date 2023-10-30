import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from '../api/axios'
import Header from '../components/Header'
import Bio from '../components/Bio'
import Nav from '../components/Nav'
import Posts from '../components/Posts'
import PostTextBox from '../components/PostTextBox'
import { ThemeContext } from '../context/ThemeContext'


export const profileLoader = async ({ params }) => {
  const UserInfo = await axios.get(`http://localhost:3500/users/${params.userId}`)
  return UserInfo;
}

const Profile = () => {
  const userInfo = useLoaderData();
  const [theme, setTheme] = useState("light");
  const { bannerImageLight, bannerImageShadow, bio, horoscopeSign, profilePicture, username, _id } = userInfo.data;
  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Header bannerImageLight={bannerImageLight} bannerImageShadow={bannerImageShadow} />
        <div className='md:flex md:flex-row mb-10'>
          <Bio profilePicture={profilePicture} bio={bio} username={username} />
          <PostTextBox />
        </div>
        <Posts id={_id} profilePicture={profilePicture} username={username} />
        <Nav setTheme={setTheme} />
      </ThemeContext.Provider>
    </div>
  )
}

export default Profile