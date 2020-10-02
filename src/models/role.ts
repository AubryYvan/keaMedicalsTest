import { Model, Column,Table, DataType, BelongsToMany } from 'sequelize-typescript';
import User from './user';
import UserRole from './userRole';

@Table({
    tableName: "role",
    timestamps: true
})
export default class Role extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    id?: number;

    @Column({type: DataType.STRING, unique:true})
    name?: string;

    @Column({type: DataType.TEXT})
    description?: string;

    @BelongsToMany(() => User, () => UserRole, "roleId")
    users?: User[];
}