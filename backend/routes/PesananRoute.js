import express from 'express'
import { createPesanan, deletePesanan, getPesanan, getPesananById, updatePesanan } from '../controllers/Pesanan.js';

import {verifyUser} from '../middleware/AuthUser.js'
    

const router=express.Router();

router.get('/pesanans', verifyUser,getPesanan)
router.get('/pesanan/:id', verifyUser,getPesananById)
router.post('/pesanan/',verifyUser, createPesanan)
router.patch('/pesanan/:id', verifyUser,updatePesanan)
router.delete('/product/:id',verifyUser,deletePesanan)


export default router;