import PropertyModel from "../models/Property.js";
import fs from "fs";
import path from "path";

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
        res.status(201).send({
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
      } else if (cityParam != "none" && type != "none"){
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
      }else {
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

}
export default PropertyController;