import React from 'react'
import './App.css';
import Header from './components/header/header.component';
import Main from './components/main/main.component';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux'
import Login from './pages/login/login.component';
import SignUp from './pages/signup/signup.component';
// import CreatePost from './components/createPost/createPost.component';
// import PostModal from './components/postModal/postModal.component';
// import PostEdit from './components/postEdit/postEdit.component';
import DirectMessage from './pages/directmessage/directmessage.component';

function App() {
  const user = useSelector((state) => state.user.currentUser)
  //console.log(user)
  return (
    <div className='app'> 

      {user && <Header />}
      <Routes>
        <Route path="/"  element = {<Main />} />
        <Route path='login'  element = {user ? (<Navigate replace to = "/" />) : <Login />} />
        <Route path='signup' element = {user ? (<Navigate replace to = "/" />) : <SignUp />} />
        <Route path='message'  element = {!user ? (<Navigate replace to = "/login" />) : <DirectMessage />} />      
      </Routes>
    </div>
  );
}

export default App;


/**
 * When creating the signOut functionality, make sure to set the currentUser in the redux store to null delete the persisted data from local storage
 */