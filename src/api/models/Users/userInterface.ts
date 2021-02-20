import { Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    name: string;
}

export default IUser;