import { useNavigate, Link, useSearchParams } from "react-router-dom";
// import useLogout from "../hooks/useLogout";
// import useAuth from "../hooks/useAuth";
// import jwt_decode from "jwt-decode";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { FaPaperclip } from "react-icons/fa";
// import { useState } from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    // const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    //Authenticated User
    // const { auth } = useAuth();

    //User info decoded from the access token
    // const decode = auth.accessToken
    //     ? jwt_decode(auth.accessToken)
    //     : undefined

    // const user = decode?.UserInfo;
    // const id = user?.userId;
    // const role = user?.roles;
    
    return (
        <section>
            <h1>Home</h1>
            <br />
            {/* {role?.includes(1994) ? <Link to='/admin'>Admin's Home</Link> : ""} */}
            <br />
            <Link to='profile'>Profile</Link>
            <br />
            <Link to="news">New upcoming features</Link>
            <br />
            <Link to='feedback'>Give feedback?</Link>
            <br />
            <Link to='about'>About Stars</Link>
            <br />
            {/* <CopyToClipboard
                text={`localhost:3000/users/${id}`}
                onCopy={() => setCopied(true)}
            >
                <div>
                    <p>Share profile link</p><FaPaperclip />
                </div>
            </CopyToClipboard>
            {copied ? <p>Copied!</p> : ""} */}
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Dashboard
