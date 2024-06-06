# MovieOTT-api

Welcome to the Movie OTT ! This is a comprehensive movie management application built on Express.js and MongoDB Atlas. Movie OTT allows users to perform various actions related to movies, such as adding, retrieving, updating, and removing movies. This README provides detailed documentation on how to set up and use the application.


### Setup Instructions

Follow these steps to set up and run the Movie OTT application on your local machine:

1. **Clone the Repository**: Clone the Movie OTT repository from GitHub to your local machine.

2. **Install Dependencies**: Navigate to the root directory of the project and run `npm install` to install all required dependencies.

3. **Set Up MongoDB Atlas**: Create a MongoDB Atlas account if you don't have one already. Set up a new cluster and obtain the connection URI.

4. **Configure MongoDB Connection**: Replace the placeholder values `<username>`, `<password>`,  and `<appname>` in the `.env` file with your MongoDB Atlas credentials and database information.

5. **Start the Server**: Run `npm start` to start the Express.js server. The server will start listening on port 3000 by default.

6. **Run Tests**: Ensure that all endpoints are working correctly by running `npm test`. This command will execute the test suite and verify the functionality of the application.



### Endpoints

The Movie OTT provides the following RESTful endpoints for managing movies:

1. **GET /movies**: Retrieves all movies stored in the database.

Sample Example

req: http://localhost:3000/movies/

res: [
    {
        "_id": "6661916269a7f3dde7c5c5e7",
        "title": "Test Movie",
        "genre": "Horror",
        "rating": 3,
        "streamingLink": "www.youtube.com",
        "__v": 0
    },
    {
        "_id": "666192aaeafd708c7589ffca",
        "title": "Test Movie 1",
        "genre": "Acrion",
        "rating": 3,
        "streamingLink": "www.youtube.com",
        "__v": 0
    }]

2. **GET /movies/search?q={query}**: Searches for movies based on the provided query string (title or genre).

Sample Example : 

req: http://localhost:3000/movies/search?q=Horror

res : [
    {
        "_id": "6661916269a7f3dde7c5c5e7",
        "title": "Test Movie",
        "genre": "Horror",
        "rating": 3,
        "streamingLink": "www.youtube.com",
        "__v": 0
    }]

3. **POST /movies**: Adds a new movie to the database. Requires admin privileges.

Sample Example :

req: http://localhost:3000/movies' 
    header 'role: admin'    
    data {
    "title":"Sample Movie",
    "genre":"Thriller",
    "rating":3,
    "streamingLink":"www.youtube.com"
    }  
    
res: {
    "title": "Sample Movie",
    "genre": "Thriller",
    "rating": 3,
    "streamingLink": "www.youtube.com",
    "_id": "6661a8979e45a877b9ec18a2",
    "__v": 0
}

4. **PUT /movies/:id**: Updates an existing movie with the provided ID. Requires admin privileges.

Sample Example

req: http://localhost:3000/movies/6661a8979e45a877b9ec18a2' 
    header 'role: admin'    
    data {
    "genre":"Action"
    }  

res: {
    "title": "Sample Movie",
    "genre": "Action",
    "rating": 3,
    "streamingLink": "www.youtube.com",
    "_id": "6661a8979e45a877b9ec18a2",
    "__v": 0
}

5. **DELETE /movies/:id**: Removes a movie from the database by its ID. Requires admin privileges.

Sample Example

req: http://localhost:3000/movies/6661a8979e45a877b9ec18a2' 
    header 'role: admin' 

res: 204

