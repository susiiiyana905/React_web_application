import { Component } from "react";
import {Link} from 'react-router-dom';

class Footer extends Component{
    render(){
        var menu;
        if(localStorage.getItem('token')){
            menu=(
                <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="#">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="#">Help</Link>
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
}

export default Footer;