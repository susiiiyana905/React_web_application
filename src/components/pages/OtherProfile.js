import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OtherProfile = () =>{
    const [profile_pic, setProfilepic]= useState('');
    const [username, setUsername]= useState('');
    const [postData, setPostData] = useState([]);

    const [followed, setFollowed] = useState(false);
    const [follower, setFollower] =useState('');
    const [following, setFollowing] = useState('');


    const config = {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    }

    const {_id}= useParams();

    useEffect(()=>{
        axios.all([
            axios.get("http://localhost:3000/otheruser/profile/"+_id, config),
            axios.get("http://localhost:3000/otheruser/post/"+_id, config),
            axios.post("http://localhost:3000/follow/check",{user_id:_id}, config),
            axios.post("http://localhost:3000/followfollower/num/other",{user_id:_id}, config)
        ])
        .then(axios.spread((...responses)=>{
            setUsername(responses[0].data.username)
            setProfilepic(responses[0].data.profile_pic)
            setPostData(responses[1].data)
            setFollowed(responses[2].data.msg)
            setFollower(responses[3].data.follower)
            setFollowing(responses[3].data.following)
        }))
    },[])


    function followUser(){
        axios.post("http://localhost:3000/follow/user",{user_id:_id}, config)
        .then(()=>{
            
            setFollowed(true)
        })
    }

    function unfollowUser(){
        axios.delete("http://localhost:3000/unfollow/user/"+_id, config)
        .then(()=>{
            setFollowed(false)
        })
    }

    return(
        <>
        <div>
        
            <div className="container mt-5">
            <div className="card border-0">
            <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <img src={"http://localhost:3000/profile/"+profile_pic} className="img rounded-circle" alt="..." style={{width:"150px", height:"150px", float:"left",objectFit:"cover", "marginRight":"100px"}}/>
                    <div className="">
                        <p style={{"fontSize":"35px"}}>{username}</p>
                        <div>
                            <p style={{float:"left", "marginRight":"50px"}}>{following} following</p>
                            <p>{follower} followers</p>
                        </div>
                        <div>
                            {
                                followed
                                ?
                                <button className="btn btn-primary mt-3" onClick={()=>{unfollowUser()}} type="">Unfollow</button>
                                :
                                <button className="btn btn-primary mt-3" onClick={()=>{followUser()}} type="button">Follow</button>
                            }
                            
                        </div>
                        <div className="dropdown-divider mt-5"></div>
                        <p className="text-center text-uppercase" style={{"fontSize":"20px", "textDecoration":"underline"}}><i className="fa-solid fa-grid"></i>posts</p>
                    </div>
                    </div>
            </div>
            

            
                    <div  className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                        
                                        <div className="container">
                                        <div className="row">
                                        {postData.map((singleData)=>{
                                            return(
                                                <div className="col-md-4" style={{marginBottom:"25px"}} key={singleData._id}>
                                                <img src={"http://localhost:3000/post/"+singleData.image} className="img-fluid" style={{width:"100%", height:"200px", objectFit:"cover"}} alt="..."/>
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
        </>
    )
}

export default OtherProfile;