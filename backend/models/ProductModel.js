import sequelize from 'sequelize'
import db from '../config/Database.js'
import Kategori from './KategoriModel.js';
import User from './UserModel.js'

const { DataTypes } = sequelize;

const Produk = db.define('produks', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    kode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100] // min 3 karakter max 100 karakter
        }
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100] // min 3 karakter max 100 karakter
        }
    },

    harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    is_ready: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    gambar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kategoriId: {
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
    }

}, {
    freezeTableName: true
});

//membuat relasi
//One to Many = satu User bisa input byk product
User.hasMany(Produk);
Kategori.hasMany(Produk);
Produk.belongsTo(User, { foreignKey: 'userId' }),
    Produk.belongsTo(Kategori, { foreignKey: 'kategoriId' })

export default Produk;
