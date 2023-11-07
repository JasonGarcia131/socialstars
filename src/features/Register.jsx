import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Select from "../components/Select";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [horoscopeSign, setHoroscopeSign] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd, horoscopeSign }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setIsLoading(false);
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <div className='w-full h-screen bg-space-background'>
                    <section className='w-[400px] h-[400px] absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] opacity-95 text-center text-slate-300'>
                        <h1>Success!</h1>
                        <p>
                            <Link to="/login" className="underline">Sign In</Link>
                        </p>
                    </section>
                </div >
            ) : isLoading ? (
                <div className="h-screen flex justify-center items-center align-center">
                    <ClipLoader
                        size={130}
                        color="white"
                    />
                </div>
            ) : (
                <div className='w-full h-screen bg-space-background'>
                    <section className='w-[400px] h-[400px] absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] opacity-95 text-center text-slate-300'>
                        <p ref={errRef} className={errMsg ? "text-red-600" : "hidden"} aria-live="assertive">{errMsg}</p>
                        <h1 className="text-2xl">Register</h1>
                        <form onSubmit={handleSubmit} className='px-2 flex flex-col grow justify-evenly items-center mt-4 text-white'>
                            <label htmlFor="username">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                className="p-1 text-slate-900 mb-2"
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "display text-stone-50" : "hidden"}>
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>


                            <label htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="p-1 text-slate-900 mb-2"

                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "display text-stone-50" : "hidden"}>
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="p-1 text-slate-900  mb-2"

                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "display" : "hidden"}>
                                Must match the first password input field.
                            </p>

                            <label htmlFor="horoscopeSign">Zodiac:</label>
                            <Select value={horoscopeSign} setHoroscopeSign={setHoroscopeSign} />
                            <button disabled={!validName || !validPwd || !validMatch ? true : false} className="w-[100px] mt-4 border rounded-full my-2 bg-pink-950">Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="line"> 
                                <Link to="/login" className="underline">Sign In</Link>
                            </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}

export default Register
