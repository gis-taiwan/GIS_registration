import { getCookie, setCookie } from "components/Navbars/CookieUsage";
const io = require("socket.io-client");


// define socket.io to establish connection between
const socket = io("http://localhost:4000", { secure: true });

const API = () => {

    // If success get user
    socket.on("getUser", (data) => {
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

    // Login api
    const LoginAPI = (username, password) => {

        // define default message when socket is connected
        socket.on("connect", () => {
            console.log("socket connected: " + socket.id);
        });
    
        // handle messages comming from backend
        socket.emit("Login", username, password);

        console.log("Emitted Login")
    
    }

    // retrieve user data of list of user
    const retrieveUserAPI = (usernameList) => {
        socket.emit("findUser", usernameList);

        console.log("Emitted User List Query");
    }

    // retrieve admission data of list of user
    const retrieveAdmissionAPI = (usernameList) => {
        socket.emit("findAdmission", usernameList);

        console.log("Emitted Users' Admission List Query");
    }

    return {LoginAPI, retrieveUserAPI, retrieveAdmissionAPI};
};


export default API;