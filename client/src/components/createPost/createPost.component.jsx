import React, {useRef, useState} from 'react'
import Modal from 'react-modal'
import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux'
import { create_post, show_postModal } from '../../redux/postRedux'
import { customStyles1 } from './createPost.styles'
import './createPost.styles.css'
import {HiOutlinePhotograph} from 'react-icons/hi'
import  {BsPlayBtn} from 'react-icons/bs'

import {HiOutlineArrowLeft} from 'react-icons/hi'
import {BsChevronRight} from 'react-icons/bs'
import {BsChevronLeft} from 'react-icons/bs'
import {MdCancelPresentation}  from 'react-icons/md'

import fiction from '../../assets/fiction.jpg'
import vid from '../../assets/react.mp4'
import health from '../../assets/health.jpg'
import culture from '../../assets/culture.jpg'
import axios from 'axios'
import { makePost } from '../../redux/apiCalls'


import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";




const CreatePost = () => {
    const postModal = useSelector((state) => state.post.postModal)
    const user = useSelector((state) => state.user.currentUser)
    const post = useSelector(state => state.post.post)
    const dispatch = useDispatch()

    const [files, setFiles] = useState(null)
    
    // const [filesUrl, setFilesUrl] = useState([])
    // const [compFiles, setCompFiles] = useState([])
    // const [next, setNext] = useState(false)
    const [message, setMessage] = useState('')

    const [loading, setLoading] = useState(false)

    const closeModal = () => {
            dispatch(show_postModal(false))
            setFiles(null)
    }

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
                <div className='the_videoplayer'>
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
                className='the_image'
                />
            )
        }
    }

    const selectFiles = async (event) => {

        setLoading(true)

        const formData = new FormData()

        let Posts = []

        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            formData.append("file", file)
            formData.append("upload_preset", "hp6wiva2")
            formData.append("folder", `${user.username}`)

            await axios.post("https://api.cloudinary.com/v1_1/chineduserver/upload", formData).then((response) => {
                // setFilesUrl(prevState => ([...prevState, response.data.secure_url]))

                Posts.push(response.data.secure_url)

            }).catch((err) => (console.log(err)))
        }

        await makePost({userId: user._id, post: [...Posts], desc: message}).then(() => setLoading(false)).catch((err) => setLoading(false))
        closeModal()
        setFiles(null)
        setMessage(null)
    }

    //later, let the folder name be the name of the current user. that can be passed in from the redux store 
   const handleMessageChange = (e) => {
        //console.log(e.target.value)
        setMessage(e.target.value)
   }

   const override = css`
    display: block;
    margin: auto;
    `;

  return (
    <Modal
    isOpen = {postModal}
    contentLabel = 'Modal'
    onRequestClose={closeModal}
    style={customStyles1}
    >
        <div className='modal'>
            {/* <div className='modal_header'>Create new post </div>
            <div className='modal_header_next'><p>Next</p></div> */}

            <div className='modal_header_share'>
                <HiOutlineArrowLeft />
                <p>Create new post</p>
                {files !== null ? <button disabled = {loading} onClick={selectFiles} style={{cursor: 'pointer', outline:"none", border:"none", backgroundColor: "white", color: "teal"}}>Share</button> : <p></p>}
            </div>

   
            <div className='modal_body'>
                {loading ? < ClipLoader loading = {loading}  color = 'purple' size={60} css = {override}/> :
                    <>
                        <div className='modal_files'>
                        {  
                        (<div className='modal_files_intro'>
                                <div className='file_icons'>
                                    <HiOutlinePhotograph  className='photo_icon' size={70}/>
                                    <BsPlayBtn className='play_icon' size={70} />
                                </div>
                                <p>Drag photos and videos here</p>
                                
                                <label htmlFor='file' >
                                <div className='enter_file'>Select from computer</div> 
                                <input
                                    style={{display: "none"}}
                                    type="file"
                                    id="file"
                                    multiple
                                    accept='.png,.jpeg,.jpg,.mp4'
                                    onChange={(e) => {
                                        setFiles(e.target.files)
                                        // Side to the next container which is for the images
                                        // setNext(true)
                                        // console.log(files)
                                        // console.log(e.target.files)
                                    }}
                                    
                                />
                                </label>  
                            </div>)
                                
                            // (<div className="modal_files_outro">
                            // <div className='the_postContainer' ref={move2}>
                            //     <div className='the_arrowLeft' onClick={() => handleClick(-466)}> <BsChevronLeft color='black'/> </div>
                            //         {slide.map((e) => (
                            //             media(e)
                            //         ))}
                            //     <div className='the_arrowRight' onClick={() => handleClick(466)}> <BsChevronRight color='black'/> </div>
                            //      </div>
                            // </div>) 
                            }

                        </div>
                                    

                        <div className="modal_message">
                            <div className='modal_message_profile'>
                                <img 
                                src={fiction}
                                alt=""
                                className='modal_profile_pic'
                                />
                                <p>espn football</p> 
                            </div>
                            
                            {/* <div className='modal_message_caption'> */}
                                <input placeholder='Write a caption' type='text' className='modal_message_caption' onChange={handleMessageChange}/>
                            
                            {/* </div> */}
                        </div>
                    </>}
            </div>

            <div className="cancel_post_modal">
                <MdCancelPresentation size={26} color='white' onClick={ () => closeModal()}/>
            </div>
        </div>

    </Modal>
  )
}

export default CreatePost


/**onClick={ () => cancelModal()} */



/*let reader = new FileReader(file)
reader.readAsDataURL(file)
reader.onload = () => {
    setCompFiles(prevState => [...prevState, reader.result])
}
reader.onerror = error => {
    console.log("Error: ",  error)
}*/