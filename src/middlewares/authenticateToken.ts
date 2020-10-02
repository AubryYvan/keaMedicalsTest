/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Response, Request, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import User from '../models/user';


/**
 * This methods handles Authentication and Authorizations
 */
export const authenticator = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const paths  = req.path.split("/");

    if (["user", "admin"].includes(paths[1])) {

        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env['ACCESS_TOKEN_SECRET'] as string, (err: any, user: User) => {

            if (err || !user.isActive || ("user" === paths[1] && !((user.roles as string[]).includes("Role_User")))
                || ("admin" === paths[1] && !((user.roles as string[]).includes("Role_Admin"))) ) {
                return res.sendStatus(403);
            }

            res.locals['user'] = user;

            next();
        });
    }
}