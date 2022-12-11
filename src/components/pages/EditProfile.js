import { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () =>{
    const [profile_pic, setProfilepic] = useState('');
    const [username, setUsername]=useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [bio, setBio] = useState('');
    const [dob, setDoB] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [message, setMessage] = useState('');
    const [_id, setID] = useState('');

    const config = {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    }

    const profilepicupdate=(e)=>{
        e.preventDefault();
        const profilepic = new FormData();
        profilepic.append("myimage", profile_pic);
        axios.put("http://localhost:3000/profilepic", profilepic, config)
        .then(result=>console.log(result))
        .catch(e)
    }

    const editprofile=(e)=>{
        e.preventDefault();
        const profileData = {username, fname, lname, bio, dob, gender, email, phone_no};
        axios.put("http://localhost:3000/user/update", profileData, config)
        // .then(result=>console.log(result))
        .then(result=>{
            if(result.data.success){
                setMessage("Profile Edited Successfully!")
            }
            else{
                setMessage(e);
            }
        })
        .catch(e)
    }


    useEffect(()=>{
        axios.get("http://localhost:3000/profile", config)
        .then(result=>{
            console.log(result.data.profile_pic)
            console.log(result.data)
            setUsername(result.data.username)
            setFname(result.data.fname)
            setLname(result.data.lname)
            setBio(result.data.bio)
            setDoB(result.data.dob)
            setGender(result.data.gender)
            setEmail(result.data.email)
            setPhoneNo(result.data.phone_no)
            setProfilepic(result.data.profile_pic)
            setID(result.data._id)
        })
        .catch(e=>{
            console.log(e)
        })
    },[]);

    const deleteProfile=(id)=>{
        console.log(id)
        const data = {id}
        axios.delete("http://localhost:3000/user/delete", config, data)
        .then(result=>{
            console.log(result.data.success)
            if(result.data.success){
                setMessage("User Deleted!")
                localStorage.clear();
                window.location.replace('/');
            }
            else{
                setMessage();
            }
        })
        .catch(e=>{
            console.log(e)
        })
    }
    

    return(
        <>
        <div>
            <div className="container mt-5" style={{marginBottom:"50px"}}>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-6">
                    <img src={"http://localhost:3000/profile/"+profile_pic} className="img rounded-circle" alt="..." style={{width:"150px", height:"150px", float:"left", "margin-right":"50px"}}/>
                    <p style={{"font-size":"30px","margin-top":"20px"}}>{username}</p>
                    <div>
                        <button className="btn btn-outline-dark btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Change profile picture
                        </button>
                        <div className="modal fade text-center" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog  modal-dialog-centered">
                            <div className="modal-content d-flex justify-content-center">
                            <div className="modal-body">
                                <h5 className="modal-title text-center" id="exampleModalLabel">Change Profile Photo</h5>
                            </div>
                            <div  className="dropdown-divider"></div>
                            <div className="modal-body">
                                <input type="file" className="custom-file-input"
                                onChange={(e)=>setProfilepic(e.target.files[0])}
                                />
                            </div>
                            {/* <div  className="dropdown-divider"></div>
                            <div class="modal-body">
                                Remove Current Photo
                            </div> */}
                            <div  className="dropdown-divider"></div>
                            <div className="modal-body">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={profilepicupdate}>Update</button>
                            </div>
                            <div  className="dropdown-divider"></div>
                            <div className="modal-body">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-2"></div>
                    {/* {profiledata.map(singleData=>{
                        return(
                            <p>loop</p>
                        )
                    })} */}
                    <div className="col-md-6">
                    <div className="container editprofile" style={{"margin-left":"100px"}}>
                        <p className="text-center" style={{"font-weight":"bold"}}>{message}</p>
                        <form>
                        <div className="form-group editprofileform row">
                            <label htmlFor="inputuname" className="col-sm-3 col-form-label">Username</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control border-dark" id="inputuname"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group editprofileform row">
                            <label for="inputfname" className="col-sm-3 col-form-label">First Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control border-dark" id="inputfname"
                                value={fname}
                                onChange={(e)=>setFname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group editprofileform row">
                            <label for="inputlname" className="col-sm-3 col-form-label">Last Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control border-dark" id="inputlname"
                                value={lname}
                                onChange={(e)=>setLname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group editprofileform row">
                            <label for="inputbio" className="col-sm-3 col-form-label">Bio</label>
                            <div className="col-sm-9">
                                <textarea className="form-control border-dark" id="exampleFormControlTextarea1" rows="3"
                                value={bio}
                                onChange={(e)=>setBio(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="form-group editprofileform row">
                            <label for="inputdob" className="col-sm-3 col-form-label">DoB</label>
                            <div className="col-sm-9">
                                <input type="date" className="form-control border-dark" id="inputdob"
                                value={dob}
                                onChange={(e)=>setDoB(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group editprofileform row">
                            <label for="inputgender" className="col-sm-3 col-form-label">Gender</label>
                            <div className="col-sm-9">
                                <select className="custom-select custom-select-lg" style={{width:"100%"}}
                                value={gender}
                                onChange={(e)=>setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group editprofileform row">
                            <label for="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                            <input type="email" className="form-control border-dark" id="inputEmail3"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className="form-group editprofileform row">
                            <label for="inputphone" className="col-sm-3 col-form-label">Phone No.</label>
                            <div className="col-sm-9">
                            <input type="text" maxLength="10" className="form-control border-dark" id="inputphone"
                            value={phone_no}
                            onChange={(e)=>setPhoneNo(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className="form-group row" >
                            <div className="col-sm-3"></div>
                        <div className="col-sm-9">
                        <button type="submit" className="btn btn-primary mt-4" style={{width:'100%'}}
                        onClick={editprofile}
                        >Submit</button>
                        </div>
                        <div>
                        <button type="button" className="" style={{border:"none",background:"transparent", color:"red", "font-weight":"500", float:"right"}} data-bs-toggle="modal" data-bs-target="#deleteprofilemodal">
                                        Deactivate Account
                                        </button>

                                        <div className="modal fade" id="deleteprofilemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Deactivate Account</h5>
                                                <button type="button" className="close" style={{border:"none",background:"transparent", color:"blue", fontWeight:"500", fontSize:"30px", float:"right"}} data-bs-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Do you really want to deactivate this account?
                                            </div>
                                            <div className="modal-body">
                                                <button type="button" onClick={()=>{deleteProfile(_id)}} style={{border:"none",background:"transparent", color:"red", "font-weight":"500", float:"right"}}>Delete</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                            {/* <button type="button" onClick={()=>{deleteProfile(_id)}} className="btn btn-link mt-3" style={{color:"red", float:"right"}}>Deactivate Profile</button> */}
                        </div>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </>
    )
}

export default EditProfile;