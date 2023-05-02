import { Router } from 'express';
import {
    createMoviesControllers,
    deleteMoviesController,
    listMoviesControllers,
    updateMoviesController,
} from '../controllers/movies.controllers';
import ensureDataIsValidMiddleware from '../middleware/ensureDataIsValid.middleware';
import {
    UpdateMoviesSchemas,
    moviesSchemasRequest as moviesSchemasRequest,
} from '../schemas/movies.schemas';
import ensureMovieNameExistsMiddleware from '../middleware/ensureNameExists.middleware';
import ensureIdAlreadyExistsMiddleware from '../middleware/ensureIdAlreadyExists.middleware';

const moviesRoutes: Router = Router();

moviesRoutes.post(
    '',
    ensureDataIsValidMiddleware(moviesSchemasRequest),
    ensureMovieNameExistsMiddleware,
    createMoviesControllers
);
moviesRoutes.get('', listMoviesControllers);
moviesRoutes.patch(
    '/:id',
    ensureIdAlreadyExistsMiddleware,
    ensureDataIsValidMiddleware(UpdateMoviesSchemas),
    ensureMovieNameExistsMiddleware,
    updateMoviesController
);
moviesRoutes.delete(
    '/:id',
    ensureIdAlreadyExistsMiddleware,
    deleteMoviesController
);

export default moviesRoutes;
