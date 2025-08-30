import { TuiDay } from "@taiga-ui/cdk";

export interface UserBase {
    name: string;
    birthDate: TuiDay;
    phoneNumber: string;
    email: string;
}