import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const userRegister = (e) =>{
        e.preventDefault(); //prevents default method
        const userData = {username, password};
        axios.post("http://localhost:3000/user/register", userData)
        .then(result=>{
            if(result.data.success){
                setMessage("Registered success")
                window.location.replace('/');
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
            <div className="container">
            <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                {message}
            <div className="card mt-5" style={{width:"25rem"}}>
                <div className="card-body">
                <img src="images/crimealert logo.PNG" class="card-img-top rounded" alt="..."/>
                    <form>
                        <div className="form-group mt-4">
                            <label for="inputusername">Username</label>
                            <input type="text" class="form-control" id="inputusername" aria-describedby="username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            />
                        </div>
                        <div class="form-group mt-3">
                            <label for="inputpassword">Password</label>
                            <input type="password" class="form-control" id="inputpassword"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div class="form-group mt-3">
                            <label for="confirmpassword">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmpassword"/>
                        </div>
                        <button type="submit" class="btn btn-primary mt-4" style={{width:'365px'}}
                        onClick={userRegister}
                        >Register</button>
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

export default Register;