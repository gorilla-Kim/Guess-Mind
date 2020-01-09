import {join} from "path";
import express from "express";
import socketIO from "socket.io";

/* Setting */
const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

/* middleware */
// static 관련
app.use(express.static(join(__dirname, "static")));

/* routing */
app.get("/", (req, res)=> res.render("home"));

/* Server start action */
const handleListening = () => {
    console.log(`✅  Server is running! http://localhost:${ PORT }`);
};
app.listen(PORT, handleListening);