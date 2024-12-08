import { Types } from 'mongoose';
import CareerUniversity, { ICareerUniversity } from '../../database/schemas/universityCourses';
import { ResponseResult } from '../interface/ResponseResult';

interface CareerUniversityClass {
    name: string;
    registerCareerUniversity(): Promise<ResponseResult>;
}

interface CareerUniversityObjet extends ICareerUniversity {
    _id: Types.ObjectId;
}

export class UniversityCareerService implements CareerUniversityClass {
    static async getAllUniversityCareers(): Promise<CareerUniversityObjet[]> {
        try {
            const searchUniversityCareers: ICareerUniversity[] = await CareerUniversity.find();

            if( searchUniversityCareers ) {
                const universityCareers: CareerUniversityObjet[] = searchUniversityCareers.map( career => ({
                    ...career.toObject(),
                    _id: new Types.ObjectId( ( career._id as string).toString() )
                }));

                return universityCareers;
            }

            return [];
        } catch ( error ) {
            console.error(`Error al obtener las carreras universitarias: ${ error }`);

            return [];
        } 

    }

    constructor(
        public name: string
    ) {}

    public async registerCareerUniversity(): Promise<ResponseResult> {
        try {
            const upperCaseCareerUniversity = await UniversityCareerService.getAllUniversityCareers();
            const existsCareerUniversity = upperCaseCareerUniversity.find( career => career.name.toUpperCase() === this.name.toUpperCase() );

            if( existsCareerUniversity ) return { message: 'La carrera ya existe', register: false }
            
            const newCareerUniversity = new CareerUniversity({ name: this.name });

            await newCareerUniversity.save();

            return { message: 'Carrera registrada correctamente', register: true }
        } catch ( error ) {
            console.error(`Error al registrar la carrera: ${ error }`);

            return { message: 'Error interno del servidor', register: false }
        }
    }
}