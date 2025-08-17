import { IsEmail, IsString, Length, Matches } from "class-validator";

export class RegisterUserDTO {
    @IsEmail({}, { message: 'Invalid email' })
    email!: string;

    @Length(3, 50, { message: 'Name must be between 3 and 50 characters long' })
    name!: string;

    @Length(6, 100, { message: 'Password must be at least 6 characters long' })
    password!: string

    @IsString()
    @Matches(/^\d{11}$/, { message: 'CPF must contain exactly 11 numbers' })
    cpf!: string;
    
}