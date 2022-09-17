import Kategori from "../models/KategoriModel.js";

export const getCategories = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Kategori.findAll({
                attributes: ['uuid', 'nama'],

            });

        } else {
            response = await Kategori.findAll({
                attributes: ['uuid', 'nama']
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kategori) return res.status(404).json({msg: "Data Kategori tidak ditemukan"})
        let response;
        if (req.role === "admin") {
            response = await Kategori.findOne({
                attributes: ['uuid', 'nama'],
                where: {
                    id: kategori.id
                }
            });
        } else {
            response = await Kategori.findOne({
                attributes: ['uuid', 'nama'],
                where: {
                    [Op.and]: [{ id: kategori.id },
                    ]
                }
            })
        }
        res.status(200).json(response)
    } catch (error) {
res.status(500).json({msg:error.message});
    }
}


export const createKategori = async (req, res) => {
    const { nama } = req.body;
    try {
        await Kategori.create({
            nama: nama,
        });
        res.status(201).json({ msg: "Kategori Created Succesfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}
export const updateCategory = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kategori) return res.status(404).json({ msg: "data tidak ditemukan" });
        const { nama } = req.body;
       
            await Kategori.update({ nama }, {
                where: {
                    id: kategori.id
                }
            })
     
        res.status(200).json({ msg: "Kategori Updated Succesfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })

    } 
}
export const deleteKategory=async(req,res)=>{
    try {
        const kategori= await Kategori.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!kategori)return res.status(404).json({msg:"data tidak ditemukan"});
        if(req.role === "admin"){
            await Kategori.destroy({
                where: {
                    id:kategori.id
                }
            })
        }else{
            if(req.userId !== Kategori.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Kategori.destroy({
                    where:{
                        [Op.and]:[{id:kategori.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"kategori deleted Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }
}