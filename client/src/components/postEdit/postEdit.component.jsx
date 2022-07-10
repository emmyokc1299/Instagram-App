import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { show_postEdit } from '../../redux/postRedux'
import Modal from 'react-modal'
import { customStyles1 } from './postEdit.styles'
import './postEdit.styles.css'

import ReactPlayer from 'react-player'
import fiction from '../../assets/fiction.jpg'
import vid from '../../assets/react.mp4'
import health from '../../assets/health.jpg'
import culture from '../../assets/culture.jpg'

import {BsChevronRight} from 'react-icons/bs'
import {BsChevronLeft} from 'react-icons/bs'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { userRequest } from '../../requestMethods'

const PostEdit = () => {

    const dispatch = useDispatch()
    const postEdit = useSelector(state => state.post.postEdit)
    const postDetails = useSelector(state => state.post.postDetails)
    const [message, setMessage] = useState(postDetails?.desc)
    const [loading, setLoading] = useState(false)
    

    /**
     * To solve the problem of message not automatically setting to postDetails?.desc when the edit modal is open, implement that seting in a useEffect
     */

    

    const slide = postDetails.post
    const move2 = useRef({})
    const handleClick = (scrollOffset) => {
        move2.current.scrollLeft += scrollOffset
    }

    const media = (e) => {
        let element = e.toString().split('')
        let index = e.toString().split('').length - 1
        if (element[index] === '4'){
            return(
                <div className='edit_videoplayer'>
                    <ReactPlayer url={e} playing={true} light={true} controls={true} />
                </div>
            )
        }
        else{
            return(
                <img 
                key={slide.indexOf(e)}
                src={e}
                alt=''
                className='edit_image'
                />
            )
        }
    }

    const closeModal = () => {
        dispatch(show_postEdit(false))
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const override = css`
    display: block;
    margin-left: 28%;
    margin-top: 80px; 
    `;

    const handleEdit = async () => {
        setLoading(true)
        const res = await userRequest.put(`/post/${postDetails.postId}`, {userId: postDetails.userId, desc: message})
        console.log(res)
        setLoading(false)
        closeModal()
        setMessage('')

    } 

  return (
    <Modal
    isOpen = {postEdit}
    contentLabel = 'Modal'
    onRequestClose={closeModal}
    style={customStyles1}
    >
        <div className="postEdit">
            <div className="postEdit_header">
                <div className = "postEdit_cancel" onClick={() => closeModal()}>Cancel</div>
                <div className = "postEdit_editInfo">Edit Info</div>
                <div className = "postEdit_done" onClick={handleEdit}>Done</div>

            </div>
            <div className="postEdit_body">

                {/* {loading ? <ClipLoader loading = {loading}  color = '#CC99CC' size={70} css = {override}/> : */}
                <div className="postEdit_files" ref={move2}>
                    <div></div>
                    <div className='edit_arrowLeft' onClick={() => handleClick(-470)}> <BsChevronLeft color='black'/> </div>
                        {slide?.map((e) => (
                                media(e)
                            ))}
                    <div className='edit_arrowRight' onClick={() => handleClick(470)}> <BsChevronRight color='black'/> </div>
                </div>
                {/* } */}

                <div className="postEdit_message">
                    <div className='postEdit_message_profile'>
                            <img 
                            src={fiction}
                            alt=""
                            className='postEdit_profile_pic'
                            />
                            <p>espn football</p> 
                    </div>
                        
                      
                    <input  
                    className='postEdit_message_caption' onChange={handleMessageChange}
                    placeholder = {message}
                    value= {message}
                    onFocus = {() => setMessage(postDetails?.desc)}
                    />
                </div>
            </div>

                
            
        </div>

    </Modal>
  )
}

export default PostEdit






/** 
 * import React, {useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { show_postEdit } from '../../redux/postRedux'
import Modal from 'react-modal'
import { customStyles1 } from './postEdit.styles'
import './postEdit.styles.css'

import ReactPlayer from 'react-player'
import fiction from '../../assets/fiction.jpg'
import vid from '../../assets/react.mp4'
import health from '../../assets/health.jpg'
import culture from '../../assets/culture.jpg'

import {BsChevronRight} from 'react-icons/bs'
import {BsChevronLeft} from 'react-icons/bs'

const PostEdit = () => {

    const dispatch = useDispatch()
    const postEdit = useSelector(state => state.post.postEdit)
    const [message, setMessage] = useState('jhgfcjhg')

    const slide = [fiction, vid, health, culture]
    const move2 = useRef({})
    const handleClick = (scrollOffset) => {
        move2.current.scrollLeft += scrollOffset
    }

    const media = (e) => {
        let element = e.toString().split('')
        let index = e.toString().split('').length - 1
        if (element[index] === '4'){
            return(
                <div className='edit_videoplayer'>
                    <ReactPlayer url={e} playing={true} light={true} controls={true} />
                </div>
            )
        }
        else{
            return(
                <img 
                key={slide.indexOf(e)}
                src={e}
                alt=''
                className='edit_image'
                />
            )
        }
    }

    const closeModal = () => {
        dispatch(show_postEdit(false))
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

  return (
    <Modal
    isOpen = {postEdit}
    contentLabel = 'Modal'
    onRequestClose={closeModal}
    style={customStyles1}
    >
        <div className="postEdit">
            <div className="postEdit_header">
                <div className = "postEdit_cancel" onClick={() => closeModal()}>Cancel</div>
                <div className = "postEdit_editInfo">Edit Info</div>
                <div className = "postEdit_done">Done</div>

            </div>
            <div className="postEdit_body">
                <div className="postEdit_files" ref={move2}>
                    <div className='edit_arrowLeft' onClick={() => handleClick(-470)}> <BsChevronLeft color='black'/> </div>
                        {slide.map((e) => (
                                media(e)
                            ))}
                    <div className='edit_arrowRight' onClick={() => handleClick(470)}> <BsChevronRight color='black'/> </div>
                </div>

                <div className="postEdit_message">
                    <div className='postEdit_message_profile'>
                            <img 
                            src={fiction}
                            alt=""
                            className='postEdit_profile_pic'
                            />
                            <p>espn football</p> 
                    </div>
                        
                      
                    <input  
                    className='postEdit_message_caption' onChange={handleMessageChange}
                    value= {message}
                    />
                </div>
            </div>

                
            
        </div>

    </Modal>
  )
}

export default PostEdit
*/