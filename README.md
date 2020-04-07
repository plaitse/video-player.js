Video Player

- Client in Angular v9 / TypeScript v3
- Server in Node.js v12

# How to use the app

- `npm run build` from the root directory to install the Node modules in both client and server
- `npm run start` from the root directory to start the app
- Access the app on the following URL: `http://localhost:8001`

If any error occurs, please try to run the above commands in each directory (client and server) in two seperated terminals.

# How to use the API seperately if needed

- Access the API on the following URL: `http://localhost:8000`
- POST a new history on route `http://localhost:8000/history`

Body example:

```
{
  videoUrl: "https://www.youtube.com/watch?v=hwHQfHcpXD0"
}
```

- GET all histories on route `http://localhost:8000/history`
- GET a specific history on route `http://localhost:8000/history/:id`
- DELETE a specific history on route `http://localhost:8000/history/:id`

# About the database

The database is a MongoDB Atlas cluster `https://www.mongodb.com/cloud/atlas`.

It can be accessed by any IP address.

I'll keep the credentials secret for security reasons, please contact me if any error occurs when fetching/posting new data from/in it.

# Improvements to be done

## Frontend

- Implement a delete feature in the history panel
- Don't store the URL in the history and the bookmarks panels if already presents but place it on top of the list
- Improve the observer/observable pattern with a "change detection" Angular architecture

## Backend

- Improve security (remove all .env files from GitHub, protect the POST queries, etc.)
- Better error handling
- Add a Swagger documentation for the routes
- Implement TypeScript for a better typing
- Upgrade Node.js version
