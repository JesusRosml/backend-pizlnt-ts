import express, { Request, Response, Router } from 'express';
import { UserService } from './services/UserService';
import User from '../database/schemas/users';
import Joi from 'joi';

interface RegisterRequestBody {
    name: string;
    surname: string;
    secondSurname: string;
    email: string;
    password: string;
    career: string;
    admin: boolean;
    typeUser: string;
}

const validationRegisterSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    secondSurname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    career: Joi.string().required(),
    admin: Joi.boolean().required(),
    typeUser: Joi.string().required()
});

export const router: Router = express.Router();

router.post( '/register', async ( req: Request<{}, {}, RegisterRequestBody>, res: Response ): Promise<void> => {
    const { error, value } = validationRegisterSchema.validate( req.body );

    if( error ) {
        res.status( 400 ).json({ message: error.details[0].message });

        return;
    }

    const { name, surname, secondSurname, email, password, career, admin, typeUser } = value;
   
    try {
        const existingUser = await User.findOne({ email });

        if( existingUser ) {
            res.status( 409 ).json({ message: 'El correo ya esta registrado' });

            return;
        }

        const userService = new UserService( name, surname, secondSurname, email, password, career, admin, typeUser );
        const resultUserService = await userService.registerUser();

        if( resultUserService.register ) {
            res.status( 201 ).json( resultUserService );

            return;
        }
        
        res.status( 500 ).json( resultUserService );
    } catch ( error ) {
        console.error(`Error al registrar al usuario: ${ ( error instanceof Error ) ? error.message : 'Error desconocido' }`);

        res.status( 500 ).json({ message: 'Error interno del servidor' });
    }
});