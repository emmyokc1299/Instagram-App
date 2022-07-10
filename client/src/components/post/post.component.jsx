import React, {useState, useRef, useEffect} from 'react'
import './post.styles.css'
import ReactPlayer from 'react-player'
import fiction from '../../assets/fiction.jpg'
import health from '../../assets/health.jpg'
import culture from '../../assets/culture.jpg'
import vid from '../../assets/react.mp4'
import UserImage from '../../assets/user.png'
import {BsThreeDots} from 'react-icons/bs'

import {BsSuitHeartFill} from 'react-icons/bs'
import {BsSuitHeart} from 'react-icons/bs'

import {HiOutlinePaperAirplane} from 'react-icons/hi'
import {HiPaperAirplane} from 'react-icons/hi'
import {IoChatbubbleOutline} from 'react-icons/io5'
import {IoChatbubbleSharp} from 'react-icons/io5'

import {BsChevronRight} from 'react-icons/bs'
import {BsChevronLeft} from 'react-icons/bs'

import {send_postDetails, show_postOptions} from '../../redux/postRedux';
import { useDispatch, useSelector } from 'react-redux';

import { format } from "timeago.js";
import { publicRequest, userRequest } from '../../requestMethods'


const Post = ({post}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    // const slide = [fiction, vid, health, culture]
    const slide=[...post.post]
    // const [like, setLike] = useState([])
    const [like, setLike] = useState(post.likes.includes(user._id))
    const [likes, setLikes] = useState(post.likes.length)
    const [creator, setCreator] = useState({})

    const move = useRef({})

    const arr = new Array(slide.length - 1).fill('white')
    let [newArr, setNewArr] = useState(['blue', ...arr])

    const moveDot = (direction) => {
        if(direction === "right" && newArr.indexOf('blue') + 1 < newArr.length){
            newArr.splice( newArr.indexOf('blue') + 1 , 0 , (newArr.splice(newArr.indexOf('blue'), 1)[0]))  
            setNewArr([...newArr])
        }
        else if (direction === "left"&& newArr.indexOf('blue') - 1 >= 0){
            newArr.splice( newArr.indexOf('blue') - 1 , 0 , (newArr.splice(newArr.indexOf('blue'), 1)[0]))  
            setNewArr([...newArr])
        }
      
    }
    const handleClick = (scrollOffset) => {
        move.current.scrollLeft += scrollOffset

        if (scrollOffset > 0) {
            moveDot("right")
        }
        else if (scrollOffset < 0){
            moveDot("left")
        }
   }
    const media = (e) => {
        let element = e.toString().split('')
        let index = e.toString().split('').length - 1
        if (element[index] === '4'){
            return(
                <div className='videoplayer'>
                    <ReactPlayer url={e} playing={true} light={true} controls={true} width={550} height={550}/>
                </div>
            )
        }
        else{
            return(
                <img 
                key={slide.indexOf(e)}
                src = {e}
                alt=''
                className='image'
                />
            )
        }
    }

    const handleDots = () => {
        let postDetails = {
            desc: post.desc,
            post: [...post.post],
            postId : post._id,
            userId: post.userId
        }

        // change state variable to true
        dispatch(show_postOptions(true))

        dispatch((send_postDetails(postDetails)))
    }

    useEffect(() => {
        const getUser = async () => {
           const res = await publicRequest.get(`/users?userId=${post.userId}`) 
        //    console.log(res.data)
           setCreator(res.data)

        }
        getUser()
    }, [post.userId])

    const likePost = async(option) => {
        const res = await userRequest.put(`/post/${post._id}/like`, {userId: user._id})
        // setLike(res.data.likes)
        if(option === "like"){
            setLike(true)
            setLikes(prevState => prevState + 1)
        }
        else if (option === "dislike"){
            setLike(false)
            setLikes(prevState => prevState - 1)
        }
        // console.log(res)
    }

    const postOptions = useSelector(state => state.post.postOptions)
    

  return (
      <>
        <div className="post_header">
            <img src= {UserImage} alt = '' className='post_image' />
            <p className='post_creator'>{creator?.username}</p>
            <div className='three_dots' onClick = {handleDots}>
                <BsThreeDots />
            </div>
            
        </div>
        <div className='postContainer' ref={move}>
            { newArr.indexOf('blue') > 0 ? (<div className='arrowLeft' onClick={() => handleClick(-555)}> <BsChevronLeft color='black'/> </div>) : null}

                {slide.map((e) => (
                    media(e)
                ))}

            {newArr.indexOf('blue') !== newArr.length - 1 ? (<div className='arrowRight' onClick={() => handleClick(555)}> <BsChevronRight color='black'/> </div>) : null}
        </div>
        <div className="post_bottom">
            <div className="post_react">
                <div className="post_react_buttons">

                    {like ? <BsSuitHeartFill size = {24} className = "heart" color = 'red' onClick={() => likePost('dislike')}/> : <BsSuitHeart className='heart' size={24} onClick = {() => likePost('like')}/>}

                    <IoChatbubbleOutline className='chat' size={24}/>
                    <HiOutlinePaperAirplane className='airplane' size={24}/>
                </div>
                <div className='bubble'>
                    {
                        newArr.map(e => (
                            <span className={`${e}`}></span>
                        ))
                    }
                </div>
            </div>
            <p className='likes'>{likes} likes</p>
            <p className='comment'> <span>{creator?.username}</span>{post?.desc}</p>
            <p className='other_comments'>View all 122 comments</p>
            <p className='date'>{format(post?.createdAt)}</p>
        </div>
        
        
        
      </>
    
  )
}

export default Post

/**
 * {like.includes(user._id) ? <BsSuitHeartFill size = {24} className = "heart" color = 'red' onClick={likePost}/> : <BsSuitHeart className='heart' size={24}/>}
 */