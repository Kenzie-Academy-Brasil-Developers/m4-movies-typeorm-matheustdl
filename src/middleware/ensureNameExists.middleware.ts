import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';
const ensureMovieNameExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validateName = req.body;
    req.body = validateName;
    const { name } = req.body;

    if (name) {
        const movieRepository = AppDataSource.getRepository(Movie);
        const existingMovie = await movieRepository.findOne({
            where: { name },
        });
        if (existingMovie) {
            return res.status(409).json({ message: 'Movie already exists.' });
        }
    }
    return next();
};
export default ensureMovieNameExistsMiddleware;
