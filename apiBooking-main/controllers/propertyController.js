import PropertyModel from "../models/Property.js";
import fs from "fs";
import path from "path";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import transporter from "../config/emailConfig.js";
dotenv.config()

class PropertyController {
  static listNewProperty = async (req, res) => {
    const {
      id,
      title,
      description,
      priceCoin,
      priceDes,
      propertyType,
      locationHead,
      locationDetails,
      city,
      shares,
      phone
    } = req.body;
    const propertyImagesArray = req.files["propertyImage"];
    // console.log(propertyImagesArray)
    var imagesArray = [];
    propertyImagesArray.forEach((element) => {
      imagesArray.push(element.filename);
    });
    // console.log(imagesArray)
    if (
      (title && description && priceCoin,
        priceDes,
        propertyType,
        locationHead,
        locationDetails,
        city)
    ) {
      try {
        const doc = new PropertyModel({
          propertyId: id,
          ownerId: req.user._id,
          title: title,
          description: description,
          price: priceCoin,
          priceDes: priceDes,
          propertyType: propertyType,
          location: {
            head: locationHead,
            details: locationDetails,
          },
          city: city,
          photos: imagesArray,
          shares: shares,
          phone: phone
        });

        console.log(doc)
        var savedProperty = await doc.save();

        res.status(201).send({
          status: "success",
          message: "Property Listed for sale",
          saved: savedProperty
        });
      } catch (err) {
        // console.log(err)
        res.status(404).send({
          status: "failed",
          message: "DB Error",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "All feidls are required",
      });
    }
  };

  static getPropertyDetails = async (req, res) => {
    const { id } = req.params;
    try {
      const property = await PropertyModel.findById(id).populate({
        path: "ownerId",
        select: "-password",
      });
      console.log(property)
      if (property) {
        // res.send(property);
        res.send({
          status: "success",
          message: "Success",
          details: property
        });
      } else {
        // res.send("Not Found");
        res.send({
          status: "failed",
          message: "Property Not Found",
        });

      }
    } catch (err) {
      res.send({
        status: "failed",
        message: "DB Error",
      });
    }
  };

  static deleteProperty = async (req, res) => {
    const { id } = req.params;
    const userEmail = req.user.email;

    // console.log(userEmail);
    try {
      const checkPropertyAuth = await PropertyModel.findById(id).populate(
        "ownerId"
      );
      // id porperty Found then
      if (checkPropertyAuth) {
        if (checkPropertyAuth.ownerId.email === userEmail) {
          const property = await PropertyModel.findByIdAndDelete(id);
          // console.log(property);
          if (property) {

            res.send({
              status: "success",
              message: "Property Listed for sale",
              property: property,
            });
          } else {
            res.send({
              status: "failed",
              message: "Property already Deleted!",
            });
          }
        } else {
          res.send({ status: "failed", message: "You are not allowed" });
        }
      } else {
        res.send({ status: "failed", message: "Property not found" });
      }
      // console.log(checkPropertyAuth.ownerId.email)
    } catch (err) {
      res.send("DB Error");
    }
  };

  static getPropertiesOfUser = async (req, res) => {
    const properties = await PropertyModel.find({ ownerId: req.user._id })
    // console.log(properties)

    res.status(201).send({
      status: "success",
      message: "Properties are Showen",
      propertiesArray: properties,
      path: "public/upload/propertyImage"
    });

  }

  static getAllListedProperty = async (req, res) => {
    try {
      const properties = await PropertyModel.find();
      console.log(properties)

      res.status(200).send({
        status: "success",
        propertiesArray: properties,
      })
    } catch (err) {

      res.status(200).send({
        status: 'error',
        message: "Error in DB",
        error: err
      })
    }


  }

  static getFilterProperty = async (req, res) => {
    try {
      const { cityParam, type } = req.params;
      console.log(type)
      console.log(cityParam)
      if (type == "none" && cityParam != "none") {
        console.log("1")
        const properties = await PropertyModel.find({
          city: cityParam
        });
        console.log(properties)
        res.status(200).send({
          status: "success",
          propertiesArray: properties,
        })
      } else if (cityParam == "none" && type != "none") {
        console.log("2")
        const properties = await PropertyModel.find({
          propertyType: type
        });
        console.log(properties)
        res.status(200).send({
          status: "success",
          propertiesArray: properties,
        })
      } else if (cityParam != "none" && type != "none") {
        const properties = await PropertyModel.find({
          city: cityParam,
          propertyType: type
        });
        console.log(properties)
        console.log("3")

        res.status(200).send({
          status: "success",
          propertiesArray: properties,
        })
      } else {
        const properties = await PropertyModel.find();
        console.log(properties)
        console.log("4")

        res.status(200).send({
          status: "success",
          propertiesArray: properties,
        })
      }
      // const properties = await PropertyModel.find({
      //   city: cityParam , 
      //   propertyType: type
      // });

      // console.log(properties)

      // res.status(200).send({
      //   status: "success",
      //   propertiesArray: properties,
      // })
    } catch (err) {
      res.status(200).send({
        status: 'error',
        message: "Error in DB",
        error: err
      })
    }
  }

  static mailSeller = async (req, res) => {
    try {
      const {
        sellerMail,
        clientMail, //
        ClientPhone,//numeric
        propertyID, //numeric
        propertyTitle,
        clientMessage,
      } = req.body;

      const parsedClientPhone = parseInt(ClientPhone);
      const parsedPropertyId = parseInt(propertyID);

      

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.MY_EMAIL,
        to: sellerMail,
        subject: `Potential Buyer Interested in Your Property Ad - Property ID: ${propertyID} - ${propertyTitle}`,
        text: `Dear Seller! ,

        I hope this email finds you well. I am writing to inform you that we have received significant interest from a potential buyer regarding your property advertisement. They have provided their contact information along with a message expressing their interest. Please find the details below:
        
        BUYER INFO
        Email: ${clientMail}
        Phone Number: ${ClientPhone}
        
        Message from the Buyer:
        ${clientMessage}
        
        We highly encourage you to reach out to the buyer at your earliest convenience to discuss the property further and potentially arrange a viewing or provide additional information.
        
        Property Details:
        Property ID: ${propertyID}
        Property Title: ${propertyTitle}
        
        If you require any assistance or have any questions regarding this potential buyer, please do not hesitate to contact us. We are more than willing to help facilitate communication between you and the interested party.
        
        Thank you for choosing our platform to advertise your property. We wish you the best in your real estate endeavors and hope for a successful transaction.
        
        Warm regards,`,
      };
      console.log(sellerMail)
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
export default PropertyController;