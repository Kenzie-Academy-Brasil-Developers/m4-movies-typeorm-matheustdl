import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';
const ensureIdAlreadyExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    const movieRepository = AppDataSource.getRepository(Movie);
    const existingMovie = await movieRepository.findOne({ where: { id } });
    if (!existingMovie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    return next();
};
export default ensureIdAlreadyExistsMiddleware;
