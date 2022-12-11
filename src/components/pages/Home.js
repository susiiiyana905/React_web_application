import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () =>{
    const [postData, setPostData] = useState([]);
    const [comment, setComment] = useState('');
    const [targetpost, setTargetpost]= useState('');

    const config = {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:3000/followeduser/get/post", config)
        .then(result=>{
            console.log(result.data)
            setPostData(result.data)
        })
    },[])

    function like(post_id){
        axios.post("http://localhost:3000/like/post",{post_id}, config)
        .then((result)=>{
            console.log(result.data)
            axios.get("http://localhost:3000/followeduser/get/post", config)
            .then(result=>{
                setPostData(result.data)
            })
        })
    }

    function unlike(post_id){
        axios.delete("http://localhost:3000/unlike/post/"+post_id, config)
        .then(()=>{
            axios.get("http://localhost:3000/followeduser/get/post", config)
            .then(result=>{
                setPostData(result.data)
            })
        })
    }

    function commenting(post_id, comment){
        setTargetpost(post_id)
        setComment(comment)
    }

    function postcomment(post_id){
        if(comment.trim()==="" || targetpost!==post_id){
            return
        }
        axios.post("http://localhost:3000/comment/insert",{post_id, comment}, config)
        .then(()=>{
            axios.get("http://localhost:3000/followeduser/get/post", config)
            .then(result=>{
                setComment("")
                setTargetpost("")
                setPostData(result.data)
            })
        })
    }

    function deleteComment(post_id){
        axios.delete("http://localhost:3000/comment/delete/"+post_id, config)
        .then(()=>{
            axios.get("http://localhost:3000/followeduser/get/post", config)
            .then(result=>{
                setPostData(result.data)
            })
        })
    }

    return(
        <>
        <div>
        <div className="container mt-5" style={{width:"50rem"}}>
            {postData.map((singleData)=>{
                return(
                    <div class="card" style={{marginBottom:"25px"}} key={singleData._id}>
            <div className="card-header">
                <NavLink to={"/otherprofile/"+singleData.post.user_id._id} style={{float:"left"}}>
                <img src={"http://localhost:3000/profile/"+singleData.post.user_id.profile_pic} className="img rounded-circle" alt="..." style={{width:"45px", height:"45px", float:"left", marginRight:"20px"}}/>
                <p style={{float:"right", color:"black", marginTop:"13px", fontWeight:"500"}}>{singleData.post.user_id.username}</p>
                </NavLink>
                <Link className="nav-link" style={{float:"right", color:"black"}} to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-ellipsis-v mt-2 fa-md justify-content-center" ></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="#">Settings</Link></li>
                    <div className="dropdown-divider"></div>
                    <li><Link className="dropdown-item"  to="#">Logout</Link></li>
                </div>
            </div>
            <div className="card-body">
                <img src={"http://localhost:3000/post/"+singleData.post.image} style={{width:"100%"}}/>
                <span className="card-text" style={{fontWeight:"500", marginRight:"10px"}}>{singleData.post.user_id.username}</span>
                <span>{singleData.post.caption}</span>
                <div className="d-flex align-items-center">
                    {
                        singleData.liked.check
                        ?
                        <i className="btn bi bi-heart-fill me-2" onClick={()=>{unlike(singleData.post._id)}} style={{color:"red", fontSize:"30px", padding:"0px"}}></i>
                        :
                        <i className="btn bi bi-heart-fill me-2" onClick={()=>{like(singleData.post._id)}} style={{fontSize:"30px", padding:"0px"}}></i>
                    }
                    <label className="me-2">{singleData.liked.likenum}, </label>
                    <i class="bi bi-chat me-2" style={{fontSize:"30px", padding:"0px"}}></i>
                    <label>{singleData.commented.commentnum}</label>
                </div>
                {
                    singleData.commented.check
                    ?
                    <div className="d-flex align-items-center">
                        <label className="me-3">{singleData.commented.data}</label>
                        <i className="bi bi-trash" style={{color:"red"}} onClick={()=>{deleteComment(singleData.post._id)}}></i>
                    </div>
                    :
                    <div className="d-flex align-items-center">
                        <form>
                            <textarea type="text" placeholder="Write a comment..." onChange={(e)=>{commenting(singleData.post._id, e.target.value)}} style={{width:"650px", border:"none","border-color":"transparent", outline:"none"}}/>
                            <button type="button" className="btn" onClick={()=>{postcomment(singleData.post._id)}} style={{border:"none", color:"white", backgroundColor:"#291ee1", "font-weight":"500"}}>Post</button>
                        </form>
                    </div>
                        
                }   
                
            </div>
            
        </div>
                )
            })}
        </div>
        </div>
        </>
    )
}

export default Home;