import React from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { show_postOptions, show_postEdit } from '../../redux/postRedux'
import {customStyles1} from './postModal.styles'
import './postModal.styles.css'

const PostModal = () => {


const dispatch = useDispatch()
const postOptions = useSelector(state => state.post.postOptions)
const postEdit = useSelector(state => state.post.postEdit)
// console.log(postEdit)

const closeModal = () => {
    dispatch(show_postOptions(false))
}

  return (
    <Modal
    isOpen = {postOptions}
    contentLabel = 'Modal'
    onRequestClose={closeModal}
    style={customStyles1}
    >
        <div className='postOptions'>
            <div className='postOption delete_post' >Delete</div>
            <div className='postOption' 
                    onClick={() => {
                          dispatch(show_postEdit(true))
                          closeModal()
                          }}>
                            Edit
                </div>
            <div className='postOption'>Hide like count</div>
            <div className='postOption'>Turn off commenting</div>
            <div className='postOption'>Go to post</div>
            <div className='postOption'>Share to...</div>
            <div className='postOption'>Copy Link</div>
            <div className='postOption'>Embed</div>
            <div className='postOption cancel_post_option' onClick={() => closeModal()}>Cancel</div>
        </div>
    </Modal>
  )
}

export default PostModal