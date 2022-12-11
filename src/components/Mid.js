import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/signup/Login";
import Register from "../components/signup/Register";
import Home from "../components/pages/Home";
import AddPost from "./pages/AddPost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import SinglePost from "./pages/SinglePost";
import OtherProfile from "./pages/OtherProfile";
import EditPost from "./pages/EditPost";
import Search from "./pages/Search";
import PrivateRoute from "./ProtectedRoute";

class Mid extends Component{
    render(){
        return(
            <>
            <div>
                <Routes> 
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/home" element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    } />
                    <Route path="/addpost" element={
                        <PrivateRoute>
                            <AddPost/>
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Profile/>
                        </PrivateRoute>
                    } />
                    <Route path="/editprofile" element={
                        <PrivateRoute>
                            <EditProfile/>
                        </PrivateRoute>    
                    } />
                    <Route path="/singlepost/:pid" element={
                        <PrivateRoute>
                            <SinglePost/>
                        </PrivateRoute>     
                    } />
                    <Route path="/otherprofile/:_id" element={
                        <PrivateRoute>
                            <OtherProfile/>
                        </PrivateRoute>
                    } />
                    <Route path="/editpost/:pid" element={
                        <PrivateRoute>
                        <EditPost/>
                        </PrivateRoute>
                    } />
                    <Route path="/search" element={
                        <PrivateRoute>
                            <Search/>
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
            </>
        )
    }
}

export default Mid;