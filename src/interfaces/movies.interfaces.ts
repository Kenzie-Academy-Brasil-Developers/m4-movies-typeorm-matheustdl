import { z } from 'zod';
import {
    movieSchema,
    moviesSchemasResponseArr,
    moviesSchemasRequest,
} from '../schemas/movies.schemas';
import { DeepPartial } from 'typeorm';

type TMoviesRequest = z.infer<typeof moviesSchemasRequest>;

type TMovies = z.infer<typeof movieSchema>;

type TMoviesResponse = z.infer<typeof movieSchema>;

type TMoviesResponseArr = z.infer<typeof moviesSchemasResponseArr>;

type TMoviesUpdateRequest = DeepPartial<TMoviesRequest>;

type TMoviesPagination = {
    prevPage: string | null | undefined;
    nextPage: string | null | undefined;
    count: number;
    data: TMoviesResponseArr;
};

export {
    TMoviesRequest,
    TMovies,
    TMoviesResponse,
    TMoviesResponseArr,
    TMoviesPagination,
    TMoviesUpdateRequest,
};
