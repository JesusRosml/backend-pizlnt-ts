import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if( !MONGODB_URI ) throw new Error('La variable de entorno "MONGODB_URI" no tiene un valor');

mongoose
    .connect( MONGODB_URI )
    .then( () => console.log('Conexión exitosa a la base de datos'))
    .catch( error => console.log(`Error al conectar con la base de datos: ${ error }`) );

mongoose.connection.on( 'error', error => console.log(`Error de conexión a la base de datos: ${ error }`));

export default {
    moongoseConnection: mongoose.connection,
}