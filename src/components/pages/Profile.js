import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const Profile = () =>{
    const [profile_pic, setProfilepic] = useState('');
    const [username, setUsername]=useState('');
    const [postData, setPostData] = useState([]);
    const [follower, setFollower] = useState('');
    const [following, setFollowing] = useState('');

    const editProfile=(e)=>{
        e.preventDefault();
        window.location.replace('/editprofile');
    }

    const config = {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:3000/getall/post", config)
        .then(result=>{
            setPostData(result.data)
        })
        
        axios.get("http://localhost:3000/followfollower/num", config)
        .then(result=>{
            setFollower(result.data.follower)
            setFollowing(result.data.following)
        })
   
        axios.get("http://localhost:3000/profile", config)
        .then(result=>{
            console.log(result.data.profile_pic)
            setProfilepic(result.data.profile_pic)
            setUsername(result.data.username)
        })
        .catch(e=>{
            console.log(e)
        })
    },[]);
    

    return(
        <>
        <div>
            <div className="container mt-5">
                <div className="card border-0">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <img src={"http://localhost:3000/profile/"+profile_pic} class="img rounded-circle" alt="..." style={{width:"150px", height:"150px", float:"left", "margin-right":"100px"}}/>
                    <div className="">
                        <p style={{"font-size":"35px"}}>{username}</p>
                        <div>
                            <p style={{float:"left", "margin-right":"50px"}}>{following} following</p>
                            <p>{follower} followers</p>
                        </div>
                        <div>
                            <button className="btn btn-outline-dark mt-3" type="" onClick={editProfile}>Edit profile</button>
                        </div>
                        <div className="dropdown-divider mt-5"></div>
                        <p className="text-center text-uppercase" style={{"font-size":"20px", "text-decoration":"underline"}}><i class="fa-solid fa-grid"></i>posts</p>
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div  className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                        <div class="container">
                            <div class="row">
                    {postData.map((singleData)=>{
                            return(
                                
                                
                                <div class="col-md-4" style={{marginBottom:"25px"}} key={singleData._id}>
                                    <NavLink to={"/singlepost/"+singleData._id}>
                                <img src={"http://localhost:3000/post/"+singleData.image} class="img-fluid" style={{width:"100%", height:"200px", objectFit:"cover"}} alt="..."/>
                                </NavLink>
                                </div>
                                
                            
                        
                            )
                        })}
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;