import bcrypt from 'bcrypt';
import User, { IUser } from '../../database/schemas/users';
import { Types } from 'mongoose';
import { ResponseResult } from '../interface/ResponseResult';

interface UserClass {
    name: string;
    surname: string; 
    secondSurname: string;
    email: string;
    password: string;
    career: string;
    admin: boolean;
    typeUser: string;
    registerUser(): Promise<ResponseResult>;
}

interface MessageAuth {
    message: string,
    authentication: boolean
    user?: IUserWithoutPassword 
}

interface IUserWithoutPassword extends Omit<IUser, 'password'> {
    _id: Types.ObjectId;
}

export class UserService implements UserClass {
    static async userAuthentication(email: string, password: string): Promise<MessageAuth> {
        try {
            const user = await User.findOne({ email }).select('password').lean();

            if ( !user ) return { message: 'Usuario no encontrado', authentication: false };

            const passwordMatch: boolean = await bcrypt.compare(password, user.password);

            if ( passwordMatch ) {
                const userWithoutPassword = await User.findOne({ email }).select('-password').lean();

                if ( userWithoutPassword ) {
                    const userWithoutPasswordTyped: IUserWithoutPassword = {
                        ...userWithoutPassword,
                        _id: new Types.ObjectId( userWithoutPassword._id.toString() )
                    };

                    return { message: 'Usuario autenticado', authentication: true, user: userWithoutPasswordTyped };
                }
            }

            return { message: 'Contraseña incorrecta', authentication: false };
        } catch ( error ) {
            console.error(`Error al autenticar al usuario: ${ error }`);

            return { message: 'Error interno del servidor', authentication: false };
        }
    }

    constructor(
        public name: string,
        public surname: string, 
        public secondSurname: string,
        public email: string,
        public password: string,
        public career: string,
        public admin: boolean,
        public typeUser: string,
    ) {}

    async registerUser(): Promise<ResponseResult> {
        try {
            const hashedPassword: string = await bcrypt.hash(this.password, 10);
            const newUser: IUser = new User({ 
                name: this.name, 
                surname: this.surname, 
                secondSurname: this.secondSurname, 
                email: this.email, 
                password: hashedPassword, 
                career: this.career, 
                admin: this.admin, 
                typeUser: this.typeUser
            });

            await newUser.save();

            return {
                register: true,
                message: 'Usuario registrado correctamente'
            };
        } catch ( error ) {
            console.log(`Error al registrar al usuario: ${ error }`);

            return { 
                register: false,
                message: 'Error interno del servidor'
            };
        }
    }
}