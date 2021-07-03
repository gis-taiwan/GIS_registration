import { useState } from 'react'
// import io from "socket.io-client/dist/socket.io"

const io = require("socket.io-client");

// define socket.io to establish connection between
const socket = io("http://localhost:4000", { secure: true });

const API = () => {

    const [User, setUser] = useState({})

    socket.on("getUser", (data) => {
        if (data == null) {
            console.log("Invalid username or password");
        } else {
            console.log(data);
        }

        setUser(data);
    });

    socket.on("getUserFail", (mssg) => {
        console.log(mssg);
    });

    const LoginAPI = (username, password) => {

        // define default message when socket is connected
        socket.on("connect", () => {
            console.log("socket connected: " + socket.id);
        });

    
        console.log(username);
    
        // handle messages comming from backend
        socket.emit("Login", username, password);

        console.log("Emitted Login")
    
    }

    return {User, LoginAPI};
};


export default API;