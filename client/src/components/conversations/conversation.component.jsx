import React, {useEffect, useState } from 'react'
import UserImage from '../../assets/user.png'
import './conversation.styles.css'

import { publicRequest } from '../../requestMethods'


const Conversation = ({conversation, currentUser, onlineUsers}) => {

  const [user, setUser] = useState(null)
  const [online_users, setOnline_users] = useState(onlineUsers)
  const [online, setOnline] = useState(false) 

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    const getUser = async() => {
      try {
        const res = await publicRequest.get(`/users?userId=${friendId}`)
        // console.log(res.data)
        setUser(res.data)
    } catch (error) {
        console.log(error)
    }
    }

    const checkOnline = () => {
      const element = online_users?.find(el => el.userId === friendId)
      element && setOnline(true)
      !element && setOnline(false)
    }

    getUser()

    checkOnline()


  }, [currentUser, conversation, online_users ])

  console.log(onlineUsers)

  return (
    <div className='conversation'>
        <img src = {UserImage} className = 'user_image'/>
        <div className='friend_username'>{user?.username}</div>
        {online ? <div className='is_online'></div> : <div></div>}
    </div>
  )
}

export default Conversation