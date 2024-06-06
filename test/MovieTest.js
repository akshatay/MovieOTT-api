import request from 'supertest';
import Movie from "../mongooseModel/Movie.js"

import app from "../app.js";
import {
    use,
    expect
} from 'chai'
import chaiHttp from 'chai-http'
const chai = use(chaiHttp)


describe('Movie API', () => {
    // POST /movies
    it('should create a new movie', async () => {
            const res = await request(app)
                .post('/')
                .send({
                    title: 'Movie',
                    genre: 'Test',
                    rating: 5,
                    streamingLink: "http://example.comvfnvfj"
                });
            expect(res.statusCode).equal(201);
    });
    // GET /movies (Read - All)
    it('should get all movies', async () => {
        const res = await request(app).get('/movies');
        expect(res.statusCode).equal(200);
        expect(Array.isArray(res.body));
    });

    // GET /search?q={query} (Read - Search)
    it('should return 404 if no movies match the search query', async () => {
        // Create and save a movie with the title 'Sample' and genre 'Action'
        const movie = new Movie({
            title: 'Sample',
            genre: 'Action',
            rating: 5
        });
        await movie.save();
        // Search for a non-existing movie
        const res = await request(app).get('/search?q=test');
        expect(res.statusCode).equal(404);
    });

    // PUT /movies/:id (Update)
    it('should update a movie', async () => {
        const movie = new Movie({
            title: 'Test Movie',
            genre: 'Test',
            rating: 5 // Add rating here
            // Include other required fields here
        });
        await movie.save();
        const res = await request(app)
            .put(`/movies/${movie.id}`)
            .send({
                title: 'Updated Test Movie',
                genre: 'Test',
                rating: 5
            });
        expect(res.statusCode).equal(200);
        expect(res.body.title).equal('Updated Test Movie');
    });
    
    // DELETE /movies/:id (Delete)
    it('should delete a movie', async () => {
        const movie = new Movie({
            title: 'Test Movie',
            genre: 'Test',
            rating: 5 
        });
        await movie.save();
        const res = await request(app).delete(`/movies/${movie.id}`);
        expect(res.statusCode).equal(204);
    });
});