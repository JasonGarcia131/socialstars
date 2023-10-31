import InputFile from './InputFile';

const Bio = (props) => {
    const {username, profilePicture, bio, id} = props;
    return (
        <section className='h-[300px] flex flex-col justify-between text-center p-4 md:w-1/3'>
            <div className='w-[130px] h-[130px] rounded-full mx-auto'>
                <img className='w-full h-[100%] rounded-full overflow-hidden' src={`${profilePicture}`}/>
            </div>
            <InputFile
                label="Edit Profile Picture"
                imageKey="profilePicture"
                userId={id}
                id="editProfilePicture"
                theme="light"
            />
            <div>
                <p>{username}</p>
            </div>
            <div>
                <p>"{bio}"</p>
            </div>
            <div>
                <p>posts</p>
            </div>
        </section>
    )
}

export default Bio;