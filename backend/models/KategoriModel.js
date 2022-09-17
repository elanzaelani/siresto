import sequelize from "sequelize";
import db from '../config/Database.js'


const {DataTypes}= sequelize;
const Kategori = db.define("kategori",{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    nama:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        },
    }
},{
    freezeTableName:true
});
export default Kategori;