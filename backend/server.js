// default .env file to connect with mogoDB
require("dotenv").config();

// define some library usage
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");

// define the schema of the database
const user = require("./model/user.js");
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
    // communicate with frontend server
    const sendData = (data) => {
        const [type, payload] = data;
        io.emit(type, payload);
        console.log(payload);
    };

    // define default message when database and socket is connected
    console.log("database connected", process.env.MONGOURL);

    // websocket connection
    io.on("connect", (socket) => {
        console.log("socket connected: " + socket.id);

        // Create user in database
        socket.on("CreateUser", (data) => {
            user.create(data, (err, res) => {
                if (err) throw err;
                
                console.log(res);
            })
        })

        socket.on("Login", (username, passwd) => {
            user.find({ Username: username, Password: passwd }).exec((err, res) => {
                if (err) throw err;

                if (res.length == 1) {
                    sendData(["getUser", res]);  
                } else {
                    sendData(["getUserFail", "Invaild Username or Password"]);
                }
            
            });
        });
    });


    const PORT = process.env.port || 4000;

    server.listen(PORT, () => {
        console.log(`Listening on https://localhost:${PORT}`);
    });
});
