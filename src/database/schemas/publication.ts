import mongoose, { Document, Schema, Model } from 'mongoose';
import { getCurrentSchedule } from '../../utilities/getCurrentSchedule';

export interface IPublication extends Document {
    title: string;
    titleColor: string;
    description: string;
    descriptionColor: string;
    date: string;
    category: string;
    pathImage?: string;
    pathVideo?: string;
    user: string;
    email: string;
}

const publicationSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 150,
    },
    titleColor: {
        type: String,
        default: "#000000",
        minlength: 7,
        maxlength: 7,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    descriptionColor: {
        type: String,
        default: "#000000",
        minlength: 7,
        maxlength: 7,
    },
    category: {
        type: String,
        required: true,
        minlength: 3
    },
    user: {
        type: String,
        minlength: 10,
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
        minlength: 10, 
        maxlength: 255, 
    },
    pathImage: {
        type: String,
    },
    pathVideo: {
        type: String,
    },
    date: {
        type: String,
        default: () => getCurrentSchedule( new Date() ),
    }
});

const Publication: Model<IPublication> = mongoose.model<IPublication>(
    'Publication',
    publicationSchema
);

export default Publication;