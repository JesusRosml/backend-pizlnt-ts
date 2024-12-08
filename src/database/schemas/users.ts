import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    surname: string;
    secondSurname: string;
    email: string;
    password: string;
    career: string;
    admin: boolean;
    typeUser: string;
}

const userSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 }, 
    surname: { type: String, required: true, minlength: 3, maxlength: 50 },
    secondSurname: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, minlength: 10, maxlength: 255, index: true, unique: true},
    password: { type: String, required: true, minlength: 8, maxlength: 1024 },
    career: { type: String, required: true, minlength: 3, maxlength: 50 },
    admin: { type: Boolean, required: true },
    typeUser: { type: String, required: true, minlength: 3, maxlength: 50 },
});

const User: Model<IUser> = mongoose.model<IUser>( 'User', userSchema );

export default User;