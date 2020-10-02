import * as jwt from 'jsonwebtoken'
import User from '../models/user'

export class UserLibrary {

    private readonly _jwtSecret = process.env['ACCESS_TOKEN_SECRET'];

    /**
     * This method creates access token with user infos and secret key
     */
    public generateAccessToken(u: User): object {
        const { id, email, firstname, lastname, phoneNumber, isActive} = u;

        return {
            token: jwt.sign({
                    id, email, firstname, lastname, phoneNumber, isActive,
                    roles: u.getRoles()
                },
                this._jwtSecret, { expiresIn: '18000000s'}
            )
        };
    }
}
