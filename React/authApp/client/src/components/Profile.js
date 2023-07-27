 import { GoPersonFill } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../store";
import { useEffect } from "react";


const Profile = ()=>{

  const {userInfo, userToken }= useSelector(state=>state.auth);
  const navigate = useNavigate();
  const [logoutUser, logoutResults] = useLogoutUserMutation();
  const handleEditClick = ()=>{
    navigate('/signup')
  }

  const handleLogout  = ()=>{
    console.log("clicked")
    logoutUser(userInfo);

  }
  console.log(userToken, !userToken, userInfo)
  useEffect(()=>{
    if(!userToken || logoutResults.isSuccess){
      navigate('/login');
    }
  },[navigate,logoutResults])
  // console.log(userInfo)
    return(
      <div className="columns is-vcentered">
      <div className="column is-one-quarter"></div>
      <div className="column is-half is-primary">
        <div className="message is-info">
 
  <div className="message-header">
    <div className="media">
      <div className="media-left">
      <IconContext.Provider value={{ className: "icon is-large has-text-success" }}>

        <GoPersonFill />
       </IconContext.Provider>
      </div>
      <div className="media-content">
        <p className="title is-4">{userInfo.name}</p>
        <p className="subtitle is-6">{userInfo.username}</p>
      </div>
    </div>
    <div className="is-primary" style={{display: 'inline-block'}}  onClick={handleLogout}> Log Out</div>

   
  </div>
  <div className="message-body">
  <div className="content">
  <div>Email: {userInfo.email}</div>
     <div>Mobile No: {userInfo.mobile}</div>
     <div>Address: {userInfo.address}</div>
     
    </div>
  </div>
  <footer className="card-footer">
  
    <a  className="card-footer-item" onClick={handleEditClick}>Edit</a>
  
  </footer>
</div>
</div>
<div className="column is-one-quarter"></div>
</div>
    )
}

export default Profile;