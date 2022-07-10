import React, {useEffect, useState} from 'react'
import CreatePost from '../createPost/createPost.component'
import Post from '../post/post.component'
import Side from '../side/side.component'
import Status from '../status/status.component'
import PostModal from '../postModal/postModal.component'
import './main.styles.css'
import PostEdit from '../postEdit/postEdit.component'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userRequest } from '../../requestMethods'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import LogModal from '../logModal/logModal.component'

const Main = () => {

  const user = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const postEdit = useSelector(state => state.post.postEdit)
  const postModal = useSelector((state) => state.post.postModal)

  useEffect(() => {
    !user && navigate("/login")
  }, [user]) 
  
  useEffect(() => {
    console.log("lets goooooooo")
    const getAllPosts = async() => {
      setLoading(true)
      const res = await userRequest.get(`/post/timeline/${user._id}`)
      console.log(res.data)
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
      setLoading(false)
    }
    getAllPosts()
  }, [user, postEdit, postModal])

  const override = css`
    display: block;
    margin-left: 28%;
    margin-top: 80px; 
    `;

  return (
    <div className='main'>
      <>
          <Status /> 
          {loading ? <ClipLoader loading = {loading}  color = '#CC99CC' size={70} css = {override}/> : posts?.map((post) => <Post post = {post} key = {post._id}/>)}
          <Side />
          <CreatePost />
          <PostModal />
          <PostEdit />
          <LogModal />
      </>
        
    </div>
  )
}

export default Main

/**
 * The reverse fxn in the post rendering is used to make sure that the most recent post appears first at the top and the first post appears last at the bottom
 */
/**
 * A better way to render the post component is to put it in another component called Posts.component and the render each posts there. That way if a post is edited only the Posts.component will be refresh instead of how it is done currently ie. by refreshing the whole Main component 
 */