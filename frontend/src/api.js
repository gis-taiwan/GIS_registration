
import { getCookie, setCookie } from "components/Navbars/CookieUsage";
import { useState } from 'react'

const io = require("socket.io-client");


// define socket.io to establish connection between
const socket = io("http://api.registration.gis-taiwan.ntu.edu.tw/", { secure: true });

socket.on("connect", () => {
    console.log("socket connected: " + socket.id);

    socket.emit('room', socket.id);

    setCookie("room", socket.id, 60);
});

const API = () => {

	socket.on("roomCreate", (mssg) => {
		console.log(mssg);
	})

    // If success get user
    socket.on("getUser", (data) => {
        console.log("socket connected: " + socket.id);
        if (data == null) {
            console.log("Invalid username or password");
        } else {
            console.log(data);

            setCookie("User", JSON.stringify(data[0]), 10);
        }
    });

    // Fail to get user
    socket.on("getUserFail", (mssg) => {
        console.log(mssg);
    });

    // Success on finding list of user
    socket.on("findUserList", (data) => {
        if (data == null) {
            console.log("Invalid username list query");
        } else {
            console.log(data);

            setCookie("UserList", JSON.stringify(data), 10);
        }
    });

    // Failed to find list of user
    socket.on("findUserListFail", (mssg) => {
        console.log(mssg);
    });

    socket.on("userUpdateSuccess", (mssg) => {
        console.log(mssg);
    })

    // Success on finding admission data of list of user
    socket.on("findAdmissionList", (data) => {
        if (data == null) {
            console.log("Invalid username list query");
        } else {
            console.log(data);

            setCookie("AdmissionList", JSON.stringify(data), 10);
        }
    });

    // Failed to get admission data
    socket.on("findAdmissionListFail", (mssg) => {
        console.log(mssg);
    });

    // Success on deletion
    socket.on("deleteUserData", (mssg) => {
        console.log(mssg)
    });

    // Failed on deletion
    socket.on("deleteUserDataFail", (mssg) => {
        console.log(mssg)
    })

    // Login api
    const LoginAPI = (username, password) => {

        // define default message when socket is connected
        socket.on("connect", () => {
            console.log("socket connected: " + socket.id);
        });
    
        // handle messages comming from backend
        socket.on(getCookie("room")).emit("Login", username, password);

        console.log("Emitted Login")
    
    }

    // retrieve user data of list of user
    const retrieveUserAPI = (usernameList) => {
        socket.on(getCookie("room")).emit("findUser", getCookie("room"), usernameList);

        console.log("Emitted User List Query");
    }

    // retrieve admission data of list of user
    const retrieveAdmissionAPI = (usernameList) => {
        socket.on(getCookie("room")).emit("findAdmission", getCookie("room"), usernameList);

        console.log("Emitted Users' Admission List Query");
    }

    // Update user attribute with object format
    const updateUserAPI = (username, attr) => {
        socket.on(getCookie("room")).emit("updateUser", getCookie("room"), username, attr);

        console.log("Emitted Users' Update Request");
    }

    const deleteUserAPI = (username, passwd) => {
        socket.on(getCookie("room")).emit("deleteUser", getCookie("room"), username, passwd);

        console.log("Emitted Deletion Request");
    }

    return {LoginAPI, retrieveUserAPI, retrieveAdmissionAPI, updateUserAPI};
};


export default API;
