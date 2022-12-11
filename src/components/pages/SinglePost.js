import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePost = () =>{
    const [profile_pic, setProfilepic] = useState('');
    const [username, setUsername]=useState('');
    const [postData, setPostData] = useState([]);

    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const config = {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    }

    const {pid}= useParams();

    useEffect(()=>{
        axios.get("http://localhost:3000/profile", config)
        .then(result=>{
            // console.log(result.data.profile_pic)
            // console.log(result.data.username)
            setProfilepic(result.data.profile_pic)
            setUsername(result.data.username)
        })
        .catch(e=>{
            console.log(e)
        })
    },[]);

    useEffect(()=>{
        axios.get("http://localhost:3000/post/get/"+pid, config)
        .then(result=>{
            console.log(result.data)
            setPostData(result.data)
        })
        .catch(e=>{
            console.log(e)
        })
    },[]);


    const addComment=(e)=>{
        e.preventDefault();
        const commentData = {comment};
        axios.post("http://localhost:3000/comment/insert", commentData, config)
        // .then(result=>console.log(result.data))
        .then(result=>{
            if(result.data.success){
                setMessage("Comment Added!")
            }
            else{
                setMessage(e);
            }
        })
        .catch(e)
    }

    return(
        <>
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <label className="" style={{fontWeight:"500"}}>{message}</label>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8 border">
                                    <img src={"http://localhost:3000/post/"+postData.image} className="img" style={{width:"100%", height:"550px",objectFit:"cover"}}/>
                                </div>
                                <div className="card col-sm-4 border border-start-0">
                                    <div className="mt-3" style={{"font-weight":"500"}}>
                                <img src={"http://localhost:3000/profile/"+profile_pic} className="img rounded-circle" alt="..." style={{width:"50px", height:"50px", float:"left", "margin-right":"20px"}}/>
                                {username}
                                
                                <Link className="nav-link" style={{float:"right", color:"black"}} to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v mt-2 fa-md justify-content-center" ></i>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                               
                        
                                <li><Link className="dropdown-item" to={"/editpost/"+postData._id}>Edit Post</Link></li>
                                </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="mt-1" style={{height:"300px"}}>
                                <span style={{"font-weight":"500"}}>{username}</span>
                                <span style={{"margin-left":"10px"}}>{postData.caption}</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="">
                                    <p style={{"font-size":"12px","font-weight":"600"}}>{postData.likesnum} likes {postData.commentsNum} comments</p>
                                    <i className="btn bi bi-heart-fill me-2" style={{fontSize:"25px", color:"red"}}></i>
                                    <i className="btn bi bi-chat " style={{fontSize:"25px"}}></i>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="mt-1">
                                    <input type="textarea" placeholder="Write a comment..." style={{border:"none","border-color":"transparent", outline:"none", overflow:"none"}}
                                    value={comment}
                                    onChange={(e)=>setComment(e.target.value)}
                                    />
                                    <button type="button" onClick={addComment} style={{border:"none",background:"transparent", color:"blue", "font-weight":"500"}}>Post</button>
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

export default SinglePost;