import AreaModel from "../models/AreaModels.js";
import ContractsModel from "../models/ContractsModel.js";
import DistricModel from "../models/DistricModel.js";
import ProvienceModel from "../models/ProvinceModel.js";
import SocietyModel from "../models/SocietyModel.js";


class ContractsConroller {
    static getProvince = async (req, res) => {
        try {
            const provinces = await ProvienceModel.find();
            if (provinces) {
                res.send(provinces);
            } else {
                res.send(false);
            }
        } catch (err) {
            res.send("DB Error" + err)
        }
    }
    static addProvince = async (req, res) => {
        // console.log("In")
        const { name } = req.body;

        const provience = await ProvienceModel.findOne({ name: name })

        if (provience) {
            res.send({ status: "failed", message: "Provience already exists" });
        } else {
            try {
                const doc = new ProvienceModel({
                    name: name
                })

                var savedProvience = await doc.save();
                res.status(201).send({
                    status: "success",
                    message: "Added Provience",
                    saved: savedProvience
                })
            } catch (err) {
                res.send("DB Error" + err)
            }
        }


    }

    static addDistric = async (req, res) => {
        // console.log("In")
        const { id, name } = req.body;

        const provience = await DistricModel.findOne({ name: name })

        if (provience) {
            res.send({ status: "failed", message: "Distric already exists" });
        } else {
            try {
                const doc = new DistricModel({
                    provinceId: id,
                    name: name
                })

                var savedProvience = await doc.save();
                res.status(201).send({
                    status: "success",
                    message: "Added Provience",
                    saved: savedProvience
                })
            } catch (err) {
                res.send("DB Error" + err)
            }
        }


    }

    static getDistrics = async (req, res) => {
        const { id } = req.params;
        try {
            const distric = await DistricModel.find({ provinceId: id })

            if (distric) {
                res.send(distric)

            } else {
                res.send(false)

            }
        } catch (err) {
            res.send("DB Error" + err)
        }


    }

    static addSociety = async (req, res) => {
        // console.log("In")
        const { id, name } = req.body;

        const provience = await SocietyModel.findOne({ name: name })

        if (provience) {
            res.send({ status: "failed", message: "Society already exists" });
        } else {
            try {
                const doc = new SocietyModel({
                    districId: id,
                    name: name
                })

                var savedProvience = await doc.save();
                res.status(201).send({
                    status: "success",
                    message: "Added Provience",
                    saved: savedProvience
                })
            } catch (err) {
                res.send("DB Error" + err)
            }
        }


    }

    static getSociety = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await SocietyModel.find({ districId: id })

            if (result) {
                res.send(result)

            } else {
                res.send(false)

            }
        } catch (err) {
            res.send("DB Error" + err)
        }


    }

    static addArea = async (req, res) => {
        // console.log("In")
        const { id, name } = req.body;

        const provience = await AreaModel.findOne({ name: name })

        if (provience) {
            res.send({ status: "failed", message: "Area already exists" });
        } else {
            try {
                const doc = new AreaModel({
                    societyId: id,
                    name: name
                })

                var savedProvience = await doc.save();
                res.status(201).send({
                    status: "success",
                    message: "Added Provience",
                    saved: savedProvience
                })
            } catch (err) {
                res.send("DB Error" + err)
            }
        }


    }

    static getArea = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await AreaModel.find({ societyId: id })

            if (result) {
                res.send(result)

            } else {
                res.send(false)

            }
        } catch (err) {
            res.send("DB Error" + err)
        }


    }

    static getAreaName = async (req, res )=> {
        const { id } = req.params;
        try{
            const result = await AreaModel.findById(id);
            if(result){
                res.send({name: result.name})
            }else {
                res.send(false)
            }
        }catch (err) {
            res.send("DB Error" + err)
        }
    }

    static addContracts = async (req, res) => {
        const { _areaId, _areaContract, _govermentAuthority, _highCourt, _citzenContract, _landInspector } = req.body;
        try {
            const getOne = await ContractsModel.findOne({ areaId: _areaId })
            if (getOne) {
                res.send({ status: "failed", message: "Area already exists" });
            } else {
                const doc = new ContractsModel({
                    areaId: _areaId, areaContract: _areaContract, govermentAuthority: _govermentAuthority, highCourt: _highCourt, citzenContract: _citzenContract, landInspector: _landInspector
                })
                var saved = await doc.save();
                res.status(201).send({
                    status: "success",
                    message: "Added Provience",
                    saved: saved
                })
            }

        } catch (err) {
            res.send("DB Error" + err)
        }

    }

    static getContracts = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await ContractsModel.find({ areaId: id })

            if (result) {
                res.send(result)

            } else {
                res.send(false)

            }
        } catch (err) {
            res.send("DB Error" + err)
        }


    }




}

export default ContractsConroller;