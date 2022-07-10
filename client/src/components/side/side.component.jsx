import React, { useEffect, useState } from 'react'
import './side.styles.css'
import fiction from '../../assets/fiction.jpg'
import UserImage from '../../assets/user.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { publicRequest, userRequest } from '../../requestMethods'
import { getUsers } from '../../redux/apiCalls'
import { checkFollow } from '../../redux/userRedux'

const Side = () => {

    const user = useSelector((state) => state.user.currentUser)
    const followings = useSelector(state => state.user.followings)
    const [users, setUsers] = useState()
    const [follow, setFollow] = useState([])
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
    const getUsers = async () => {
        try{
            const res = await publicRequest.get(`/users/${user._id}`)
            // /console.log(res.data)
            setUsers(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    getUsers()
    }, [user])


    useEffect(() => {
        const getUser = async() => {
            try {
                const res = await publicRequest.get(`/users?userId=${user._id}&username=${user.username}`)
                // console.log(res.data)
                setFollow(res.data.followings)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [toggle])
    
    const followUser = async (id) => {
        
            try {
                const res = await userRequest.put(`/users/${id}/follow`, {userId: user._id})
                setFollow(res.data)
                // console.log(res.data)
                const conv = await publicRequest.post(`/conversations/`, {senderId: user._id, recieverId: id})
                console.log(conv.data)
            } catch (err) {
                console.log(err)
            }
            setToggle(!toggle)
        }

    const unfollowUser = async(id) => {
        
        try {
            //unfollow user
            const res = await userRequest.put(`/users/${id}/unfollow`, {userId: user._id})

            // get converstion of the user and friend
            const conv = await publicRequest.get(`/conversations/find/${id}/${user._id}`)
            // console.log(conv.data._id)

            //delete conversation with that friend
            const deleted = await publicRequest.delete(`/conversations/${conv.data._id}`)
            
        } catch (err) {
            console.log(err)
        }
        setToggle(!toggle)
    }
  return (
    <div className='side'>
            <div className='side_profile'>
                <img src={UserImage} alt='' className='side_profile_pic'/>
                <div className='side_names'>
                    <span className='side_username'>{user?.fullname}</span>
                    <span className='side_name'>{user?.username}</span>
                </div>
                <p className='side_switch'>Switch</p>
            </div>
            <div className='side_suggestions'>
                <span className='side_suggestions_text'>Suggestions for you</span>
                <span className='side_see_all'>See All</span>
            </div>

            {users?.map((user) => (
                <div className='side_other'>
                    <img src={UserImage} alt='' className='other_profile_pic'/>
                    <div className='other_names'>
                        <div className='other_username'>{user?.username}</div>
                        <div className='other_name'>followed by espn</div>
                    </div>
                    <div className='other_follow'>
                         { follow.includes(user._id) 
                            ?
                         (<div onClick={() => unfollowUser(user._id)}>Unfollow</div>)
                            : 
                         (<div onClick={() => followUser(user._id)}>Follow</div>)
                        }
                        {/* {follow ? <p>Follow</p> : <p>Unfollow</p>} */}
                    </div>
                </div>
            ))}
    </div>
  )
}

export default Side



// {
//     user?.followers.includes(user._id) 
//      ? 
//     (<div onClick={() => unfollowUser(user._id)}>Unfollow</div>)
//      :
//     (<div onClick={() => followUser(user._id)}>Follow</div>)
// }








 {/* <div className='side_other'>
            <img src={sports} alt='' className='other_profile_pic'/>
            <div className='other_names'>
                <div className='other_username'>espn football</div>
                <div className='other_name'>followed by espn</div>
            </div>
            <p className='other_follow'>Follow</p>
        </div>

        <div className='side_other'>
            <img src={sports} alt='' className='other_profile_pic'/>
            <div className='other_names'>
                <div className='other_username'>espn football</div>
                <div className='other_name'>followed by espn</div>
            </div>
            <p className='other_follow'>Follow</p>
        </div>

        <div className='side_other'>
            <img src={sports} alt='' className='other_profile_pic'/>
            <div className='other_names'>
                <div className='other_username'>espn football</div>
                <div className='other_name'>followed by espn</div>
            </div>
            <p className='other_follow'>Follow</p>
        </div>

        <div className='side_other'>
            <img src={sports} alt='' className='other_profile_pic'/>
            <div className='other_names'>
                <div className='other_username'>espn football</div>
                <div className='other_name'>followed by espn</div>
            </div>
            <p className='other_follow'>Follow</p>
        </div>

        <div className='side_other'>
            <img src={sports} alt='' className='other_profile_pic'/>
            <div className='other_names'>
                <div className='other_username'>espn football</div>
                <div className='other_name'>followed by espn</div>
            </div>
            <p className='other_follow'>Follow</p>
        </div> */}
