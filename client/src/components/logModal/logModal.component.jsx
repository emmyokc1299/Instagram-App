import React from 'react'
import './logModal.styles.css'
import Modal from 'react-modal'
import {customStyles1} from './logModal.styles'
import { useDispatch, useSelector } from 'react-redux'
import { open_logOut, LogOut } from '../../redux/userRedux'
import { useNavigate } from 'react-router-dom'



const LogModal = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = useSelector(state => state.user.log_Modal)

    const closeModal = () => {
        dispatch(open_logOut(false))
    }

    const handleLogOut = () => {
        dispatch(LogOut())
        closeModal()
        navigate("/login")

    }

  return (
    <Modal
    isOpen = {logOut}
    contentLabel = 'Modal'
    onRequestClose={closeModal}
    style={customStyles1}
    >
        <div className='log_out'>
            <div className='not_logout'> Profile </div>
            <div className='not_logout'> Saved </div>
            <div className='not_logout'>Settings</div>
            <div className='not_logout'>Switch Accounts</div>
            <div className='logout' onClick={handleLogOut}>Log Out</div>

        </div>

    </Modal>
  )
}

export default LogModal