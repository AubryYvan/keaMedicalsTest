import { Request, Response } from 'express';
import Offer from '../models/offer';
import User from '../models/user';

class OfferController {

    /**
     * This actions allows you to create a new offer
     *
     * @param Request req
     * @param Response res
     */
    public async create(req: Request, res: Response) {

        let  dataForms = res.locals['input'];
        dataForms["adminId"] = res.locals["user"].id;

        const offer = await Offer.create(dataForms);

        return res.status(201).json(offer);
    }

    /**
     * This actions allows you to retrieve the offers available
     *
     * @param Request req
     * @param Response res
     */
    public async list(req: Request, res: Response) {

        const offers = await Offer.findAll({
            attributes: {exclude: ['adminId', 'updatedAt']}
        });

        return res.json(offers);
    }

    /**
     * This actions allows you to save the new application of offer
     *
     * @param Request req
     * @param Response res
     */
    public async saveApplication(req: Request, res: Response) {

        const dataForms = res.locals["input"];
        const userId = res.locals["user"].id;
        const offers = await Offer.findByPk(dataForms["id"], {attributes: {exclude: ['adminId']}});
        const user = await User.findByPk(userId);
        await user.$add("offers", offers, {through: {curriculum: dataForms['curriculum']}});

        return res.status(201).json(offers);
    }

    /**
     * This actions list all candidature of user
     *
     * @param Resquest req
     * @param Response res
     */
    public async listApplication(req: Request, res: Response) {

        const users = await User.findAll({
            attributes: {exclude: ['updatedAt', 'createdAt', 'isActive', 'password', 'profession', 'email', 'id']},
            where: {isActive: true},
            include: [
                {
                    model: Offer, required: true, as: 'offers',
                    attributes: ['id'], through: {attributes: ['curriculum']}
                }
            ]
        });

        let usersToJson = [] as User[];
        for await (let user of users) {
            let userjson = user.toJSON() as User;
            for await (let offer of userjson.offers) {
                offer['UserOffer']['curriculum'] = req.protocol+'://'+req.hostname+':'+process.env['PORT']+'/document/'+offer['UserOffer']['curriculum'];
                usersToJson.push(userjson);
            }
        }

        return res.json(usersToJson);
    }
}

export const offerController = new OfferController();