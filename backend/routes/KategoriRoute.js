import express from 'express';
import { createKategori, deleteKategory, getCategories, getCategoryById, updateCategory } from '../controllers/Kategori.js';
import {verifyUser , adminOnly} from '../middleware/AuthUser.js';

const router =express.Router();

router.get('/kategoris',verifyUser,adminOnly,getCategories);
router.get('/kategori/:id',verifyUser,adminOnly,getCategoryById);
router.post('/kategori',verifyUser,adminOnly,createKategori);
router.patch('/kategori/:id',verifyUser,adminOnly,updateCategory);
router.delete('/kategori/:id',verifyUser,adminOnly,deleteKategory);


export default router;