const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 8080;

// Define 'Resource' as an array of posts, on which CRUD operations can be performed, instead of a database:
const posts = [
    {
        id: uuidv4(),
        username: "vinay",
        image: "cat.jpg",
        caption: "Stop staring at me with your big ol' eyes!😒👀🙄"
    },
    {
        id: uuidv4(),
        username: "john",
        image: "dog.jpg",
        caption: "Hey big guy, wanna have a football match with me!??😋😎⚽"
    },
    {
        id: uuidv4(),
        username: "shradha",
        image: "food.jpg",
        caption: "Please, just stop taking pictures, and start eating it!🤤😤🥴"
    },
];

// Function to traverse the array of characters until a dot '.' is found:
const traverseUntil = (arr) => { 
    const result = [];
    for (let el of arr) {
        if (el === '.') {
            break;
        }
        else {
            result.push(el);
        }
    }
    return result;
}

// Set up the view engine, views directory, and static files:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Define the routes:
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts, traverseUntil});
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("show.ejs", {post});
});

app.listen(PORT, () => {
    console.log("Listening on Port:", PORT);
});