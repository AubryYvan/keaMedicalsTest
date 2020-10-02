/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { validate } from "class-validator";
import { NextFunction, Response, Request } from "express";
import { plainToClass, classToPlain } from "class-transformer";
import {responseErrors} from '../middlewares/catchError';

export const formValidator = (dtoClass: any, groups: string[] = []) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const output: any = plainToClass(dtoClass, req.body, { groups, enableImplicitConversion: true });
        validate(output, { validationError: { target: false }, groups })
        .then(errors => {
            const responseError = responseErrors();
            responseError.message = "Formulaire invalide";

            if (errors.length > 0) {
                errors.forEach((item, index) => {
                    const message = Object.values(item.constraints)[0];
                    delete errors[index].children;
                    delete errors[index].constraints;
                    responseError.errors.push(item);
                    responseError.errors[index]['message'] = message;
                });

                return res.status(400).json(responseError);
            }

            res.locals.input = classToPlain(output, {groups});
            next();
        });
    };
};

