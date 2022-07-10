import React, {useState} from 'react'
import './login.styles.css'
import instagram from '../../assets/instagram.png'
import {AiFillFacebook} from 'react-icons/ai'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/apiCalls'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({identity: '', password: ''})
    const { isFetching, error } = useSelector((state) => state.user)

    const changeHandler = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        setLoginData({...loginData, [name]: value})
    }

    const handleClick = (e) => {
        e.preventDefault()
        // console.log(loginData)
        login(dispatch, loginData)
    }

    const onToSignUp = (e) => {
        e.preventDefault()
        navigate("/signup")
    }

  return (
    <div className='login'>
        <div className="login_form">
            <img src={instagram} alt="" className='login_image'/>

            <input placeholder = 'Phone number, username, or email' type='text' className='login_identity' name='identity' onChange={changeHandler}/>
            <input  placeholder = 'Password' name='password' type='password' onChange={changeHandler} className = 'login_password' onFocus={(e) => {e.target.placeholder = ''}} onBlur = {(e) => {e.target.placeholder = 'Password'}}/>

            <button className='login_button' onClick={handleClick} disabled = {isFetching}>
            {isFetching ? < ClipLoader loading = {{isFetching}}  color = 'white' size={20}/> : <div> Log In</div>}
            {/* <div> Log In</div> */}
            </button>

            <p className='or'>OR</p>

            <div className='facebook_login'>
                <AiFillFacebook color='rgb(14, 14, 134)' size={18}/>
                <p>Log in with facebook</p>
            </div>

            {error ? <p style={{color: "red"}}>Please check your credentials again</p> : <p className='forgot_password'> Forgot password?</p>}

            

        </div>

        <div className="to_signup">
            Don't have an account? <p onClick={onToSignUp} style = {{cursor: 'pointer'}}>Sign up</p>
        </div>
    </div>
  )
}

export default Login