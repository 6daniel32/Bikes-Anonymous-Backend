import { model, Schema } from 'mongoose';
import IUser from './userInterface';

const CertificationCenterSchema: Schema = new Schema ({
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true},
    name: {type: String, required: true}
});

const CertificationCenter = model<IUser>('CertificationCenter', CertificationCenterSchema);

export default CertificationCenter;