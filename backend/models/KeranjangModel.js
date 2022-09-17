import sequelize from "sequelize";
import db from '../config/Database.js';
import Kategori from "./KategoriModel.js";
import Produk from "./ProductModel.js";

const { DataTypes } = sequelize;
const Keranjang = db.define("keranjangs", {

    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    },
    total_harga: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    },

    keterangan: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true

});
Produk.hasMany(Keranjang);

Keranjang.belongsTo(Produk, { foreignKey: 'produkId' })

export default Keranjang;
