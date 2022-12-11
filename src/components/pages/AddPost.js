import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddPost =()=> {
    const [image, setimage]= useState('');
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState('');

    const config = {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    }

    const addPost=(e)=>{
        e.preventDefault();
        const postData = new FormData();
        postData.append('postimage', image)
        postData.append('caption',  caption);

        
        axios.post("http://localhost:3000/post/insert", postData, config)
        .then(result=>{
            if(result.data.success){
                setMessage("Post added successfully!!!");
                window.location.replace('/profile');
            }
            else{
                setMessage("Something is wrong!!!");
            }
        })
        .catch();
    }

    return(
        <>
        <div>
            <div className="container mt-5 mb-5" style={{width:"50rem"}}>
                <p>{message}</p>
                <div className="card" style={{height:"35rem"}}>
                    <div className="card-header text-center">
                        Add post
                    <button type="submit" className="btn btn-primary text-end" onClick={addPost} style={{float:"right"}}>Share</button>
                    </div>
                    <div className="card-body">
                        <form className="container">
                            <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="form-group text-center">
                                <i className="fas mt-5 fa-photo-video fa-5x"></i>
                                    <div><label className="" style={{"font-size":"30px"}} for="exampleFormControlFile1">Select Photos</label></div>
                                    <input className="mt-5 form-control-file" id="exampleFormControlFile1" type="file" 
                                    // multiple onChange={fileSelectedHandler}
                                    onChange={e=>setimage(e.target.files[0])}
                                    />
                                </div>
                                <div className="form-group ">
                                <input type="text" className="form-control mt-5" id="formGroupExampleInput" placeholder="Write a caption"
                                value={caption}
                                onChange={e=>{setCaption(e.target.value)}}
                                />
                                 </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddPost;