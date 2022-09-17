import sequelize from 'sequelize';
import db from "../config/Database.js";
import Produk from './ProductModel.js';

const {DataTypes}=sequelize;
const Menu = db.define("menus",{
    uuid: {
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    jumlah: {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    total_harga: {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    produkId: {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

},{freezeTableName:true});
Produk.hasMany(Menu);
Menu.belongsTo(Produk,{foreignKey:"produkId"})

export default Menu;