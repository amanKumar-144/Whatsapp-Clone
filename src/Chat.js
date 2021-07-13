import React ,{useState,useEffect} from 'react';
import "./Chat.css";
import { Avatar,IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from "./firebase.js";
import firebase from "firebase";
import {useStateValue} from "./StateProvider";

function Chat() {
    const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const { roomId }=useParams();
    const [roomName,setRoomName]=useState("");
    //Is an array
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(()=>{
        if(roomId)
        {
            db.collection('Rooms').doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name);
            });
            setSeed(Math.floor(Math.random()*5000));


            db.collection('Rooms').doc(roomId).
            collection("Messages").orderBy
            ('timestamp','asc').onSnapshot(snapshot=>{
                    setMessages(snapshot.docs.map(doc=>
                        doc.data()))
                    })
        }
    },[roomId]);

    const sendMessage=(event)=>{
        event.preventDefault();
        console.log("You typed >>> ",input);
        db.collection('Rooms').doc(roomId).
        collection("Messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {"  "}
                        {
                            new Date(messages[messages.length - 1]?.
                                timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>

                <div className="char__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>




            <div className="chat__body">
                {messages.map( (message) => (
                        <p className={`chat__message ${message.name===user.displayName && "chat__receiver"}`}>
                            <span className="chat__name">
                                {message.name}</span>

                            {message.message}

                            <span className="chat__timestamp">
                                {new Date(message.timestamp?.toDate
                                    ()).toUTCString()}
                            </span>
                        </p>
                    ))
                                }
            </div>





            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input 
                    value={input} 
                    onChange={
                        (event)=>
                        setInput(event.target.value)
                    }
                    placeholder="Type a message" type="text"/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
            </div>



        </div>
    )
}

export default Chat
