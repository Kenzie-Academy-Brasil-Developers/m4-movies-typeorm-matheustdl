import { Repository } from 'typeorm';
import { Movie } from '../../entities';
import {
    TMoviesRequest,
    TMoviesResponse,
} from '../../interfaces/movies.interfaces';
import { AppDataSource } from '../../data-source';
import { movieSchema } from '../../schemas/movies.schemas';

const createMoviesService = async (
    moviesData: TMoviesRequest
): Promise<TMoviesResponse> => {
    const moviesRepository: Repository<Movie> =
        AppDataSource.getRepository(Movie);

    const movie: Movie = moviesRepository.create(moviesData);
    await moviesRepository.save(movie);

    const returnMovies: TMoviesResponse = movieSchema.parse(movie);

    return returnMovies;
};

export default createMoviesService;
