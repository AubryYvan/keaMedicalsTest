import {Expose, Exclude, Transform } from 'class-transformer'
import {IsNotEmpty, IsInt, MinDate, IsDate, ValidatorConstraint, ValidationOptions,
    ValidatorConstraintInterface, ValidationArguments, registerDecorator,
    } from 'class-validator';
import Offer from '../models/offer';

@Exclude()
export class OfferValidator {

    @Expose({ groups: ['save'] })
    @IsNotEmpty({ message: "champ requis" , groups: ['save'] })
    label?: string;

    @Expose({ groups: ['save'] })
    @IsNotEmpty({ message: "champ requis", groups: ['save'] })
    description?: string;

    @Expose({ groups: ['save'] })
    @IsInt({message: "ce champ doit être un entier", groups: ['save']})
    @IsNotEmpty({ message: "champ requis", groups: ['save'] })
    experiences?: number;

    @Expose({ groups: ['save'] })
    @IsNotEmpty({ message: "champ requis", groups: ['save'] })
    qualification?: string;

    @Expose({ groups: ['save'] })
    @IsInt({message: "ce champ doit être un entier", groups: ['save']})
    @IsNotEmpty({ message: "champ requis", groups: ['save'] })
    availablePlaces?: number;

    @Expose({ groups: ['save'] })
    @MinDate(new Date(), {groups: ['save'], message: `La date doit être superieure ou egale à ${(new Date()).toLocaleDateString()} `})
    @IsDate({groups: ['save'], message: `La date doit être au format YYYY-MM-DD`})
    @IsNotEmpty({ message: "champ requis", groups: ['save'] })
    expiryAt?: Date;
}


@ValidatorConstraint({ async: true })
export class IsOfferExist implements ValidatorConstraintInterface {

    async validate(id: number, args: ValidationArguments) {
        id = +id;
        return id && id > 0
            ? !! await Offer.findOne({ where: {id} })
            : false;
    }
}

export function IsOfferExistInDb(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsOfferExist
        });
   };
}

@Exclude()
export class applicationValidator {

    @Expose({ groups: ['application'] })
    @IsOfferExistInDb({ message: "ce champ est invalide", groups: ['application'] })
    @Transform(value => (+value >=0 && (value+"").trim() !== "") ? +value: value , { toClassOnly: true })
    @IsNotEmpty({ message: "champ requis" , groups: ['application'] })
    id?: string;

    @Expose({ groups: ['application'] })
    @IsNotEmpty({ message: "champ requis", groups: ['application'] })
    curriculum?: string;


}