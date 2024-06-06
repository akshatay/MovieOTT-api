import isAdmin from "../middleware/isAdmin.js";
import Movie from "../mongooseModel/Movie.js"
import {
    Router
} from 'express';
const router = Router();

// GET /movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        if (movies.length > 0) {
            res.json(movies);
        } else {
            res.status(404).json({
                message: 'Movie not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// GET /search?q={query}
router.get('/search', async (req, res) => {
    try {
        const query = (req.query.q).toString();
        const filteredMovies = await Movie.find({
            $or: [{
                    title: {
                        $regex: query,
                        $options: 'i'
                    }
                },
                {
                    genre: {
                        $regex: query,
                        $options: 'i'
                    }
                }
            ]
        });
        if (filteredMovies.length > 0) {
            res.json(filteredMovies);
        } else {
            res.status(404).json({
                message: 'Movie not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// POST /movies
router.post('/', isAdmin, async (req, res, next) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request'
        });
    }
});

// PUT /movies/:id
router.put('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
            new: true
        });
        if (updatedMovie) {
            res.json(updatedMovie);
        } else {
            res.status(404).json({
                message: 'Movie not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request'
        });
    }
});

// DELETE /movies/:id
router.delete('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (deletedMovie) {
            res.status(204).send();
        } else {
            res.status(404).json({
                message: 'Movie not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request'
        });
    }
});
export default router;

