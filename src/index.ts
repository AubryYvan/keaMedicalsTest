import Server from './server';
import  { sequelize } from './models/index';
import {loadRoles, loadAdmin} from './libraries/helpers'

Server.listen(process.env['PORT'], () => {
    console.log("server started");
    sequelize.authenticate().then(async () => {
        console.log("connexion etablie");
        await sequelize.sync({alter: true});
        await loadRoles();
        await loadAdmin();
    });
});