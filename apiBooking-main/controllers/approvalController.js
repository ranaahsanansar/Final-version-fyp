import ApprovalModel from "../models/ApprovalModel.js";

export default class ApprovalController {
    static approvalRequest = async (req, res) => {
        const { name, cnic, fatherName, phone, email } = req.body;

        const front = req.files['front']
        const back = req.files['back']
        const pic = req.files['passport-pic']

        const doc = new ApprovalModel({
            name: name,
            cnic: cnic,
            fatherName: fatherName,
            phone: phone,
            email: email,
            front: front[0].filename,
            back: back[0].filename,
            picture: pic[0].filename,
            path: "public/uploads/approvalRequests/"
        })

        try {
            var savedReqest = await doc.save();
            res.status(201).send({
                status: "success",
                message: "Request Submited Successfully",
                saved: savedReqest
            })
        } catch (e) {
            res.status(404).send({
                status: "failed",
                message: "DB Error",
            })
        }
    }

    static getUserInfo = async (req, res) => {
        const { cnic } = req.params;
        console.log(cnic)
        try {
            const info = await ApprovalModel.findOne({ cnic: cnic });
            console.log(info)
            if (info != null) {
                res.status(200).send({
                    status: "success",
                    message: "User Found",
                    user: info
                })
            }else {
                console.log("I am here")
                res.send({
                    status: "failed",
                    message: "User not Found",
                    user: info
                })
            }

        } catch {
            res.send({
                status: "failed",
                message: "User not found",
            })
        }

        // res.send({ message: `Ok ha ${cnic}` })



    }
}