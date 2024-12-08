import express, { Request, Response } from 'express';
import { UniversityCareerService } from './services/UniversityCareerService';

export const router = express.Router();

router.get('/careerUniversity', async( req: Request, res: Response ) => {
    try {
        const allUniversityCareer = await UniversityCareerService.getAllUniversityCareers();

        res.status( 201 ).json( allUniversityCareer );
    } catch ( error ) {
        console.error(`Error al obtener las carreras universitarias: ${ error }`);

        res.status( 500 ).json({ message: 'Error interno del servidor' });
    }
});