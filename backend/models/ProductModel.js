import sequelize from 'sequelize'
import {Sequelize} from 'sequelize'
import db from '../config/Database.js'
import Users from './UserModel.js'  

const {DataTypes}= sequelize;

const Products = db.define('product',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
     },
     name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
     price:{
         type:DataTypes.INTEGER,
         allowNull:false,
         validate:{
             notEmpty:true
         }
     },
     userId:{
         type:DataTypes.INTEGER,
         allowNull:false,
         validate:{
             notEmpty:true
         }
     }

},{
    freezeTableName:true
});

//membuat relasi
//One to Many = satu User bisa input byk product
Users.hasMany(Products);
Products.belongsTo(Users,{foreignKey:'userId'})

export default Products;
