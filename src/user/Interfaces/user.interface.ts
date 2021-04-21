import { Document, ObjectId } from 'mongoose';

export interface User extends Document {
    readonly _id: ObjectId;
    readonly email: string;
    readonly password: string;
    readonly phone: number;
    readonly name: string;
    readonly dni: string;
    readonly city: string;
    readonly birthDate: Date;
    readonly registrationDate: Date;
    readonly permissions: {
        admin: boolean;
    };
    readonly isActive: boolean;
}
