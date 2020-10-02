import { Response, Request, NextFunction } from "express"

export const responseErrors = () => {
    return {
        message: 'une erreur interne est survenue. Veuillez reessayer plutard !',
        errors :[] as any[]
    };
};

export const catchError = (handler: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res);
        } catch (error) {
            console.log(error)
            //next(error);
            const response = error.response;
            if (response) return res.status(response.status).json(response.data);

            return res.status(500).json(responseErrors());
        }
    };
}