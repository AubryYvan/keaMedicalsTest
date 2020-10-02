import { Model, Column, Table, ForeignKey, DataType } from 'sequelize-typescript';
import User from './user';
import Offer from './offer';

@Table({
    tableName: "user_offer",
    timestamps: false
})
export default class UserOffer extends Model {

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Offer)
    @Column
    offerId!: number;

    @Column({type: DataType.STRING})
    curriculum: string;
}