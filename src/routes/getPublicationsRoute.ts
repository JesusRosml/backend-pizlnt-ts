import express, { Request, Response } from 'express';
import { PublicationService } from './services/PublicationService';
import { convertImageBase64 } from '../utilities/convertImageBase64';
import { getVideoData } from '../utilities/getVideoData';

export const router = express.Router();
const BASE_URL = 'http://localhost:3000';

router.post('/getPublications', async( req: Request, res: Response ) => {
    try {
        const { category } = req.body;
        const allPublications = await PublicationService.getAllPublicationCategory( category );
        const publications = allPublications.map( publication => {
            const { pathVideo, pathImage, ...rest } = publication;

            return {
                ...rest,
                image: ( pathImage ) ? convertImageBase64( pathImage ) : null,
                video: ( pathVideo ) ? getVideoData( pathVideo, BASE_URL ) : null
            };
        });

        res.status( 201 ).json( publications );
    } catch ( error ) {
        console.error(`Error al obtener las publicaciones: ${ error }`);

        res.status( 500 ).json({ message: 'Error interno del servidor' });
    }
});