import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const Search=()=>{
    const [username, setUsername]=useState('');
    const [users, setUsers]=useState([]);

        const config = {
            headers :{
                Authorization : "Bearer " + localStorage.getItem('token')
            }
        }

        function searchUser (username){
            if(username.trim()===""){
                return
            }
            axios.post("http://localhost:3000/search/user", {username}, config)
            .then(result=>{
                console.log(result)
                setUsers(result.data)
            })
            .catch(e=>{
                console.log(e)
            })
        }
        

    return(
        <div>
            <div className="container">
                <div className="d-flex justify-content-center my-3">
                            <input className="form-control"  type="search" placeholder="Search user" aria-label="Search" style={{borderColor:"grey"}}
                           
                            onChange={(e)=>searchUser(e.target.value)}
                            />
                </div>
                <div className="d-flex flex-column">
                    {users.map((singleData)=>{
                        return(
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-start align-items-center my-2" key={singleData._id}>
                                    <img src={"http://localhost:3000/profile/"+singleData.profile_pic} className="me-3" style={{width:"150px", height:"150px", borderRadius:"50%"}} alt=""/>
                                    <label>{singleData.username}</label>
                                </div>
                                <NavLink to={"/otherprofile/"+singleData._id}>
                                    <button type="button" class="btn btn-primary mt-4" style={{width:'100%'}}>View Profile</button>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Search;