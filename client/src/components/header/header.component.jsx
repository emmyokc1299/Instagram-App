import React, {useState} from 'react'
import instagram from '../../assets/instagram.png'
import { Link, useNavigate} from 'react-router-dom'
import './header.styles.css'
import {AiFillHome} from "react-icons/ai";
import {AiOutlineHome} from "react-icons/ai";
import {IoSearchOutline} from 'react-icons/all'
import {HiOutlinePaperAirplane} from 'react-icons/hi'
import {HiPaperAirplane} from 'react-icons/hi'
import {BsPlusSquare} from 'react-icons/bs'
import {BsPlusSquareFill} from 'react-icons/bs'
import {BsSuitHeartFill} from 'react-icons/bs'
import {BsSuitHeart} from 'react-icons/bs'
import {RiCompass3Fill} from 'react-icons/ri'
import {RiCompass3Line} from 'react-icons/ri'
import Modal from 'react-modal'

import culture from '../../assets/culture.jpg'
import user from '../../assets/user.png'

import { useDispatch, useSelector } from 'react-redux';
import { show_postModal } from '../../redux/postRedux';
import {open_logOut} from '../../redux/userRedux'

const Header = () => {
    const [home, setHome] = useState(false)
    const [message, setMessage] = useState(false)
    const [explore, setExplore] = useState(false)
    const [post, setPost] = useState(false)
    const [follow, setFollow] = useState(false)
    const [location, setLocation] = useState(window.location.pathname)
    const dispatch = useDispatch()
    console.log(window.location.pathname)




    const handlePost = () => {
        setPost(true)
        setHome(false)
        setMessage(false)
        setExplore(false)
        setFollow(false)
        dispatch(show_postModal(true))
    }

    const handleMessage = () => {
        setPost(false)
        setHome(false)
        setMessage(true)
        setExplore(false)
        setFollow(false)
    }

    const postModal = useSelector((state) => state.post.postModal)

    const handleClick = () => {
        dispatch(open_logOut(true))
    }

  return (
    <div className='header'>
            <Link to = '/'className="logo">
                <img src={instagram} alt = '' className='logo_img' />
            </Link>
            <div className="search">
                <div className='search_bar'>
                    <span><IoSearchOutline size={17}/></span>
                    <p>Search</p>
                </div>
            </div>
            <div className="nav">

                {home ? (<Link to = '/'><AiFillHome size={24} color = 'black' className='links'/></Link>) : 
                (<Link to = '/'><AiOutlineHome size={24} color = 'black' className='links'/></Link>)}                
                
                {location === "/message" ? 
                (<Link to = '/message' > <HiPaperAirplane size={24} color = 'black' className='links rotate'/> 
                    <div className='red_dot'> <p>1</p></div>
                </Link>) : 
                (<Link to = '/message' onClick={() => handleMessage()}> <HiOutlinePaperAirplane size={24} color = 'black' className='links rotate'/> 
                    <div className='red_dot'> <div>1</div></div>
                </Link>)}

                {post && postModal ?  (<Link to = '/' onClick={() => handlePost()}><BsPlusSquareFill size={22} color = 'black' className='links'/></Link>) : (<Link to = '/' onClick={() => handlePost()}><BsPlusSquare size={22} color = 'black' className='links'/></Link>)}

                {explore ?  (<Link to = '/'> <RiCompass3Fill size={24} color = 'black' className='links'/></Link>) : (<Link to = '/'> <RiCompass3Line size={24} color = 'black' className='links'/></Link>)}

                {follow ? (<Link to = '/'> <BsSuitHeartFill size={24} color = 'black' className='links'/></Link>) : (<Link to = '/'> <BsSuitHeart size={24} color = 'black' className='links'/></Link>)}

                <Link to = '/' onClick={handleClick}> <img src={user} className = 'imageProfile'/> </Link>
            </div>
    </div>
  )
}

export default Header