import Produk from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';
import Kategori from '../models/KategoriModel.js';


export const getProducts=async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Produk.findAll({
                attributes:['uuid','kode','nama','harga','is_ready','gambar'],
                include:[{
                    model:User,
                    attributes:['name','email']
                },{
                    model:Kategori,
                    attributes:['nama']
                }]
            }) ;
        }else{
            response = await Product.findAll({
                attributes:['uuid','kode','nama','harga','is_ready','gambar'],
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

export const getProductById= async(req,res)=>{
    try {
        const produk = await Produk.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!produk)return res.status(404).json({msg:"Data Produk tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Produk.findOne({
                attributes:['uuid','kode','nama','harga','is_ready','gambar'],
                where:{
                    id:produk.id
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
        }else{
            response = await Produk.findOne({
                attributes:['uuid','kode','nama','harga','is_ready','gambar',],
                where:{
                    [Op.and]:[{id:produk.id},
                        {userId:req.userId}]
                    
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }
        res.status(200).json(response)
    } catch (e) {
        res.status(500).json({msg:e.message})
    } 
}
export const createProduk= async(req,res)=>{
    const {kode,nama,harga,is_ready,gambar,kategoriId}=req.body;
    try {
        await Produk.create({
            kode: kode,
            nama:nama,
            harga:harga,
            is_ready:is_ready,
            gambar:gambar,
            kategoriId:kategoriId,
            userId:req.userId
        });
        res.status(201).json({msg: "Peoduct Created Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}
export const updateProduct=async(req,res)=>{
    try {
        const produk= await Produk.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!produk)return res.status(404).json({msg:"data tidak ditemukan"});
        const {kode,nama,harga,is_ready,gambar,kategoriId}=req.body;
        if(req.role === "admin"){
            await Produk.update({kode,nama,harga,is_ready,gambar,kategoriId},{
                where: {
                    id:produk.id
                }
            })
        }else{
            if(req.userId !== produk.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Produk.update({kode,nama,harga,is_ready,gambar,kategoriId},{
                    where:{
                        [Op.and]:[{id:produk.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Product Uipdated Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
export const deleteProduct=async(req,res)=>{
    try {
        const produk= await Produk.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!produk)return res.status(404).json({msg:"data tidak ditemukan"});
        const {kode,nama,harga,is_ready,gambar,kategoriId}=req.body;
        if(req.role === "admin"){
            await Produk.destroy({
                where: {
                    id:produk.id
                }
            })
        }else{
            if(req.userId !== produk.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Produk.destroy({
                    where:{
                        [Op.and]:[{id:produk.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Product deleted Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
