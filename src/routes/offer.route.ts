/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Application } from 'express';
import  { offerController } from '../controllers/offer.controller';
import {formValidator} from '../middlewares/formsValidator';
import { authenticator } from '../middlewares/authenticateToken';
import {catchError} from '../middlewares/catchError';
import {OfferValidator, applicationValidator} from '../validators/offer.validator';
import {File} from '../middlewares/uploadFiles';

class offerRoute {

    public config(app: Application) {

        app.route("/admin/offer")
            .post([authenticator, formValidator(OfferValidator, ['save'])], catchError(offerController.create));
        app.route("/user/offer")
            .get([authenticator], catchError(offerController.list));
        app.route("/user/application")
            .post([authenticator, File.uploadFiles, formValidator(applicationValidator, ['application'])], catchError(offerController.saveApplication));
        app.route("/admin/application")
            .get([authenticator], catchError(offerController.listApplication));
    }
}

export default new offerRoute();