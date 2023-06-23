import express from "express";
import PropertyController from "../controllers/propertyController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import uploadFile from "../middlewares/picUploadMiddleware.js";
const router = express.Router();
// /api/dashboard/property
// Midware to Authentic user 
router.use('/list-new-property' , checkUserAuth ,uploadFile.fields([{ name: 'propertyImage' , maxCount: 10 }]))
// router.use('/list-new-property' ,uploadFile.fields([{ name: 'propertyImage' , maxCount: 10 }]))
// router.use('/list-new-property' , uploadFile.fields([{ name: 'propertyImage' , maxCount: 10 }]) )

router.use('/myProperties' , checkUserAuth)


router.use('/delete/:id' , checkUserAuth )

// Public Routes 
router.post('/list-new-property' , PropertyController.listNewProperty )
router.get('/getProperty/:id' , PropertyController.getPropertyDetails )
router.delete('/delete/:id' , PropertyController.deleteProperty )
router.get('/myProperties' , PropertyController.getPropertiesOfUser )
router.get('/allProperties' , PropertyController.getAllListedProperty )
router.get('/filterProperty/:cityParam/:type' , PropertyController.getFilterProperty )

router.post('/send-message' , PropertyController.mailSeller)
// router.get('/getProperty/:id' , PropertyController.getPropertyById )


export default router