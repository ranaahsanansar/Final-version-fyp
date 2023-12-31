import multer from "multer";

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/${file.fieldname}`);
    },
    filename: function (req, file, cb) {
      cb(null, `${req.user.email}-${Date.now()}-${file.originalname}`);
    },
  }),
});

export default uploadFile;