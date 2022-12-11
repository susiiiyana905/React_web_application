import { useEffect, useState } from "react";
import { NavLink} from 'react-router-dom';
import axios from "axios";

const Header = ()=> {
    

        const logout=()=>{
            localStorage.clear();
            window.location.replace('/');
        }

        var menu;
        if(localStorage.getItem('token')){
            menu=(
                <>
                 <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container text-center" style={{width:"60rem"}}>
                <NavLink style={({ isActive }) => isActive ? { color: '#291ee1'} : { color: 'black' }} className="navbar-brand fw-bold" to="#">Crime Alert</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <NavLink style={({ isActive }) => isActive ? { color: '#291ee1'} : { color: 'black' }} className="nav-link active" aria-current="page" to="/home"><i class="fas fa-home fa-lg"></i></NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink style={({ isActive }) => isActive ? { color: '#291ee1'} : { color: 'black' }} className="nav-link" aria-current="page" to="/addpost"><i class="far fa-plus-square fa-lg"></i></NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink style={({ isActive }) => isActive ? { color: '#291ee1'} : { color: 'black' }} className="nav-link" aria-current="page" to="/search">
                        <span class="material-icons">
                            search
                        </span>
                        </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="far fa-user fa-lg"></i>
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                            <li><NavLink className="dropdown-item" to="#">Settings</NavLink></li>
                            <div className="dropdown-divider"></div>
                            <li><NavLink className="dropdown-item" onClick={logout} to="#">Logout</NavLink></li>
                            </div>
                        </li>
                        
                       
  
                    </ul>
                </div>
                </div>
            </nav>
            
                </>
            )
        }
        else{
            menu=(
                <></>
            )
        }
        return(
            <>
            <div>
           
                    
                    {menu}
                
            </div>
            </>
        )
    }


export default Header;