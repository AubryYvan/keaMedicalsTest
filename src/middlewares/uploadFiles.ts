import { Request, Response, NextFunction } from "express";
import { UploadedFile } from 'express-fileupload';

class Files {

    /**
     * this methods handles updload files
     *
     * @param req Request
     * @param res Response
     * @param next NextFunction
     */
    async uploadFiles (req: Request, res: Response, next: NextFunction) {

        if (req.files && req.files['document']) {
            let file: UploadedFile = req.files['document'] as UploadedFile;
            if (file.mimetype.split("/")[1] != "pdf") {
                return res.status(400).json({
                    message: "Formulaire invalide",
                    errors: [{
                        property: "document",
                        message: "le document doit être un pdf"
                    }]
                });
            }

            let filename = Date.now() +'.'+ file.mimetype.split("/")[1] ;
            req.body['curriculum'] = filename;
            file.mv(`./public/document/${filename}`);
        }

        next();
    }
}

export const File = new Files()