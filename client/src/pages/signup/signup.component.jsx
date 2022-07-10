import React, {useState} from 'react'
import './signup.styles.css'
import instagram from '../../assets/instagram.png'
import {AiOutlineFacebook} from 'react-icons/ai'
import { signup } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    
    const [signupData, setSignupData] = useState({identity: '', password: '', fullname: '', username: ''})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector((state) => state.user)


    const changeHandler = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        setSignupData({...signupData, [name]: value})
    }

    const handleClick = (e) => {
        e.preventDefault()
        // console.log(signupData)
        signup(dispatch, signupData)
    }

    const onToLogIn = (e) => {
        e.preventDefault()
        navigate("/login")
    }

  return (
    <div className='signup'>
        <div className="signup_form">
            <img src={instagram} alt="" className='signup_image'/>

            <p className='signup_title'>Sign up to see photos and videos from your friends.</p>

            <div className='facebook_signup'>
                <AiOutlineFacebook color='white' size={18}/>
                <p>Log in with facebook</p>
            </div>

            <p className='or'>OR</p> 

            <input placeholder = 'Mobile Number or Email' className='signup_identity' name='identity' onChange={changeHandler}/>
            <input placeholder = 'Full Name' className='signup_fullname' name='fullname' onChange={changeHandler}/>
            <input placeholder = 'Username' className='signup_username' name='username' onChange={changeHandler}/>
            <input  placeholder = 'Password' name='password' type='password' onChange={changeHandler} className = 'signup_password' onFocus={(e) => {e.target.placeholder = ''}} onBlur = {(e) => {e.target.placeholder = 'Password'}}/>

            <button className='signup_button' onClick={handleClick} disabled = {isFetching}>
                {isFetching ? < ClipLoader loading = {isFetching}  color = 'white' size={20}/> : <div> Sign up </div>}
            </button>

            {error ? <p style={{color: "red"}}>Please check your credentials again</p> : <p className='signup_terms'>By signing up you agree to our Terms, Data Policy and Cookies Policy</p>}

        </div>

        <div className="to_login">
            Have an account? <p onClick={onToLogIn} style = {{cursor: 'pointer'}}>Log in</p>
        </div>
    </div>
  )
}

export default SignUp