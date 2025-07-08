// Import necessary modules:
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const multer = require("multer");
const axios = require("axios");
const posts = require("./utils/posts");

// Create an instance of the express application:
const app = express();
const PORT = process.env.PORT;
const BUNNY_CDN_HOSTNAME = process.env.BUNNY_CDN_HOSTNAME;
const BUNNY_STORAGE_UPLOAD_URL = `https://sg.storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE_NAME}/`;

// Configure multer to store files in memory (not disk)
// We will then take the buffer and upload to Bunny.net
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        // Basic validation for image types
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Use the methodOverride middleware to convert the POST request to PATCH, and DELETE requests:
app.use(methodOverride('_method'));

// Set up the middleware to parse the incoming requests, storing data in their respective formats (including JSON):
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the view engine, views directory, and static files:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Define the routes:
app.get('/', (req, res) => {
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
        throw new Error("Post Not Found!");
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
        throw new Error("Post Not Found!");
    }
    else {
        res.render("edit.ejs", { post });
    }
});

// Create a NEW POST with an image and caption:
app.post("/posts", upload.single("image"), async (req, res) => {
    try {
        const { username, caption } = req.body;
        const image = req.file;
        
        if(!username || !caption) return res.status(400).render("error.ejs", {message: "Caption & Username is required for each post."});
        if(!image) return res.status(400).render("error.ejs", {message: "No image file uploaded."});
        
        // Generate a unique filename to avoid conflicts:
        const fileBuffer = image.buffer;
        const fileExtension = image.originalname.split('.').pop();
        const uniqueFileName = `${uuidv4()}.${fileExtension}`; // e.g., "random_unique_id.jpg"
        
        // Construct the upload URL for Bunny Storage;
        const uploadUrl = `${BUNNY_STORAGE_UPLOAD_URL}${uniqueFileName}`;
        
        // Upload the file to Bunny Storage
        const uploadResponse = await axios.put(uploadUrl, fileBuffer, {
            headers: {
                'AccessKey': process.env.BUNNY_STORAGE_API_KEY,
                'Content-Type': req.file.mimetype, // Use the correct MIME type
            },
            maxContentLength: Infinity, // Important for large files
            maxBodyLength: Infinity,
        });
        
        if (uploadResponse.status === 201) { // 201 Created is the success status for Bunny PUT
            const imageUrl = `https://${BUNNY_CDN_HOSTNAME}/${uniqueFileName}`;
            console.log(`Image uploaded to Bunny.net: ${imageUrl}`);
            console.log(`Post Caption: ${caption}`);
            
            posts.push({ id: uuidv4(), username, image: { fileName: image.originalname, url: imageUrl}, caption });
            res.redirect("/posts");
        }
        else {
            console.error('Bunny.net upload response:', uploadResponse.data);
            res.status(500).render("error.ejs", {message: "Failed to upload the image."});
        }
    } 
    catch (error) {
        console.error('Error in post creation/image upload:', error.response ? error.response.data : error.message);
        if (error.code === 'LIMIT_FILE_SIZE') {
            res.status(413).render("error.ejs", {message: "Image file is too large. Max 5MB allowed."});
        } else {
            res.status(500).render("error.ejs", {message: "Server error during image upload."});
        }
    }
});

// Update an EXISTING POST's caption by its ID:
app.patch("/posts/:id", (req, res) => {
    // Get the New Caption sent by the Client:
    const { id } = req.params;
    const newCaption = req.body.caption;

    // Find and Update the Post with the New Caption: 
    const post = posts.find(p => p.id === id);
    if(!post) {
        throw new Error("Post Not Found!");
    }
    post.caption = newCaption;

    // Redirect to the 
    res.redirect(`/posts/${id}`);
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

// Handling client-requests to All Undefined/Invalid paths:
app.all('*', (req, res) => {
    res.render("error.ejs", { message: "Page Not Found!"});
});

// Custom Error-Handling Middleware:
app.use((err, req, res, next) => {
    res.render("error.ejs", { message: err.message});
});

app.listen(PORT, () => {
    console.log("Listening on Port:", PORT);
});