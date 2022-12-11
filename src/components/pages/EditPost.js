import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditPost = () =>{
    const [profile_pic, setProfilepic] = useState('');
    const [username, setUsername]=useState('');
    const [postData, setPostData] = useState('');
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState('');

    const config = {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    }


    const {pid}= useParams();
    useEffect(()=>{
        axios.get("http://localhost:3000/post/get/"+pid, config)
        .then(result=>{
            console.log(result.data)
            setPostData(result.data)
            setCaption(result.data.caption)
        })
        .catch(e=>{
            console.log(e)
        })
    },[])

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

    const editPost=(e)=>{
        e.preventDefault();
        const editedData={caption};
        axios.put("http://localhost:3000/post/update/"+pid, editedData, config)
        .then(result=>
           { console.log(result.data)
            if(result.data.success){
                setMessage("Post Updated")
                window.location.replace('/home')
            }}
        )
        .catch(e)
    }

    const deletePost=()=>{
        axios.delete("http://localhost:3000/post/delete/"+pid, config)
        .then(result=>{
            console.log(result)
            if(result.data.success){
                setMessage("Post Deleted!")
                window.location.replace('/profile');
            }
            else{
                setMessage();
            }
        })
    }

    return(
        <>
        <div>
                    {/* <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <img src={"http://localhost:3000/profile/"+profile_pic} class="img rounded-circle" alt="..." style={{width:"150px", height:"150px", float:"left", "margin-right":"50px", marginLeft:"50px"}}/>
                            <p style={{"font-size":"30px","margin-top":"20px"}}>{username}</p>
                        </div>
                    </div> */}
                    <div className="container my-4">
                        <div className="row">
                            {/* <div className="col-md-4"></div> */}
                            <div className="col d-flex justify-content-center">
                               {message}
                                <div className="card" style={{width:"700px", height:"630px"}}>
                                
                                    <div className="card-header">
                                        <label style={{fontWeight:"500", fontSize:"20px"}}>Edit Post</label>
                                     
                                        <button type="button" className="" style={{border:"none",background:"transparent", color:"blue", "font-weight":"500", float:"right"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Delete
                                        </button>

                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" className="close" style={{border:"none",background:"transparent", color:"blue", fontWeight:"500", fontSize:"30px", float:"right"}} data-bs-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Do you really want to delete this post?
                                            </div>
                                            <div className="modal-body">
                                                <button type="button" onClick={deletePost} style={{border:"none",background:"transparent", color:"red", "font-weight":"500", float:"right"}}>Delete</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* <button type="button" onClick={deletePost} style={{border:"none",background:"transparent", color:"blue", "font-weight":"500", float:"right"}}>Delete</button> */}
                                    </div>
                                    <div className="card-body">
                                    <img src={"http://localhost:3000/post/"+postData.image} className="img-fluid rounded" alt="..." style={{width:"100%", height:"400px", marginBottom:"15px"}}></img>
                                        <img src={"http://localhost:3000/profile/"+profile_pic} className="img rounded-circle" alt="..." style={{width:"50px", height:"50px", float:"left", "margin-right":"20px"}}/>
                                        <label style={{fontWeight:"500"}} className="mt-2">{username}</label>
                                        <span>
                                            <input type="textarea" className="mt-2" placeholder="" style={{border:"none","border-color":"transparent", outline:"none", width:"100%"}}
                                            value={caption}
                                            onChange={(e)=>setCaption(e.target.value)}
                                            /> 
                                        </span>
                                        <button type="button" onClick={editPost} className="btn btn-primary mt-3" style={{float:"right"}}>Confirm Post</button>
                                    </div>
                                
                                                      
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default EditPost;