import Role from '../models/role';
import User from '../models/user';
import {sequelize} from '../models/index';

export const loadRoles = async () => {
    const roles = [ {name: 'Role_Admin'} ];

    for await (let role of roles) {
        try {
            await Role.create(role);
        } catch (e) {
            console.log(`Role ${role.name} already exists !!! `+e.message);
        }
    }
}

export const loadAdmin = async () => {

    const admin = {
        firstname: "kea", lastname: "medicals", email: 'keamedicals@rectruments.fr',
        phoneNumber: 237693200781, password: "keaMedicals", profession: 'recruteur'
    };

    let transaction;
    try {
        transaction  = await sequelize.transaction();
        const adminUser = await User.create(admin, {transaction});
        const role = await Role.findOne({where: {name: 'Role_Admin'}, transaction});
        await adminUser.$add('roles', role, {transaction});
        await transaction.commit();
    } catch (e) {
        if (transaction) await transaction.rollback();
    }
}