import Produk from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import { Op } from 'sequelize';
import Kategori from '../models/KategoriModel.js';
import Keranjang from '../models/KeranjangModel.js';


export const getKeranjangs = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Keranjang.findAll({
                attributes: ['uuid', 'jumlah', 'total_harga', 'keterangan'],
                include: [{
                    model: Produk,
                    attributes: ['kode', 'nama', 'harga', 'is_ready', 'gambar', {
                        include: [{
                            model: Kategori,
                            attributes: ['nama']
                        }],
                    }],
                }]
            });
        } else {
            response = await Keranjang.findAll({
                attributes: ['uuid', 'jumlah', 'total_harga', 'keterangan'],
                include: [{
                    model: Produk,
                    attributes: ['kode', 'nama', 'harga', 'is_ready', 'gambar', {
                        include: [{
                            model: Kategori,
                            attributes: ['nama']
                        }],
                    }],
                }],
                where: {
                    userId: req.userId
                },
                // // include: [{
                // //     model: User,
                // //     attributes: ['name', 'email']
                // // },
                // // {
                // //     model: Kategori,
                // //     attributes: ['nama']
                // // }
                // ]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getKeranjangById = async (req, res) => {
    try {
        const keranjang = await Keranjang.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!keranjang) return res.status(404).json({ msg: "Data Keranjang tidak ditemukan.." })
        let response;
        if (req.role === "admin") {
            response = await Keranjang.findOne({
                attributes: ['uuid', 'jumlah', 'total_harga', 'keterangan'],
                include: [{
                    model: Produk,
                    attributes: ['kode', 'nama', 'harga', 'is_ready', 'gambar', {
                        include: [{
                            model: Kategori,
                            attributes: ['nama']
                        }],
                    }],
                }],
                where: {
                    id: keranjang.id
                },
                // include: [{
                //     model: User,
                //     attributes: ['name', 'email']
                // },
                // {
                //     model: Kategori,
                //     attributes: ['nama']
                // }
                // ]
            });
        } else {
            response = await Keranjang.findOne({
                attributes: ['uuid', 'jumlah', 'total_harga', 'keterangan'],
                include: [{
                    model: Produk,
                    attributes: ['kode', 'nama', 'harga', 'is_ready', 'gambar', {
                        include: [{
                            model: Kategori,
                            attributes: ['nama']
                        }],
                    }],
                }],
                where: {
                    [Op.and]: [{ id: keranjang.id },
                    { userId: req.userId }]

                },
                // include: [{
                //     model: User,
                //     attributes: ['name', 'email']
                // }]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
export const createKeranjang = async (req, res) => {
    const { jumlah,total_harga,produkId,keterangan } = req.body;
    try {
        await Keranjang.create({
            jumlah: jumlah,
            total_harga: total_harga,
            produkId: produkId,
            keterangan: keterangan,
           
            userId: req.userId
        });
        res.status(201).json({ msg: "Keranjang Created Succesfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}
export const updateKeranjang = async (req, res) => {
    try {
        const keranjang = await Keranjang.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!keranjang) return res.status(404).json({ msg: "data tidak ditemukan" });
        const { jumlah,total_harga,produkId,keterangan} = req.body;
        if (req.role === "admin") {
            await Keranjang.update({ jumlah,total_harga,produkId,keterangan }, {
                where: {
                    id: keranjang.id
                }
            })
        } else {
            if (req.userId !== keranjang.userId) return res.status(403).json({ msg: "Akses terlarang" })
            await Produk.update({ jumlah,total_harga,produkId,keterangan}, {
                where: {
                    [Op.and]: [{ id: keranjang.id },
                    { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Keranjang Uipdated Succesfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })

    }

}
export const deleteKeranjang = async (req, res) => {
    try {
        const keranjang = await Keranjang.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!keranjang) return res.status(404).json({ msg: "data tidak ditemukan" });
        const { jumlah,total_harga,produkId,keterangan } = req.body;
        // if (req.role === "admin") {
            await Keranjang.destroy({
                where: {
                    id: keranjang.id
                }
            })
        // } else {
        //     if (req.userId !== keranjang.userId) return res.status(403).json({ msg: "Akses terlarang" })
        //     await Produk.destroy({
        //         where: {
        //             [Op.and]: [{ id: produk.id },
        //             { userId: req.userId }]
        //         }
        //     });
        // }
        res.status(200).json({ msg: "Keranjang deleted Succesfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })

    }

}
