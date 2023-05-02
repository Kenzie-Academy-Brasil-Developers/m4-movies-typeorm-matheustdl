import { Repository } from 'typeorm';
import {
    TMoviesResponse,
    TMoviesUpdateRequest,
} from '../../interfaces/movies.interfaces';
import { Movie } from '../../entities';
import { AppDataSource } from '../../data-source';
import { movieSchema } from '../../schemas/movies.schemas';

const updateMoviesService = async (
    moviesData: TMoviesUpdateRequest,
    moviesId: number
): Promise<TMoviesResponse> => {
    const moviesRepository: Repository<Movie> =
        AppDataSource.getRepository(Movie);

    const OldMoviesData: Movie | null = await moviesRepository.findOneBy({
        id: moviesId,
    });

    const newMoviesData: Movie = moviesRepository.create({
        ...OldMoviesData,
        ...moviesData,
    });

    await moviesRepository.save(newMoviesData);

    const returnMovies: TMoviesResponse = movieSchema.parse(newMoviesData);

    return returnMovies;
};
export default updateMoviesService;
