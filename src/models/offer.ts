import { Model, Column, Table, DataType, BelongsToMany, BeforeCreate, BelongsTo } from 'sequelize-typescript';
import User from './user';
import UserOffer from './userOffer';

@Table({
    tableName : "offer",
    timestamps: true
})
export default class Offer extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    label?: string;

    @Column({type: DataType.TEXT, allowNull: false})
    description?: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    experiences?: number;

    @Column({type: DataType.STRING, allowNull: false})
    qualification?: string;

    @Column({type: DataType.INTEGER, field: 'available_places', allowNull: false})
    availablePlaces?: number

    @Column({type: DataType.DATE, allowNull: false})
    expiryAt?: Date;

    @BelongsToMany(() => User, { through: () => UserOffer, foreignKey: "offerId", as: "users"})
    users?: User[];

    @BelongsTo(() => User, { foreignKey: { name: "adminId", field: "admin_id"}, as : "adminUser"})
    adminUser?: User;
}