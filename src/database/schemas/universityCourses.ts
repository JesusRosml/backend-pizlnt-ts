import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICareerUniversity extends Document {
    name: string;
}

const careerUniversitySchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
        unique: true,
    }
});

const CareerUniversity: Model<ICareerUniversity> = mongoose.model<ICareerUniversity>(
    'CareerUniversity', 
    careerUniversitySchema 
);

export default CareerUniversity;