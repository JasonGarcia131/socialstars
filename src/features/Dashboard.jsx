import { useNavigate, Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
import useLogout from "../hooks/useLogout";

const Dashboard = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const { auth } = useAuth();
    const logout = useLogout();

    const decode = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const { userId } = decode?.UserInfo;

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    return (
        <div className='w-full h-screen bg-space-background'>
            <section className='w-[400px] h-[400px] flex flex-col justify-around absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300'>
                <h1 className="text-2xl">Home</h1>
                {/* {role?.includes(1994) && <Link to='/admin'>Admin's Home</Link>} */}
                <Link className='underline' to={`/profile/${userId}/?theme=light`}>Profile</Link>
                <Link className='underline' to="/news">Upcoming Features</Link>
                <Link className='underline' to='/feedback'>Give Feedback?</Link>
                <Link className='underline' to='/about'>About Stars</Link>
                <CopyToClipboard
                    text={`localhost:3000/users/${userId}`}
                    onCopy={() => setCopied(true)}
                >
                    <div>
                        <p className="underline">Share Profile Link</p>
                    </div>
                </CopyToClipboard>
                {copied ? <p>Copied!</p> : ""}
                <button className='w-[120px] border rounded-full mx-auto bg-pink-950' onClick={signOut}>Sign Out</button>
            </section>
        </div>
    )
}

export default Dashboard;
