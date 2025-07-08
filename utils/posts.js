require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const BUNNY_CDN_HOSTNAME = process.env.BUNNY_CDN_HOSTNAME;

// Define 'Resource' as an array of posts, on which CRUD operations can be performed, instead of a database:
let posts = [
    {
        id: uuidv4(),
        username: "vinay",
        image: {
            fileName: "cat.jpg",
            get url() {
                return `https://${BUNNY_CDN_HOSTNAME}${this.fileName}`;
            }
        },
        caption: "WHATT!!! Why the heck do I look like a Cat!??? 😭😿"
    },
    {
        id: uuidv4(),
        username: "john",
        image: {
            fileName: "dog.jpg",
            get url() {
                return `https://${BUNNY_CDN_HOSTNAME}${this.fileName}`;
            }
        },
        caption: "Stop staring at me with your big ol' eyes!😒👀🙄"
    },
    {
        id: uuidv4(),
        username: "shradha",
        image: {
            fileName: "lion.avif",
            get url() {
                return `https://${BUNNY_CDN_HOSTNAME}${this.fileName}`;
            }
        },
        caption: "One day, I'll be the King of My Jungle!🤤😤🥴"
    },
];

module.exports = posts;