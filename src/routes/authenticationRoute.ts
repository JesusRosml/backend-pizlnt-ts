import express, { Request, Response } from 'express';
import { UserService } from './services/UserService';
import Joi from 'joi';

interface AuthenticationRequestBody {
    email: string;
    password: string;
}

const validationAuthenticationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const router = express.Router();

router.post('/login', async( req: Request<{}, {}, AuthenticationRequestBody>, res: Response): Promise<void> => {
    const { error, value } = validationAuthenticationSchema.validate( req.body );

    if( error ) {
        res.status( 400 ).json({ message: error.details[0].message });

        return;
    }

    const { email, password } = value;

    try {
        const isAuthenticated = await UserService.userAuthentication( email, password );

        if( isAuthenticated.authentication ) {
            res.json( isAuthenticated );

            return;
        }

        res.status( 401 ).json( isAuthenticated );
    } catch ( error ) {
        console.error(`Error al autenticar al usuario: ${ error }`);

        res.status( 500 ).json({ message: 'Error interno del servidor' });
    }
});