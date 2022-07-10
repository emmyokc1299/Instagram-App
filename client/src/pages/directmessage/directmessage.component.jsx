import React, { useState, useEffect, useRef } from 'react'
import './directmessage.styles.css'
import {BiMessageAltEdit} from 'react-icons/bi'
import UserImage from '../../assets/user.png'
import airplane from '../../assets/airplane.png' 
import Conversation from '../../components/conversations/conversation.component'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { publicRequest } from '../../requestMethods'

import {io} from "socket.io-client"

const DirectMessage = () => {
    const user = useSelector(state =>  state.user.currentUser)
    const [showSend, setshowSend] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [conversations, setConversations] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [messages, setMessages] = useState([])
    const scrollRef = useRef()
    // const [socket, setSocket] = useState(null)
    const socket = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        
        //////////This was used for debugging
        socket.current.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
            console.log(err)
          });
        //////////

        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users)
        })
        
        
        
    }, [user]);

    useEffect(() => {
        !user && socket?.current.emit("disconnect")
        socket.current.on("getUsers", users => {
            setOnlineUsers(users)
        })
    })

    
    const changeHandler = (event) => {
        setNewMessage(event.target.value)
        event.target.value && setshowSend(true)
        !event.target.value && setshowSend(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const recieverId = currentChat?.members.find(member => member !== user._id )
        //console.log(recieverId)

        socket.current?.emit("sendMessage", {
        senderId: user._id,
        recieverId,
        text: newMessage,
        })

        try {
            const res = await publicRequest.post(`/messages`, message)
            setMessages([...messages, res.data])
        } catch (error) {
            console.log(error)
        }

        setNewMessage('')
    }

    /// Get conversations
    useEffect(() => {
        const getConversations = async () => {
        try {
            const res = await publicRequest.get("/conversations/" + user._id);
            setConversations(res.data)
            // console.log(res.data) 
        } catch (err) {
            console.log(err)
        }
        }
        getConversations()
    }, [user._id])

    useEffect(() => {
        const getMessages = async() => {
            try{
                const res = await publicRequest.get(`/messages/${currentChat?._id}`)
                setMessages(res.data)
                // console.log(res.data)
            }
            catch(err) {
                console.log(err)
            }
        }
        getMessages()
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

  return (
    <div className='DM'>
        <div className="conversations">
            <div className='convo_header'>
                <div>{user?.username}</div>
                <BiMessageAltEdit className='note' size={24}/>
            </div>
            <div className="friends">
                {conversations?.map((c) => (
                    <div onClick={() => setCurrentChat(c)}>
                        <Conversation conversation={c} currentUser = {user} onlineUsers = {onlineUsers}/>
                    </div>
                ))}
                
            </div>
        </div>
        <div className="messages">
            {
                currentChat 
                ? 
                (
                    <div className="messages_end">
                        <div className="messages_header">
                            <img src = {UserImage} className = 'friend_image'/>
                            <div className='friend_name'>espn football</div>
                        </div>
                        <div className="messages_body">
                            {messages?.map((m) => (
                                <div className='messageRef' ref={scrollRef}>
                                    <Message message={m} own={m.sender === user._id} />
                                </div>
                                
                            ))}
                            
                        </div>
                        <div className="messages_bottom">
                            <div className='type_message' >
                                <input name="message" placeholder='Message...' className='message_textarea' onChange={changeHandler} value = {newMessage} />
                                {showSend ? <button className='send_message' onClick={handleSubmit}> Send </button> : null}
                            </div>
                        </div>
                    </div>
                )
                 :
                (
                    <div className="messages_start">
                        <div className="airplane_circle">
                            <img src={airplane} alt='' className='big_airplane'/>
                        </div>
                
                        <div className="your_messages">
                            Your Messages
                        </div>
                        <div>Send private photos and messages to a friend or a group.</div>
                        <div className="send_message">
                            Send Message
                        </div>
                    </div>
                )
            }
                


            
            {/*  */}
        </div>
    </div>
  )
}

const Message = ({message, own}) => {
    return(
        <div className={own ? `sent` : `recieved`}>
            {message.text}
        </div>
    )
}

export default DirectMessage



/**
 * Something i discovered is that instead of adding data to the database and delibrately refreshing the application so that the changes can be relflected, a performance enhancing and quicker method is to add it to a state that stores that data gotten from a database from a useEffect or fuinction call then letting the chnages reflect from the app state. Similar to what is done here in the add message useEffect and also what i did in the like/dislike and follow/unfollow functionalities in other components in this application */


 /**
  * Read up on useRef to understand use cases other than DOM manipulation
  * e.g const socket = useRef() 
  */