import express, { Request, Response } from 'express';
import { UniversityCareerService } from './services/UniversityCareerService';
import Joi from 'joi';

interface RegisterRequestBody {
    nameCareerUniversity: string;
}

const validationRegisterSchema = Joi.object({
    nameCareerUniversity: Joi.string().required()
});

export const router = express.Router();

router.post('/registerCareer', async( req: Request<{}, {}, RegisterRequestBody>, res: Response ): Promise<void> => {
    const { error, value } = validationRegisterSchema.validate( req.body );

    if( error ) {
        res.status( 400 ).json({ message: error.details[0].message });

        return;
    }

    const { nameCareerUniversity } = value;

    try {
        const careerUniversity = new UniversityCareerService( nameCareerUniversity );
        const registerResult = await careerUniversity.registerCareerUniversity();

        if( registerResult.register ) {
            res.status( 201 ).json( registerResult );

            return;
        }

        res.status( 401 ).json( registerResult );
    } catch ( error ) {
        console.error(`Error al registrar la carrera: ${ error }`);

        res.status( 500 ).json({ message: 'Error interno del servidor' });
    }
});