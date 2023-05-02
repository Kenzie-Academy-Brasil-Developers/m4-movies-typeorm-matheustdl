import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Movie } from '../../entities';

export const deleteMoviesService = async (idMovie: number): Promise<void> => {
    const moviesRepository: Repository<Movie> =
        AppDataSource.getRepository(Movie);
    const movie = await moviesRepository.findOne({
        where: {
            id: idMovie,
        },
    });
    await moviesRepository.remove(movie!);
};
