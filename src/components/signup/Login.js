import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const userLogin = (e)=>{
        e.preventDefault();
        const userData = {
            username, password
        }
        axios.post("http://localhost:3000/user/login", userData)
        .then(result1=>{
            if(result1.data.token){
                //login success
                localStorage.setItem('token', result1.data.token)
                console.log(result1.data);
                window.location.replace('/home');
            }
            else{
                //login failed
                setMessage("Invalid Credentials")
            }
        })
        .catch(e)
    }
        return(
            <>
            <div>
            <div className="container">
            <div className="card border-0">
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
                        <div class="form-group form-check mt-2">
                            <input type="checkbox" class="form-check-input" id="rememberme"/>
                            <label class="form-check-label" for="rememberme">Remember Me</label>
                        </div>
                        <button type="submit" class="btn btn-primary mt-4" style={{width:'365px'}}
                        onClick={userLogin}
                        >Log In</button>
                    </form>
                </div>
            </div>
            <div className="card mt-4" style={{width:"25rem"}}>
                <div className="card-body">
                    <div className="text-center">Don't have an account? <Link className="link" to="/register">SignUp</Link></div>
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

export default Login;