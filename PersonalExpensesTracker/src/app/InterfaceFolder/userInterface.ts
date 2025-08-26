import { userrole } from "../EnumFolder/role";

export interface users{
    id: string;
    name:string;
    email:string;
    password:any;
    role:userrole;
}