import { Model, Column, Table, ForeignKey, DataType } from 'sequelize-typescript';
import User from './user';
import Role from './role';

@Table({
    tableName: "user_role",
    timestamps: false
})
export default class UserRole extends Model {

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Role)
    @Column
    roleId!: number;
}