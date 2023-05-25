import express from 'express'; 
const router = express.Router();

import ContractsConroller from '../controllers/contractsController.js';

router.post("/addProvience" , ContractsConroller.addProvince);

router.get("/getAllProvience" , ContractsConroller.getProvince)

router.post("/addOthers" , ContractsConroller.addContracts)
router.get('/getContracts/:id' , ContractsConroller.getContracts)

router.post("/addDistric" , ContractsConroller.addDistric)
router.get("/getDistric/:id" , ContractsConroller.getDistrics)

router.post("/addSociety" , ContractsConroller.addSociety)

router.get('/getSociety/:id' , ContractsConroller.getSociety)


router.post("/addArea" , ContractsConroller.addArea)
router.get('/getArea/:id' , ContractsConroller.getArea)
router.get('/getAreaName/:id' , ContractsConroller.getAreaName)

export default router