import { Model, Column, Table, DataType, BelongsToMany, BeforeCreate, HasMany } from 'sequelize-typescript';
import Role from './role';
import UserRole from './userRole';
import UserOffer from './userOffer';
import Offer from './offer';
import * as bcrypt from 'bcrypt';

interface UserExtraData {
    confirmPassword: string
}

@Table({
    tableName : "user",
    timestamps: true
})
export default class User extends Model implements UserExtraData  {

    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    firstname?: string;

    @Column({type: DataType.STRING, allowNull: false})
    lastname?: string;

    @Column({type: DataType.STRING, allowNull: false, unique: {name: 'email', msg: "Cet Email est déjà utilisé"}})
    email?: string;

    @Column({type: DataType.BIGINT, field: 'phone_number', allowNull: false, unique: {name: 'phone', msg: "Ce numero est déjà utilisé"}})
    phoneNumber?: string;

    @Column({type: DataType.STRING, allowNull: false})
    password?: string;

    @Column({type: DataType.STRING, allowNull: false})
    profession?: string;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    isActive?: boolean;

    @HasMany(() => Offer, { foreignKey: { name: "adminId", field: "admin_id"}, as: "adminOfer"})
    adminOffer?: Offer[];

    @BelongsToMany(() => Role, { through: () => UserRole, foreignKey: "userId", as: "roles"})
    roles?: Role[]|string[];

    @BelongsToMany(() => Offer, { through: () => UserOffer, foreignKey: "userId", as: "offers"})
    offers?: Offer[];

    confirmPassword: string;

    @BeforeCreate
    static async hashPassword(instance: User) {

        try {
            const hash = await bcrypt.hash(
                instance.password,
                +process.env['SALT_ROUNDS']
            );
            instance.setDataValue('password', hash);
        } catch (e) { }
    }

    getRoles(): string[] {
        let roles: string[] = ['Role_User'];
        this.roles.forEach((role:Role) => {
            roles.push(role.name);
        })

        return roles;
    }
}