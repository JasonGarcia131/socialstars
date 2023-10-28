import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import useLogout from "../hooks/useLogout";

const Dashboard = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const logout = useLogout();

    const decode = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const {userId} = decode?.UserInfo;

    console.log("auth", userId)

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    return (
        <div className='w-full h-screen bg-space-background'>
            <section className='w-[400px] h-[400px] flex flex-col justify-around absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] opacity-95 text-center text-slate-300'>
                <h1 className="text-2xl">Home</h1>
                {/* {role?.includes(1994) && <Link to='/admin'>Admin's Home</Link>} */}
                <br />
                <Link to={`/profile/${userId}`}>Profile</Link>
                <br />
                <Link to="news">Upcoming Features</Link>
                <br />
                <Link to='feedback'>Give Feedback?</Link>
                <br />
                <Link to='about'>About Social Stars</Link>
                <br />
                <button onClick={signOut}>Sign Out</button>
                {/* <CopyToClipboard
                text={`localhost:3000/users/${id}`}
                onCopy={() => setCopied(true)}
            >
                <div>
                    <p>Share profile link</p><FaPaperclip />
                </div>
            </CopyToClipboard>
            {copied ? <p>Copied!</p> : ""} */}
                {/* <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div> */}
            </section>
        </div>
    )
}

export default Dashboard
