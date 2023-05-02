import { Repository } from 'typeorm';
import {
    TMoviesPagination,
    TMoviesResponseArr,
} from '../../interfaces/movies.interfaces';
import { AppDataSource } from '../../data-source';
import { Movie } from '../../entities';
import { moviesSchemasResponseArr } from '../../schemas/movies.schemas';

const listMoviesService = async (
    page: number | undefined,
    perPage: number | undefined,
    order: string = 'asc',
    sort: string = 'id'
): Promise<TMoviesPagination> => {
    const moviesRepository: Repository<Movie> =
        AppDataSource.getRepository(Movie);
    if (
        typeof perPage !== 'number' ||
        perPage <= 0 ||
        perPage > 5 ||
        !perPage
    ) {
        perPage = 5;
    }
    if (typeof page !== 'number' || page <= 0 || !page) {
        page = 1;
    }
    let movies: Movie[] | undefined;

    let orderQuery = order === 'desc' ? 'DESC' : 'ASC';

    if (sort === 'price') {
        sort = 'price';
    } else if (sort === 'duration') {
        sort = 'duration';
    } else {
        sort = 'id';
        orderQuery = 'ASC';
    }

    movies = await moviesRepository.find({
        skip: (page - 1) * perPage,
        take: perPage,
        order: {
            [sort]: orderQuery,
        },
    });

    const count = await moviesRepository.count();

    const returnMovies: TMoviesResponseArr =
        moviesSchemasResponseArr.parse(movies);

    const prevPage =
        page == 1
            ? null
            : `http://localhost:3000/movies?page=${
                  page - 1
              }&perPage=${perPage}`;

    const nextPage =
        page * perPage < count
            ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
            : null;

    return {
        prevPage: prevPage,
        nextPage: nextPage,
        count,
        data: returnMovies,
    };
};

export default listMoviesService;
