// import InputFile from './InputFile';
// import { useSearchParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useContext } from 'react';
// import { ProfileContext } from '../context/ProfileContext';

// const Bio = (props) => {
//     const { username, profilePicture, bio, id, isPublic, profileImage, setProfileImage } = props;
//     const [searchParams, setSeachParams] = useSearchParams();
//     const [success, setSuccess] = useState("");

//     // useEffect(()=>{
//     //     setProfileImage(profilePicture)
//     // },[success])

//     return (
//         <section className={`h-[300px] flex flex-col justify-evenly text-center p-4 md:w-1/3 `}>
//             <div>
//                 <div className='w-[130px] h-[130px] rounded-full mx-auto'>
//                     <img className='w-full h-[100%] border-2 rounded-full overflow-hidden' src={`${profileImage.length ? profileImage : profilePicture}`} />
//                 </div>
//                 {
//                     !isPublic
//                     && <InputFile
//                         label="Edit Profile Picture"
//                         imageKey="profilePicture"
//                         userId={id}
//                         id="editProfilePicture"
//                         setSuccess={setSuccess}
//                         setProfileImage={setProfileImage}
//                         />
//                 }
//                 {success.length > 0 && success }
//                 <div>
//                     <p className='font-bold'>{username}</p>
//                 </div>
//             </div>

//             <div>
//                 <p className='italic'>"{bio}"</p>
//             </div>
//         </section>
//     )
// }

// export default Bio;

import InputFile from './InputFile';
import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Bio = ({ username, profilePicture, bio, id, isPublic, setProfileData }) => {

    const axiosPrivate = useAxiosPrivate();
    const [userBio, setUserBio] = useState({
        content: ""
    });

    const handleSubmitBio = async () => {
        try {
            const response = await axiosPrivate.put(`/users/${id}`, userBio);
            if (response.status === 200) {
                setProfileData((prevData) => ({ ...prevData, bio: userBio.content }));
                setUserBio({ content: "" });
            }
        } catch (e) {
            setMessage("Could not update!");
        }
    }
    return (
        <section className={`h-[300px] flex flex-col justify-evenly text-center p-4 md:w-1/3`}>
            <div>
                <div className='w-[130px] h-[130px] rounded-full mx-auto'>
                    <img className='w-full h-[100%] border-2 rounded-full overflow-hidden' src={profilePicture} />
                </div>
                {
                    !isPublic
                    && <InputFile
                        label="Edit Profile Picture"
                        imageKey="profilePicture"
                        userId={id}
                        id="editProfilePicture"
                        setProfileData={setProfileData}
                    />
                }
                <div>
                    <p className='font-bold'>{username}</p>
                </div>
            </div>

            <div>
                <p className='italic'>"{bio}"</p>
            </div>
            {
                !isPublic && (<div className='flex flex-col justify-center items-center mt-2'>
                    < input
                        type="textbox"
                        name="userBio"
                        placeholder="Edit bio"
                        value={userBio.content}
                        onChange={(e) => setUserBio({ content: e.target.value })}
                        className='border-2'
                    />
                    <button className='p-2 w-[80px] border rounded-full bg-pink-950 text-white mt-2' onClick={() => handleSubmitBio()}>Edit bio</button>
                </div>
                )
            }

        </section>
    )
}

export default Bio;