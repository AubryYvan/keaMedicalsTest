import { Request, Response } from 'express';
import { UserLibrary } from '../libraries/user';
import User from '../models/user';
import Role from '../models/role';
import * as bcrypt from 'bcrypt';

class UserController {

    /**
     * This actions allows you to register user
     *
     * @param Request req
     * @param Response res
     */
    public async register(req: Request, res: Response) {

        await User.create(res.locals['input']);

        return res.status(201).json({message: "compte enregisté avec succés"});
    }

    /**
     * This actions allows you to login user
     *
     * @param Resquest req
     * @param Response res
     */
    public async login(req: Request, res: Response) {

        let dataForms = res.locals['input'];
        const u = await User.findOne({
            where: {phoneNumber: dataForms['phoneNumber'], isActive: true},
            include: [{model: Role}]
        });

        if (u && bcrypt.compareSync(dataForms['password'], u.password)) {

            const userLibrary = new UserLibrary();
            const token = userLibrary.generateAccessToken(u);

            return res.status(200).json(token);
        }

        return res.status(400).json({ message: "Email ou Mot de passe incorrect", errors: [] });
    }

    /**
     * This actions allows you to delete user
     *
     * @param Resquest req
     * @param Response res
     */
    public async delete(req: Request, res: Response) {

        const id = +req.params['id'];

        const rows = await User.update({isActive: false}, {where: {isActive: true, id}})

        return rows[0] ? res.status(204).json()
            : res.status(404).json({message: "resource not found", errors: []});
    }

}

export const userController = new UserController();