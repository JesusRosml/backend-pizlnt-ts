import { Request } from 'express';

declare module 'express' {
    export interface Request {
        fileValidationError?: string;
        validationError?: string;
    }
}