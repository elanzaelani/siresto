import Pesanan from '../models/PesananModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';
import Kategori from '../models/KategoriModel.js';
import Menu from '../models/MenuModel.js';
import Produk from '../models/ProductModel.js';


export const getPesanan=async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Pesanan.findAll({
                attributes:['uuid','total_bayar'],
                include:[{
                    model:Menu,
                    attributes:['jumlah','total_harga',{
                        include:[{
                            model:Produk,
                            attributes:['kode','nama','harga','is_ready','gambar',{
                                include:Kategori,
                                attributes:['nama']
                            }]
                        }]
                    }]
                }]
            }) ;
        }else{
            response = await Pesanan.findAll({
                attributes:['uuid','total_bayar'],
                include:[{
                    model:Menu,
                    attributes:['jumlah','total_harga',{
                        include:[{
                            model:Produk,
                            attributes:['kode','nama','harga','is_ready','gambar',{
                                include:Kategori,
                                attributes:['nama']
                            }]
                        }]
                    }]
                }],
                where:{
                    userId:req.userId
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                },
                {
                    model:Kategori,
                    attributes:['nama']
                }
            ]
            }) ;
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    } 
}

export const getPesananById= async(req,res)=>{
    try {
        const pesanan = await Pesanan.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!pesanan)return res.status(404).json({msg:"Data Pesanan tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Pesanan.findOne({
                attributes:['uuid','total_bayar'],
                include:[{
                    model:Menu,
                    attributes:['jumlah','total_harga',{
                        include:[{
                            model:Produk,
                            attributes:['kode','nama','harga','is_ready','gambar',{
                                include:Kategori,
                                attributes:['nama']
                            }]
                        }]
                    }]
                }],
            }) ;
        }else{
            response = await Pesanan.findOne({
                attributes:['uuid','total_bayar'],
                include:[{
                    model:Menu,
                    attributes:['jumlah','total_harga',{
                        include:[{
                            model:Produk,
                            attributes:['kode','nama','harga','is_ready','gambar',{
                                include:Kategori,
                                attributes:['nama']
                            }]
                        }]
                    }]
                }],
                where:{
                    [Op.and]:[{id:pesanan.id},
                        {userId:req.userId}]
                    
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    } 
}
export const createPesanan= async(req,res)=>{
    const {totalBayar,menuId}=req.body;
    try {
        await Pesanan.create({
            totalBayar: totalBayar,
            menuId:menuId,
          
            userId:req.userId
        });
        res.status(201).json({msg: "Pesanan Created Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}
export const updatePesanan=async(req,res)=>{
    try {
        const pesanan= await Pesanan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!pesanan)return res.status(404).json({msg:"data tidak ditemukan"});
        const {totalBayar,menuId}=req.body;
        if(req.role === "admin"){
            await Pesanan.update({totalBayar,menuId},{
                where: {
                    id:pesanan.id
                }
            })
        }else{
            if(req.userId !== pesanan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Pesanan.update({totalBayar,menuId},{
                    where:{
                        [Op.and]:[{id:pesanan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Product Uipdated Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
export const deletePesanan=async(req,res)=>{
    try {
        const pesanan= await Pesanan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!pesanan)return res.status(404).json({msg:"data tidak ditemukan"});
        const {totalBayar,menuId}=req.body;
        if(req.role === "admin"){
            await Pesanan.destroy({
                where: {
                    id:pesanan.id
                }
            })
        }else{
            if(req.userId !== pesanan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Pesanan.destroy({
                    where:{
                        [Op.and]:[{id:pesanan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Pesanan deleted Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
