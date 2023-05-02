import { Request, Response } from 'express';
import {
    TMoviesPagination,
    TMoviesRequest,
    TMoviesResponse,
    TMoviesUpdateRequest,
} from '../interfaces/movies.interfaces';
import createMoviesService from '../services/movies/createMovies.service';
import listMoviesService from '../services/movies/listMovies.service';
import updateMoviesService from '../services/movies/updateMovies.service';
import { deleteMoviesService } from '../services/movies/deleteMovies.service';

const createMoviesControllers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const moviesData: TMoviesRequest = req.body;

    const newMovies = await createMoviesService(moviesData);
    return res.status(201).json(newMovies);
};

const listMoviesControllers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const page: number | undefined = Number(req.query.page);
    const perPage: number | undefined = Number(req.query.perPage);
    const order: any = req.query.order;
    const sort: any = req.query.sort;
    const movies: TMoviesPagination = await listMoviesService(
        page,
        perPage,
        order,
        sort
    );

    return res.json(movies);
};

const updateMoviesController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const moviesData: TMoviesUpdateRequest = req.body;
    const moviesId: number = Number(req.params.id);

    const newMoviesData: TMoviesResponse = await updateMoviesService(
        moviesData,
        moviesId
    );
    return res.json(newMoviesData);
};
export const deleteMoviesController = async (req: Request, res: Response) => {
    await deleteMoviesService(parseInt(req.params.id));
    return res.status(204).send();
};

export {
    createMoviesControllers,
    listMoviesControllers,
    updateMoviesController,
};
