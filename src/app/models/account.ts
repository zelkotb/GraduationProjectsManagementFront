import { Role } from './role';

export class Account {

    id: number
    login : string;
    password : string;
    email : string;
    roles : Role [];
}
