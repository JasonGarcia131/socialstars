import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from '../api/axios'
import Header from '../components/Header'
import Bio from '../components/Bio'
import Nav from '../components/Nav'
import PostTextBox from '../components/PostTextBox'
export const profileLoader = async ({ params }) => {

  const UserInfo = await axios.get(`http://localhost:3500/users/${params.userId}`)
  return UserInfo;
}

const Profile = () => {
  const userInfo = useLoaderData();
  console.log(userInfo)
  return (
    <div>
      <Header/>
      <Bio/>
      <Nav/>
      <PostTextBox/>
    </div>
  )
}

export default Profile