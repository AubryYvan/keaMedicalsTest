/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Application } from 'express';
import  { userController } from '../controllers/user.controller';
import {formValidator} from '../middlewares/formsValidator';
import {catchError} from '../middlewares/catchError';
import { authenticator } from '../middlewares/authenticateToken';
import {UserValidator} from '../validators/user.validator';

class userRoute {

    public config(app: Application) {

        app.route("/register")
            .post(formValidator(UserValidator, ['register']), catchError(userController.register));
        app.route("/login")
            .post(formValidator(UserValidator, ['login']), catchError(userController.login));
        app.route("/admin/user/:id([0-9]+)")
            .delete(authenticator, catchError(userController.delete));
    }
}

export default new userRoute();