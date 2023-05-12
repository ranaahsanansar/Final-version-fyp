import express from "express";
import PropertyController from "../controllers/propertyController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import uploadFile from "../middlewares/picUploadMiddleware.js";
const router = express.Router();

// Midware to Authentic user 
router.use('/list-new-property' , checkUserAuth ,uploadFile.fields([{ name: 'propertyImage' , maxCount: 10 }]))
// router.use('/list-new-property' , uploadFile.fields([{ name: 'propertyImage' , maxCount: 10 }]) )

router.use('/delete/:id' , checkUserAuth )


// Public Routes 
router.post('/list-new-property' , PropertyController.listNewProperty )
router.get('/getProperty/:id' , PropertyController.getPropertyDetails )
router.delete('/delete/:id' , PropertyController.deleteProperty )


export default router