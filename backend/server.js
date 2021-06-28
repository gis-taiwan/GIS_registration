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
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
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
    console.log("database connected");

    io.on("connect", (socket) => {
        console.log("socket connected: " + socket.id);
    });

    io.on("Login", (email) => {
        user.find({ Email: email }).exec((err, res) => {
            if (err) throw err;

            sendData(["getUser", res]);
        });
    });

    const PORT = process.env.port || 4000;

    server.listen(PORT, () => {
        console.log(`Listening on https://localhost:${PORT}`);
    });
});
