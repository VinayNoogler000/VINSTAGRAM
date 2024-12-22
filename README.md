# Instagram Clone (Basic)

## Summary

This project is a basic clone of Instagram built to strengthen my backend web development skills, where user have the basic functionalities of uploading photos with a caption (as posts), edit the post's caption, and delete the post. It demonstrates the fundamental concepts of building a web application by using these backend web technologies.

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js, used to build the server and handle routing.
- **EJS (Embedded JavaScript)**: A templating engine used to generate HTML markup with plain JavaScript.
- **UUID**: A library to generate unique identifiers for each post.
- **Vanilla CSS**: For styling the HTML content.

## Learnings

1. **Node.js**: Gained an understanding of how to use Node.js to build server-side applications.
2. **Express.js**: Learned how to use Express.js to create a web server and handle routing.
3. **EJS**: Learned how to use EJS as a templating engine to generate dynamic HTML content.
4. **REST Principles**: Acquired knowledge of REST principles for creating RESTful APIs.
5. **CRUD Operations**: Understood the concepts of Create, Read, Update, and Delete (CRUD) operations.
6. **CRUD on Resources**: Learned to perform CRUD operations on resources (data stored in the database) using HTTP verbs and RESTful APIs.
7. **Redirection**: Learned to redirect client requests using `res.redirect()` in route handlers.

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
    npm start
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

## License

This project is licensed under the [MIT](https://github.com/VinayNoogler000/Instagram-Clone/blob/main/LICENSE) License.