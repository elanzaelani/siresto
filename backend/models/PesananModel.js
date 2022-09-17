import sequelize from 'sequelize';
import db from '../config/Database.js';
import Menu from './MenuModel.js';
import User from './UserModel.js';

const { DataTypes } = sequelize;
const Pesanan = db.define("pesanan", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    totalBayar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, { freezeTableName: true });

User.hasMany(Pesanan);
Menu.hasMany(Pesanan);
Pesanan.belongsTo(User,{foreignKey:"userId"})
Pesanan.belongsTo(Menu,{foreignKey:"menuId"})
export default Pesanan;