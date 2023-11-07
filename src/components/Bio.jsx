import InputFile from './InputFile';
import { useSearchParams } from 'react-router-dom';

const Bio = (props) => {
    const { username, profilePicture, bio, id, isPublic } = props;
    const [searchParams, setSeachParams] = useSearchParams();

    return (
        <section className={`h-[300px] flex flex-col justify-evenly text-center p-4 md:w-1/3 `}>
            <div>
                <div className='w-[130px] h-[130px] rounded-full mx-auto'>
                    <img className='w-full h-[100%] border-2 rounded-full overflow-hidden' src={`${profilePicture}`} />
                </div>
                {
                    !isPublic
                    && <InputFile
                        label="Edit Profile Picture"
                        imageKey="profilePicture"
                        userId={id}
                        id="editProfilePicture"
                    />
                }
                <div>
                    <p className='font-bold'>{username}</p>
                </div>
            </div>

            <div>
                <p className='italic'>"{bio}"</p>
            </div>
        </section>
    )
}

export default Bio;