# Instagram Clone (Basic)

## Summary

This project is a basic clone of Instagram built to strengthen my backend web development skills, where user have the basic functionalities of uploading photos with a caption (as posts), edit the post's caption, and delete the post. It demonstrates the fundamental concepts of building a web application by using these backend web technologies.

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js, used to build the server and handle routing.
- **EJS (Embedded JavaScript)**: A templating engine used to generate HTML markup with plain JavaScript.
- **UUID**: A library to generate unique identifiers for each post.
- **Vanilla CSS**: For styling the HTML content.
- **Multer**: A middleware for handling `multipart/form-data`, used for uploading files.
- **Method-Override**: A library to use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

## Learnings

1. **Node.js**: Gained an understanding of how to use Node.js to build server-side applications.
2. **Express.js**: Learned how to use Express.js to create a web server and handle routing.
3. **EJS**: Learned how to use EJS as a templating engine to generate dynamic HTML content.
4. **REST Principles**: Acquired knowledge of REST principles for creating RESTful APIs.
5. **CRUD Operations**: Understood the concepts of Create, Read, Update, and Delete (CRUD) operations.
6. **CRUD on Resources**: Learned to perform CRUD operations on resources (data stored in the database) using HTTP verbs and RESTful APIs.
7. **Redirection**: Learned to redirect client requests using `res.redirect()` in route handlers.
8. **Method Override**: Learned to override HTTP GET and POST methods with PUT, PATCH, and DELETE methods using the 'method-override' library.
9. **Route/Path vs API**: Understood the difference between a route/path and an API. A route/path is an endpoint to handle requests, while an API is a set of rules for communication between client and server.
10. **Multer Library**: Learned how to use the 'multer' library for handling file uploads, including specifying the destination and name of the uploaded files, defining the total number of files the client can send with requests or form-data, parsing the image files uploaded as form-data, and handling multiple file uploads of the same field.

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/VinayNoogler000/Instagram-Clone.git
    cd Instagram-Clone
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start # only if 'nodemon' library is installed in your system, else
    node index.js
    ```

4. Open your browser and navigate to `http://localhost:8080`.

## Project Structure

```
project-root/
├── index.js          # Main entry point of the application.
├── views             # Contains EJS templates.
    ├── posts.ejs     # Homepage of the website.
├── public            # Contains static files such as CSS and images.
    ├── style.css     # Basic styling for the whole website (all webpages).
├── package.json      # Lists the project dependencies and scripts.
├── .gitignore        # Contains all the files and folders to be ignored (not tracked) by Git.
├── README.md         # Project documentation.
└── LICENSE           # Contains the licensing information for the project
```

## Feedback

I would love to hear your feedback on this project! If you encounter any bugs, have suggestions for performance improvements, or have ideas for new features, please feel free to open an issue on the [GitHub repository](https://github.com/VinayNoogler000/Instagram-Clone/issues).

## Careers

I am currently open to Full-Stack Web Development roles. If you are interested in working with me or have any opportunities, please reach out to me via [LinkedIn](https://www.linkedin.com/in/vinay-tambey/) or email me at vinaytambey000@gmail.com.

## License

This project is licensed under the [MIT](https://github.com/VinayNoogler000/Instagram-Clone/blob/main/LICENSE) License.