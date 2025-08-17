import { IsString, Length, Matches } from "class-validator";

export class VerifyCodeDTO {
    @IsString({ message: 'Verification code must be a string' })
    @Matches(/^\d{6}$/, { message: 'Verification code must be exactly 6 digits' })
    code!: string;
}