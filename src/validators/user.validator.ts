import {Expose, Exclude } from 'class-transformer'
import User from '../models/user';
import {IsNotEmpty, IsEmail, Length, ValidateIf, Equals, IsInt,
        ValidatorConstraint, ValidatorConstraintInterface,
        ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';


@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments) {
        return email
            ? ! await User.findOne({where: {email}})
            : false;
    }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint
        });
   };
}

@ValidatorConstraint({ async: true })
export class IsPhoneAlreadyExistConstraint implements ValidatorConstraintInterface {

    async validate(phoneNumber: number, args: ValidationArguments) {
        return phoneNumber
            ? ! await User.findOne({where: {phoneNumber}})
            : false;
    }
}

export function IsPhoneAlreadyExist(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneAlreadyExistConstraint
        });
   };
}

@Exclude()
export class UserValidator {

    @Expose({ groups: ['register'] })
    @IsUserAlreadyExist({ message: "Cet email existe déjà", groups: ['register'] })
    @IsEmail({}, { message: "Email invalide", groups: ['register'] })
    @IsNotEmpty({ message: "champ requis" , groups: ['register'] })
    email: string;

    @Expose({ groups: ['register', 'login'] })
    @Length(5, 40, {message: "ce champ doit être compris entre 5 et 40 caractéres", groups: ["login", 'register'] })
    @IsNotEmpty({ message: "champ requis", groups: ["login", 'register'] })
    password: string;

    @Expose({ groups: ['register'] })
    @Equals("", { message: "Les mots de passes ne correspondent pas", groups: ['register'] })
    @ValidateIf((u: User) => u.confirmPassword !== u.password, { message: "Les mots de passes ne correspondent pas", groups: ['register'] })
    @IsNotEmpty({ message: "champ requis", groups: ['register'] })
    confirmPassword: string;

    @Expose({ groups: ['register'] })
    @Length(3, 100, { message: "ce champ doit être compris entre 3 et 100 caractéres", groups: ['register'] })
    @IsNotEmpty({ message: "champ requis", groups: ['register'] })
    lastname: string;

    @Expose({ groups: ['register'] })
    @Length(3, 100, { message: "ce champ doit être compris entre 3 et 100 caractéres", groups: ['register'] })
    @IsNotEmpty({ message: "champ requis", groups: ['register'] })
    firstname: string;

    @Expose({ groups: ['register', 'login'] })
    //@IsInt({groups: ['register', 'login'], message: "le numero doit être un entier. exemple: phoneNumber: 237693200781"})
    @IsPhoneAlreadyExist({ message: "Ce numero existe déjà", groups: ['register'] })
    @IsNotEmpty({ message: "champ requis", groups: ['register', 'login'] })
    phoneNumber: string;

    @Expose({ groups: ['register'] })
    @IsNotEmpty({ message: "champ requis", groups: ['register'] })
    profession: string;
}