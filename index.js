const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 8080;

const posts = [
    {
        id: uuidv4(),
        username: "vinay",
        image: "cat.jpg",
        caption: "Stop staring at me with them big ol' eyes!"
    },
    {
        id: uuidv4(),
        username: "john",
        image: "dog.jpg",
        caption: "Hey big guy, wanna have a football match with me!??"
    },
    {
        id: uuidv4(),
        username: "shradha",
        image: "food.jpg",
        caption: "Please, just stop taking pictures, and start eating it!"
    },
];

// Set up the view engine, views directory, and static files:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Define the routes:
app.get("/", (req, res) => {
    res.render("posts.ejs", {posts});
});

app.listen(PORT, () => {
    console.log("Listening on Port:", PORT);
});