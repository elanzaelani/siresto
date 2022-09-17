import express from 'express'
import { createKeranjang, deleteKeranjang, getKeranjangById, getKeranjangs, updateKeranjang } from '../controllers/Keranjang.js';

import {verifyUser} from '../middleware/AuthUser.js'
    

const router=express.Router();

router.get('/keranjangs', verifyUser,getKeranjangs)
router.get('/keranjang/:id', verifyUser,getKeranjangById)
router.post('/keranjang/',verifyUser, createKeranjang)
router.patch('/keranjang/:id', verifyUser,updateKeranjang)
router.delete('/keranjang/:id',verifyUser,deleteKeranjang)


export default router;