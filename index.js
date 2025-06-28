// Import necessary modules:
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const multer = require('multer');

// Create an instance of the express application:
const app = express();
const PORT = process.env.PORT;

// Configure multer for specifying uploaded file's destination, filename, and file type:
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads'); // specify the directory to save uploaded files
    },
    filename(req, file, cb) {
        cb(null, file.originalname); // use the original file name
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter }); // Initialize multer with storage and fileFilter options

// Use the methodOverride middleware to convert the POST request to PATCH, and DELETE requests:
app.use(methodOverride('_method'));

// Set up the middleware to parse the incoming requests, storing data in their respective formats (including JSON):
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the view engine, views directory, and static files:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Define 'Resource' as an array of posts, on which CRUD operations can be performed, instead of a database:
let posts = [
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

// Define the routes:
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// Render ALL POSTS on the Index Page:
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// Render the NEW POST Form:
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Render a SPECIFIC POST by its ID:
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);

    if (!post) {
        res.status(404).send("Post not found");
    }
    else {
        res.render("show.ejs", { post });
    }
});

// Render the EDIT POST Form for a SPECIFIC POST by its ID:
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);

    if (!post) {
        res.status(404).send("Post not found");
    }
    else {
        res.render("edit.ejs", { post });
    }
});

// Create a NEW POST with an image and caption:
app.post("/posts", upload.single("image"), (req, res) => {
    const { username, caption } = req.body;
    const image = req.file;
    posts.push({ id: uuidv4(), username, image: image.originalname, caption });
    res.redirect("/posts");
});

// Update an EXISTING POST's caption by its ID:
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const newCaption = req.body.caption;
    const post = posts.find(p => p.id === id);
    post.caption = newCaption;
    res.redirect("/posts");
});

// Delete an EXISTING POST by its ID:
app.delete("/posts/:id/delete", (req, res) => {
    const { id } = req.params;

    // Find the post and remove it from the "posts" array:
    let delPost;
    posts = posts.filter(p => {
        if (p.id === id) {
            delPost = p.image;
            return false;
        }
        return true;
    });

    // Remove the posts from the "/public/uploads/" directory: 
    const filePath = path.join(__dirname, "public", "uploads", delPost);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        } else {
        console.log("File deleted successfully");
        }
    });

    res.redirect("/posts");
});

// Error handling middleware for multer fileFilter
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === 'Only image files are allowed!') {
        console.log("Error:", err.message);
        res.status(300).redirect("/posts/new");
    } else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log("Listening on Port:", PORT);
});