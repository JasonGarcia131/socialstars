import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from '../api/axios'
export const profileLoader = async ({params}) => {
    const UserInfo = await axios.get(`http://localhost:3500/users/${params.userId}`)
    return UserInfo;
}

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile