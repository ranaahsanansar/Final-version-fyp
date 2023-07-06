import ApprovalModel from "../models/ApprovalModel.js";
import nodemailer from 'nodemailer'


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

    static sendMail = async (req, res) => {
        try {
          const {
            email,
            msg,
            url
          } = req.body;
    
    
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.MY_EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
    
          const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: `Citzen Approval Request`,
            text: `Dear Citizen, 
            Here is an update related to your request
            Status: ${msg}
            Trace your Request  : ${url}
            `,
          };
        //   console.log(sellerMail)
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error:", error);
              res.send({
                status: "failed",
                message: "Mail not send",
              });
            } else {
              console.log("Email sent:", info.response);
              res.send({
                status: "Successfull",
                message: "Mail Send Successfully!",
              });
            }
          });
       
        } catch (error) {
          console.log(`Mailing Error: ${error}`);
        }
      };
}