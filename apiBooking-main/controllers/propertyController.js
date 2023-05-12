import PropertyModel from "../models/Property.js";
import fs from "fs";
import path  from "path";

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
        });

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
      if (property) {
        res.send(property);
      } else {
        res.send("Not Found");
      }
    } catch (err) {
      res.send("DB Error" + err);
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
}

export default PropertyController;
