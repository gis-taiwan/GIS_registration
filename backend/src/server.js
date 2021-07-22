// default .env file to connect with mogoDB
require("dotenv").config();

// define some library usage
const http = require("http");
const https = require("https")
const express = require("express");
const mongoose = require("mongoose");

// define the schema of the database
const user = require("./model/user.js");
const admission = require("./model/admission.js")
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        method: "*"
    },
});


// connect to mongoDB
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);


mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// define database connection
const db = mongoose.connection;

// if database connection failed
db.on("error", (error) => console.error(error));

// if database connection succeeded
db.once("open", () => {
    
	user.create({Username: "Admin", Email: "admin@test", Name: "Admin Test", Password: "admin", Role: "Z"}, (err, res) => {
		if (err) console.log(err)

		console.log(res)
	})



    // communicate with frontend server
    const sendData = (data) => {
        const [type, room, payload] = data;
        io.in(room).emit(type, payload);
        console.log(payload);
    };

    // define default message when database and socket is connected
    console.log("database connected", process.env.MONGOURL);
	
    // websocket connection
    io.on("connect", (socket) => {
        console.log("socket connected: " + socket.id);

        socket.on("room", (room) => { 
            console.log('joining room', room);
            socket.join(room); 
        	sendData(["roomCreate", room, "room create handshake"]);
		})

        // Create user in database
        socket.on("CreateUser", (data) => {
            user.create(data, (err, res) => {
                if (err) throw err;
                
                console.log(res);
            })
        })

        // Login Method
        socket.on("Login", (room, username, passwd) => {

            // Find correct user
            user.find({ Username: username, Password: passwd }).exec((err, res) => {
                if (err) throw err;

                if (res.length == 1) {
                    sendData(["getUser", room, res]);  
                } else {
                    sendData(["getUserFail", room, "Invaild Username or Password"]);
                }
            
            });
        });

        // Find a list of user
        socket.on("findUser", (room, usernameList) => {

            // Find user list
            user.find({Username: {$in: usernameList}}).exec((err, res) => {
                if (err) throw err;

                if (res.length != 0) {
                    sendData(["findUserList", room, res]);  
                } else {
                    sendData(["findUserListFail", room, "Invalid username list"]);
                }
            
            });
        })

        // Find admission data of given list of user
        socket.on("findAdmission", (room, usernameList) => {

            // Find admission data
            admission.find({Username: {$in: usernameList}}).exec((err, res) => {
                if (err) throw err;

                if (res.length != 0) {
                    sendData(["findAdmissionList", room, res]);  
                } else {
                    sendData(["findAdmissionListFail", room, "Invalid username list"]);
                }
            
            });
        })


        // Update certain attribute of user
        socket.on("updateUser", (room, username, attribute) => {

            // Update Attribute of certain user
            user.update({Username: username}, attribute).exec((err, res) => {
                if (err) throw err;

                if (res) sendData(["userUpdateSuccess", room, res]);
            });

            // renew information of user
            user.find({ Username: username}).exec((err, res) => {
                if (err) throw err;

                if (res.length == 1) {
                    sendData(["getUser", room, res]);  
                } else {
                    sendData(["getUserFail", room, "Invaild Username or Password"]);
                }
            
            });
        })

        // Delete User
        socket.on("deleteUser", (username, passwd) => {
            user.deleteOne({Username: username, Password: passwd }).exec((err, res) => {
                if (err) throw err;

                if (res.length != 0) {
                    sendData(["deleteUserData", room, res]);  
                } else {
                    sendData(["deleteUserDataFail", room, "Deletion Failed"]);
                }
            
            });
		});
	});

	const PORT = process.env.port || 8080;

    server.listen(PORT, () => {
        console.log(`Listening on https://localhost:${PORT}`);
    });
	
});
