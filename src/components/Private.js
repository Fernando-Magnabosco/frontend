import React from "react";
import { isLogged } from "../helpers/authHandler";
import SignIn from "../pages/signIn";



export const Private = (props) => {
    
    if(!isLogged())
         return <SignIn/>
    
    return <props.component/>



}