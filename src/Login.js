import React from 'react'
import "./Login.css"
import { Button } from '@material-ui/core'
import {auth,provider} from "./firebase";
import { useStateValue } from './StateProvider';
import {actionTypes} from "./reducer"

function Login() {
    //Pull Stuff from data layer
    const [{},dispatch]=useStateValue();

    //Setting the user
    const signIn=()=>{
        console.log("Clicked");
        auth.signInWithPopup(provider)
        .then(result=>{
            //console.log(result)
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            });
        })
        .catch(error=>alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
                alt="No Image"/>
                <div className="login__text">
                    <h1>Sign into Whatsapp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign into Whatsapp
                </Button>
            </div>
        </div>
    )
}

export default Login
