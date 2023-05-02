import { z } from 'zod';

const movieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number().positive(),
    price: z.number().positive().int(),
});

const moviesSchemasRequest = movieSchema.omit({ id: true });

const UpdateMoviesSchemas = moviesSchemasRequest.partial();

const moviesSchemasResponseArr = z.array(movieSchema);

export {
    movieSchema,
    moviesSchemasRequest as moviesSchemasRequest,
    moviesSchemasResponseArr,
    UpdateMoviesSchemas,
};
