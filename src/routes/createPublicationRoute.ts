import express, { NextFunction, Request, Response } from 'express';
import { PublicationService } from './services/PublicationService';
import Joi from 'joi';
import upload from '../utilities/multerConfig';
import fs from 'fs';

interface PublicationRequestBody {
    title: string;
    titleColor: string;
    description: string;
    descriptionColor: string;
    category: string;
    image?: string;
    video?: string;
    user: string;
    email: string;
}

const validationPublicationSchema = Joi.object({
    title: Joi.string().min(10).required(),
    titleColor: Joi.string().required(),
    description: Joi.string().min(10).required(),
    descriptionColor: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().optional(),
    video: Joi.string().optional(),
    user: Joi.string().required(),
    email: Joi.string().email().required()
});

export const router = express.Router();

const validatePublication = (req: Request, res: Response, next: NextFunction) => {
    const { title, titleColor, description, descriptionColor, category, user, email } = req.body;

    const { error } = validationPublicationSchema.validate({
        title,
        titleColor,
        description,
        descriptionColor,
        category,
        user,
        email
    });

    if (error) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files) {
            Object.values(files).forEach((fileArray) => {
                fileArray.forEach((file) => {
                    fs.unlinkSync(file.path); 
                });
            });
        }

        res.status(400).json({ message: error.details[0].message, register: false });

        return;
    }

    next();
};

router.post('/createPublication', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), validatePublication, async (req: Request<{}, {}, PublicationRequestBody>, res: Response): Promise<any> => {
    try {
        console.log( req.body );
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const imagePath = files['image'] ? files['image'][0].path : undefined;
        const videoPath = files['video'] ? files['video'][0].path : undefined;

        const { title, titleColor, description, descriptionColor, category, user, email } = req.body;

        const publicationService = new PublicationService(
            title,
            titleColor,
            description,
            descriptionColor,
            category,
            user,
            email,
            imagePath,
            videoPath
        );

        const resultSavePublication = await publicationService.createPublication();

        res.status(201).json(resultSavePublication);
    } catch (error) {
        console.error(`Error al registrar la publicación: ${error instanceof Error ? error.message : 'Error desconocido'}`);

        res.status(500).json({ message: 'Error interno del servidor' });
    }
});