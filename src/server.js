import {join} from "path";
import express from "express";

// Setting
const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

// routing
app.get("/", (req, res)=> res.render("home"));

// Server start action
const handleListening = () => {
    console.log(`✅  Server is running! http://localhost:${ PORT }`);
};
app.listen(PORT, handleListening);