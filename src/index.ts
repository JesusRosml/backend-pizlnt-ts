import express, { Application } from 'express';
import cors from 'cors';
import connectionDatabase from './database/connection-database';
import { authenticationRoute, createPublicationRoute, getAllUniversityCareersRoute, getPublicationsRoute, registerRoute, registerUniversityCareerRoute } from './routes';

(() => {
    const app: Application = express();
    const PORT: string = process.env.PORT || '3000';
    
    connectionDatabase.moongoseConnection;

    app.use(cors({
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use('/uploads', express.static('uploads'));

    app.use( express.json() );
    app.use( authenticationRoute );
    app.use( registerRoute );
    app.use( registerUniversityCareerRoute );
    app.use( getAllUniversityCareersRoute );
    app.use( createPublicationRoute );
    app.use( getPublicationsRoute );

    app.listen( PORT, () => {
        console.log(`Server is running in http://localhost:${ PORT }`);
    });
})();