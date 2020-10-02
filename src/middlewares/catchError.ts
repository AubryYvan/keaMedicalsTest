import { Response, Request, NextFunction } from "express"


/**
 * message format general for error
 */
export const responseErrors = () => {
    return {
        message: 'une erreur interne est survenue. Veuillez reessayer plutard !',
        errors :[] as any[]
    };
};

/**
 * catch error handler for all methods
 */
export const catchError = (handler: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res);
        } catch (error) {
            return res.status(500).json(responseErrors());
        }
    };
}