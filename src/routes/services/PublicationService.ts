import { Types } from 'mongoose';
import Publication, { IPublication } from '../../database/schemas/publication';
import { ResponseResult } from '../interface/ResponseResult';
import { convertImageBase64 } from '../../utilities/convertImageBase64';
import { getVideoData } from '../../utilities/getVideoData';

interface PublicationClass {
  title: string;
  titleColor: string;
  description: string;
  descriptionColor: string;
  category: string,
  user: string;
  email: string;
  pathImage?: string;
  pathVideo?: string;
  createPublication(): Promise<ResponseResult>;
}

interface PublicationObject extends IPublication {
  _id: Types.ObjectId;
}

export class PublicationService implements PublicationClass {
  static async getAllPublicationCategory( category: string ): Promise<PublicationObject[]> {
    try {
      const searchPublications: IPublication[] = await Publication.find({ category: category });
      
      if( searchPublications ) {
        const publications: PublicationObject[] = searchPublications.map( publication => ({
            ...publication.toObject(),
            _id: new Types.ObjectId( ( publication._id as string).toString() ),
        }));

        return publications;
      }

    return [];
    } catch ( error ) {
      console.error(`Error al obtener todas las publicaciones de ${ category }: ${ error }`);

      return [];
    }
  }

  constructor(
    public title: string,
    public titleColor: string,
    public description: string,
    public descriptionColor: string,
    public category: string,
    public user: string,
    public email: string,
    public pathImage?: string,
    public pathVideo?: string,
  ) {}

  public async createPublication(): Promise<ResponseResult> {
    try {
      const newPublication: IPublication = new Publication({
        title: this.title,
        titleColor: this.titleColor,
        description: this.description,
        descriptionColor: this.descriptionColor,
        category: this.category,
        user: this.user,
        email: this.email,
        pathImage: this.pathImage,
        pathVideo: this.pathVideo
      });

      await newPublication.save();

      return {
        register: true,
        message: 'Publicación registrada correctamente'
      }
    } catch ( error ) {
      console.log(`Error al registrar la publicación: ${ error }`);

      return { 
          register: false,
          message: 'Error interno del servidor'
      };
    }
  }
}
